'use client'

import { useState, useEffect, useMemo, Fragment } from 'react';
import { 
  Container, Stack, Group, Text, Title, Paper, Badge, Box, 
  Table, TextInput, Divider, ActionIcon, Menu, Drawer,
  SimpleGrid, ThemeIcon, ScrollArea, Button, Tooltip, Center
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { 
  IconSearch, IconFileText, IconDownload, IconPrinter, 
  IconFilter, IconDotsVertical, IconCheck, IconClock, 
  IconX, IconFileInvoice, IconTruck, IconHistory, IconAlertCircle 
} from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';

interface POArchive {
  id: string;
  date: string;
  client: string;
  total: number;
  status: string;
  linkedSJ: string;
  items: any[];
}

export default function PurchaseOrderArchive() {
  const [search, setSearch] = useState('');
  const [selectedPO, setSelectedPO] = useState<POArchive | null>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [poArchives, setPoArchives] = useState<POArchive[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch PO archives on mount
  useEffect(() => {
    const fetchPoArchives = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/po-archive');
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        const result = await response.json();
        
        if (result.success) {
          const mapped = result.data.map((req: any) => ({
            id: req.idPermintaan,
            date: req.tanggalFormat || 'N/A',
            client: req.pelanggan || 'Tanpa Nama',
            total: (req.mesin || []).reduce((acc: number, m: any) => acc + (m.harga - m.diskon) * m.qty, 0),
            status: req.status === 'Lunas' ? 'Lunas' : req.status === 'Divalidasi' ? 'Draft' : req.status,
            linkedSJ: req.pengiriman?.[0]?.idPengiriman || '-',
            items: req.mesin.map((m: any) => ({
              name: m.mesin?.namaMesin || 'Mesin',
              qty: m.qty,
              price: m.harga - m.diskon,
              subtotal: (m.harga - m.diskon) * m.qty
            }))
          }));
          setPoArchives(mapped);
        }
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch PO archives');
        setIsLoading(false);
      }
    };
    fetchPoArchives();
  }, []);

  // --- LOGIC: FILTER ---
  const filteredPO = useMemo(() => {
    return poArchives.filter(po => 
      po.id.toLowerCase().includes(search.toLowerCase()) || 
      po.client.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, poArchives]);

  const handleViewDetail = (po: POArchive) => {
    setSelectedPO(po);
    open();
  };

  const handleDownloadPDF = async (poId: string) => {
    try {
      const response = await fetch(`http://localhost:4000/api/po-archive/${poId}/download-pdf`, {
        method: 'POST'
      });

      if (!response.ok) throw new Error(`API error: ${response.status}`);

      notifications.show({
        title: 'Download Started',
        message: 'PO PDF download has been initiated.',
        color: 'green',
        icon: <IconCheck size={18} />
      });
    } catch (err) {
      notifications.show({
        title: 'Error',
        message: err instanceof Error ? err.message : 'Failed to download PO PDF',
        color: 'red'
      });
    }
  };

  const handlePrintInvoice = async (poId: string) => {
    try {
      const response = await fetch(`http://localhost:4000/api/po-archive/${poId}/print-invoice`, {
        method: 'POST'
      });

      if (!response.ok) throw new Error(`API error: ${response.status}`);
      
      notifications.show({
        title: 'Print Job Queued',
        message: 'Invoice print job has been queued.',
        color: 'green',
        icon: <IconCheck size={18} />
      });
    } catch (err) {
      notifications.show({
        title: 'Error',
        message: err instanceof Error ? err.message : 'Failed to queue print job',
        color: 'red'
      });
    }
  };

  const handleViewTimeline = async (poId: string) => {
    try {
      const response = await fetch(`http://localhost:4000/api/po-archive/${poId}/timeline`);
      if (!response.ok) throw new Error(`API error: ${response.status}`);
      const result = await response.json();
      
      notifications.show({
        title: 'Timeline Data',
        message: `Found ${result.data.length} timeline events for ${poId}`,
        color: 'blue'
      });
    } catch (err) {
      notifications.show({
        title: 'Error',
        message: err instanceof Error ? err.message : 'Failed to fetch timeline',
        color: 'red'
      });
    }
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

        {/* Loading and Error States */}
        {isLoading && (
          <Center py={40}>
            <Text c="dimmed">Loading PO archives...</Text>
          </Center>
        )}
        
        {error && (
          <Paper withBorder p="md" bg="red.0" style={{ borderColor: 'var(--mantine-color-red-3)' }}>
            <Text c="red.7" fw={600}>Error: {error}</Text>
          </Paper>
        )}

        {/* --- 2. SUMMARY WIDGETS --- */}
        <SimpleGrid cols={{ base: 1, sm: 4 }}>
          <SummaryCard label="TOTAL VOLUME" val={`Rp ${(poArchives.reduce((a, b) => a + b.total, 0)).toLocaleString('id-ID')}`} icon={<IconFileInvoice/>} color="blue" />
          <SummaryCard label="PAID ORDERS" val={poArchives.filter(p => p.status === 'Lunas').length.toString()} icon={<IconCheck/>} color="green" />
          <SummaryCard label="OUTSTANDING" val={poArchives.filter(p => p.status !== 'Lunas').length.toString()} icon={<IconClock/>} color="orange" />
          <SummaryCard label="CANCELLED" val="0" icon={<IconX/>} color="red" />
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
                  <Table.Td>
                    <Text size="sm" fw={600}>{po.date}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Text fw={700} size="sm">{po.client}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Text fw={800} size="sm">Rp {po.total.toLocaleString('id-ID')}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Badge 
                      variant="dot" 
                      color={po.status === 'Lunas' ? 'green' : po.status === 'Partial' ? 'orange' : po.status === 'Cancelled' ? 'red' : 'blue'}
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
                          <Menu.Item leftSection={<IconDownload size={14}/>} onClick={() => handleDownloadPDF(po.id)}>Download PDF</Menu.Item>
                          <Menu.Item leftSection={<IconPrinter size={14}/>} onClick={() => handlePrintInvoice(po.id)}>Cetak Invoice</Menu.Item>
                          <Menu.Divider />
                          <Menu.Item leftSection={<IconHistory size={14}/>} onClick={() => handleViewTimeline(po.id)}>Timeline Status</Menu.Item>
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

      <Drawer
        opened={opened} onClose={close} position="right" size="70%"
        title={<Text fw={900} size="lg">Review Purchase Order: {selectedPO?.id}</Text>}
        padding="xl"
      >
        {selectedPO && (
          <Stack gap="xl">
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

            <Table withTableBorder verticalSpacing="sm">
              <Table.Thead bg="gray.0">
                <Table.Tr>
                  <Table.Th style={{ fontSize: '10px' }}>UNIT</Table.Th>
                  <Table.Th style={{ fontSize: '10px' }}>UNIT TOTAL</Table.Th>
                  <Table.Th style={{ fontSize: '10px' }}>HARGA SATUAN</Table.Th>
                  <Table.Th style={{ fontSize: '10px' }}>SUBTOTAL</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {selectedPO.items.map((item: any, idx: number) => (
                  <Table.Tr key={idx}>
                    <Table.Td>
                      <Text size="xs" fw={700}>{item.name}</Text>
                    </Table.Td>
                    <Table.Td>
                      <Text size="xs">{item.qty} Unit</Text>
                    </Table.Td>
                    <Table.Td>
                      <Text size="xs">Rp {item.price.toLocaleString('id-ID')}</Text>
                    </Table.Td>
                    <Table.Td>
                      <Text size="xs" fw={800}>Rp {item.subtotal.toLocaleString('id-ID')}</Text>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>

            <Divider label="Payment Tracking" labelPosition="center" />
            
            <Box>
              <Group mb="md">
                <IconHistory size={18} color="gray"/>
                <Text size="xs" fw={800} c="dimmed" tt="uppercase">Riwayat Pembayaran & Validasi</Text>
              </Group>
              <Stack gap="xs">
                <Paper withBorder p="sm" radius="xs" bg={selectedPO.status === 'Lunas' ? 'green.0' : 'gray.0'}>
                  <Group justify="space-between">
                    <Box>
                      <Text size="xs" fw={800}>Status Pembayaran: {selectedPO.status}</Text>
                      <Text size="10px" c="dimmed">Validated by System</Text>
                    </Box>
                    <Text fw={800} size="sm">Rp {selectedPO.total.toLocaleString('id-ID')}</Text>
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