'use client'

import { useState, useMemo } from 'react';
import { 
  Container, Stack, Group, Text, Title, Paper, Badge, Box, 
  Table, TextInput, Divider, ActionIcon, Drawer,
  Select, ScrollArea, Avatar, Code, SimpleGrid,
  Button
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { 
  IconSearch, IconFingerprint, IconHistory, IconUser,
  IconClock, IconDeviceDesktop, IconFilter, IconChevronRight,
  IconDatabaseEdit, IconAlertCircle
} from '@tabler/icons-react';

// --- MOCK DATA LOG ---
const ACTIVITY_LOGS = [
  { 
    id: 'LOG-881', 
    timestamp: '23 Feb 2026, 09:15', 
    staff: 'Nurul Bahri', 
    role: 'Admin Finance',
    action: 'UPDATE_STATUS', 
    target: 'PO-2026-001',
    description: 'Mengubah status pembayaran menjadi LUNAS',
    changes: { old: 'Partial', new: 'Paid' }
  },
  { 
    id: 'LOG-882', 
    timestamp: '23 Feb 2026, 10:30', 
    staff: 'Bambang', 
    role: 'Gudang',
    action: 'DISPATCH_UNIT', 
    target: 'ORD-510',
    description: 'Input data keberangkatan armada (Sopir: Herman)',
    changes: { old: 'Pending Dispatch', new: 'On-Road' }
  },
  { 
    id: 'LOG-885', 
    timestamp: '23 Feb 2026, 11:00', 
    staff: 'Andi Supriadi', 
    role: 'Manager Ops',
    action: 'SYSTEM_LOG', 
    target: 'CONFIG_PRICE',
    description: 'Update harga sewa harian Genset 50kVA',
    changes: { old: '1.5M', new: '1.7M' }
  },
];

export default function StaffActivityLog() {
  const [search, setSearch] = useState('');
  const [selectedLog, setSelectedLog] = useState<any>(null);
  const [opened, { open, close }] = useDisclosure(false);

  // --- LOGIC: FILTER ---
  const filteredLogs = useMemo(() => {
    return ACTIVITY_LOGS.filter(log => 
      log.staff.toLowerCase().includes(search.toLowerCase()) || 
      log.target.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

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
            />
          </Group>
        </Group>

        <Divider color="gray.1" />

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
                      <Avatar size="sm" radius="xl" color="blue">{log.staff.charAt(0)}</Avatar>
                      <Box>
                        <Text size="xs" fw={800}>{log.staff}</Text>
                        <Text size="10px" c="dimmed">{log.role}</Text>
                      </Box>
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <Badge variant="light" color="blue" radius="xs" size="xs">
                      {log.action}
                    </Badge>
                  </Table.Td>
                  <Table.Td fw={800} size="xs" c="blue.9">{log.target}</Table.Td>
                  <Table.Td size="xs" c="dimmed" fw={500}>{log.description}</Table.Td>
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

      {/* --- DETAIL DRAWER: DATA DIFF VIEW --- */}
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
                  <Text fw={700} size="sm">{selectedLog.staff}</Text>
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
                  Perubahan ini memicu update otomatis pada modul <b>Inventory</b> dan <b>Arsip PO</b>.
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