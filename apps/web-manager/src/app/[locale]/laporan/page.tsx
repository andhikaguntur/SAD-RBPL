'use client'

import { useState, useEffect } from 'react';
import { 
  Container, Stack, Title, Text, Paper, Group, TextInput, 
  Select, Button, Table, Badge, Box, LoadingOverlay, Divider,
  ThemeIcon,
  SimpleGrid,
  Center
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { 
  IconSearch, IconFileSpreadsheet, IconFileTypePdf, 
  IconFilter, IconFileAnalytics, IconDownload, IconCheck
} from '@tabler/icons-react';

interface ReportData {
  id: string;
  pelanggan: string;
  tanggal: string;
  unit: string;
  nilai: number;
  statusBayar: string;
  sopir: string;
}

export default function LaporanManagerProduction() {
  const [isExporting, setIsExporting] = useState(false);
  const [search, setSearch] = useState('');
  const [reports, setReports] = useState<ReportData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch reports on mount
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/reports');
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        const result = await response.json();
        setReports(result.data || []);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch reports');
        setIsLoading(false);
      }
    };
    fetchReports();
  }, []);

  // Filter reports based on search
  const filteredReports = reports.filter(report => 
    report.pelanggan.toLowerCase().includes(search.toLowerCase()) || 
    report.id.toLowerCase().includes(search.toLowerCase())
  );

  // --- PRODUCTION PDF GENERATOR ---
  const handleDownloadPDF = async () => {
    setIsExporting(true);
    
    try {
      const response = await fetch('http://localhost:4000/api/reports/export-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ search, reports: filteredReports })
      });

      if (!response.ok) throw new Error(`API error: ${response.status}`);

      notifications.show({
        title: 'Ekspor Berhasil',
        message: 'Laporan PDF telah berhasil digenerate dan diunduh.',
        color: 'green',
        icon: <IconCheck size={18} />
      });
    } catch (err) {
      notifications.show({ 
        title: 'Gagal', 
        message: err instanceof Error ? err.message : 'Gagal membuat dokumen PDF', 
        color: 'red' 
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadExcel = async () => {
    setIsExporting(true);
    
    try {
      const response = await fetch('http://localhost:4000/api/reports/export-excel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ search, reports: filteredReports })
      });

      if (!response.ok) throw new Error(`API error: ${response.status}`);

      notifications.show({
        title: 'Ekspor Berhasil',
        message: 'Laporan Excel telah berhasil digenerate dan diunduh.',
        color: 'green',
        icon: <IconCheck size={18} />
      });
    } catch (err) {
      notifications.show({ 
        title: 'Gagal', 
        message: err instanceof Error ? err.message : 'Gagal membuat dokumen Excel', 
        color: 'red' 
      });
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
                onClick={handleDownloadExcel}
                loading={isExporting}
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
          <LoadingOverlay visible={isExporting || isLoading} overlayProps={{ blur: 2 }} />
          
          {error && (
            <Paper withBorder p="md" bg="red.0" style={{ borderColor: 'var(--mantine-color-red-3)' }}>
              <Text c="red.7" fw={600}>Error: {error}</Text>
            </Paper>
          )}

          {!isLoading && !error && (
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
                  {filteredReports.map((item) => (
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
                        <Text size="sm" fw={800}>Rp {(item.nilai || 0).toLocaleString('id-ID')}</Text>
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
                  {filteredReports.length === 0 && (
                    <Table.Tr>
                      <Table.Td colSpan={6} ta="center" py={40}>
                        <Text c="dimmed">Tidak ada data laporan.</Text>
                      </Table.Td>
                    </Table.Tr>
                  )}
                </Table.Tbody>
              </Table>
            </Paper>
          )}
        </Box>

        {/* --- 4. FOOTER INFO --- */}
        <Group justify="space-between" mt="md">
            <Text size="xs" c="dimmed">Menampilkan <b>{filteredReports.length}</b> entri data laporan.</Text>
            <Button variant="subtle" color="gray" size="xs" rightSection={<IconFilter size={14}/>}>
                Tampilkan Lebih Banyak
            </Button>
        </Group>
      </Stack>
    </Container>
  );
}