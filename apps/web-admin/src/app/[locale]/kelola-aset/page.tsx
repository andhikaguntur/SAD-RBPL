'use client'

import { useState, useMemo } from 'react';
import { 
  Group, Text, Paper, Title, Stack, Button, Box, SimpleGrid, Badge, 
  TextInput, Card, ThemeIcon, Drawer, Select, 
  Container, SegmentedControl, Table, Divider, LoadingOverlay
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { 
  IconSearch, IconLayoutGrid, IconList, IconEngine, 
  IconTools, IconCircleCheck, IconUser, IconMapPin, IconSettings,
  IconActivity, IconCloudDownload, IconAlertCircle,
  IconHistory
} from '@tabler/icons-react';

// Data Mockup
const INITIAL_MACHINES = [
  { id: 'MSN-501', model: 'Genset Perkins', cap: '50kVA', status: 'Tersedia', location: 'Gudang Utama', lastService: '2026-01-10', customer: null },
  { id: 'MSN-502', model: 'Genset Perkins', cap: '50kVA', status: 'Disewa', location: 'Site Sleman', lastService: '2025-12-12', customer: 'PT. Maju Jaya' },
  { id: 'MSN-101', model: 'Genset Cummins', cap: '100kVA', status: 'Perbaikan', location: 'Bengkel Pusat', lastService: '2026-02-15', customer: null },
  { id: 'MSN-102', model: 'Genset Cummins', cap: '100kVA', status: 'Dipesan', location: 'Gudang Utama', lastService: '2026-02-01', customer: 'CV. Bangun Pagi' },
];

export default function FleetInventorySAD() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<string | null>('Semua');
  const [selectedUnit, setSelectedUnit] = useState<any>(null);
  const [drawerOpened, { open: openDrawer, close: closeDrawer }] = useDisclosure(false);
  const [loading, setLoading] = useState(false);

  // Logic: Filtering
  const filteredData = useMemo(() => {
    return INITIAL_MACHINES.filter(m => {
      const matchSearch = m.id.toLowerCase().includes(search.toLowerCase()) || m.model.toLowerCase().includes(search.toLowerCase());
      const matchStatus = filter === 'Semua' || m.status === filter;
      return matchSearch && matchStatus;
    });
  }, [search, filter]);

  // Statistik (Flat Design - Non Interactive)
  const stats = {
    total: INITIAL_MACHINES.length,
    avail: INITIAL_MACHINES.filter(m => m.status === 'Tersedia').length,
    rented: INITIAL_MACHINES.filter(m => m.status === 'Disewa').length,
    fix: INITIAL_MACHINES.filter(m => m.status === 'Perbaikan').length,
  };

  const handleManageUnit = (unit: any) => {
    setSelectedUnit(unit);
    openDrawer();
  };

  const handleStatusUpdate = async (newStatus: string) => {
    setLoading(true);
    await new Promise(res => setTimeout(res, 800)); // Simulasi API
    notifications.show({
      title: 'Status Diperbarui',
      message: `Unit ${selectedUnit.id} sekarang berstatus ${newStatus}.`,
      color: 'blue',
      icon: <IconCircleCheck size={18} />
    });
    setLoading(false);
    closeDrawer();
  };

  return (
    <Container size="100%" p="xl" bg="#fcfcfc" style={{ minHeight: '100vh' }}>
      <Stack gap="xl">
        
        {/* --- 1. HEADER & EXPORT --- */}
        <Group justify="space-between" align="center">
          <Box>
            <Title order={2} fw={900} c="gray.8">Fleet Inventory Control</Title>
            <Text c="dimmed" size="sm">Manajemen status operasional dan penempatan aset mesin.</Text>
          </Box>
          <Button variant="outline" color="gray" leftSection={<IconCloudDownload size={18}/>}>
            Export CSV
          </Button>
        </Group>

        {/* --- 2. SUMMARY STATS (Flat/Static) --- */}
        <SimpleGrid cols={{ base: 1, sm: 4 }} spacing="md">
          <StatDisplay title="Total Armada" val={stats.total} color="blue" icon={<IconEngine/>} />
          <StatDisplay title="Siap Sewa" val={stats.avail} color="green" icon={<IconCircleCheck/>} />
          <StatDisplay title="Aktif di Site" val={stats.rented} color="indigo" icon={<IconActivity/>} />
          <StatDisplay title="Maintenance" val={stats.fix} color="red" icon={<IconAlertCircle/>} />
        </SimpleGrid>

        {/* --- 3. SEARCH & CONTROL --- */}
        <Paper withBorder p="md" radius="md" bg="white">
          <Group justify="space-between">
            <Group style={{ flex: 1 }}>
              <TextInput 
                placeholder="Cari ID Unit atau Model..." 
                leftSection={<IconSearch size={18} stroke={1.5} />}
                w={350} radius="md" variant="filled"
                value={search} onChange={(e) => setSearch(e.target.value)}
              />
              <Select 
                placeholder="Filter Status" 
                data={['Semua', 'Tersedia', 'Disewa', 'Perbaikan', 'Dipesan']} 
                value={filter} onChange={setFilter}
                radius="md" w={180}
              />
            </Group>
            <SegmentedControl
              value={view}
              onChange={(value: any) => setView(value)}
              data={[
                { label: <IconLayoutGrid size={16}/>, value: 'grid' },
                { label: <IconList size={16}/>, value: 'list' },
              ]}
            />
          </Group>
        </Paper>

        {/* --- 4. DATA VIEW --- */}
        {view === 'grid' ? (
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg">
            {filteredData.map(m => (
              <Card key={m.id} withBorder radius="md" padding="lg" bg="white">
                <Card.Section withBorder inheritPadding py="xs" bg="gray.0">
                  <Group justify="space-between">
                    <Text fw={800} size="sm" c="blue.9">{m.id}</Text>
                    <Badge variant="dot" color={getStatusColor(m.status)}>{m.status}</Badge>
                  </Group>
                </Card.Section>

                <Stack gap="xs" mt="md" mb="xl">
                  <Text size="sm" fw={700}>{m.model} • {m.cap}</Text>
                  <Group gap={6}>
                    <IconMapPin size={14} color="gray"/>
                    <Text size="xs" c="dimmed">{m.location}</Text>
                  </Group>
                  <Group gap={6}>
                    <IconUser size={14} color="gray"/>
                    <Text size="xs" c="dimmed">{m.customer || 'Stock Internal'}</Text>
                  </Group>
                </Stack>

                <Button 
                    variant="light" 
                    fullWidth 
                    leftSection={<IconSettings size={16}/>}
                    onClick={() => handleManageUnit(m)}
                >
                    Kelola Aset
                </Button>
              </Card>
            ))}
          </SimpleGrid>
        ) : (
          <Paper withBorder radius="md" shadow="sm" style={{ overflow: 'hidden' }}>
            <Table verticalSpacing="md" horizontalSpacing="lg">
              <Table.Thead bg="gray.0">
                <Table.Tr>
                  <Table.Th>ID Unit</Table.Th>
                  <Table.Th>Spesifikasi</Table.Th>
                  <Table.Th>Lokasi</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th ta="right">Aksi</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {filteredData.map(m => (
                  <Table.Tr key={m.id}>
                    <Table.Td fw={800} c="blue.8">{m.id}</Table.Td>
                    <Table.Td>
                      <Text size="sm" fw={600}>{m.model}</Text>
                      <Text size="xs" c="dimmed">{m.cap}</Text>
                    </Table.Td>
                    <Table.Td><Text size="xs">{m.location}</Text></Table.Td>
                    <Table.Td><Badge color={getStatusColor(m.status)} variant="light">{m.status}</Badge></Table.Td>
                    <Table.Td ta="right">
                      <Button variant="subtle" size="xs" onClick={() => handleManageUnit(m)}>Manage</Button>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Paper>
        )}
      </Stack>

      {/* --- 5. COMMAND CENTER DRAWER --- */}
      <Drawer
        opened={drawerOpened} onClose={closeDrawer} position="right" size="md"
        title={<Text fw={900} size="lg">Aset Control Panel</Text>}
        padding="xl"
      >
        <LoadingOverlay visible={loading} overlayProps={{ blur: 1 }} />
        {selectedUnit && (
          <Stack gap="xl">
            <Box>
                <Title order={3} c="blue.9">{selectedUnit.id}</Title>
                <Text size="sm" c="dimmed">{selectedUnit.model} ({selectedUnit.cap})</Text>
            </Box>

            <Divider label="Ubah Status Operasional" labelPosition="center" />

            <SimpleGrid cols={2} spacing="sm">
                <StatusActionButton 
                    label="Tersedia" icon={<IconCircleCheck/>} color="green"
                    active={selectedUnit.status === 'Tersedia'}
                    onClick={() => handleStatusUpdate('Tersedia')}
                />
                <StatusActionButton 
                    label="Maintenance" icon={<IconTools/>} color="red"
                    active={selectedUnit.status === 'Perbaikan'}
                    onClick={() => handleStatusUpdate('Perbaikan')}
                />
            </SimpleGrid>

            <Box>
                <Text size="xs" fw={700} c="dimmed" tt="uppercase" mb="md">Riwayat Lokasi & Aktivitas</Text>
                <Paper withBorder p="md" radius="md" bg="gray.0">
                    <Stack gap="xs">
                        <Group justify="space-between">
                            <Text size="xs" fw={600}>Penempatan Saat Ini</Text>
                            <Badge variant="outline">{selectedUnit.location}</Badge>
                        </Group>
                        <Group justify="space-between">
                            <Text size="xs" fw={600}>Service Terakhir</Text>
                            <Text size="xs">{selectedUnit.lastService}</Text>
                        </Group>
                    </Stack>
                </Paper>
            </Box>

            <Button variant="outline" color="gray" fullWidth mt="xl" leftSection={<IconHistory size={18}/>}>
                Buka Log Audit Unit
            </Button>
          </Stack>
        )}
      </Drawer>
    </Container>
  );
}

// --- SUB-COMPONENTS ---

function StatDisplay({ title, val, color, icon }: any) {
  return (
    <Paper p="md" radius="md" style={{ border: '1px solid #e9ecef', backgroundColor: 'white' }}>
      <Group justify="space-between" wrap="nowrap">
        <Box>
          <Text size="xs" c="dimmed" fw={800} tt="uppercase" style={{ letterSpacing: '0.5px' }}>{title}</Text>
          <Text fw={900} size="xl" c="gray.8">{val} <Text span size="sm" fw={500} c="dimmed">Unit</Text></Text>
        </Box>
        <ThemeIcon size="xl" radius="md" variant="light" color={color}>{icon}</ThemeIcon>
      </Group>
    </Paper>
  );
}

function StatusActionButton({ label, icon, color, active, onClick }: any) {
    return (
        <UnstyledButton 
            onClick={onClick}
            style={{
                padding: '16px',
                borderRadius: '8px',
                border: `1.5px solid ${active ? `var(--mantine-color-${color}-6)` : '#e9ecef'}`,
                backgroundColor: active ? `var(--mantine-color-${color}-0)` : 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease'
            }}
        >
            <ThemeIcon color={color} variant={active ? 'filled' : 'light'} size="lg">
                {icon}
            </ThemeIcon>
            <Text size="xs" fw={700} c={active ? `${color}.9` : 'gray.7'}>{label}</Text>
        </UnstyledButton>
    );
}

// Gunakan UnstyledButton dari Mantine untuk custom button
import { UnstyledButton } from '@mantine/core';

const getStatusColor = (s: string) => {
  switch(s) {
    case 'Tersedia': return 'green';
    case 'Disewa': return 'blue';
    case 'Perbaikan': return 'red';
    default: return 'orange';
  }
};