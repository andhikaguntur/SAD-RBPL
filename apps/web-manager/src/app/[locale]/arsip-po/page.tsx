'use client'

import { useState, useMemo } from 'react';
import { 
  Container, Stack, Group, Text, Title, Paper, Badge, Box, 
  Table, TextInput, Divider, ActionIcon, Menu, Drawer,
  SimpleGrid, ThemeIcon, ScrollArea, Button, Tooltip
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { 
  IconSearch, IconFileText, IconDownload, IconPrinter, 
  IconFilter, IconDotsVertical, IconCheck, IconClock, 
  IconX, IconFileInvoice, IconTruck, IconHistory
} from '@tabler/icons-react';

// --- MOCK DATA PO ---
const PO_ARCHIVE = [
  { id: 'PO-2026-001', date: '10 Feb 2026', client: 'PT. Maju Jaya', total: 12500000, status: 'Paid', linkedSJ: 'SJ-501' },
  { id: 'PO-2026-005', date: '12 Feb 2026', client: 'CV. Bangun Pagi', total: 8000000, status: 'Partial', linkedSJ: 'SJ-505' },
  { id: 'PO-2026-010', date: '15 Feb 2026', client: 'Indo Karya Corp', total: 15000000, status: 'Pending', linkedSJ: '-' },
  { id: 'PO-2026-012', date: '20 Feb 2026', client: 'Sinar Baru TBK', total: 25000000, status: 'Cancelled', linkedSJ: '-' },
];

export default function PurchaseOrderArchive() {
  const [search, setSearch] = useState('');
  const [selectedPO, setSelectedPO] = useState<any>(null);
  const [opened, { open, close }] = useDisclosure(false);

  // --- LOGIC: FILTER ---
  const filteredPO = useMemo(() => {
    return PO_ARCHIVE.filter(po => 
      po.id.toLowerCase().includes(search.toLowerCase()) || 
      po.client.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const handleViewDetail = (po: any) => {
    setSelectedPO(po);
    open();
  };

  return (
    <Container size="100%" p="xl" bg="white">
      <Stack gap="xl">
        
        {/* --- 1. HEADER --- */}
        <Group justify="space-between" align="flex-end">
          <Box>
            <Title order={2} fw={900}>Purchase Order Archive</Title>
            <Text c="dimmed" size="xs" fw={700} tt="uppercase">Dokumentasi Transaksi & Riwayat Penagihan</Text>
          </Box>
          <Group gap="xs">
            <TextInput 
              placeholder="Cari No. PO atau Client..." 
              leftSection={<IconSearch size={16}/>} 
              w={350} radius="md" variant="filled"
              value={search} onChange={(e) => setSearch(e.target.value)}
            />
            <ActionIcon variant="outline" color="gray" size="lg" radius="md">
              <IconFilter size={18} />
            </ActionIcon>
          </Group>
        </Group>

        <Divider color="gray.1" />

        {/* --- 2. SUMMARY WIDGETS --- */}
        <SimpleGrid cols={{ base: 1, sm: 4 }}>
          <SummaryCard label="TOTAL VOLUME (FEB)" val="Rp 60.5M" icon={<IconFileInvoice/>} color="blue" />
          <SummaryCard label="PAID ORDERS" val="12" icon={<IconCheck/>} color="green" />
          <SummaryCard label="OUTSTANDING" val="5" icon={<IconClock/>} color="orange" />
          <SummaryCard label="CANCELLED" val="1" icon={<IconX/>} color="red" />
        </SimpleGrid>

        {/* --- 3. ARCHIVE TABLE --- */}
        <Paper withBorder radius="md" style={{ overflow: 'hidden' }}>
          <Table verticalSpacing="md" horizontalSpacing="lg" highlightOnHover>
            <Table.Thead bg="gray.0">
              <Table.Tr>
                <Table.Th style={{ fontSize: '11px' }}>NO. PURCHASE ORDER</Table.Th>
                <Table.Th style={{ fontSize: '11px' }}>TANGGAL</Table.Th>
                <Table.Th style={{ fontSize: '11px' }}>NAMA PELANGGAN</Table.Th>
                <Table.Th style={{ fontSize: '11px' }}>NILAI TRANSAKSI</Table.Th>
                <Table.Th style={{ fontSize: '11px' }}>STATUS</Table.Th>
                <Table.Th style={{ fontSize: '11px' }}>REF. SJ</Table.Th>
                <Table.Th ta="right"></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {filteredPO.map((po) => (
                <Table.Tr key={po.id}>
                  <Table.Td fw={800} c="blue.9">{po.id}</Table.Td>
                  <Table.Td size="sm" fw={600}>{po.date}</Table.Td>
                  <Table.Td fw={700} size="sm">{po.client}</Table.Td>
                  <Table.Td fw={800} size="sm">Rp {po.total.toLocaleString('id-ID')}</Table.Td>
                  <Table.Td>
                    <Badge 
                      variant="dot" 
                      color={po.status === 'Paid' ? 'green' : po.status === 'Partial' ? 'orange' : po.status === 'Cancelled' ? 'red' : 'blue'}
                      radius="xs"
                    >
                      {po.status}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Text size="xs" fw={700} c={po.linkedSJ !== '-' ? 'blue.7' : 'dimmed'}>
                      {po.linkedSJ}
                    </Text>
                  </Table.Td>
                  <Table.Td ta="right">
                    <Group gap="xs" justify="flex-end">
                      <Tooltip label="Lihat Detail">
                        <ActionIcon variant="subtle" color="blue" onClick={() => handleViewDetail(po)}>
                          <IconFileText size={18} />
                        </ActionIcon>
                      </Tooltip>
                      <Menu position="bottom-end">
                        <Menu.Target>
                          <ActionIcon variant="subtle" color="gray"><IconDotsVertical size={16}/></ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                          <Menu.Item leftSection={<IconDownload size={14}/>}>Download PDF</Menu.Item>
                          <Menu.Item leftSection={<IconPrinter size={14}/>}>Cetak Invoice</Menu.Item>
                          <Menu.Divider />
                          <Menu.Item leftSection={<IconHistory size={14}/>}>Timeline Status</Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Paper>
      </Stack>

      {/* --- 4. DETAIL DRAWER (70% - Wide View) --- */}
      <Drawer
        opened={opened} onClose={close} position="right" size="70%"
        title={<Text fw={900} size="lg">Review Purchase Order: {selectedPO?.id}</Text>}
        padding="xl"
      >
        {selectedPO && (
          <Stack gap="xl">
            {/* Quick Header Data */}
            <SimpleGrid cols={3}>
              <Paper withBorder p="md" radius="sm" bg="gray.0">
                <Text size="xs" fw={800} c="dimmed">TOTAL TAGIHAN</Text>
                <Text fw={900} size="xl">Rp {selectedPO.total.toLocaleString('id-ID')}</Text>
              </Paper>
              <Paper withBorder p="md" radius="sm" bg="gray.0">
                <Text size="xs" fw={800} c="dimmed">TANGGAL PO</Text>
                <Text fw={700} size="lg">{selectedPO.date}</Text>
              </Paper>
              <Paper withBorder p="md" radius="sm" bg="blue.0">
                <Text size="xs" fw={800} c="blue.9">LINKED LOGISTICS</Text>
                <Group gap={4} mt={4}>
                  <IconTruck size={16} color="var(--mantine-color-blue-7)"/>
                  <Text fw={800} size="md" c="blue.9">{selectedPO.linkedSJ}</Text>
                </Group>
              </Paper>
            </SimpleGrid>

            <Divider label="Item Breakdown" labelPosition="center" />

            {/* Item List */}
            <Table withTableBorder verticalSpacing="sm">
              <Table.Thead bg="gray.0">
                <Table.Tr>
                  <Table.Th style={{ fontSize: '10px' }}>UNIT</Table.Th>
                  <Table.Th style={{ fontSize: '10px' }}>DURASI</Table.Th>
                  <Table.Th style={{ fontSize: '10px' }}>HARGA SATUAN</Table.Th>
                  <Table.Th style={{ fontSize: '10px' }}>SUBTOTAL</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                <Table.Tr>
                  <Table.Td size="xs" fw={700}>Genset Perkins 50kVA (MSN-001)</Table.Td>
                  <Table.Td size="xs">1 Bulan</Table.Td>
                  <Table.Td size="xs">Rp 12.500.000</Table.Td>
                  <Table.Td size="xs" fw={800}>Rp 12.500.000</Table.Td>
                </Table.Tr>
              </Table.Tbody>
            </Table>

            <Divider label="Payment Tracking" labelPosition="center" />
            
            {/* Audit Trail Payments */}
            <Box>
              <Group mb="md">
                <IconHistory size={18} color="gray"/>
                <Text size="xs" fw={800} c="dimmed" tt="uppercase">Riwayat Pembayaran & Validasi</Text>
              </Group>
              <Stack gap="xs">
                <Paper withBorder p="sm" radius="xs" bg="green.0">
                  <Group justify="space-between">
                    <Box>
                      <Text size="xs" fw={800}>DP 50% - Diterima</Text>
                      <Text size="10px" c="dimmed">Validated by Admin (Nurul) • 11 Feb 2026</Text>
                    </Box>
                    <Text fw={800} size="sm">Rp 6.250.000</Text>
                  </Group>
                </Paper>
              </Stack>
            </Box>

            <Button fullWidth variant="filled" color="blue.9" leftSection={<IconDownload size={18}/>}>
              Unduh Salinan Dokumen PO
            </Button>
          </Stack>
        )}
      </Drawer>
    </Container>
  );
}

// --- SUB-COMPONENT ---
function SummaryCard({ label, val, icon, color }: any) {
  return (
    <Paper withBorder p="md" radius="sm" bg="white">
      <Text size="xs" c="dimmed" fw={800} mb={4}>{label}</Text>
      <Group justify="space-between" align="flex-end">
        <Title order={3}>{val}</Title>
        <ThemeIcon variant="light" color={color} size="lg">{icon}</ThemeIcon>
      </Group>
    </Paper>
  );
}