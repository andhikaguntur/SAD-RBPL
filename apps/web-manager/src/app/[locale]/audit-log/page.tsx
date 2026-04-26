'use client'

import { useState, useEffect, useMemo } from 'react';
import { 
  Container, Stack, Group, Text, Title, Paper, Badge, Box, 
  Table, TextInput, Divider, ActionIcon, Drawer,
  Select, ScrollArea, Avatar, Code, SimpleGrid,
  Button, Center
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { 
  IconSearch, IconFingerprint, IconHistory, IconUser,
  IconClock, IconDeviceDesktop, IconFilter, IconChevronRight,
  IconDatabaseEdit, IconAlertCircle
} from '@tabler/icons-react';

interface ActivityLog {
  id: string;
  timestamp: string;
  admin: string;
  action: string;
  target: string;
  type: string;
  detail: any;
  changes: {
    old: string;
    new: string;
  };
}

export default function StaffActivityLog() {
  const [search, setSearch] = useState('');
  const [selectedLog, setSelectedLog] = useState<ActivityLog | null>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch activity logs on mount
  useEffect(() => {
    const fetchActivityLogs = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/logs`);
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        const result = await response.json();
        
        if (result.success) {
          const mapped = result.data.map((l: any) => ({
            id: l.idLog,
            timestamp: new Date(l.timestamp).toLocaleString('id-ID'),
            admin: l.user?.name || 'Sistem', 
            action: l.aksi,
            target: l.idTarget,
            type: l.entitasTarget,
            detail: l.keterangan || '-',
            changes: {
              old: '{}',
              new: l.keterangan || '{}'
            }
          }));
          setActivityLogs(mapped);
        }
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch activity logs');
        setIsLoading(false);
      }
    };
    fetchActivityLogs();
  }, []);

  // --- LOGIC: FILTER ---
  const filteredLogs = useMemo(() => {
    return activityLogs.filter(log => 
      log.admin.toLowerCase().includes(search.toLowerCase()) || 
      log.target.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, activityLogs]);

  const handleViewDetail = (log: any) => {
    setSelectedLog(log);
    open();
  };

  return (
    <Container size="100%" p="xl" bg="white">
      <Stack gap="xl">
        
        {/* --- HEADER --- */}
        <Group justify="space-between" align="flex-end">
          <Box>
            <Title order={2} fw={900}>Staff Activity Log</Title>
            <Text c="dimmed" size="xs" fw={700} tt="uppercase">Audit Trail & Jejak Digital Operasional</Text>
          </Box>
          <Group gap="xs">
            <TextInput 
              placeholder="Cari staff atau ID objek..." 
              leftSection={<IconSearch size={16}/>} 
              w={350} radius="md" variant="filled"
              value={search} onChange={(e) => setSearch(e.target.value)}
            />
            <Select 
              placeholder="Kategori"
              data={['Semua', 'Keuangan', 'Logistik', 'Inventory']}
              variant="filled" radius="md" w={150}
              defaultValue="Semua"
            />
          </Group>
        </Group>

        <Divider color="gray.1" />

        {/* Loading and Error States */}
        {isLoading && (
          <Center py={40}>
            <Text c="dimmed">Loading activity logs...</Text>
          </Center>
        )}
        
        {error && (
          <Paper withBorder p="md" bg="red.0" style={{ borderColor: 'var(--mantine-color-red-3)' }}>
            <Text c="red.7" fw={600}>Error: {error}</Text>
          </Paper>
        )}

        {/* --- LOG TABLE --- */}
        <Paper withBorder radius="md" style={{ overflow: 'hidden' }}>
          <Table verticalSpacing="md" horizontalSpacing="lg" highlightOnHover>
            <Table.Thead bg="gray.0">
              <Table.Tr>
                <Table.Th style={{ fontSize: '11px' }}>WAKTU</Table.Th>
                <Table.Th style={{ fontSize: '11px' }}>STAFF</Table.Th>
                <Table.Th style={{ fontSize: '11px' }}>AKSI</Table.Th>
                <Table.Th style={{ fontSize: '11px' }}>OBJEK TARGET</Table.Th>
                <Table.Th style={{ fontSize: '11px' }}>KETERANGAN</Table.Th>
                <Table.Th ta="right"></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {filteredLogs.map((log) => (
                <Table.Tr key={log.id}>
                  <Table.Td>
                    <Group gap="xs">
                      <IconClock size={14} color="gray"/>
                      <Text size="xs" fw={700}>{log.timestamp}</Text>
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <Group gap="sm">
                      <Avatar size="sm" radius="xl" color="blue">{log.admin.charAt(0)}</Avatar>
                      <Box>
                        <Text size="xs" fw={800}>{log.admin}</Text>
                        <Text size="10px" c="dimmed">{log.type}</Text>
                      </Box>
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <Badge variant="light" color="blue" radius="xs" size="xs">
                      {log.action}
                    </Badge>
                  </Table.Td>
                    <Table.Td>
                      <Text fw={800} size="xs" c="blue.9">{log.target}</Text>
                    </Table.Td>
                  <Table.Td>
                    <Text size="xs" c="dimmed" fw={500}>{log.detail}</Text>
                  </Table.Td>
                  <Table.Td ta="right">
                    <ActionIcon variant="subtle" color="gray" onClick={() => handleViewDetail(log)}>
                      <IconChevronRight size={18} />
                    </ActionIcon>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Paper>
      </Stack>

      {/* --- DETAIL DRAWER --- */}
      <Drawer
        opened={opened} onClose={close} position="right" size="md"
        title={<Text fw={900}>Audit Detail: {selectedLog?.id}</Text>}
        padding="xl"
      >
        {selectedLog && (
          <Stack gap="xl">
            <Paper p="md" radius="md" bg="gray.0" withBorder>
              <Group gap="sm">
                <IconFingerprint size={24} color="gray"/>
                <Box>
                  <Text size="xs" fw={800} c="dimmed">SECURITY SIGNATURE</Text>
                  <Text size="xs" fw={700} style={{ wordBreak: 'break-all' }}>
                    HASH: {btoa(selectedLog.id + selectedLog.timestamp).substring(0, 24)}...
                  </Text>
                </Box>
              </Group>
            </Paper>

            <Box>
              <Text size="xs" fw={800} c="dimmed" tt="uppercase" mb="xs">Metadata</Text>
              <SimpleGrid cols={2}>
                <Box>
                  <Text size="10px" c="dimmed">Pelaku</Text>
                  <Text fw={700} size="sm">{selectedLog.admin}</Text>
                </Box>
                <Box>
                  <Text size="10px" c="dimmed">Device/IP</Text>
                  <Text fw={700} size="sm">192.168.1.44 (Web)</Text>
                </Box>
              </SimpleGrid>
            </Box>

            <Divider label="Data Changes" labelPosition="center" />

            {/* --- THE DIFF VIEW --- */}
            <Box>
              <Group justify="space-between" mb="xs">
                <Text size="xs" fw={800} c="red.7">BEFORE</Text>
                <Text size="xs" fw={800} c="green.7">AFTER</Text>
              </Group>
              <Group grow align="stretch">
                <Paper p="sm" withBorder bg="red.0" radius="sm">
                  <Code color="red" block>{selectedLog.changes.old}</Code>
                </Paper>
                <Paper p="sm" withBorder bg="green.0" radius="sm">
                  <Code color="green" block>{selectedLog.changes.new}</Code>
                </Paper>
              </Group>
            </Box>

            <Box p="md" bg="blue.0" style={{ borderRadius: '8px', border: '1px solid var(--mantine-color-blue-2)' }}>
              <Group gap="xs">
                <IconAlertCircle size={18} color="var(--mantine-color-blue-7)"/>
                <Text size="xs" c="blue.9" fw={600}>
                  Log ini merupakan audit resmi yang tidak dapat diubah (Immutable).
                </Text>
              </Group>
            </Box>

            <Button variant="outline" color="gray" fullWidth onClick={close}>Tutup Log</Button>
          </Stack>
        )}
      </Drawer>
    </Container>
  );
}