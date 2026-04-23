'use client'

import { useState, useMemo, useEffect } from 'react';
import { 
  Group, Text, Paper, Title, Stack, Button, Box, Badge, 
  TextInput, ActionIcon, Modal, Select, Container, 
  Table, Divider, Avatar,
  SimpleGrid, Alert
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { 
  IconSearch, IconHistory, 
  IconInfoCircle, 
  IconAlertCircle, IconFilter
} from '@tabler/icons-react';

interface ActivityLog {
  id: string;
  timestamp: string;
  admin: string;
  action: string;
  target: string;
  type: 'finance' | 'logistic' | 'pricing' | 'system';
  detail: Record<string, any>;
}

export default function AuditLogSystem() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string | null>('Semua');
  const [selectedLog, setSelectedLog] = useState<ActivityLog | null>(null);
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [opened, { open, close }] = useDisclosure(false);

  // Fetch logs on mount
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch('http://localhost:4000/api/logs');
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const result = await response.json();
        setLogs(result.data || []);
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Failed to load logs';
        setError(errorMsg);
        console.error('Fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLogs();
  }, []);

  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      const matchSearch = log.admin.toLowerCase().includes(search.toLowerCase()) || log.target.toLowerCase().includes(search.toLowerCase());
      const matchType = typeFilter === 'Semua' || log.type === typeFilter;
      return matchSearch && matchType;
    });
  }, [search, typeFilter, logs]);

  const handleOpenLog = (log: ActivityLog) => {
    setSelectedLog(log);
    open();
  };

  return (
    <Container size="100%" p="xl" bg="#fcfcfc" style={{ minHeight: '100vh' }}>
      <Stack gap="xl">
        {error && (
          <Alert icon={<IconAlertCircle size={18}/>} title="Error" color="red">
            {error}
          </Alert>
        )}

        {/* --- HEADER --- */}
        <Group justify="space-between">
          <Box>
            <Title order={2} fw={900}>Sistem Log & Audit</Title>
            <Text c="dimmed" size="sm">Rekaman jejak digital seluruh operasional staff CV SAD.</Text>
          </Box>
          <Badge size="xl" variant="light" color="blue" leftSection={<IconHistory size={16}/>}>
            {logs.length} Total Aksi
          </Badge>
        </Group>

        {/* --- FILTER CONTROL --- */}
        <Paper withBorder p="md" radius="md" shadow="xs">
          <Group grow>
            <TextInput 
              placeholder="Cari admin atau ID transaksi..." 
              leftSection={<IconSearch size={18} stroke={1.5} />}
              value={search} onChange={(e) => setSearch(e.target.value)}
              variant="filled"
            />
            <Select 
              placeholder="Kategori Aksi"
              data={[
                { value: 'Semua', label: 'Semua Kategori' },
                { value: 'finance', label: 'Keuangan & Pembayaran' },
                { value: 'logistic', label: 'Status & Logistik' },
                { value: 'pricing', label: 'Perubahan Harga' },
                { value: 'system', label: 'Otomasi Sistem' },
              ]}
              value={typeFilter} onChange={setTypeFilter}
            />
            <Button variant="outline" color="gray" leftSection={<IconFilter size={18}/>}>Filter Lanjutan</Button>
          </Group>
        </Paper>

        {/* --- LOG TABLE --- */}
        <Paper withBorder radius="md" shadow="sm" style={{ overflow: 'hidden' }}>
          <Table verticalSpacing="md" highlightOnHover>
            <Table.Thead bg="gray.0">
              <Table.Tr>
                <Table.Th>Waktu Kejadian</Table.Th>
                <Table.Th>Pelaksana (Actor)</Table.Th>
                <Table.Th>Jenis Aksi</Table.Th>
                <Table.Th>Objek Target</Table.Th>
                <Table.Th ta="right">Detail</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {filteredLogs.map((log) => (
                <Table.Tr key={log.id}>
                  <Table.Td>
                    <Text size="xs" fw={700} c="gray.7">{log.timestamp}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      <Avatar size="xs" radius="xl" color={log.admin === 'Sistem Otomatis' ? 'gray' : 'blue'}>
                        {log.admin[0]}
                      </Avatar>
                      <Text size="sm" fw={600}>{log.admin}</Text>
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <Badge variant="light" color={getTypeColor(log.type)} size="sm">
                      {log.action}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm" fw={500} c="blue.7">{log.target}</Text>
                  </Table.Td>
                  <Table.Td ta="right">
                    <ActionIcon variant="subtle" color="gray" onClick={() => handleOpenLog(log)}>
                      <IconInfoCircle size={20} />
                    </ActionIcon>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Paper>
      </Stack>

      {/* --- MODAL DETAIL AUDIT: Deep Inspection --- */}
      <Modal 
        opened={opened} onClose={close} 
        title={<Text fw={800}>Detail Jejak Audit</Text>}
        centered radius="md"
        padding="xl"
      >
        {selectedLog && (
          <Stack gap="lg">
            <Paper p="md" bg="gray.0" withBorder radius="md">
              <Group justify="space-between" mb="xs">
                <Text size="xs" c="dimmed" fw={700}>LOG ID: {selectedLog.id}</Text>
                <Badge color={getTypeColor(selectedLog.type)}>{selectedLog.type.toUpperCase()}</Badge>
              </Group>
              <Title order={4}>{selectedLog.action}</Title>
              <Text size="xs" c="dimmed">{selectedLog.timestamp}</Text>
            </Paper>

            <Box>
                <Text fw={700} size="xs" c="dimmed" mb="xs">PERUBAHAN DATA:</Text>
                <SimpleGrid cols={2} spacing="xs">
                    <Paper p="xs" withBorder bg="red.0">
                        <Text size="10px" fw={700} c="red.9">SEBELUM</Text>
                        <Text size="sm" fw={600}>{selectedLog.detail.old}</Text>
                    </Paper>
                    <Paper p="xs" withBorder bg="green.0">
                        <Text size="10px" fw={700} c="green.9">SESUDAH</Text>
                        <Text size="sm" fw={600}>{selectedLog.detail.new}</Text>
                    </Paper>
                </SimpleGrid>
            </Box>

            <Box>
                <Text fw={700} size="xs" c="dimmed" mb="xs">KETERANGAN / CATATAN:</Text>
                <Paper p="md" withBorder radius="md">
                    <Text size="sm">{selectedLog.detail.note}</Text>
                </Paper>
            </Box>

            <Divider />

            <Group justify="space-between">
                <Box>
                    <Text size="xs" c="dimmed" fw={700}>PELAKSANA</Text>
                    <Text size="sm" fw={700}>{selectedLog.admin}</Text>
                </Box>
                <Button variant="light" size="xs" leftSection={<IconAlertCircle size={14}/>} color="orange">
                    Laporkan Anomali
                </Button>
            </Group>
          </Stack>
        )}
      </Modal>
    </Container>
  );
}

// Helpers
function getTypeColor(type: string) {
  switch(type) {
    case 'finance': return 'green';
    case 'logistic': return 'blue';
    case 'pricing': return 'orange';
    case 'system': return 'gray';
    default: return 'gray';
  }
}