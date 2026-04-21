'use client'

import { Fragment, useState, useMemo } from 'react';
import { 
  Table, Badge, Group, Text, ActionIcon, Paper, Title, Stack, 
  Button, NumberInput, Divider, Box, Collapse, Modal, LoadingOverlay 
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { 
  IconChevronDown, IconChevronUp, IconSend, 
  IconCheck, IconX, IconAlertCircle 
} from '@tabler/icons-react';

export default function KonfirmasiMultiMesin() {
  const [openedRow, setOpenedRow] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [requests, setRequests] = useState([
    { 
      id: 'REQ-001', 
      pelanggan: 'PT. Maju Jaya', 
      lokasi: 'Sleman',
      status: 'Menunggu Validasi',
      machines: [
        { id: 'M-01', jenis: 'Genset 50kVA', qty: 2, harga: 1500000, diskon: 0 },
        { id: 'M-02', jenis: 'Genset 100kVA', qty: 1, harga: 2500000, diskon: 0 },
      ]
    },
    { 
      id: 'REQ-002', 
      pelanggan: 'PT. Maju Prima', 
      lokasi: 'Sleman',
      status: 'Menunggu Validasi',
      machines: [
        { id: 'M-03', jenis: 'Genset 50kVA', qty: 1, harga: 750000, diskon: 0 },
        { id: 'M-04', jenis: 'Genset 100kVA', qty: 1, harga: 2500000, diskon: 0 },
      ]
    },
  ]);

  const updateMachineValue = (
    requestId: string, 
    machineId: string, 
    field: 'harga' | 'diskon', 
    value: number
  ) => {
    setRequests((prev) => 
      prev.map((req) => {
        if (req.id !== requestId) return req;

        return {
          ...req,
          machines: req.machines.map((m) => 
            m.id === machineId 
              ? { ...m, [field]: Number.isFinite(value) ? value : 0 } 
              : m
          ),
        };
      })
    );
  };

  const calculateTotal = (machines: any[]) => {
    return machines.reduce((acc, m) => {
      const effective = Math.max(0, m.harga - m.diskon);
      return acc + effective * m.qty;
    }, 0);
  };

  const openConfirm = (id: string) => {
    setSelectedRequestId(id);
    setConfirmOpen(true);
  };

  const closeConfirm = () => {
    if (isSubmitting) return; // Cegah tutup saat proses
    setConfirmOpen(false);
    setSelectedRequestId(null);
  };

  // LOGIK INTEGRASI API (SIMULASI)
  const executeSendToCustomer = async () => {
    if (!selectedRequestId) return;

    setIsSubmitting(true);
    try {
      // Simulasi API Call ke endpoint penawaran
      // await axios.post('/api/penawaran/validasi', { id: selectedRequestId });
      await new Promise((res) => setTimeout(res, 1500));

      setRequests((prev) =>
        prev.map((req) =>
          req.id === selectedRequestId
            ? { ...req, status: 'Divalidasi' }
            : req
        )
      );

      notifications.show({
        title: 'Penawaran Terkirim',
        message: `Harga penawaran untuk ${selectedRequestId} telah berhasil divalidasi dan dikirim ke pelanggan.`,
        color: 'green',
        icon: <IconCheck size={18} />,
      });

      setOpenedRow(null);
      setConfirmOpen(false);
    } catch (error) {
      notifications.show({
        title: 'Gagal Memproses',
        message: 'Terjadi kesalahan sistem saat mengirim penawaran.',
        color: 'red',
        icon: <IconAlertCircle size={18} />,
      });
    } finally {
      setIsSubmitting(false);
      setSelectedRequestId(null);
    }
  };

  const sortedRequests = useMemo(() => {
    return [...requests].sort((a, b) => {
      if (a.status === 'Divalidasi' && b.status !== 'Divalidasi') return 1;
      if (a.status !== 'Divalidasi' && b.status === 'Divalidasi') return -1;
      return 0;
    });
  }, [requests]);

  const toggleRow = (id: string) =>
    setOpenedRow((prev) => (prev === id ? null : id));

  return (
    <>
      <Modal
        opened={confirmOpen}
        onClose={closeConfirm}
        title={<Text fw={700}>Konfirmasi Finalisasi</Text>}
        centered
        radius="md"
        withCloseButton={!isSubmitting}
        closeOnClickOutside={!isSubmitting}
      >
        <LoadingOverlay visible={isSubmitting} overlayProps={{ blur: 2 }} />
        <Stack>
          <Text size="sm">
            Apakah Anda yakin detail harga dan diskon untuk permintaan <b>{selectedRequestId}</b> sudah sesuai dengan kebijakan perusahaan?
          </Text>

          <Group justify="flex-end" mt="md">
            <Button
              variant="subtle"
              color="gray"
              onClick={closeConfirm}
              disabled={isSubmitting}
            >
              Batal
            </Button>
            <Button
              color="blue"
              onClick={executeSendToCustomer}
              loading={isSubmitting}
              leftSection={<IconCheck size={16} />}
            >
              Ya, Kirim ke Pelanggan
            </Button>
          </Group>
        </Stack>
      </Modal>

      <Stack gap="lg">
        <Box>
          <Title order={2} fw={800}>Persetujuan Penawaran Harga</Title>
          <Text c="dimmed" size="sm">
            Tinjau permintaan sewa multi-mesin dan berikan diskon khusus jika diperlukan.
          </Text>
        </Box>

        <Paper withBorder radius="md" shadow="sm">
          <Table verticalSpacing="md" highlightOnHover>
            <Table.Thead bg="gray.0">
              <Table.Tr>
                <Table.Th w={40} />
                <Table.Th>ID Permintaan</Table.Th>
                <Table.Th>Pelanggan</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th ta="right">Aksi</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {sortedRequests.map((req) => {
                const isDone = req.status === 'Divalidasi';
                const totalHarga = calculateTotal(req.machines);

                return (
                  <Fragment key={req.id}>
                    <Table.Tr style={{ 
                      opacity: isDone ? 0.6 : 1,
                      transition: 'opacity 0.3s ease'
                    }}>
                      <Table.Td>
                        <ActionIcon
                          variant="subtle"
                          color="gray"
                          onClick={() => toggleRow(req.id)}
                        >
                          {openedRow === req.id ? (
                            <IconChevronUp size={16} />
                          ) : (
                            <IconChevronDown size={16} />
                          )}
                        </ActionIcon>
                      </Table.Td>

                      <Table.Td fw={700}>{req.id}</Table.Td>
                      <Table.Td>{req.pelanggan}</Table.Td>

                      <Table.Td>
                        <Badge
                          variant={isDone ? 'light' : 'filled'}
                          color={isDone ? 'gray' : 'orange'}
                        >
                          {req.status}
                        </Badge>
                      </Table.Td>

                      <Table.Td ta="right">
                        <Button
                          size="xs"
                          variant={isDone ? 'subtle' : 'light'}
                          color={isDone ? 'gray' : 'blue'}
                          onClick={() => toggleRow(req.id)}
                        >
                          {isDone ? 'Lihat Rincian' : 'Proses Harga'}
                        </Button>
                      </Table.Td>
                    </Table.Tr>

                    <Table.Tr>
                      <Table.Td colSpan={5} p={0}>
                        <Collapse in={openedRow === req.id}>
                          <Box p="md" bg="gray.0" style={{ borderTop: '1px solid var(--mantine-color-gray-2)' }}>
                            <Text fw={700} size="xs" c="dimmed" tt="uppercase" mb="xs">
                              Daftar Unit Mesin
                            </Text>
                            <Stack gap="xs">
                              {req.machines.map((m) => (
                                <Paper key={m.id} withBorder p="sm" radius="md" bg="white">
                                  <Group justify="space-between">
                                    <Box>
                                      <Text size="sm" fw={700}>{m.jenis}</Text>
                                      <Text size="xs" c="dimmed">S/N: {m.id} | Jumlah: {m.qty} unit</Text>
                                    </Box>

                                    <Group gap="lg">
                                      <NumberInput
                                        label="Harga Satuan"
                                        size="xs"
                                        value={m.harga}
                                        onChange={(val) => updateMachineValue(req.id, m.id, 'harga', Number(val))}
                                        disabled={isDone}
                                        prefix="Rp "
                                        thousandSeparator=","
                                        w={150}
                                      />
                                      <NumberInput
                                        label="Diskon"
                                        size="xs"
                                        value={m.diskon}
                                        onChange={(val) => updateMachineValue(req.id, m.id, 'diskon', Number(val))}
                                        disabled={isDone}
                                        prefix="Rp "
                                        thousandSeparator=","
                                        w={130}
                                      />
                                    </Group>
                                  </Group>
                                </Paper>
                              ))}
                            </Stack>

                            <Divider my="md" variant="dashed" />

                            <Group justify="flex-end">
                              <Stack gap={0} align="flex-end">
                                <Text size="xs" c="dimmed" fw={700}>TOTAL PENAWARAN</Text>
                                <Text fw={900} size="xl" c="blue.9">
                                  Rp {totalHarga.toLocaleString('id-ID')}
                                </Text>
                              </Stack>

                              {!isDone && (
                                <Button
                                  color="blue"
                                  size="md"
                                  leftSection={<IconSend size={18} />}
                                  onClick={() => openConfirm(req.id)}
                                >
                                  Kirim Penawaran
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
        </Paper>
      </Stack>
    </>
  );
}