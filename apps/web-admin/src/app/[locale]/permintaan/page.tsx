'use client'

import { useState, useEffect, useMemo, Fragment } from 'react';
import { notifications } from '@mantine/notifications';
import { 
  Table, Badge, Group, Text, ActionIcon, Paper, Title, Stack, 
  Button, NumberInput, Divider, Box, Collapse, Modal, LoadingOverlay, Skeleton, Container
} from '@mantine/core';
import { 
  IconCheck, IconAlertCircle, IconChevronDown, 
  IconChevronUp, IconSend 
} from '@tabler/icons-react';

interface PermintaanMesin {
  idMesin: string;
  namaMesin: string;
  qty: number;
  harga: number;
  diskon: number;
}

interface PermintaanSewa {
  idPermintaan: string;
  pelanggan: string;
  lokasi: string;
  status: string;
  mesin: PermintaanMesin[];
  durasi: number;
}

export default function KonfirmasiPersetujuanHarga() {
  const [dataPermintaan, setDataPermintaan] = useState<PermintaanSewa[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openedId, setOpenedId] = useState<string | null>(null);
  const [confirmOpened, setConfirmOpened] = useState(false);
  const [activeReqId, setActiveReqId] = useState<string | null>(null);

  const fetchAllPermintaan = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/permintaan-sewa`);
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const json = await res.json();
      if (json.success) {
        setDataPermintaan(json.data.map((req: any) => ({
          idPermintaan: req.idPermintaan,
          pelanggan: req.pelanggan || 'Tanpa Nama',
          lokasi: req.lokasi,
          status: req.status,
          durasi: req.durasi,
          mesin: (req.mesin || []).map((m: any) => ({
            idMesin: m.idMesin,
            namaMesin: m.mesin?.namaMesin || 'Mesin',
            qty: m.qty,
            harga: m.harga || 0,
            diskon: m.diskon || 0
          }))
        })));
      }
    } catch (err: any) {
      notifications.show({ 
        title: 'Koneksi Gagal', 
        message: err.message || 'Gagal mengambil data dari server', 
        color: 'red' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'Menunggu':
      case 'Menunggu Validasi':
        return 'yellow';
      case 'Divalidasi':
      case 'Menunggu Pembayaran':
        return 'cyan';
      case 'Lunas':
      case 'Dikirim':
        return 'blue';
      case 'Diterima':
      case 'Disewa':
        return 'green';
      case 'Selesai':
        return 'gray';
      case 'Ditolak':
        return 'red';
      default:
        return 'blue';
    }
  };

  useEffect(() => {
    fetchAllPermintaan();
  }, []);

  const updateItemValue = (reqId: string, mesinId: string, field: 'harga' | 'diskon', val: number) => {
    setDataPermintaan((prev) => 
      prev.map((req) => {
        if (req.idPermintaan !== reqId) return req;
        return {
          ...req,
          mesin: req.mesin.map((m) => 
            m.idMesin === mesinId ? { ...m, [field]: Number.isFinite(val) ? val : 0 } : m
          ),
        };
      })
    );
  };

  const handleValidationAction = async () => {
    if (!activeReqId) return;
    
    setIsSubmitting(true);
    try {
      const target = dataPermintaan.find(r => r.idPermintaan === activeReqId);
      if (!target) return;

      const payload = {
        pelanggan: target.pelanggan,
        lokasi: target.lokasi,
        durasi: target.durasi,
        status: 'Divalidasi',
        mesin: target.mesin.map(m => ({
          idMesin: m.idMesin,
          qty: m.qty,
          harga: m.harga,
          diskon: m.diskon
        }))
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/permintaan-sewa/${activeReqId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const json = await res.json();

      if (json.success) {
        notifications.show({
          title: 'Berhasil Divalidasi',
          message: `Penawaran harga untuk ${activeReqId} telah dikirim ke pelanggan.`,
          color: 'green',
          icon: <IconCheck size={18} />,
        });
        await fetchAllPermintaan();
        setConfirmOpened(false);
        setOpenedId(null);
      } else {
        throw new Error(json.message);
      }
    } catch (err: any) {
      notifications.show({
        title: 'Validasi Gagal',
        message: err.message || 'Terjadi kesalahan saat menyimpan data.',
        color: 'red',
        icon: <IconAlertCircle size={18}/>
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const sortedList = useMemo(() => {
    return [...dataPermintaan].sort((a, b) => {
      const aIsPending = a.status === 'Menunggu' || a.status === 'Menunggu Validasi';
      const bIsPending = b.status === 'Menunggu' || b.status === 'Menunggu Validasi';
      if (aIsPending && !bIsPending) return -1;
      if (!aIsPending && bIsPending) return 1;
      return 0;
    });
  }, [dataPermintaan]);

  const calcTotalReq = (items: PermintaanMesin[], durasi: number) => {
    return (items || []).reduce((acc, m) => {
      const net = Math.max(0, m.harga - m.diskon);
      return acc + (net * m.qty * (durasi || 1));
    }, 0);
  };

  const toggleRowView = (id: string) => setOpenedId(prev => prev === id ? null : id);
  
  const triggerConfirmModal = (id: string) => {
    setActiveReqId(id);
    setConfirmOpened(true);
  };

  return (
    <Container size="100%" p="xl" bg="#fcfcfc" style={{ minHeight: '100vh' }}>
      <Modal
        opened={confirmOpened}
        onClose={() => !isSubmitting && setConfirmOpened(false)}
        title={<Text fw={900} size="lg">Finalisasi Penawaran</Text>}
        centered radius="lg"
        overlayProps={{ backgroundOpacity: 0.5, blur: 3 }}
      >
        <LoadingOverlay visible={isSubmitting} overlayProps={{ blur: 2 }} />
        <Stack gap="md">
          <Box p="md" bg="blue.0" style={{ borderRadius: '8px', border: '1px solid var(--mantine-color-blue-2)' }}>
            <Text size="sm" fw={600} c="blue.9">
              Anda akan memvalidasi harga untuk permintaan {activeReqId}. Pastikan diskon sudah sesuai dengan kontrak pelanggan.
            </Text>
          </Box>
          <Group justify="flex-end">
            <Button variant="subtle" color="black" onClick={() => setConfirmOpened(false)} disabled={isSubmitting}>Batal</Button>
            <Button color="blue" variant="filled" onClick={handleValidationAction} loading={isSubmitting} leftSection={<IconCheck size={18} />}>
              Validasi & Kirim
            </Button>
          </Group>
        </Stack>
      </Modal>

      <Stack gap="xl">
        <Box>
          <Title order={1} fw={900} c="gray.9" mb={4}>Manajemen Penawaran Sewa</Title>
          <Text c="dimmed" size="sm">Validasi harga satuan dan berikan diskon operasional untuk permintaan multi-mesin.</Text>
        </Box>

        <Paper withBorder radius="md" shadow="xs" style={{ overflow: 'hidden' }}>
          <Skeleton visible={isLoading}>
            <Table verticalSpacing="md" highlightOnHover stickyHeader>
              <Table.Thead bg="gray.0">
                <Table.Tr>
                  <Table.Th w={60} />
                  <Table.Th>ID Permintaan</Table.Th>
                  <Table.Th>Pelanggan</Table.Th>
                  <Table.Th>Status Saat Ini</Table.Th>
                  <Table.Th ta="right">Aksi</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {sortedList.map((req) => {
                  const isProcessed = req.status !== 'Menunggu' && req.status !== 'Menunggu Validasi';
                  return (
                    <Fragment key={req.idPermintaan}>
                      <Table.Tr style={{ opacity: isProcessed ? 0.6 : 1, backgroundColor: openedId === req.idPermintaan ? 'var(--mantine-color-blue-0)' : undefined }}>
                        <Table.Td>
                          <ActionIcon variant="light" color={openedId === req.idPermintaan ? 'blue' : 'gray'} onClick={() => toggleRowView(req.idPermintaan)}>
                            {openedId === req.idPermintaan ? <IconChevronUp size={18} /> : <IconChevronDown size={18} />}
                          </ActionIcon>
                        </Table.Td>
                        <Table.Td fw={900}>{req.idPermintaan}</Table.Td>
                        <Table.Td fw={600}>{req.pelanggan}</Table.Td>
                        <Table.Td>
                          <Badge variant={isProcessed ? 'light' : 'filled'} color={getStatusColor(req.status)} size="sm">
                            {req.status}
                          </Badge>
                        </Table.Td>
                        <Table.Td ta="right">
                          <Button 
                            size="xs" variant={isProcessed ? 'subtle' : 'filled'} 
                            color={isProcessed ? 'gray' : 'blue'}
                            onClick={() => toggleRowView(req.idPermintaan)}
                          >
                            {isProcessed ? 'Lihat Detail' : 'Atur Harga'}
                          </Button>
                        </Table.Td>
                      </Table.Tr>

                      <Table.Tr>
                        <Table.Td colSpan={5} p={0}>
                          <Collapse in={openedId === req.idPermintaan}>
                            <Box p="xl" bg="gray.0" style={{ borderTop: '2px solid var(--mantine-color-gray-2)' }}>
                              <Group justify="space-between" mb="lg">
                                <Text fw={900} size="sm" tt="uppercase" c="dimmed">Daftar Aset Yang Diminta</Text>
                                <Badge variant="outline" color="blue">Durasi: {req.durasi} Hari</Badge>
                              </Group>

                              <Stack gap="md">
                                {req.mesin.map((m) => (
                                  <Paper key={m.idMesin} withBorder p="md" radius="lg" bg="white" shadow="xs">
                                    <Group justify="space-between">
                                      <Box>
                                        <Text size="sm" fw={800} c="blue.9">{m.namaMesin}</Text>
                                        <Text size="xs" c="dimmed" fw={700}>S/N: {m.idMesin} | Qty: {m.qty} Unit</Text>
                                      </Box>
                                      <Group gap="xl">
                                        <NumberInput
                                          label="Harga Satuan (IDR)" size="sm" w={180} value={m.harga}
                                          onChange={(val) => updateItemValue(req.idPermintaan, m.idMesin, 'harga', Number(val))}
                                          disabled={isProcessed} prefix="Rp " thousandSeparator=","
                                          variant="filled"
                                        />
                                        <NumberInput
                                          label="Diskon Khusus (IDR)" size="sm" w={160} value={m.diskon}
                                          onChange={(val) => updateItemValue(req.idPermintaan, m.idMesin, 'diskon', Number(val))}
                                          disabled={isProcessed} prefix="Rp " thousandSeparator=","
                                          variant="filled"
                                        />
                                      </Group>
                                    </Group>
                                  </Paper>
                                ))}
                              </Stack>
                              
                              <Divider my="xl" variant="dashed" />
                              
                              <Group justify="flex-end" align="flex-end">
                                <Stack gap={2} align="flex-end" px="xl">
                                  <Text size="xs" c="dimmed" fw={900} tt="uppercase">Estimasi Total Invoice</Text>
                                  <Text fw={900} size="28px" c="blue.9" style={{ lineHeight: 1 }}>
                                    Rp {calcTotalReq(req.mesin, req.durasi).toLocaleString('id-ID')}
                                  </Text>
                                </Stack>
                                {!isProcessed && (
                                  <Button 
                                    color="blue" size="lg" radius="md"
                                    leftSection={<IconSend size={20} />}
                                    onClick={() => triggerConfirmModal(req.idPermintaan)}
                                  >
                                    Kirim Ke Pelanggan
                                  </Button>
                                )}
                              </Group>
                            </Box>
                          </Collapse>
                        </Table.Td>
                      </Table.Tr>
                    </Fragment>
                  );
                })}
              </Table.Tbody>
            </Table>
          </Skeleton>
        </Paper>
      </Stack>
    </Container>
  );
}