'use client'

import { useState, useMemo } from 'react';
import { 
  Container, Stack, Group, Text, Title, Paper, Badge, Box, 
  SimpleGrid, TextInput, Table, ActionIcon, Divider, 
  Tooltip, ThemeIcon, Drawer, Timeline, ScrollArea, Button,
  Menu, Modal, Textarea, Select, NumberInput
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { 
  IconSearch, IconEngine, IconClock, IconHistory, 
  IconUser, IconDotsVertical, IconCalendarClock, IconTool,
  IconChecks, IconAlertCircle, IconFileText, IconChevronRight, IconX
} from '@tabler/icons-react';

// --- MOCK DATA (In Production, this comes from API) ---
const INITIAL_STOK = [
  { id: 'MSN-001', model: 'Genset Perkins 50kVA', hourMeter: 1240, lastUsed: '2026-02-10', lastProject: 'PT. Maju Jaya', status: 'Ready' },
  { id: 'MSN-002', model: 'Genset Perkins 50kVA', hourMeter: 890, lastUsed: '2026-02-20', lastProject: 'CV. Sumber Makmur', status: 'Ready' },
  { id: 'MSN-099', model: 'Genset Cummins 100kVA', hourMeter: 2100, lastUsed: '2026-01-05', lastProject: 'Indo Karya Corp', status: 'Maintenance' },
];

export default function StockAsetManagerPage() {
  const [search, setSearch] = useState('');
  const [selectedUnit, setSelectedUnit] = useState<any>(null);
  
  // Control untuk Drawer History & Modal Perbaikan
  const [openedHistory, { open: openHistory, close: closeHistory }] = useDisclosure(false);
  const [openedRepair, { open: openRepair, close: closeRepair }] = useDisclosure(false);

  // --- LOGIC: FILTER & CALCULATION ---
  const filteredData = useMemo(() => {
    return INITIAL_STOK.filter(item => 
      item.id.toLowerCase().includes(search.toLowerCase()) || 
      item.model.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const getIdleDays = (dateStr: string) => {
    const diff = Math.floor((new Date().getTime() - new Date(dateStr).getTime()) / (1000 * 3600 * 24));
    return diff;
  };

  // --- ACTIONS ---
  const handleAction = (unit: any, type: 'history' | 'repair') => {
    setSelectedUnit(unit);
    if (type === 'history') openHistory();
    else openRepair();
  };

  return (
    <Container size="100%" p="xl" bg="white">
      <Stack gap="xl">
        
        {/* --- 1. HEADER --- */}
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

        {/* --- 2. TECHNICAL STATS --- */}
        <SimpleGrid cols={{ base: 1, sm: 3 }}>
          <StatMini label="UNIT SIAP KIRIM" val="12 Unit" icon={<IconEngine/>} color="blue" />
          <StatMini label="DALAM PERBAIKAN" val="3 Unit" icon={<IconTool/>} color="orange" />
          <StatMini label="IDLE > 30 HARI" val="1 Unit" icon={<IconAlertCircle/>} color="red" />
        </SimpleGrid>

        {/* --- 3. MAIN STOCK TABLE --- */}
        <Paper withBorder radius="md" style={{ overflow: 'hidden' }}>
          <Table verticalSpacing="md" horizontalSpacing="lg" highlightOnHover>
            <Table.Thead bg="gray.0">
              <Table.Tr>
                <Table.Th style={{ fontSize: '11px' }}>SERIAL NUMBER</Table.Th>
                <Table.Th style={{ fontSize: '11px' }}>MODEL MESIN</Table.Th>
                <Table.Th style={{ fontSize: '11px' }}>HOUR METER (HM)</Table.Th>
                <Table.Th style={{ fontSize: '11px' }}>IDLE TIME</Table.Th>
                <Table.Th style={{ fontSize: '11px' }}>LAST CLIENT</Table.Th>
                <Table.Th style={{ fontSize: '11px' }}>STATUS</Table.Th>
                <Table.Th ta="right"></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {filteredData.map((unit) => {
                const idle = getIdleDays(unit.lastUsed);
                return (
                  <Table.Tr key={unit.id}>
                    <Table.Td fw={800} c="blue.9">{unit.id}</Table.Td>
                    <Table.Td fw={700} size="sm">{unit.model}</Table.Td>
                    <Table.Td>
                      <Group gap={6}>
                        <IconClock size={14} color="gray"/>
                        <Text size="sm" fw={800}>{unit.hourMeter.toLocaleString()} <Text span fw={500} c="dimmed">hrs</Text></Text>
                      </Group>
                    </Table.Td>
                    <Table.Td>
                      <Box>
                        <Text size="sm" fw={600} c={idle > 30 ? 'red.7' : 'gray.8'}>{idle} Hari</Text>
                        <Text size="10px" c="dimmed">Sejak: {unit.lastUsed}</Text>
                      </Box>
                    </Table.Td>
                    <Table.Td>
                      <Group gap={6}><IconUser size={14} color="gray"/><Text size="xs" fw={600}>{unit.lastProject}</Text></Group>
                    </Table.Td>
                    <Table.Td>
                      <Badge variant="outline" radius="xs" color={unit.status === 'Ready' ? 'green' : 'orange'}>{unit.status}</Badge>
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

      {/* --- 4. WIDE LIFECYCLE DRAWER (70%) --- */}
      <Drawer
        opened={openedHistory} onClose={closeHistory} position="right" size="70%"
        title={<Text fw={900} size="lg">Unit Lifecycle Log: {selectedUnit?.id}</Text>}
        padding="xl"
      >
        {selectedUnit && <LifecycleContent unit={selectedUnit} />}
      </Drawer>

      {/* --- 5. MAINTENANCE MODAL --- */}
      <MaintenanceModal 
        opened={openedRepair} 
        onClose={closeRepair} 
        unitId={selectedUnit?.id} 
        hm={selectedUnit?.hourMeter} 
      />
    </Container>
  );
}

// --- SUB-COMPONENTS (Clean & Functional) ---

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
          <Text size="xs" fw={800} c="dimmed">CLIENT TERAKHIR</Text>
          <Text fw={900} size="md" tt="uppercase">{unit.lastProject}</Text>
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
            <Table.Th style={{ fontSize: '10px' }}>HM START</Table.Th>
            <Table.Th style={{ fontSize: '10px' }}>HM END</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tr>
            <Table.Td size="xs">01 Feb - 10 Feb</Table.Td>
            <Table.Td><Text size="xs" fw={700}>Sewa: {unit.lastProject}</Text></Table.Td>
            <Table.Td size="xs">1100</Table.Td>
            <Table.Td size="xs">{unit.hourMeter}</Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>

      <Box>
        <Text size="xs" fw={800} c="dimmed" mb="md">TECHNICAL TIMELINE</Text>
        <Timeline active={0} bulletSize={20}>
          <Timeline.Item bullet={<IconChecks size={12}/>} title="Service Rutin 1000 Jam">
            <Text size="xs" c="dimmed">Ganti Oli & Filter. Kondisi Prima.</Text>
          </Timeline.Item>
        </Timeline>
      </Box>
    </Stack>
  );
}

function MaintenanceModal({ opened, onClose, unitId, hm }: any) {
  const [loading, setLoading] = useState(false);
  
  const handleSave = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    notifications.show({ title: 'Log Disimpan', message: `Unit ${unitId} masuk antrean perbaikan.`, color: 'orange' });
    setLoading(false);
    onClose();
  };

  return (
    <Modal opened={opened} onClose={onClose} title={<Text fw={900}>Log Perbaikan: {unitId}</Text>} centered>
      <Stack>
        <Select label="Kategori" data={['Rutin', 'Perbaikan Berat', 'Ganti Part']} defaultValue="Rutin" />
        <NumberInput label="HM Saat Perbaikan" defaultValue={hm} />
        <TextInput label="Teknisi" placeholder="Nama mekanik" />
        <Textarea label="Keterangan Kerusakan" placeholder="Jelaskan detail tindakan..." minRows={3} />
        <Button color="orange.8" fullWidth onClick={handleSave} loading={loading}>Simpan & Update Unit</Button>
      </Stack>
    </Modal>
  );
}