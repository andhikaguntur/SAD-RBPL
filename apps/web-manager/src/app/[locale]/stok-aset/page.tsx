'use client'

import { useState, useEffect, useMemo } from 'react';
import { 
  Container, Stack, Group, Text, Title, Paper, Badge, Box, 
  SimpleGrid, TextInput, Table, ActionIcon, Divider, 
  Tooltip, ThemeIcon, Drawer, Timeline, ScrollArea, Button,
  Menu, Modal, Textarea, Select, NumberInput, Center
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { 
  IconSearch, IconEngine, IconClock, IconHistory, 
  IconUser, IconDotsVertical, IconCalendarClock, IconTool,
  IconChecks, IconAlertCircle, IconFileText, IconChevronRight, IconX,
  IconTruck
} from '@tabler/icons-react';

interface Machine {
  id: string;
  model: string;
  status: string;
  lastService: string;
  hourMeter: number;
}

export default function StockAsetManagerPage() {
  const [search, setSearch] = useState('');
  const [selectedUnit, setSelectedUnit] = useState<Machine | null>(null);
  const [machines, setMachines] = useState<Machine[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [openedHistory, { open: openHistory, close: closeHistory }] = useDisclosure(false);
  const [openedRepair, { open: openRepair, close: closeRepair }] = useDisclosure(false);

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/mesin`);
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        const result = await response.json();
        
        if (result.success) {
          const mapped = result.data.map((m: any) => ({
            id: m.idMesin,
            model: m.namaMesin || 'Unknown Model',
            status: m.status,
            lastService: '2026-02-20',
            hourMeter: 1200
          }));
          setMachines(mapped);
        }
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch machines');
        setIsLoading(false);
      }
    };
    fetchMachines();
  }, []);

  const filteredData = useMemo(() => {
    return machines.filter(item => 
      item.id.toLowerCase().includes(search.toLowerCase()) || 
      item.model.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, machines]);

  const getIdleDays = (dateStr: string) => {
    const diff = Math.floor((new Date().getTime() - new Date(dateStr).getTime()) / (1000 * 3600 * 24));
    return isNaN(diff) ? 0 : diff;
  };

  const handleAction = (unit: Machine, type: 'history' | 'repair') => {
    setSelectedUnit(unit);
    if (type === 'history') openHistory();
    else openRepair();
  };

  return (
    <Container size="100%" p="xl" bg="white">
      <Stack gap="xl">
        <Group justify="space-between" align="flex-end">
          <Box>
            <Title order={2} fw={900}>Inventory Control</Title>
            <Text c="dimmed" size="xs" fw={700} tt="uppercase">Manajemen Teknis & Lifecycle Unit</Text>
          </Box>
          <TextInput 
            placeholder="Cari S/N atau Model..." 
            leftSection={<IconSearch size={16}/>} 
            w={350} radius="md" variant="filled"
            value={search} onChange={(e) => setSearch(e.target.value)}
          />
        </Group>

        <Divider color="gray.1" />

        {isLoading && (
          <Center py={40}><Text c="dimmed">Loading machines...</Text></Center>
        )}
        
        {error && (
          <Paper withBorder p="md" bg="red.0" style={{ borderColor: 'var(--mantine-color-red-3)' }}>
            <Text c="red.7" fw={600}>Error: {error}</Text>
          </Paper>
        )}

        <SimpleGrid cols={{ base: 1, sm: 3 }}>
          <StatMini label="UNIT TERSEDIA" val={`${machines.filter(m => m.status === 'Tersedia').length} Unit`} icon={<IconEngine/>} color="green" />
          <StatMini label="DISEWA" val={`${machines.filter(m => m.status === 'Disewa').length} Unit`} icon={<IconTruck size={20}/>} color="blue" />
          <StatMini label="DALAM PERBAIKAN" val={`${machines.filter(m => m.status === 'Perbaikan').length} Unit`} icon={<IconTool/>} color="orange" />
        </SimpleGrid>

        <Paper withBorder radius="md" style={{ overflow: 'hidden' }}>
          <Table verticalSpacing="md" horizontalSpacing="lg" highlightOnHover>
            <Table.Thead bg="gray.0">
              <Table.Tr>
                <Table.Th style={{ fontSize: '11px' }}>SERIAL NUMBER</Table.Th>
                <Table.Th style={{ fontSize: '11px' }}>MODEL MESIN</Table.Th>
                <Table.Th style={{ fontSize: '11px' }}>HOUR METER (HM)</Table.Th>
                <Table.Th style={{ fontSize: '11px' }}>STATUS</Table.Th>
                <Table.Th ta="right"></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {filteredData.map((unit) => {
                return (
                  <Table.Tr key={unit.id}>
                    <Table.Td fw={800} c="blue.9">{unit.id}</Table.Td>
                    <Table.Td>
                      <Text fw={700} size="sm">{unit.model}</Text>
                    </Table.Td>
                    <Table.Td>
                      <Group gap={6}>
                        <IconClock size={14} color="gray"/>
                        <Text size="sm" fw={800}>{unit.hourMeter} <Text span fw={500} c="dimmed">hrs</Text></Text>
                      </Group>
                    </Table.Td>
                    <Table.Td>
                      <Badge variant="outline" radius="xs" color={unit.status === 'Tersedia' ? 'green' : unit.status === 'Perbaikan' ? 'orange' : 'blue'}>{unit.status}</Badge>
                    </Table.Td>
                    <Table.Td ta="right">
                      <Menu position="bottom-end" shadow="md">
                        <Menu.Target>
                          <ActionIcon variant="subtle" color="gray"><IconDotsVertical size={16}/></ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                          <Menu.Item leftSection={<IconHistory size={14}/>} onClick={() => handleAction(unit, 'history')}>Lihat History</Menu.Item>
                          <Menu.Item leftSection={<IconTool size={14}/>} color="orange" onClick={() => handleAction(unit, 'repair')}>Log Perbaikan</Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </Table.Td>
                  </Table.Tr>
                );
              })}
            </Table.Tbody>
          </Table>
        </Paper>
      </Stack>

      <Drawer
        opened={openedHistory} onClose={closeHistory} position="right" size="70%"
        title={<Text fw={900} size="lg">Unit Lifecycle Log: {selectedUnit?.id}</Text>}
        padding="xl"
      >
        {selectedUnit && <LifecycleContent unit={selectedUnit} />}
      </Drawer>

      <MaintenanceModal 
        opened={openedRepair} 
        onClose={closeRepair} 
        unitId={selectedUnit?.id} 
        hm={selectedUnit?.hourMeter} 
      />
    </Container>
  );
}

function StatMini({ label, val, icon, color }: any) {
  return (
    <Paper withBorder p="md" radius="sm" bg="#fcfcfc">
      <Text size="xs" c="dimmed" fw={800} mb={4}>{label}</Text>
      <Group justify="space-between">
        <Title order={3}>{val}</Title>
        <ThemeIcon variant="light" color={color} size="lg">{icon}</ThemeIcon>
      </Group>
    </Paper>
  );
}

function LifecycleContent({ unit }: any) {
  return (
    <Stack gap="xl">
      <SimpleGrid cols={3}>
        <Paper withBorder p="md" radius="md" bg="gray.0">
          <Text size="xs" fw={800} c="dimmed">LIFETIME</Text>
          <Text fw={900} size="xl">{unit.hourMeter} <Text span size="xs" fw={500}>Hours</Text></Text>
        </Paper>
        <Paper withBorder p="md" radius="md" bg="gray.0">
          <Text size="xs" fw={800} c="dimmed">MODEL</Text>
          <Text fw={900} size="md" tt="uppercase">{unit.model}</Text>
        </Paper>
        <Paper withBorder p="md" radius="md" bg="blue.0">
          <Text size="xs" fw={800} c="blue.9">STATUS FISIK</Text>
          <Text fw={900} size="xl">{unit.status}</Text>
        </Paper>
      </SimpleGrid>

      <Divider label="Usage & Service History" labelPosition="center" />
      
      <Table verticalSpacing="sm" withTableBorder>
        <Table.Thead bg="gray.0">
          <Table.Tr>
            <Table.Th style={{ fontSize: '10px' }}>PERIODE</Table.Th>
            <Table.Th style={{ fontSize: '10px' }}>AKTIVITAS</Table.Th>
            <Table.Th style={{ fontSize: '10px' }}>STATUS</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tr>
            <Table.Td>
              <Text size="xs">Latest</Text>
            </Table.Td>
            <Table.Td><Text size="xs" fw={700}>System Log</Text></Table.Td>
            <Table.Td>
              <Text size="xs">{unit.status}</Text>
            </Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </Stack>
  );
}

function MaintenanceModal({ opened, onClose, unitId, hm }: any) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    kategori: 'Rutin',
    hmSaatPerbaikan: hm || 0,
    teknisi: '',
    keterangan: ''
  });
  
  const handleSave = async () => {
    setLoading(true);
    try {
      notifications.show({ 
        title: 'Fitur Segera Hadir', 
        message: `Maintenance logging untuk ${unitId} sedang dalam pengembangan.`, 
        color: 'orange' 
      });
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title={<Text fw={900}>Log Perbaikan: {unitId}</Text>} centered>
      <Stack>
        <Select 
          label="Kategori" 
          data={['Rutin', 'Perbaikan Berat', 'Ganti Part']} 
          value={formData.kategori}
          onChange={(value) => setFormData(prev => ({ ...prev, kategori: value || 'Rutin' }))}
        />
        <NumberInput 
          label="HM Saat Perbaikan" 
          value={formData.hmSaatPerbaikan}
          onChange={(value) => setFormData(prev => ({ ...prev, hmSaatPerbaikan: Number(value) || 0 }))}
        />
        <TextInput 
          label="Teknisi" 
          placeholder="Nama mekanik"
          value={formData.teknisi}
          onChange={(e) => setFormData(prev => ({ ...prev, teknisi: e.target.value }))}
        />
        <Textarea 
          label="Keterangan Kerusakan" 
          placeholder="Jelaskan detail tindakan..." 
          minRows={3}
          value={formData.keterangan}
          onChange={(e) => setFormData(prev => ({ ...prev, keterangan: e.target.value }))}
        />
        <Button color="orange.8" fullWidth onClick={handleSave} loading={loading}>Simpan & Update Unit</Button>
      </Stack>
    </Modal>
  );
}