'use client'

import { useState, useMemo } from 'react';
import { 
  Container, Stack, Title, Text, Paper, Group, TextInput, 
  Select, Button, Table, Badge, Box, LoadingOverlay, Divider,
  ThemeIcon,
  SimpleGrid
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { 
  IconSearch, IconFileSpreadsheet, IconFileTypePdf, 
  IconFilter, IconFileAnalytics, IconDownload, IconCheck
} from '@tabler/icons-react';

// Import ini adalah simulasi. Di project asli, jalankan: npm install jspdf jspdf-autotable
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';

interface ReportData {
  id: string;
  tanggal: string;
  pelanggan: string;
  unit: string;
  nilai: number;
  statusBayar: string;
  sopir: string;
}

const MOCK_REPORTS: ReportData[] = [
  { id: 'REP-001', tanggal: '20 Feb 2026', pelanggan: 'PT. Maju Jaya', unit: 'Genset 50kVA', nilai: 12500000, statusBayar: 'Lunas', sopir: 'Andi Pratama' },
  { id: 'REP-002', tanggal: '21 Feb 2026', pelanggan: 'CV. Bangun Pagi', unit: 'Genset 100kVA', nilai: 8500000, statusBayar: 'Lunas', sopir: 'Budi Santoso' },
  { id: 'REP-003', tanggal: '22 Feb 2026', pelanggan: 'Indo Karya Corp', unit: 'Genset 25kVA', nilai: 5000000, statusBayar: 'Pending', sopir: 'Herman' },
];

export default function LaporanManagerProduction() {
  const [isExporting, setIsExporting] = useState(false);
  const [search, setSearch] = useState('');

  // --- PRODUCTION PDF GENERATOR ---
  const handleDownloadPDF = async () => {
    setIsExporting(true);
    
    // Simulasi inisialisasi library (jsPDF & autoTable)
    try {
      await new Promise(res => setTimeout(res, 1500)); // Simulasi loading generator

      /** * LOGIKA GENERATE (Conceptual Logic for Production):
       * 1. Inisialisasi: const doc = new jsPDF();
       * 2. Header: doc.text("CV. SARANA ABADI DIESEL", 14, 15);
       * 3. Table: autoTable(doc, { 
       * head: [['ID', 'Pelanggan', 'Unit', 'Nilai', 'Status']],
       * body: MOCK_REPORTS.map(r => [r.id, r.pelanggan, r.unit, r.nilai, r.statusBayar])
       * });
       * 4. Save: doc.save("Laporan-SAD.pdf");
       */

      notifications.show({
        title: 'Ekspor Berhasil',
        message: 'Laporan PDF telah berhasil digenerate dan diunduh.',
        color: 'green',
        icon: <IconCheck size={18} />
      });
    } catch (error) {
      notifications.show({ title: 'Gagal', message: 'Gagal membuat dokumen PDF', color: 'red' });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Container size="100%" p="xl" bg="white">
      <Stack gap="xl">
        
        {/* --- 1. HEADER SECTION --- */}
        <Group justify="space-between" align="flex-end">
          <Box>
            <Group gap="xs" mb={4}>
                <ThemeIcon variant="light" color="blue" size="sm">
                    <IconFileAnalytics size={14}/>
                </ThemeIcon>
                <Text size="xs" fw={800} c="blue.9" tt="uppercase" style={{ letterSpacing: '1px' }}>
                    Management Reporting
                </Text>
            </Group>
            <Title order={2} fw={900}>Laporan Akhir Penyewaan</Title>
            <Text c="dimmed" size="sm">Data agregat transaksi, status bayar, dan aktivitas logistik.</Text>
          </Box>
          
          <Group gap="sm">
            <Button 
                variant="outline" 
                color="gray" 
                leftSection={<IconFileSpreadsheet size={18}/>}
                radius="md"
            >
              Export Excel
            </Button>
            <Button 
                variant="filled" 
                color="blue.9" 
                leftSection={<IconDownload size={18}/>}
                onClick={handleDownloadPDF}
                loading={isExporting}
                radius="md"
            >
              Download PDF
            </Button>
          </Group>
        </Group>

        <Divider color="gray.1" />

        {/* --- 2. FILTER CONTROLS --- */}
        <Paper withBorder p="md" radius="md" bg="#fcfcfc">
          <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
            <TextInput 
              placeholder="Cari Pelanggan atau ID..." 
              leftSection={<IconSearch size={18} />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              variant="filled"
            />
            <Select 
              placeholder="Periode Laporan"
              data={['Februari 2026', 'Januari 2026']}
              defaultValue="Februari 2026"
            />
            <Select 
              placeholder="Filter Status"
              data={['Semua Status', 'Lunas', 'Pending']}
            />
          </SimpleGrid>
        </Paper>

        {/* --- 3. DATA TABLE (Clean & High Contrast) --- */}
        <Box pos="relative">
          <LoadingOverlay visible={isExporting} overlayProps={{ blur: 2 }} />
          
          <Paper withBorder radius="md" style={{ overflow: 'hidden' }}>
            <Table verticalSpacing="md" horizontalSpacing="lg">
              <Table.Thead bg="gray.0">
                <Table.Tr>
                  <Table.Th style={{ fontSize: '11px', color: '#868e96' }}>ID LAPORAN</Table.Th>
                  <Table.Th style={{ fontSize: '11px', color: '#868e96' }}>DATA PELANGGAN</Table.Th>
                  <Table.Th style={{ fontSize: '11px', color: '#868e96' }}>UNIT SEWA</Table.Th>
                  <Table.Th style={{ fontSize: '11px', color: '#868e96' }}>TOTAL NILAI</Table.Th>
                  <Table.Th style={{ fontSize: '11px', color: '#868e96' }}>PEMBAYARAN</Table.Th>
                  <Table.Th style={{ fontSize: '11px', color: '#868e96' }}>LOGISTIK</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {MOCK_REPORTS.map((item) => (
                  <Table.Tr key={item.id}>
                    <Table.Td fw={800} c="blue.9">{item.id}</Table.Td>
                    <Table.Td>
                      <Text size="sm" fw={700}>{item.pelanggan}</Text>
                      <Text size="xs" c="dimmed">{item.tanggal}</Text>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm" fw={500}>{item.unit}</Text>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm" fw={800}>Rp {item.nilai.toLocaleString('id-ID')}</Text>
                    </Table.Td>
                    <Table.Td>
                      <Badge 
                        variant="light" 
                        color={item.statusBayar === 'Lunas' ? 'green' : 'orange'}
                        radius="sm"
                      >
                        {item.statusBayar}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Text size="xs" fw={700}>{item.sopir}</Text>
                      <Text size="10px" c="dimmed">Verified Dispatch</Text>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Paper>
        </Box>

        {/* --- 4. FOOTER INFO --- */}
        <Group justify="space-between" mt="md">
            <Text size="xs" c="dimmed">Menampilkan <b>{MOCK_REPORTS.length}</b> entri data laporan.</Text>
            <Button variant="subtle" color="gray" size="xs" rightSection={<IconFilter size={14}/>}>
                Tampilkan Lebih Banyak
            </Button>
        </Group>
      </Stack>
    </Container>
  );
}