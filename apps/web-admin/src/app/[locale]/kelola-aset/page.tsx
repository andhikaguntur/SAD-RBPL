'use client'

import { useState, useMemo, useEffect } from 'react';
import { 
  Group, Text, Paper, Title, Stack, Button, Box, SimpleGrid, Badge, 
  TextInput, Card, ThemeIcon, Drawer, Select, 
  Container, SegmentedControl, Table, Divider, LoadingOverlay, Alert, UnstyledButton, Center
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import {
  IconSearch, IconLayoutGrid, IconList, IconEngine,
  IconTools, IconCircleCheck, IconUser, IconMapPin, IconSettings,
  IconActivity, IconCloudDownload, IconAlertCircle,
  IconHistory
} from '@tabler/icons-react';

export default function FleetInventorySAD() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<string | null>('Semua');
  const [selectedUnit, setSelectedUnit] = useState<any>(null);
  const [drawerOpened, { open: openDrawer, close: closeDrawer }] = useDisclosure(false);
  const [loading, setLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [machines, setMachines] = useState<any[]>([]);

  const fetchMachines = async () => {
    setIsInitialLoading(true);
    setError(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/mesin`);
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const json = await res.json();
      if (json.success) {
        const mapped = json.data.map((m: any) => ({
          id: m.idMesin,
          model: m.namaMesin,
          cap: m.kapasitas || '-',
          status: m.status,
          location: m.lokasi || '-',
          lastService: m.lastService ? new Date(m.lastService).toLocaleDateString() : 'Belum Pernah Service',
          customer: m.pelanggan
        }));
        setMachines(mapped);
      }
    } catch (err: any) {
      setError(err.message || 'Gagal memuat data mesin');
    } finally {
      setIsInitialLoading(false);
    }
  };

  useEffect(() => {
    fetchMachines();
  }, []);

  const filteredData = useMemo(() => {
    return machines.filter(m => {
      const matchSearch = (m.id || '').toLowerCase().includes(search.toLowerCase()) || 
                          (m.model || '').toLowerCase().includes(search.toLowerCase());
      const matchStatus = filter === 'Semua' || m.status === filter;
      return matchSearch && matchStatus;
    });
  }, [search, filter, machines]);

  const stats = {
    total: machines.length,
    avail: machines.filter(m => m.status === 'Tersedia').length,
    rented: machines.filter(m => m.status === 'Disewa').length,
    fix: machines.filter(m => m.status === 'Perbaikan').length,
  };

  const handleManageUnit = (unit: any) => {
    setSelectedUnit(unit);
    openDrawer();
  };

  const handleStatusUpdate = async (newStatus: string) => {
    if (!selectedUnit) return;
    
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/mesin/${selectedUnit.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const data = await res.json();
      if (data.success) {
        notifications.show({
          title: 'Status Diperbarui',
          message: `Unit ${selectedUnit.id} sekarang berstatus ${newStatus}.`,
          color: 'blue',
          icon: <IconCircleCheck size={18} />
        });
        await fetchMachines();
        closeDrawer();
      } else {
        notifications.show({ title: 'Gagal', message: data.message, color: 'red' });
      }
    } catch (error: any) {
      notifications.show({ 
        title: 'Error', 
        message: error.message || 'Gagal menghubungi server', 
        color: 'red'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="100%" p="xl" bg="#fcfcfc" style={{ minHeight: '100vh' }}>
      <Stack gap="xl">
        {error && (
          <Alert icon={<IconAlertCircle size={18}/>} title="Error" color="red">
            {error}
          </Alert>
        )}

        <Group justify="space-between" align="center">
          <Box>
            <Title order={2} fw={900} c="gray.8">Fleet Inventory Control</Title>
            <Text c="dimmed" size="sm">Manajemen status operasional dan penempatan aset mesin.</Text>
          </Box>
          <Button variant="outline" color="gray" leftSection={<IconCloudDownload size={18} />}>
            Export CSV
          </Button>
        </Group>

        <SimpleGrid cols={{ base: 1, sm: 4 }} spacing="md">
          <StatDisplay title="Total Armada" val={stats.total} color="blue" icon={<IconEngine />} />
          <StatDisplay title="Siap Sewa" val={stats.avail} color="green" icon={<IconCircleCheck />} />
          <StatDisplay title="Aktif di Site" val={stats.rented} color="indigo" icon={<IconActivity />} />
          <StatDisplay title="Maintenance" val={stats.fix} color="red" icon={<IconAlertCircle />} />
        </SimpleGrid>

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
                { label: <IconLayoutGrid size={16} />, value: 'grid' },
                { label: <IconList size={16} />, value: 'list' },
              ]}
            />
          </Group>
        </Paper>

        <Box style={{ position: 'relative', minHeight: 200 }}>
          <LoadingOverlay visible={isInitialLoading} />
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
                      <IconMapPin size={14} color="gray" />
                      <Text size="xs" c="dimmed">{m.location}</Text>
                    </Group>
                    <Group gap={6}>
                      <IconUser size={14} color="gray" />
                      <Text size="xs" c="dimmed">{m.customer || 'Stock Internal'}</Text>
                    </Group>
                  </Stack>

                  <Button
                    variant="light"
                    fullWidth
                    leftSection={<IconSettings size={16} />}
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
        </Box>
      </Stack>

      <Drawer
        opened={drawerOpened} onClose={closeDrawer} position="right" size="md"
        title={<Text fw={900} size="lg">Aset Control Panel</Text>}
        padding="xl"
      >
        <LoadingOverlay visible={loading} />
        {selectedUnit && (
          <Stack gap="xl">
            <Box>
              <Title order={3} c="blue.9">{selectedUnit.id}</Title>
              <Text size="sm" c="dimmed">{selectedUnit.model} ({selectedUnit.cap})</Text>
            </Box>

            <Divider label="Ubah Status Operasional" labelPosition="center" />

            <SimpleGrid cols={2} spacing="sm">
              <StatusActionButton
                label="Tersedia" icon={<IconCircleCheck />} color="green"
                active={selectedUnit.status === 'Tersedia'}
                onClick={() => handleStatusUpdate('Tersedia')}
              />
              <StatusActionButton
                label="Maintenance" icon={<IconTools />} color="red"
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

            <Button variant="outline" color="gray" fullWidth mt="xl" leftSection={<IconHistory size={18} />}>
              Buka Log Audit Unit
            </Button>
          </Stack>
        )}
      </Drawer>
    </Container>
  );
}

function StatDisplay({ title, val, color, icon }: any) {
  return (
    <Paper p="md" radius="md" withBorder>
      <Group justify="space-between">
        <Box>
          <Text size="xs" c="dimmed" fw={800} tt="uppercase">{title}</Text>
          <Text fw={900} size="xl">{val} <Text span size="sm" fw={500} c="dimmed">Unit</Text></Text>
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
        gap: '8px'
      }}
    >
      <ThemeIcon color={color} variant={active ? 'filled' : 'light'} size="lg">
        {icon}
      </ThemeIcon>
      <Text size="xs" fw={700}>{label}</Text>
    </UnstyledButton>
  );
}

const getStatusColor = (s: string) => {
  switch (s) {
    case 'Tersedia': return 'green';
    case 'Disewa': return 'blue';
    case 'Perbaikan': return 'red';
    default: return 'orange';
  }
};