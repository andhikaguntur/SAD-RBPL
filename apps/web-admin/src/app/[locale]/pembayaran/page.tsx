'use client'

import { useState, useMemo, useEffect } from 'react';
import { 
  Table, Badge, Group, Text, Paper, Title, Stack, 
  Button, Box, Image, TextInput, Drawer, SimpleGrid, 
  ScrollArea, Divider, Card, Modal, Center, Alert, LoadingOverlay
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { 
  IconSearch, IconEye, 
  IconAlertCircle, IconReceipt2, IconDownload, 
  IconAlertTriangle, IconCheck, IconX 
} from '@tabler/icons-react';

interface PaymentData {
  id: string;
  pelanggan: string;
  total: number;
  tanggal: string;
  status: 'Menunggu Validasi' | 'Lunas' | 'Ditolak' | string;
  bukti: string;
}

export default function ValidasiPembayaranUX() {
  const [opened, { open, close }] = useDisclosure(false);
  const [confirmOpened, { open: openConfirm, close: closeConfirm }] = useDisclosure(false);
  
  const [selectedPayment, setSelectedPayment] = useState<PaymentData | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectInput, setShowRejectInput] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [pendingAction, setPendingAction] = useState<'Lunas' | 'Ditolak' | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [payments, setPayments] = useState<PaymentData[]>([]);

  const fetchPayments = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:4000/api/pembayaran');
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const json = await res.json();
      if (json.success) {
        setPayments(json.data.map((p: any) => ({
          id: p.id,
          pelanggan: p.permintaan?.pelanggan || 'User',
          total: p.total,
          tanggal: p.tanggal,
          status: p.status,
          bukti: p.bukti
        })));
      }
    } catch (err: any) {
      setError(err.message || 'Gagal memuat data pembayaran');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const resetState = () => {
    setSelectedPayment(null);
    setRejectionReason('');
    setShowRejectInput(false);
    setPendingAction(null);
  };

  const handleCloseAll = () => {
    closeConfirm();
    close();
    resetState();
  };

  const filteredPayments = useMemo(() => {
    return [...payments]
      .filter(p => 
        p.pelanggan.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.id.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        if (a.status === 'Menunggu Validasi' && b.status !== 'Menunggu Validasi') return -1;
        if (a.status !== 'Menunggu Validasi' && b.status === 'Menunggu Validasi') return 1;
        return 0;
      });
  }, [payments, searchQuery]);

  const handleReview = (payment: PaymentData) => {
    setSelectedPayment(payment);
    setShowRejectInput(false);
    setRejectionReason('');
    open();
  };

  const triggerConfirm = (status: 'Lunas' | 'Ditolak') => {
    if (!selectedPayment) return;

    if (status === 'Ditolak' && !rejectionReason.trim()) {
      notifications.show({
        title: 'Alasan wajib diisi',
        message: 'Masukkan alasan penolakan sebelum melanjutkan.',
        color: 'red',
        icon: <IconX size={18} />,
      });
      return;
    }

    setPendingAction(status);
    openConfirm();
  };

  const processStatus = async () => {
    if (!selectedPayment || !pendingAction) return;

    setIsProcessing(true);
    try {
      const res = await fetch(`http://localhost:4000/api/pembayaran/${selectedPayment.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          status: pendingAction,
          reason: rejectionReason 
        })
      });

      const json = await res.json();

      if (json.success) {
        notifications.show({
          title: 'Status berhasil diperbarui',
          message: `Invoice ${selectedPayment.id} diubah menjadi ${pendingAction}.`,
          color: pendingAction === 'Lunas' ? 'blue' : 'red',
          icon: <IconCheck size={18} />,
        });
        await fetchPayments();
        handleCloseAll();
      } else {
        throw new Error(json.message);
      }
    } catch (error: any) {
      notifications.show({
        title: 'Terjadi kesalahan',
        message: error.message || 'Gagal memperbarui status pembayaran.',
        color: 'red',
        icon: <IconX size={18} />,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Box p="xl">
      <Stack gap="xl">
        {error && (
          <Alert icon={<IconAlertCircle size={18}/>} title="Error" color="red">
            {error}
          </Alert>
        )}

        <Box>
          <Title order={2} fw={800} c="blue.9">Verifikasi Pembayaran</Title>
          <Text c="dimmed" size="sm">Validasi bukti transfer untuk aktivasi siklus penyewaan.</Text>
        </Box>

        <Paper withBorder radius="md" shadow="xs" style={{ overflow: 'hidden' }}>
          <Box p="md" bg="gray.0">
            <TextInput 
              placeholder="Cari ID Invoice atau Nama Pelanggan..." 
              leftSection={<IconSearch size={18} stroke={1.5} />} 
              variant="filled"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.currentTarget.value)}
            />
          </Box>
          
          <Box style={{ overflowX: 'auto', position: 'relative' }}>
            <LoadingOverlay visible={isLoading} />
            <Table verticalSpacing="md" highlightOnHover stickyHeader>
              <Table.Thead bg="gray.0">
                <Table.Tr>
                  <Table.Th>ID Invoice</Table.Th>
                  <Table.Th>Pelanggan</Table.Th>
                  <Table.Th>Total Tagihan</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th ta="right">Aksi</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {filteredPayments.map((p) => {
                  const isPending = p.status === 'Menunggu Validasi' || p.status === 'Menunggu';
                  return (
                    <Table.Tr key={p.id} style={{ opacity: isPending ? 1 : 0.6 }}>
                      <Table.Td fw={700}>{p.id}</Table.Td>
                      <Table.Td fw={500}>{p.pelanggan}</Table.Td>
                      <Table.Td fw={700}>Rp {p.total.toLocaleString('id-ID')}</Table.Td>
                      <Table.Td>
                        <Badge 
                          variant={isPending ? 'filled' : 'light'} 
                          color={p.status === 'Lunas' ? 'green' : p.status === 'Ditolak' ? 'red' : 'orange'}
                        >
                          {p.status}
                        </Badge>
                      </Table.Td>
                      <Table.Td ta="right">
                        <Button 
                          variant="light" 
                          size="xs" 
                          color={isPending ? 'blue' : 'gray'} 
                          leftSection={<IconEye size={14} />} 
                          onClick={() => handleReview(p)}
                        >
                          {isPending ? 'Validasi' : 'Detail'}
                        </Button>
                      </Table.Td>
                    </Table.Tr>
                  );
                })}
              </Table.Tbody>
            </Table>
          </Box>
        </Paper>

        <Drawer
          opened={opened}
          onClose={handleCloseAll}
          position="right"
          size="85%"
          title={<Text fw={800} size="lg">Panel Verifikasi Pembayaran</Text>}
          padding={0}
          overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
        >
          {selectedPayment && (
            <Box style={{ height: 'calc(100vh - 60px)', display: 'flex', flexDirection: 'column' }}>
              <SimpleGrid cols={{ base: 1, md: 2 }} spacing={0} style={{ flex: 1, minHeight: 0 }}>
                
                <Stack gap={0} bg="gray.1" style={{ height: '100%', overflow: 'hidden' }}>
                  <Box p="md" bg="white" style={{ borderBottom: '1px solid var(--mantine-color-gray-3)' }}>
                    <Group justify="space-between">
                      <Text fw={700} size="sm">File Bukti Transfer</Text>
                      <Button 
                        variant="light" 
                        size="xs" 
                        leftSection={<IconDownload size={14} />}
                        onClick={() => window.open(selectedPayment.bukti, '_blank')}
                      >
                        Buka Resolusi Penuh
                      </Button>
                    </Group>
                  </Box>
                  <Center style={{ flex: 1, padding: '24px', overflow: 'hidden' }}>
                    <Card withBorder radius="md" shadow="sm" p="xs" style={{ height: '100%', width: '100%', display: 'flex' }}>
                       <Image 
                          src={selectedPayment.bukti} 
                          alt="Bukti" 
                          fit="contain" 
                          h="100%" 
                          w="100%"
                          fallbackSrc="https://placehold.co/400x600?text=Gambar+Tidak+Tersedia"
                        />
                    </Card>
                  </Center>
                </Stack>

                <Stack gap={0} bg="white" style={{ height: '100%', borderLeft: '1px solid var(--mantine-color-gray-3)' }}>
                  <ScrollArea style={{ flex: 1 }} p="xl">
                    <Text fw={700} size="xs" c="dimmed" tt="uppercase" mb="lg">Informasi Tagihan</Text>
                    
                    <Paper withBorder p="xl" radius="md" bg="blue.0" mb="xl">
                      <Stack gap="md">
                        <Group justify="space-between">
                          <Box>
                            <Text size="xs" c="dimmed" fw={700}>PELANGGAN</Text>
                            <Text fw={800} size="lg" c="blue.9">{selectedPayment.pelanggan}</Text>
                          </Box>
                          <IconReceipt2 size={40} color="var(--mantine-color-blue-6)" stroke={1.5} />
                        </Group>
                        
                        <Divider variant="dashed" />
                        
                        <SimpleGrid cols={2}>
                          <Box>
                            <Text size="xs" c="dimmed" fw={700}>ID INVOICE</Text>
                            <Text fw={600}>{selectedPayment.id}</Text>
                          </Box>
                          <Box>
                            <Text size="xs" c="dimmed" fw={700}>TANGGAL INPUT</Text>
                            <Text fw={600}>{selectedPayment.tanggal}</Text>
                          </Box>
                        </SimpleGrid>

                        <Box>
                          <Text size="xs" c="dimmed" fw={700}>TOTAL NOMINAL</Text>
                          <Text fw={900} size="32px" c="blue.9">
                            Rp {selectedPayment.total.toLocaleString('id-ID')}
                          </Text>
                        </Box>
                      </Stack>
                    </Paper>

                    {showRejectInput && (
                      <TextInput 
                        label="Alasan Penolakan"
                        placeholder="Contoh: Bukti buram atau nominal salah"
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.currentTarget.value)}
                        error={!rejectionReason && "Wajib diisi"}
                        size="md"
                        autoFocus
                      />
                    )}
                  </ScrollArea>

                  <Box p="xl" bg="gray.0" style={{ borderTop: '1px solid var(--mantine-color-gray-2)' }}>
                    <Stack gap="md">
                      {(selectedPayment.status === 'Menunggu Validasi' || selectedPayment.status === 'Menunggu') ? (
                        <Group grow gap="md">
                          {!showRejectInput ? (
                            <>
                              <Button variant="outline" color="red" size="lg" onClick={() => setShowRejectInput(true)}>Tolak</Button>
                              <Button color="blue" size="lg" onClick={() => triggerConfirm('Lunas')}>Konfirmasi Lunas</Button>
                            </>
                          ) : (
                            <>
                              <Button variant="subtle" color="gray" size="lg" onClick={() => setShowRejectInput(false)}>Batal</Button>
                              <Button color="red" size="lg" disabled={!rejectionReason.trim()} onClick={() => triggerConfirm('Ditolak')}>Kirim Penolakan</Button>
                            </>
                          )}
                        </Group>
                      ) : (
                        <Button variant="light" color="gray" fullWidth size="lg" onClick={handleCloseAll}>Tutup Detail</Button>
                      )}
                    </Stack>
                  </Box>
                </Stack>
              </SimpleGrid>
            </Box>
          )}
        </Drawer>

        <Modal 
          opened={confirmOpened} 
          onClose={closeConfirm} 
          centered 
          title={<Text fw={800}>Konfirmasi Akhir</Text>}
          radius="md"
          size="sm"
        >
          <LoadingOverlay visible={isProcessing} />
          <Stack align="center" gap="lg">
            <IconAlertTriangle size={60} />
            <Text fw={700} ta="center">
              Status invoice {selectedPayment?.id} akan diubah menjadi {pendingAction}.
            </Text>
            <Group grow w="100%">
              <Button variant="light" color="gray" onClick={closeConfirm} disabled={isProcessing}>Batal</Button>
              <Button color={pendingAction === 'Lunas' ? 'blue' : 'red'} onClick={processStatus} loading={isProcessing}>
                Ya, Eksekusi
              </Button>
            </Group>
          </Stack>
        </Modal>
      </Stack>
    </Box>
  );
}
