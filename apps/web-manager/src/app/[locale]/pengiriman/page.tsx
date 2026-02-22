'use client'

import { useState } from 'react';
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

// Mockup data antrean (Order yang sudah lunas)
const QUEUE_DATA = [
  { id: 'ORD-501', client: 'PT. Maju Jaya', time: '2h ago', units: ['MSN-001 (50kVA)', 'MSN-002 (50kVA)'], status: 'Priority' },
  { id: 'ORD-505', client: 'CV. Bangun Pagi', time: '5h ago', units: ['MSN-099 (100kVA)'], status: 'Normal' },
];

export default function LogisticsCommandCenterV2() {
  const [activeId, setActiveId] = useState<string | null>(QUEUE_DATA[0].id);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasPrinted, setHasPrinted] = useState(false);

  const selectedData = QUEUE_DATA.find(i => i.id === activeId);

  // FUNGSI PRINT SURAT JALAN (RF-011 Output)
  const handlePrintSuratJalan = () => {
    notifications.show({
      title: 'Menyiapkan Dokumen',
      message: 'Surat Jalan sedang dibuat oleh sistem...',
      color: 'blue',
      loading: true,
      autoClose: 2000,
    });
    
    // Simulasi membuka jendela print browser
    setTimeout(() => {
      setHasPrinted(true);
      window.print(); // Ini akan memicu print view
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

    setIsSubmitting(true);
    await new Promise(res => setTimeout(res, 1500));
    
    notifications.show({
      title: 'Unit Berhasil Diberangkatkan',
      message: `Data logistik ${activeId} telah disimpan dan status unit diperbarui.`,
      color: 'green',
      icon: <IconCheck size={18} />
    });
    
    setIsSubmitting(false);
  };

  return (
    <Box bg="white" h="calc(100vh - 80px)" style={{ display: 'flex', overflow: 'hidden' }}>
      
      {/* --- LEFT: MASTER QUEUE (No Print) --- */}
      <Box w={350} className="no-print" style={{ borderRight: '1px solid #eee', display: 'flex', flexDirection: 'column' }}>
        <Box p="md" bg="gray.0">
          <Title order={4} fw={900} mb="xs">Antrean Dispatch</Title>
          <TextInput placeholder="Cari Order..." leftSection={<IconSearch size={16}/>} variant="filled" size="xs"/>
        </Box>

        <ScrollArea flex={1}>
          {QUEUE_DATA.map((item) => (
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
          ))}
        </ScrollArea>
      </Box>

      {/* --- RIGHT: WORKSTATION --- */}
      <Box flex={1} pos="relative" bg="#fcfcfc">
        <LoadingOverlay visible={isSubmitting} />
        
        {selectedData ? (
          <ScrollArea h="100%" p="xl">
            <Container size="md">
              <Stack gap="xl">
                
                {/* HEADER (No Print) */}
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
                  {/* INPUT AREA */}
                  <Stack gap="md">
                    <Text fw={800} size="xs" tt="uppercase" c="gray.6">Data Keberangkatan (RF-011)</Text>
                    <TextInput label="Nama Sopir" placeholder="Nama Lengkap" size="md" leftSection={<IconUser size={18}/>} />
                    <TextInput label="Plat Nomor Armada" placeholder="B 1234 SAD" size="md" leftSection={<IconForms size={18}/>} />
                    <TextInput label="Jam Berangkat" type="time" size="md" defaultValue="08:00" leftSection={<IconClock size={18}/>} />
                  </Stack>

                  {/* PROOF AREA */}
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

                {/* --- OUTPUT: TOMBOL PRINT --- */}
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

                {/* --- TEMPLATE SURAT JALAN (Hanya muncul saat Print) --- */}
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
                        <Group justify="space-between" mt={100}>
                            <Box ta="center" w={150}><Divider /><Text size="xs">Gudang</Text></Box>
                            <Box ta="center" w={150}><Divider /><Text size="xs">Sopir</Text></Box>
                            <Box ta="center" w={150}><Divider /><Text size="xs">Penerima</Text></Box>
                        </Group>
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