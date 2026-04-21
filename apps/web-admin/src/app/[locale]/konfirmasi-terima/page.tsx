'use client';

import { useState, useMemo } from 'react';
import {
  Badge,
  Group,
  Text,
  Paper,
  Title,
  Stack,
  Button,
  Box,
  Image,
  SimpleGrid,
  ScrollArea,
  Card,
  Modal,
  ThemeIcon,
  TextInput,
  ActionIcon,
  Container,
  Checkbox,
  LoadingOverlay,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import {
  IconTruckDelivery,
  IconSearch,
  IconCheck,
  IconAlertCircle,
  IconPackageImport,
  IconX,
  IconEngine,
  IconFileCheck,
  IconDownload,
} from '@tabler/icons-react';

interface MachineUnit {
  id: string;
  jenis: string;
  isChecked?: boolean;
}

interface OrderData {
  id: string;
  pelanggan: string;
  tanggalKirim: string;
  sopir: string;
  status: 'Dikirim' | 'Disewa';
  unit: MachineUnit[];
  buktiSuratJalan: string;
}

export default function KonfirmasiPenerimaanInteraktif() {
  const [opened, { open, close }] = useDisclosure(false);
  const [confirmOpened, { open: openConfirm, close: closeConfirm }] =
    useDisclosure(false);

  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [deliveries, setDeliveries] = useState<OrderData[]>([
    {
      id: 'ORD-501',
      pelanggan: 'PT. Maju Jaya',
      tanggalKirim: '18 Okt 2025',
      sopir: 'Andi Supriadi',
      status: 'Dikirim',
      unit: [
        { id: 'MSN-001', jenis: 'Genset 50kVA' },
        { id: 'MSN-002', jenis: 'Genset 50kVA' },
      ],
      buktiSuratJalan:
        'https://placehold.co/800x1200?text=Surat+Jalan+ORD-501',
    },
    {
      id: 'ORD-505',
      pelanggan: 'CV. Bangun Pagi',
      tanggalKirim: '19 Okt 2025',
      sopir: 'Budi Santoso',
      status: 'Dikirim',
      unit: [{ id: 'MSN-099', jenis: 'Genset 100kVA' }],
      buktiSuratJalan:
        'https://placehold.co/800x1200?text=Surat+Jalan+ORD-505',
    },
  ]);

  const filteredDeliveries = useMemo(() => {
    return deliveries
      .filter(
        (d) =>
          d.pelanggan.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.id.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) =>
        a.status === 'Dikirim' && b.status !== 'Dikirim' ? -1 : 1
      );
  }, [deliveries, searchQuery]);

  const handleInspect = (order: OrderData) => {
    const initialized = {
      ...order,
      unit: order.unit.map((u) => ({
        ...u,
        isChecked: u.isChecked ?? false,
      })),
    };
    setSelectedOrder(initialized);
    open();
  };

  const toggleMachineCheck = (machineId: string) => {
    if (!selectedOrder) return;

    const updatedUnits = selectedOrder.unit.map((u) =>
      u.id === machineId ? { ...u, isChecked: !u.isChecked } : u
    );

    setSelectedOrder({ ...selectedOrder, unit: updatedUnits });
  };

  const handleCloseInspect = () => {
    closeConfirm();
    close();
    setSelectedOrder(null);
  };

  const executeUpdateStatus = async () => {
    if (!selectedOrder) return;

    setIsSubmitting(true);

    try {
      await new Promise((res) => setTimeout(res, 1500));

      setDeliveries((prev) =>
        prev.map((d) =>
          d.id === selectedOrder.id ? { ...d, status: 'Disewa' } : d
        )
      );

      notifications.show({
        title: 'Status Berhasil Diperbarui',
        message: `Unit pada order ${selectedOrder.id} kini berstatus Disewa.`,
        color: 'green',
        icon: <IconCheck size={18} />,
      });

      handleCloseInspect();
    } catch (error) {
      notifications.show({
        title: 'Gagal Memperbarui',
        message: 'Terjadi kesalahan koneksi ke server.',
        color: 'red',
        icon: <IconX size={18} />,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const allMachinesChecked =
    selectedOrder?.unit.every((u) => u.isChecked) ?? false;

  return (
    <Container size="100%" py="xl">
      <Stack gap="xl">
        <Group justify="space-between" align="flex-end">
          <Box>
            <Title order={2} fw={900}>
              Konfirmasi Penerimaan Aset
            </Title>
            <Text c="dimmed" size="sm">
              Validasi penerimaan unit sebelum status berubah menjadi Disewa.
            </Text>
          </Box>

          <TextInput
            placeholder="Cari ID Order atau Nama Pelanggan..."
            leftSection={<IconSearch size={18} />}
            variant="filled"
            radius="md"
            w={350}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
          />
        </Group>

        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
          {filteredDeliveries.map((d) => (
            <Card
              key={d.id}
              withBorder
              radius="lg"
              padding="lg"
              shadow="sm"
              style={{ opacity: d.status === 'Disewa' ? 0.7 : 1 }}
            >
              <Card.Section
                withBorder
                inheritPadding
                py="xs"
                bg={d.status === 'Dikirim' ? 'blue.0' : 'gray.0'}
              >
                <Group justify="space-between">
                  <Text fw={800} size="sm">
                    {d.id}
                  </Text>
                  <Badge
                    variant="filled"
                    color={d.status === 'Dikirim' ? 'orange' : 'green'}
                    size="sm"
                  >
                    {d.status === 'Dikirim'
                      ? 'Dalam Pengiriman'
                      : 'Sudah Diterima'}
                  </Badge>
                </Group>
              </Card.Section>

              <Stack gap="sm" mt="md">
                <Box>
                  <Text size="xs" c="dimmed" fw={700}>
                    Pelanggan
                  </Text>
                  <Text fw={700}>{d.pelanggan}</Text>
                </Box>

                <Group grow>
                  <Box>
                    <Text size="xs" c="dimmed" fw={700}>
                      Sopir
                    </Text>
                    <Text size="sm">{d.sopir}</Text>
                  </Box>
                  <Box>
                    <Text size="xs" c="dimmed" fw={700}>
                      Unit
                    </Text>
                    <Text size="sm">{d.unit.length} Mesin</Text>
                  </Box>
                </Group>
              </Stack>

              <Button
                fullWidth
                mt="xl"
                radius="md"
                variant={d.status === 'Dikirim' ? 'filled' : 'light'}
                color={d.status === 'Dikirim' ? 'blue' : 'gray'}
                onClick={() => handleInspect(d)}
                leftSection={
                  d.status === 'Dikirim' ? (
                    <IconPackageImport size={18} />
                  ) : (
                    <IconFileCheck size={18} />
                  )
                }
              >
                {d.status === 'Dikirim'
                  ? 'Proses Penerimaan'
                  : 'Lihat Detail'}
              </Button>
            </Card>
          ))}
        </SimpleGrid>
      </Stack>

      {/* FULLSCREEN MODAL */}
      <Modal
        opened={opened}
        onClose={handleCloseInspect}
        fullScreen
        padding={0}
        withCloseButton={false}
      >
        {selectedOrder && (
          <Box
            bg="gray.0"
            h="100vh"
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <Paper shadow="sm" p="md" radius={0} withBorder bg="white">
              <Container size="xl">
                <Group justify="space-between">
                  <Group>
                    <ActionIcon
                      variant="subtle"
                      size="xl"
                      radius="xl"
                      onClick={handleCloseInspect}
                    >
                      <IconX size={24} />
                    </ActionIcon>
                    <Box>
                      <Text fw={900} size="lg">
                        Inspeksi Serah Terima
                      </Text>
                      <Text size="xs" c="dimmed">
                        ID: {selectedOrder.id}
                      </Text>
                    </Box>
                  </Group>

                  {selectedOrder.status === 'Dikirim' && (
                    <Button
                      color="blue"
                      radius="xl"
                      disabled={!allMachinesChecked}
                      onClick={openConfirm}
                      leftSection={<IconCheck size={20} />}
                    >
                      Konfirmasi Penerimaan
                    </Button>
                  )}
                </Group>
              </Container>
            </Paper>

            <ScrollArea flex={1} p="xl">
              <Container size="xl">
                <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
                  <Stack gap="sm">
                    <Group justify="space-between">
                      <Text fw={700} size="xs" c="dimmed">
                        Bukti Surat Jalan
                      </Text>
                      <ActionIcon
                        variant="light"
                        onClick={() =>
                          window.open(selectedOrder.buktiSuratJalan)
                        }
                      >
                        <IconDownload size={18} />
                      </ActionIcon>
                    </Group>

                    <Card withBorder radius="lg" p={0}>
                      <Image
                        src={selectedOrder.buktiSuratJalan}
                        alt="Surat Jalan"
                        fit="contain"
                        h={600}
                      />
                    </Card>
                  </Stack>

                  <Stack gap="xl">
                    <Box>
                      <Text fw={700} size="xs" c="dimmed" mb="sm">
                        Checklist Unit
                      </Text>

                      <Stack gap="xs">
                        {selectedOrder.unit.map((u) => (
                          <Paper
                            key={u.id}
                            withBorder
                            p="md"
                            radius="md"
                            style={{
                              cursor:
                                selectedOrder.status === 'Dikirim'
                                  ? 'pointer'
                                  : 'default',
                              borderColor: u.isChecked
                                ? 'var(--mantine-color-blue-4)'
                                : undefined,
                              backgroundColor: u.isChecked
                                ? 'var(--mantine-color-blue-0)'
                                : 'white',
                            }}
                            onClick={() =>
                              selectedOrder.status === 'Dikirim' &&
                              toggleMachineCheck(u.id)
                            }
                          >
                            <Group justify="space-between">
                              <Group>
                                <ThemeIcon
                                  variant="light"
                                  color={u.isChecked ? 'blue' : 'gray'}
                                >
                                  <IconEngine size={18} />
                                </ThemeIcon>
                                <Box>
                                  <Text fw={700} size="sm">
                                    {u.jenis}
                                  </Text>
                                  <Text size="xs" c="dimmed">
                                    S/N: {u.id}
                                  </Text>
                                </Box>
                              </Group>

                              {selectedOrder.status === 'Dikirim' && (
                                <Checkbox
                                  checked={u.isChecked}
                                  readOnly
                                  color="blue"
                                  radius="xl"
                                />
                              )}

                              {selectedOrder.status === 'Disewa' && (
                                <Badge color="green">Aktif</Badge>
                              )}
                            </Group>
                          </Paper>
                        ))}
                      </Stack>

                      {!allMachinesChecked &&
                        selectedOrder.status === 'Dikirim' && (
                          <Text size="xs" c="red" mt="sm">
                            Centang semua unit untuk memverifikasi.
                          </Text>
                        )}
                    </Box>

                    <Paper p="lg" radius="lg" bg="blue.0" withBorder>
                      <Group gap="md">
                        <IconAlertCircle />
                        <Text size="sm">
                          Status akan berubah menjadi Disewa dan periode
                          penagihan dimulai.
                        </Text>
                      </Group>
                    </Paper>
                  </Stack>
                </SimpleGrid>
              </Container>
            </ScrollArea>
          </Box>
        )}
      </Modal>

      {/* CONFIRM MODAL */}
      <Modal
        opened={confirmOpened}
        onClose={closeConfirm}
        centered
        title={<Text fw={900}>Finalisasi</Text>}
        radius="lg"
      >
        <LoadingOverlay visible={isSubmitting} overlayProps={{ blur: 2 }} />
        <Stack align="center" gap="lg" py="md">
          <ThemeIcon color="blue" variant="light" size={80} radius="xl">
            <IconTruckDelivery size={45} />
          </ThemeIcon>

          <Box ta="center">
            <Text fw={800} size="lg">
              Unit Sudah Sampai?
            </Text>
            <Text size="sm" c="dimmed">
              Status akan diubah menjadi Disewa untuk pelanggan{' '}
              {selectedOrder?.pelanggan}.
            </Text>
          </Box>

          <Group grow w="100%">
            <Button
              variant="light"
              color="gray"
              onClick={closeConfirm}
              disabled={isSubmitting}
            >
              Batal
            </Button>
            <Button
              color="blue"
              onClick={executeUpdateStatus}
              loading={isSubmitting}
            >
              Ya, Unit Diterima
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
}
