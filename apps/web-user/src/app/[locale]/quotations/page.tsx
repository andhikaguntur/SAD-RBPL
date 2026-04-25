'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import {
  Container,
  Title,
  Text,
  Paper,
  Stack,
  Group,
  Badge,
  Button,
  Modal,
  Tabs,
  Card,
  Divider,
  Grid,
  ThemeIcon,
  LoadingOverlay,
} from '@mantine/core';
import {
  IconFileText,
  IconCheck,
  IconClock,
  IconX,
  IconDownload,
  IconExternalLink,
  IconAlertCircle,
} from '@tabler/icons-react';
import { showNotification } from '@mantine/notifications';
import AppLayout from '../../../components/AppLayout';
import { useAuth } from '../../../hooks/useAuth';

interface Quotation {
  id: string;
  ref: string;
  machine: string;
  duration: number;
  totalPrice: number;
  status: string;
  createdDate: string;
  expiryDate: string;
  details: {
    machineType: string;
    machineCapacity: string;
    rentalPeriod: string;
    deliveryLocation: string;
    dailyRate: number;
    maintenanceFee: number;
  };
}

export default function QuotationsPage() {
  const router = useRouter();
  const locale = useLocale();
  const { isAuthenticated, user } = useAuth();
  const t = useTranslations('Quotations');

  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [activeTab, setActiveTab] = useState<string | null>('pending');
  const [selectedQuote, setSelectedQuote] = useState<Quotation | null>(null);
  const [openedModal, setOpenedModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(`/${locale}/login`);
    } else {
      fetchQuotations();
    }
  }, [isAuthenticated, router, locale]);

  const fetchQuotations = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/permintaan-sewa/by-user/${user?.id}`);
      const json = await res.json();
      if (json.success) {
        // Map to local interface
        const mapped = json.data.map((req: any) => ({
            id: req.idPermintaan,
            ref: req.idPermintaan,
            machine: req.mesin?.[0]?.mesin?.namaMesin || 'Mesin',
            duration: req.durasi,
            totalPrice: req.mesin?.reduce((acc: number, m: any) => acc + (m.harga - m.diskon) * m.qty * (req.durasi || 1), 0) || 0,
            status: req.status,
            createdDate: req.tanggalFormat,
            expiryDate: 'TBA', // Backend doesn't have this yet
            details: {
              machineType: req.mesin?.[0]?.mesin?.namaMesin || '-',
              machineCapacity: req.mesin?.[0]?.mesin?.kapasitas || '-',
              rentalPeriod: `${req.durasi} hari`,
              deliveryLocation: req.lokasi,
              dailyRate: req.mesin?.[0]?.harga || 0,
              maintenanceFee: 0,
            }
          }));
        setQuotations(mapped);
      }
    } catch (err) {
      showNotification({ title: 'Error', message: 'Gagal memuat penawaran', color: 'red' });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) return null;

  const getStatusType = (status: string) => {
    if (['Menunggu', 'Menunggu Validasi', 'Divalidasi'].includes(status)) return 'pending';
    if (['Menunggu Pembayaran', 'Lunas', 'Dikirim', 'Diterima', 'Disewa', 'Selesai'].includes(status)) return 'accepted';
    if (status === 'Ditolak') return 'rejected';
    return 'pending';
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

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    setIsActionLoading(true);
    try {
      const res = await fetch(`http://localhost:4000/api/permintaan-sewa/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const json = await res.json();
      if (json.success) {
        showNotification({
          title: 'Berhasil',
          message: `Status penawaran diperbarui menjadi ${newStatus}`,
          color: 'green',
        });
        fetchQuotations();
        setOpenedModal(false);
        if (newStatus === 'Menunggu Pembayaran') {
          router.push(`/${locale}/billing`);
        }
      }
    } catch (err) {
      showNotification({ title: 'Error', message: 'Gagal memperbarui status', color: 'red' });
    } finally {
      setIsActionLoading(false);
    }
  };

  const renderQuotationCard = (quotation: Quotation) => (
    <Card key={quotation.id} withBorder p="md" radius="md">
      <Group justify="space-between" mb="md">
        <div>
          <Group gap="xs" mb="xs">
            <ThemeIcon size="lg" variant="light" color={getStatusColor(quotation.status)}>
              <IconFileText size={20} />
            </ThemeIcon>
            <div>
              <Text fw={600}>{quotation.ref}</Text>
              <Text size="sm" c="dimmed">
                {quotation.machine}
              </Text>
            </div>
          </Group>
        </div>
        <Badge color={getStatusColor(quotation.status)}>
          {quotation.status}
        </Badge>
      </Group>

      <Divider my="md" />

      <Group justify="space-between" mb="md">
        <div>
          <Text size="sm" c="dimmed">Total</Text>
          <Text fw={700} size="lg">Rp {quotation.totalPrice.toLocaleString('id-ID')}</Text>
        </div>
        <div>
          <Text size="sm" c="dimmed">Periode</Text>
          <Text fw={600}>{quotation.duration} hari</Text>
        </div>
      </Group>

      <Group grow>
        <Button variant="outline" size="sm" onClick={() => showNotification({ title: 'Info', message: 'Download PDF belum tersedia' })}>
          <IconDownload size={16} />
        </Button>
        <Button variant="light" size="sm" onClick={() => { setSelectedQuote(quotation); setOpenedModal(true); }}>
          <IconExternalLink size={16} />
        </Button>
      </Group>
    </Card>
  );

  const pendingQuotes = quotations.filter((q) => getStatusType(q.status) === 'pending');
  const acceptedQuotes = quotations.filter((q) => getStatusType(q.status) === 'accepted');
  const rejectedQuotes = quotations.filter((q) => getStatusType(q.status) === 'rejected');

  return (
    <AppLayout>
      <Container size="lg" py="xl" pos="relative">
        <LoadingOverlay visible={isLoading} />
        <div style={{ marginBottom: 32 }}>
          <Title order={2} mb="xs">{t('title')}</Title>
          <Text c="dimmed">{t('description')}</Text>
        </div>

        <Tabs value={activeTab} onChange={setActiveTab} mb="xl">
          <Tabs.List>
            <Tabs.Tab value="pending" leftSection={<IconClock size={14} />}>
              Menunggu ({pendingQuotes.length})
            </Tabs.Tab>
            <Tabs.Tab value="accepted" leftSection={<IconCheck size={14} />}>
              Disetujui ({acceptedQuotes.length})
            </Tabs.Tab>
            <Tabs.Tab value="rejected" leftSection={<IconX size={14} />}>
              Ditolak ({rejectedQuotes.length})
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="pending" pt="xl">
            <Grid gutter="md">
              {pendingQuotes.length === 0 && !isLoading ? (
                <Grid.Col span={12}>
                  <Paper withBorder p="lg" radius="md" ta="center">
                    <Text c="dimmed">Tidak ada penawaran tertunda</Text>
                  </Paper>
                </Grid.Col>
              ) : (
                pendingQuotes.map((q) => (
                  <Grid.Col key={q.id} span={{ base: 12, sm: 6, md: 4 }}>
                    {renderQuotationCard(q)}
                  </Grid.Col>
                ))
              )}
            </Grid>
          </Tabs.Panel>

          <Tabs.Panel value="accepted" pt="xl">
            <Grid gutter="md">
              {acceptedQuotes.map((q) => (
                <Grid.Col key={q.id} span={{ base: 12, sm: 6, md: 4 }}>
                  {renderQuotationCard(q)}
                </Grid.Col>
              ))}
            </Grid>
          </Tabs.Panel>

          <Tabs.Panel value="rejected" pt="xl">
            <Grid gutter="md">
              {rejectedQuotes.map((q) => (
                <Grid.Col key={q.id} span={{ base: 12, sm: 6, md: 4 }}>
                  {renderQuotationCard(q)}
                </Grid.Col>
              ))}
            </Grid>
          </Tabs.Panel>
        </Tabs>
      </Container>

      <Modal opened={openedModal} onClose={() => setOpenedModal(false)} title={selectedQuote?.ref || 'Detail'} size="lg">
        {selectedQuote && (
          <Stack gap="md" pos="relative">
            <LoadingOverlay visible={isActionLoading} />
            <Group justify="space-between">
              <div>
                <Text fw={600}>{selectedQuote.machine}</Text>
                <Text size="sm" c="dimmed">{selectedQuote.ref}</Text>
              </div>
              <Badge color={getStatusColor(selectedQuote.status)}>{selectedQuote.status}</Badge>
            </Group>

            <Divider />

            <Grid gutter="md">
              <Grid.Col span={6}>
                <Text size="sm" c="dimmed">Kapasitas</Text>
                <Text fw={600}>{selectedQuote.details.machineCapacity}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text size="sm" c="dimmed">Lokasi Pengiriman</Text>
                <Text fw={600}>{selectedQuote.details.deliveryLocation}</Text>
              </Grid.Col>
            </Grid>

            <Divider />

            <Stack gap="xs">
              <Group justify="space-between">
                <Text>Harga Sewa (Harian)</Text>
                <Text fw={600}>Rp {(selectedQuote.details.dailyRate || 0).toLocaleString('id-ID')}</Text>
              </Group>
              <Group justify="space-between">
                <Text>Durasi Sewa</Text>
                <Text fw={600}>{selectedQuote.duration} Hari</Text>
              </Group>
              <Divider />
              <Group justify="space-between">
                <Text fw={700} size="lg">Total</Text>
                <Text fw={700} size="lg" color="blue">Rp {selectedQuote.totalPrice.toLocaleString('id-ID')}</Text>
              </Group>
            </Stack>

            {getStatusType(selectedQuote.status) === 'pending' && (
              <Group justify="flex-end" mt="xl">
                {['Menunggu', 'Menunggu Validasi'].includes(selectedQuote.status) ? (
                  <Text size="sm" c="dimmed" fs="italic">Menunggu validasi harga dari admin...</Text>
                ) : (
                  <>
                    <Button variant="outline" color="red" onClick={() => handleUpdateStatus(selectedQuote.id, 'Ditolak')}>Tolak</Button>
                    <Button onClick={() => handleUpdateStatus(selectedQuote.id, 'Menunggu Pembayaran')}>Terima & Lanjut ke Pembayaran</Button>
                  </>
                )}
              </Group>
            )}
          </Stack>
        )}
      </Modal>
    </AppLayout>
  );
}
