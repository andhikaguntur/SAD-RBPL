'use client'

import { useState, useMemo, useRef } from 'react';
import { 
  Group, Text, Paper, Title, Stack, Button, Box, SimpleGrid, Badge, 
  TextInput, Modal, Select, Container, 
  Table, Divider} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { 
  IconSearch, IconDownload, 
  IconPrinter, 
  IconX, IconFileDescription} from '@tabler/icons-react';

// Data Mockup
const ARCHIVE_DATA = [
  { 
    id: 'PO-2026-001', date: '20 Feb 2026', client: 'PT. Maju Jaya', 
    address: 'Jl. Kaliurang KM 12, Sleman', total: 15500000, 
    status: 'Selesai', items: [
        { name: 'Sewa Genset 50kVA', qty: 1, price: 15000000 },
        { name: 'Biaya Mobilisasi', qty: 1, price: 500000 }
    ]
  },
  { 
    id: 'PO-2026-002', date: '18 Jan 2026', client: 'CV. Bangun Pagi', 
    address: 'Jl. Godean, Yogyakarta', total: 8200000, 
    status: 'Dibatalkan', items: [
        { name: 'Sewa Genset 25kVA', qty: 1, price: 8200000 }
    ]
  },
];

export default function ArsipPurchaseOrderPro() {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string | null>('Semua');
  const [selectedPO, setSelectedPO] = useState<any>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const invoiceRef = useRef<HTMLDivElement>(null);

  // Logic Search & Filter
  const filteredData = useMemo(() => {
    return ARCHIVE_DATA.filter(item => {
      const matchSearch = item.client.toLowerCase().includes(search.toLowerCase()) || item.id.toLowerCase().includes(search.toLowerCase());
      const matchStatus = filterStatus === 'Semua' || item.status === filterStatus;
      return matchSearch && matchStatus;
    });
  }, [search, filterStatus]);

  const handleOpenInvoice = (po: any) => {
    setSelectedPO(po);
    open();
  };

  // LOGIKA DOWNLOAD / PRINT (Sangat Fungsional)
  const handlePrint = () => {
    const printContent = invoiceRef.current;
    const windowUrl = 'about:blank';
    const uniqueName = new Date().getTime();
    const printWindow = window.open(windowUrl, uniqueName.toString(), 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    
    if (printWindow && printContent) {
        printWindow.document.write(`
            <html>
                <head>
                    <title>Cetak Faktur - ${selectedPO.id}</title>
                    <style>
                        body { font-family: sans-serif; padding: 40px; }
                        .invoice-box { border: 1px solid #eee; padding: 30px; }
                        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                        th, td { border-bottom: 1px solid #eee; padding: 12px; text-align: left; }
                        .total { font-weight: bold; font-size: 20px; text-align: right; }
                        .header { display: flex; justify-content: space-between; margin-bottom: 40px; }
                    </style>
                </head>
                <body>${printContent.innerHTML}</body>
            </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
    }
  };

  return (
    <Container size="100%" p="xl" bg="#fcfcfc">
      <Stack gap="xl">
        <Group justify="space-between">
          <Box>
            <Title order={2} fw={900} c="gray.8">Arsip Purchase Order</Title>
            <Text c="dimmed" size="sm">Manajemen histori transaksi dan pencetakan faktur digital.</Text>
          </Box>
        </Group>

        {/* --- SMART TOOLBAR --- */}
        <Paper withBorder p="md" radius="md" shadow="xs">
          <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
            <TextInput 
              placeholder="Cari ID PO atau Pelanggan..." 
              leftSection={<IconSearch size={18} stroke={1.5} />}
              value={search} onChange={(e) => setSearch(e.target.value)}
              variant="filled"
            />
            <Select 
              placeholder="Status Transaksi"
              data={['Semua', 'Selesai', 'Dibatalkan']} 
              value={filterStatus} onChange={setFilterStatus}
            />
            <Button variant="light" color="blue" leftSection={<IconDownload size={18}/>}>
                Eksport Laporan Bulanan
            </Button>
          </SimpleGrid>
        </Paper>

        {/* --- DATA TABLE --- */}
        <Paper withBorder radius="md" shadow="xs" style={{ overflow: 'hidden' }}>
          <Table verticalSpacing="md" horizontalSpacing="lg" highlightOnHover>
            <Table.Thead bg="gray.0">
              <Table.Tr>
                <Table.Th>ID Order</Table.Th>
                <Table.Th>Tanggal</Table.Th>
                <Table.Th>Pelanggan</Table.Th>
                <Table.Th>Total Pembayaran</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th ta="right">Aksi</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {filteredData.map((po) => (
                <Table.Tr key={po.id}>
                  <Table.Td fw={700} c="blue.7">{po.id}</Table.Td>
                  <Table.Td size="xs">{po.date}</Table.Td>
                  <Table.Td fw={600}>{po.client}</Table.Td>
                  <Table.Td fw={800}>Rp {po.total.toLocaleString('id-ID')}</Table.Td>
                  <Table.Td>
                    <Badge color={po.status === 'Selesai' ? 'green' : 'red'} variant="light" size="sm">
                      {po.status}
                    </Badge>
                  </Table.Td>
                  <Table.Td ta="right">
                    <Button 
                        size="xs" variant="subtle" 
                        leftSection={<IconFileDescription size={14}/>}
                        onClick={() => handleOpenInvoice(po)}
                    >
                        Lihat Faktur
                    </Button>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Paper>
      </Stack>

      {/* --- INVOICE PREVIEW MODAL (The "Pro" UX) --- */}
      <Modal 
        opened={opened} onClose={close} 
        size="lg" centered 
        title={<Text fw={800}>Preview Faktur Resmi</Text>}
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
        padding="xl"
      >
        {selectedPO && (
          <Stack gap="xl">
            {/* Box ini yang akan dicetak */}
            <div ref={invoiceRef}>
              <Box p="lg" style={{ border: '1px solid #e9ecef', borderRadius: '8px' }} bg="white">
                {/* Header Faktur */}
                <Group justify="space-between" mb="xl">
                  <Box>
                    <Title order={4} c="blue.8" tt="uppercase">CV. SARANA ABADI DIESEL</Title>
                    <Text size="xs" c="dimmed">Pusat Penyewaan Genset Terpercaya</Text>
                  </Box>
                  <Box ta="right">
                    <Title order={4}>FAKTUR</Title>
                    <Text size="xs" fw={700}>{selectedPO.id}</Text>
                  </Box>
                </Group>

                <Divider my="md" />

                {/* Info Pihak Terkait */}
                <SimpleGrid cols={2} mb="xl">
                  <Box>
                    <Text size="xs" fw={700} c="dimmed" mb={4}>TAGIHAN UNTUK:</Text>
                    <Text fw={700} size="sm">{selectedPO.client}</Text>
                    <Text size="xs" c="dimmed" w={150}>{selectedPO.address}</Text>
                  </Box>
                  <Box ta="right">
                    <Text size="xs" fw={700} c="dimmed" mb={4}>TANGGAL TRANSKASI:</Text>
                    <Text fw={700} size="sm">{selectedPO.date}</Text>
                  </Box>
                </SimpleGrid>

                {/* Item List */}
                <Table verticalSpacing="xs" mb="xl">
                  <Table.Thead bg="gray.0">
                    <Table.Tr>
                      <Table.Th size="xs">Deskripsi Layanan</Table.Th>
                      <Table.Th size="xs" ta="right">Jumlah</Table.Th>
                      <Table.Th size="xs" ta="right">Subtotal</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {selectedPO.items.map((item: any, idx: number) => (
                      <Table.Tr key={idx}>
                        <Table.Td><Text size="xs">{item.name}</Text></Table.Td>
                        <Table.Td ta="right"><Text size="xs">{item.qty}</Text></Table.Td>
                        <Table.Td ta="right"><Text size="xs">Rp {item.price.toLocaleString('id-ID')}</Text></Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>

                {/* Total Section */}
                <Group justify="flex-end">
                    <Box ta="right" p="sm" bg="blue.0" style={{ borderRadius: '4px', minWidth: '200px' }}>
                        <Text size="xs" fw={700} c="blue.9">TOTAL BAYAR</Text>
                        <Text fw={900} size="xl" c="blue.9">Rp {selectedPO.total.toLocaleString('id-ID')}</Text>
                    </Box>
                </Group>

                <Box mt={40}>
                    <Text size="10px" c="dimmed" ta="center">
                        Dokumen ini dihasilkan secara otomatis oleh Sistem Manajemen CV SAD dan sah tanpa tanda tangan basah.
                    </Text>
                </Box>
              </Box>
            </div>

            {/* Footer Modal Action */}
            <Group grow>
                <Button variant="default" leftSection={<IconX size={18}/>} onClick={close}>Tutup</Button>
                <Button color="blue" leftSection={<IconPrinter size={18}/>} onClick={handlePrint}>
                    Cetak & Simpan PDF
                </Button>
            </Group>
          </Stack>
        )}
      </Modal>
    </Container>
  );
}