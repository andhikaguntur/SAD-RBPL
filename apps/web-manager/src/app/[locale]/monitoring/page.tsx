'use client'

import { useState, useMemo } from 'react';
import { 
  Container, Stack, Group, Text, Title, Paper, Badge, Box, 
  Divider, Drawer, ActionIcon, Tooltip, Avatar, 
  TextInput, CloseButton, Center, ThemeIcon, Image, 
  Button, Table, ScrollArea
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { 
  IconTruck, IconUser, IconInfoCircle, IconSearch, 
  IconHistory, IconEngine, IconMapPin, IconPhone, 
  IconCheck, IconPackageOff, IconClock, IconFileText 
} from '@tabler/icons-react';

// --- DATA STRUCTURE (API READY) ---
interface DeliveryTrack {
  id: string;
  pelanggan: string;
  sopir: string;
  kontak: string;
  plat: string;
  berangkatAt: string;
  status: 'OTW' | 'DISEWA'; // DISEWA = Sudah divalidasi Admin (Archive)
  items: string;
  lastLocation: string;
  progress: number; // 0 - 100 for GPS track
  detailItems: { sn: string; model: string }[];
}

const MOCK_DATA: DeliveryTrack[] = [
  { 
    id: 'ORD-510', pelanggan: 'Indo Karya Corp', sopir: 'Herman', kontak: '0812-3456-7890', plat: 'H 8888 AA', 
    berangkatAt: '2026-02-23T07:15:00', status: 'OTW', items: '1x Excavator',
    lastLocation: 'Tol Semarang-Solo KM 422', progress: 65,
    detailItems: [{ sn: 'EXC-992', model: 'Excavator PC200' }] 
  },
  { 
    id: 'ORD-501', pelanggan: 'PT. Maju Jaya', sopir: 'Andi Supriadi', kontak: '0857-1122-3344', plat: 'AB 1234 XY', 
    berangkatAt: '2026-02-23T08:00:00', status: 'OTW', items: '2x Genset 50kVA',
    lastLocation: 'Ringroad Utara Yogyakarta', progress: 30,
    detailItems: [{ sn: 'MSN-001', model: 'Genset 50kVA' }, { sn: 'MSN-002', model: 'Genset 50kVA' }]
  },
  { 
    id: 'ORD-499', pelanggan: 'CV. Bangun Pagi', sopir: 'Budi Santoso', kontak: '0813-9988-7766', plat: 'B 9999 SAD', 
    berangkatAt: '2026-02-22T14:00:00', status: 'DISEWA', items: '1x Genset 100kVA',
    lastLocation: 'Site Sleman (Arrived)', progress: 100,
    detailItems: [{ sn: 'MSN-099', model: 'Genset 100kVA' }]
  },
];

export default function FleetMonitoringProduction() {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedFleet, setSelectedFleet] = useState<DeliveryTrack | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // --- LOGIC: FILTER & SORT ---
  const filteredData = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return MOCK_DATA.filter(i => 
      i.sopir.toLowerCase().includes(q) || 
      i.pelanggan.toLowerCase().includes(q) || 
      i.id.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Split data: OTW (Active) dan DISEWA (Archive)
  const activeFleet = useMemo(() => 
    filteredData.filter(f => f.status === 'OTW')
      .sort((a, b) => new Date(a.berangkatAt).getTime() - new Date(b.berangkatAt).getTime())
  , [filteredData]);

  const archivedFleet = useMemo(() => 
    filteredData.filter(f => f.status === 'DISEWA')
  , [filteredData]);

  const handleOpenDetail = (fleet: DeliveryTrack) => {
    setSelectedFleet(fleet);
    open();
  };

  return (
    <Container size="100%" p="xl" bg="white" style={{ minHeight: '100vh' }}>
      <Stack gap="xl">
        
        {/* --- 1. HEADER & SEARCH --- */}
        <Group justify="space-between" align="flex-end">
          <Box>
            <Title order={2} fw={900}>Fleet Command Center</Title>
            <Text c="dimmed" size="xs" fw={700} tt="uppercase" style={{ letterSpacing: '1px' }}>
              Real-time Monitoring & Logistics Archive
            </Text>
          </Box>
          <TextInput 
            placeholder="Cari ID, Sopir, atau Tujuan..." 
            leftSection={<IconSearch size={18} stroke={1.5}/>}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
            w={400} radius="md" variant="filled"
            rightSection={searchQuery && <CloseButton onClick={() => setSearchQuery('')} />}
          />
        </Group>

        <Divider color="gray.1" />

        {/* --- 2. ACTIVE MONITORING SECTION (OTW) --- */}
        <Box>
          <Group justify="space-between" mb="md">
            <Text size="xs" fw={800} c="dimmed" tt="uppercase">📍 Dalam Perjalanan (Live)</Text>
            <Badge variant="light" color="blue" radius="sm">{activeFleet.length} Armada</Badge>
          </Group>

          <Stack gap="sm">
            {activeFleet.length > 0 ? activeFleet.map((item) => (
              <Paper key={item.id} withBorder p="md" radius="md" bg="#fcfcfc" style={{ borderLeft: '4px solid var(--mantine-color-blue-6)' }}>
                <Group justify="space-between">
                  <Group gap="xl">
                    <Box w={80}>
                      <Text size="10px" c="dimmed" fw={800}>DEPARTURE</Text>
                      <Text fw={900} size="sm">{new Date(item.berangkatAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</Text>
                    </Box>
                    <Box w={200}>
                      <Group gap="sm">
                        <Avatar color="blue" radius="md"><IconUser size={20}/></Avatar>
                        <Box>
                          <Text fw={800} size="sm">{item.sopir}</Text>
                          <Text size="10px" c="dimmed" fw={700}>{item.plat}</Text>
                        </Box>
                      </Group>
                    </Box>
                    <Box style={{ flex: 1 }}>
                      <Text size="10px" c="dimmed" fw={800}>DESTINATION</Text>
                      <Text fw={700} size="sm">{item.pelanggan}</Text>
                      <Text size="xs" c="blue.8" fw={600}>{item.items}</Text>
                    </Box>
                    <Box w={150}>
                       <Group justify="space-between" mb={4}>
                         <Text size="10px" fw={800} c="blue.7">LIVE GPS</Text>
                         <Text size="10px" c="dimmed">{item.progress}%</Text>
                       </Group>
                       <Box h={4} bg="gray.1" radius="xl"><Box h="100%" w={`${item.progress}%`} bg="blue.6" radius="xl" /></Box>
                    </Box>
                  </Group>
                  <Button variant="light" size="xs" radius="md" onClick={() => handleOpenDetail(item)} rightSection={<IconChevronRight size={14}/>}>
                    Detail Logistik
                  </Button>
                </Group>
              </Paper>
            )) : (
              <Center py={40}><Text size="sm" c="dimmed">Tidak ada armada aktif yang ditemukan.</Text></Center>
            )}
          </Stack>
        </Box>

        {/* --- 3. AUTO-ARCHIVE SECTION (DISEWA) --- */}
        <Box mt="xl">
          <Group mb="md">
            <IconHistory size={18} color="gray"/>
            <Text size="xs" fw={800} c="dimmed" tt="uppercase">📦 Archive (Sudah Divalidasi Admin)</Text>
          </Group>
          
          <Paper withBorder radius="md" style={{ overflow: 'hidden' }}>
            <Table verticalSpacing="sm" horizontalSpacing="md" highlightOnHover>
                <Table.Thead bg="gray.0">
                    <Table.Tr>
                        <Table.Th style={{ fontSize: '10px' }}>ID ORDER</Table.Th>
                        <Table.Th style={{ fontSize: '10px' }}>PELANGGAN</Table.Th>
                        <Table.Th style={{ fontSize: '10px' }}>SOPIR</Table.Th>
                        <Table.Th style={{ fontSize: '10px' }}>STATUS AKHIR</Table.Th>
                        <Table.Th ta="right" style={{ fontSize: '10px' }}>LOG</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {archivedFleet.map(item => (
                        <Table.Tr key={item.id}>
                            <Table.Td fw={800} c="dimmed" size="xs">{item.id}</Table.Td>
                            <Table.Td fw={700} size="xs">{item.pelanggan}</Table.Td>
                            <Table.Td size="xs">{item.sopir}</Table.Td>
                            <Table.Td><Badge variant="dot" color="green" size="xs">Diterima & Disewa</Badge></Table.Td>
                            <Table.Td ta="right"><ActionIcon variant="subtle" color="gray" size="sm" onClick={() => handleOpenDetail(item)}><IconInfoCircle size={16}/></ActionIcon></Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>
          </Paper>
        </Box>

      </Stack>

      {/* --- DRAWER: LOGISTICS INSPECTOR --- */}
      <Drawer
        opened={opened} onClose={close} position="right" size="md"
        title={<Text fw={900}>Logistic Inspector</Text>}
        padding="xl"
      >
        {selectedFleet && (
          <Stack gap="xl">
            {/* LIVE GPS SECTION */}
            <Paper withBorder p="md" radius="md" bg="gray.0">
               <Group justify="space-between" mb="xs">
                  <Text size="xs" fw={800} c="dimmed" tt="uppercase">Live Tracking</Text>
                  {selectedFleet.status === 'OTW' && <Badge color="green" variant="filled" size="xs" circle className="pulse-dot" />}
               </Group>
               <Group gap="xs" mb="md">
                  <IconMapPin size={18} color="blue"/>
                  <Text size="sm" fw={800}>{selectedFleet.lastLocation}</Text>
               </Group>
               <Box h={6} bg="gray.2" radius="xl" pos="relative">
                  <Box h="100%" w={`${selectedFleet.progress}%`} bg="blue.6" radius="xl" />
                  <ThemeIcon size={20} radius="xl" pos="absolute" left={`calc(${selectedFleet.progress}% - 10px)`} top={-7}>
                    <IconTruck size={12} />
                  </ThemeIcon>
               </Box>
               <Group justify="space-between" mt={5}>
                  <Text size="10px" fw={700} c="dimmed">Gudang SAD</Text>
                  <Text size="10px" fw={700} c="blue.8">{selectedFleet.status === 'DISEWA' ? 'ARRIVED' : 'ON PROGRESS'}</Text>
               </Group>
            </Paper>

            {/* CONTACT CARD */}
            <Paper withBorder p="md" radius="md">
                <Group justify="space-between">
                    <Box>
                        <Text size="xs" fw={700} c="dimmed" tt="uppercase">Personel Sopir</Text>
                        <Text fw={800} size="lg">{selectedFleet.sopir}</Text>
                        <Text size="xs" c="dimmed" fw={600}>{selectedFleet.plat}</Text>
                    </Box>
                    <Button variant="light" color="green" radius="xl" leftSection={<IconPhone size={16}/>}>
                        Hubungi
                    </Button>
                </Group>
            </Paper>

            {/* PAYLOAD DETAIL */}
            <Box>
                <Text size="xs" fw={800} c="dimmed" tt="uppercase" mb="sm">Detail Muatan Unit</Text>
                {selectedFleet.detailItems.map(u => (
                    <Paper key={u.sn} withBorder p="sm" mb="xs" bg="#fcfcfc">
                        <Group gap="sm">
                            <ThemeIcon variant="light" color="blue"><IconEngine size={16}/></ThemeIcon>
                            <Box>
                                <Text size="sm" fw={700}>{u.model}</Text>
                                <Text size="10px" c="dimmed">S/N: {u.sn}</Text>
                            </Box>
                        </Group>
                    </Paper>
                ))}
            </Box>

            {/* ATTACHMENT */}
            <Box>
                <Text size="xs" fw={800} c="dimmed" tt="uppercase" mb="sm">Dokumen Digital</Text>
                <Paper withBorder radius="md" p="md" style={{ cursor: 'pointer' }}>
                    <Group justify="space-between">
                        <Group gap="sm">
                            <IconFileText size={20} color="gray"/>
                            <Text size="sm" fw={600}>Surat Jalan_{selectedFleet.id}.pdf</Text>
                        </Group>
                        <IconCheck size={16} color="green" />
                    </Group>
                </Paper>
            </Box>

            <Button variant="subtle" color="gray" fullWidth onClick={close}>Tutup Panel</Button>
          </Stack>
        )}
      </Drawer>

      <style jsx global>{`
        .pulse-dot { animation: pulse 2s infinite; }
        @keyframes pulse {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(64, 192, 87, 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(64, 192, 87, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(64, 192, 87, 0); }
        }
      `}</style>
    </Container>
  );
}

// Icon Helper
function IconChevronRight({ size }: { size: number }) {
    return <IconArrowRight size={size} />;
}
import { IconArrowRight } from '@tabler/icons-react';