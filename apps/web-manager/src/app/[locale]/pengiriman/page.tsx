'use client'

import { useState, useEffect } from 'react';
import { 
  Group, Text, Title, Paper, Stack, Box, Badge, Button, 
  TextInput, Divider, ScrollArea, ThemeIcon, FileInput,
  SimpleGrid, LoadingOverlay, UnstyledButton, rem,
  Center, Container, ActionIcon,
  Table
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { 
  IconTruck, IconPackage, IconUser, IconCamera, 
  IconCheck, IconSearch, IconForms, IconEngine,
  IconPrinter, IconClock, IconAlertCircle
} from '@tabler/icons-react';

interface DispatchQueue {
  id: string;
  client: string;
  time: string;
  status: string;
  units: string[];
}

interface DispatchData {
  id: string;
  client: string;
  units: string[];
  sopir: string;
  plat: string;
  jamBerangkat: string;
  buktiFoto: string;
}

export default function LogisticsCommandCenterV2() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasPrinted, setHasPrinted] = useState(false);
  const [queueData, setQueueData] = useState<DispatchQueue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form state for dispatch data
  const [dispatchForm, setDispatchForm] = useState({
    sopir: '',
    plat: '',
    jamBerangkat: '08:00',
    buktiFoto: ''
  });

  // Fetch dispatch queue on mount
  useEffect(() => {
    const fetchDispatchQueue = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/dispatch-queue');
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        const result = await response.json();
        
        if (result.success) {
          const mapped = result.data.map((req: any) => ({
            id: req.idPermintaan,
            client: req.pelanggan || 'Tanpa Nama',
            time: req.tanggalFormat || 'Today',
            status: 'Ready',
            units: req.mesin.map((m: any) => `${m.mesin?.namaMesin || 'Mesin'} (${m.idMesin})`)
          }));
          setQueueData(mapped);
          if (mapped.length > 0) {
            setActiveId(mapped[0].id);
          }
        }
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch dispatch queue');
        setIsLoading(false);
      }
    };
    fetchDispatchQueue();
  }, []);

  const selectedData = queueData.find(i => i.id === activeId);

  // FUNGSI PRINT SURAT JALAN (RF-011 Output)
  const handlePrintSuratJalan = async () => {
    notifications.show({
      title: 'Menyiapkan Dokumen',
      message: 'Surat Jalan sedang dibuat oleh sistem...',
      color: 'blue',
      loading: true,
      autoClose: 2000,
    });
    
    // Simulate API call for document generation
    setTimeout(() => {
      setHasPrinted(true);
      window.print(); // This will trigger print view
    }, 2000);
  };

  const handleConfirmShipment = async () => {
    if (!hasPrinted) {
      notifications.show({
        title: 'Dokumen Diperlukan',
        message: 'Harap cetak Surat Jalan terlebih dahulu sebelum konfirmasi keberangkatan.',
        color: 'red',
        icon: <IconAlertCircle size={18} />
      });
      return;
    }

    if (!selectedData) return;

    setIsSubmitting(true);
    try {
      const dispatchData: DispatchData = {
        id: selectedData.id,
        client: selectedData.client,
        units: selectedData.units,
        sopir: dispatchForm.sopir,
        plat: dispatchForm.plat,
        jamBerangkat: dispatchForm.jamBerangkat,
        buktiFoto: dispatchForm.buktiFoto
      };

      // TO DO : Fix the API create / update -- It should be create tho..
      const response = await fetch(`http://localhost:4000/api/pengiriman`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idPermintaan: selectedData.id,
          sopir: dispatchForm.sopir,
          platNomor: dispatchForm.plat,
          jamBerangkat: dispatchForm.jamBerangkat,
          status: 'Dikirim'
        })
      });

      if (!response.ok) throw new Error(`API error: ${response.status}`);
      
      notifications.show({
        title: 'Unit Berhasil Diberangkatkan',
        message: `Data logistik ${selectedData.id} telah disimpan dan status unit diperbarui.`,
        color: 'green',
        icon: <IconCheck size={18} />
      });
      
      setQueueData(prev => prev.filter(item => item.id !== selectedData.id));
      setActiveId(null);
      setHasPrinted(false);
      
    } catch (err) {
      notifications.show({
        title: 'Error',
        message: err instanceof Error ? err.message : 'Failed to confirm shipment',
        color: 'red'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box bg="white" h="calc(100vh - 80px)" style={{ display: 'flex', overflow: 'hidden' }}>
      <Box w={350} className="no-print" style={{ borderRight: '1px solid #eee', display: 'flex', flexDirection: 'column' }}>
        <Box p="md" bg="gray.0">
          <Title order={4} fw={900} mb="xs">Antrean Dispatch</Title>
          <TextInput placeholder="Cari Order..." leftSection={<IconSearch size={16}/>} variant="filled" size="xs"/>
        </Box>

        <ScrollArea flex={1}>
          {isLoading ? (
            <Center py={40}><Text c="dimmed">Loading dispatch queue...</Text></Center>
          ) : error ? (
            <Center py={40}><Text c="red.7">Error: {error}</Text></Center>
          ) : queueData.length > 0 ? queueData.map((item) => (
            <UnstyledButton
              key={item.id}
              onClick={() => { setActiveId(item.id); setHasPrinted(false); }}
              style={{
                width: '100%', padding: '16px',
                borderBottom: '1px solid #f1f3f5',
                backgroundColor: activeId === item.id ? '#e7f5ff' : 'transparent'
              }}
            >
              <Group justify="space-between" mb={4}>
                <Text size="xs" fw={800} c={activeId === item.id ? 'blue.9' : 'gray.6'}>{item.id}</Text>
                <Badge size="xs" color={item.status === 'Priority' ? 'red' : 'blue'}>{item.time}</Badge>
              </Group>
              <Text size="sm" fw={700}>{item.client}</Text>
              <Text size="xs" c="dimmed">{item.units.length} Unit</Text>
            </UnstyledButton>
          )) : (
            <Center py={40}><Text c="dimmed">No dispatch items in queue</Text></Center>
          )}
        </ScrollArea>
      </Box>

      <Box flex={1} pos="relative" bg="#fcfcfc">
        <LoadingOverlay visible={isSubmitting} />
        
        {selectedData ? (
          <ScrollArea h="100%" p="xl">
            <Container size="md">
              <Stack gap="xl">
                <Group justify="space-between" className="no-print">
                  <Box>
                    <Badge color="blue" radius="xs" mb="xs">Ready to Dispatch</Badge>
                    <Title order={2} fw={900}>{selectedData.client}</Title>
                    <Text c="dimmed" size="sm">Lengkapi data untuk generate Surat Jalan otomatis.</Text>
                  </Box>
                  <ThemeIcon size={54} radius="md" variant="light" color="blue"><IconTruck size={32}/></ThemeIcon>
                </Group>

                <Divider variant="dashed" className="no-print" />

                <SimpleGrid cols={2} spacing="xl" className="no-print">
                  <Stack gap="md">
                    <Text fw={800} size="xs" tt="uppercase" c="gray.6">Data Keberangkatan (RF-011)</Text>
                    <TextInput 
                      label="Nama Sopir" 
                      placeholder="Nama Lengkap" 
                      size="md" 
                      leftSection={<IconUser size={18}/>}
                      value={dispatchForm.sopir}
                      onChange={(e) => setDispatchForm(prev => ({ ...prev, sopir: e.target.value }))}
                    />
                    <TextInput 
                      label="Plat Nomor Armada" 
                      placeholder="B 1234 SAD" 
                      size="md" 
                      leftSection={<IconForms size={18}/>}
                      value={dispatchForm.plat}
                      onChange={(e) => setDispatchForm(prev => ({ ...prev, plat: e.target.value }))}
                    />
                    <TextInput 
                      label="Jam Berangkat" 
                      type="time" 
                      size="md" 
                      leftSection={<IconClock size={18}/>}
                      value={dispatchForm.jamBerangkat}
                      onChange={(e) => setDispatchForm(prev => ({ ...prev, jamBerangkat: e.target.value }))}
                    />
                  </Stack>

                  <Stack gap="md">
                    <Text fw={800} size="xs" tt="uppercase" c="gray.6">Bukti Foto Muatan</Text>
                    <FileInput label="Foto Kondisi Unit di Truk" placeholder="Klik untuk memotret" size="md" leftSection={<IconCamera size={18}/>} capture="environment" />
                    <Paper withBorder p="md" bg="blue.0" style={{ borderStyle: 'dashed' }}>
                        <Text size="xs" fw={700} mb="xs">Daftar Unit dalam Surat Jalan:</Text>
                        {selectedData.units.map(u => (
                            <Text key={u} size="xs" fw={600}>• {u}</Text>
                        ))}
                    </Paper>
                  </Stack>
                </SimpleGrid>

                <Paper withBorder p="lg" radius="md" mt="xl" className="no-print">
                   <Group justify="space-between">
                      <Box>
                         <Text fw={800}>Cetak Dokumen Resmi</Text>
                         <Text size="xs" c="dimmed">Pastikan printer terhubung untuk mencetak Surat Jalan (SJ).</Text>
                      </Box>
                      <Button 
                        leftSection={<IconPrinter size={18}/>} 
                        color="indigo" 
                        variant={hasPrinted ? 'outline' : 'filled'}
                        onClick={handlePrintSuratJalan}
                      >
                        {hasPrinted ? 'Cetak Ulang Surat Jalan' : 'Print Surat Jalan'}
                      </Button>
                   </Group>
                </Paper>

                <Group justify="flex-end" mt="xl" className="no-print">
                  <Button variant="subtle" color="gray">Batal</Button>
                  <Button 
                    size="lg" color="blue.9" px={50}
                    disabled={!hasPrinted}
                    onClick={handleConfirmShipment}
                    leftSection={<IconCheck size={20}/>}
                  >
                    Konfirmasi Keberangkatan
                  </Button>
                </Group>

                <div className="print-only" style={{ display: 'none' }}>
                    <Box p={40} style={{ border: '2px solid black' }}>
                        <Group justify="space-between" mb="xl">
                            <Title order={3}>SURAT JALAN - CV SUMBER ANUGERAH DIESEL</Title>
                            <Text fw={800}>{selectedData.id}</Text>
                        </Group>
                        <Divider my="md" color="black" />
                        <SimpleGrid cols={2} mb="xl">
                            <Box>
                                <Text size="xs">Tujuan:</Text>
                                <Text fw={700}>{selectedData.client}</Text>
                            </Box>
                            <Box>
                                <Text size="xs">Tanggal Berangkat:</Text>
                                <Text fw={700}>{new Date().toLocaleDateString('id-ID')}</Text>
                            </Box>
                        </SimpleGrid>
                        <Table withTableBorder withColumnBorders mb={50}>
                            <Table.Thead>
                                <Table.Tr><Table.Th>No</Table.Th><Table.Th>Deskripsi Unit</Table.Th></Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {selectedData.units.map((u, i) => (
                                    <Table.Tr key={u}><Table.Td>{i+1}</Table.Td><Table.Td>{u}</Table.Td></Table.Tr>
                                ))}
                            </Table.Tbody>
                        </Table>
                    </Box>
                </div>
              </Stack>
            </Container>
          </ScrollArea>
        ) : (
          <Center h="100%"><Text c="dimmed">Pilih antrean dispatch...</Text></Center>
        )}
      </Box>

      <style jsx global>{`
        @media print {
          .no-print { display: none !important; }
          .print-only { display: block !important; position: absolute; top: 0; left: 0; width: 100%; }
          body { background: white; }
        }
      `}</style>
    </Box>
  );
}