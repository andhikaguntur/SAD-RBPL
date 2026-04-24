'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import {
  Container,
  Title,
  Paper,
  Group,
  Text,
  Button,
  Stack,
  Badge,
  Modal,
  FileButton,
  Progress,
  LoadingOverlay,
  Box,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconReceipt, IconUpload, IconCheck } from '@tabler/icons-react';
import { compressImageFile, fileToBase64 } from '../../../lib/compress';
import AppLayout from '../../../components/AppLayout';
import { useAuth } from '../../../hooks/useAuth';

interface Invoice {
  id: string;
  ref: string;
  date: string;
  total: number;
  status: string;
  bukti?: string;
}

export default function BillingPage() {
  const router = useRouter();
  const locale = useLocale();
  const { isAuthenticated, user } = useAuth();
  const t = useTranslations('Billing');

  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [opened, setOpened] = useState(false);
  const [active, setActive] = useState<Invoice | null>(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const mountedRef = useRef(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(`/${locale}/login`);
    } else {
      fetchInvoices();
    }
    return () => { mountedRef.current = false; };
  }, [isAuthenticated, router, locale]);

  const fetchInvoices = async () => {
    if (!user?.name) return;
    try {
      const res = await fetch(`http://localhost:4000/api/pembayaran/by-user/${user?.id}`);
      const json = await res.json();
      if (json.success) {
        const mapped = (json.data as any[]).map((p: any) => ({
          id: p.id,
          ref: `INV-${p.id.substring(0, 8).toUpperCase()}`,
          date: p.tanggal,
          total: p.total,
          status: p.status,
          bukti: p.bukti || '',
        }));
        setInvoices(mapped);
      }
    } catch (err) {
      showNotification({ title: 'Error', message: 'Gagal memuat invoice', color: 'red' });
    } finally {
      setLoading(false);
    }
  };

  const openInvoice = (inv: Invoice) => {
    setActive(inv);
    setOpened(true);
  };

  const handleUpload = async (file: File | null) => {
    if (!file || !active) return;
    setUploading(true);
    setProgress(10);

    try {
      const compressed = await compressImageFile(file, 1280, 0.7);
      setProgress(50);

      const b64 = await fileToBase64(compressed);
      setProgress(70);

      const res = await fetch(`http://localhost:4000/api/pembayaran/${active.id}/proof`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bukti: b64 }),
      });

      const json = await res.json();
      if (json.success) {
        setProgress(100);
        showNotification({
          title: 'Berhasil',
          message: 'Bukti pembayaran berhasil diunggah. Admin akan memverifikasi segera.',
          color: 'green',
          icon: <IconCheck size={16} />,
        });
        await fetchInvoices();
        setOpened(false);
      } else {
        throw new Error(json.message);
      }
    } catch (err: any) {
      showNotification({ title: 'Gagal', message: err.message || 'Gagal mengunggah bukti', color: 'red' });
    } finally {
      if (mountedRef.current) {
        setUploading(false);
        setProgress(0);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Lunas': return 'green';
      case 'Menunggu Validasi': return 'blue';
      case 'Belum Dibayar': return 'orange';
      case 'Menunggu Pembayaran': return 'orange';
      case 'Ditolak': return 'red';
      default: return 'gray';
    }
  };

  if (!isAuthenticated) return null;

  return (
    <AppLayout>
      <Container size="lg" py="xl" pos="relative">
        <LoadingOverlay visible={loading} />
        <Title order={2} mb="sm">{t('title')}</Title>
        <Text c="dimmed" mb="md">{t('description')}</Text>

        <Stack gap="md">
          {invoices.length === 0 && !loading ? (
            <Paper withBorder p="xl" radius="md" ta="center">
              <IconReceipt size={40} color="gray" style={{ marginBottom: 8 }} />
              <Text c="dimmed" fw={500}>Tidak ada invoice ditemukan.</Text>
              <Text size="sm" c="dimmed" mt={4}>
                Invoice akan muncul setelah Anda menyetujui penawaran harga dari Admin.
              </Text>
            </Paper>
          ) : (
            invoices.map((inv) => (
              <Paper withBorder p="md" radius="md" key={inv.id}>
                <Group justify="space-between">
                  <Group>
                    <IconReceipt size={24} />
                    <div>
                      <Text fw={700}>{inv.ref}</Text>
                      <Text size="sm" c="dimmed">{inv.date}</Text>
                    </div>
                  </Group>
                  <Group>
                    <Badge variant="light" size="lg" color="blue">
                      {`Rp ${inv.total.toLocaleString('id-ID')}`}
                    </Badge>
                    <Badge color={getStatusColor(inv.status)}>
                      {inv.status}
                    </Badge>
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={() => openInvoice(inv)}
                      disabled={inv.status === 'Lunas'}
                    >
                      {inv.status === 'Belum Dibayar' ? 'Upload Bukti' : 'Lihat Detail'}
                    </Button>
                  </Group>
                </Group>
              </Paper>
            ))
          )}
        </Stack>

        <Modal
          opened={opened}
          onClose={() => { setOpened(false); setProgress(0); }}
          title={`Detail Invoice — ${active?.ref || ''}`}
          size="lg"
        >
          <Stack gap="md" pos="relative">
            <LoadingOverlay visible={uploading} />

            <Paper withBorder p="md" radius="md" bg="gray.0">
              <Group justify="space-between">
                <div>
                  <Text size="sm" c="dimmed">Nomor Invoice</Text>
                  <Text fw={700} size="lg">{active?.ref}</Text>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <Text size="sm" c="dimmed">Tanggal</Text>
                  <Text fw={600}>{active?.date}</Text>
                </div>
              </Group>
            </Paper>

            <Group justify="space-between" px="xs">
              <Text fw={500}>Total Pembayaran</Text>
              <Text fw={700} size="xl" c="blue">
                Rp {active?.total.toLocaleString('id-ID')}
              </Text>
            </Group>

            <Group justify="space-between" px="xs">
              <Text fw={500}>Status</Text>
              <Badge size="lg" color={getStatusColor(active?.status || '')}>
                {active?.status}
              </Badge>
            </Group>

            {active?.bukti ? (
              <Box p="md" style={{ border: '1px solid #dee2e6', borderRadius: 8 }}>
                <Text size="sm" fw={600} mb="xs">Bukti Pembayaran Terunggah:</Text>
                <img
                  src={active.bukti}
                  alt="Bukti Pembayaran"
                  style={{ maxWidth: '100%', borderRadius: 8, display: 'block' }}
                />
                <Text size="xs" c="dimmed" mt="xs">
                  {active.status === 'Menunggu Validasi'
                    ? '⏳ Sedang diverifikasi oleh Admin.'
                    : active.status === 'Lunas'
                      ? '✅ Pembayaran telah diverifikasi.'
                      : ''}
                </Text>
              </Box>
            ) : (
              <Box p="md" style={{ border: '2px dashed #ced4da', borderRadius: 8, textAlign: 'center' }}>
                <IconUpload size={32} color="gray" style={{ marginBottom: 8 }} />
                <Text fw={600} mb={4}>Upload Bukti Pembayaran</Text>
                <Text size="sm" c="dimmed" mb="md">
                  Silakan transfer ke rekening tujuan, lalu upload foto/screenshot bukti transfer.
                </Text>
                <Paper withBorder p="sm" radius="md" mb="md" bg="blue.0">
                  <Text size="sm" fw={600} c="blue.8">Info Rekening Tujuan:</Text>
                  <Text size="sm">BCA — 1234-5678-90 a/n PT. RBPL Machinery</Text>
                </Paper>
                <Group justify="center">
                  <FileButton onChange={handleUpload} accept="image/*,application/pdf">
                    {(props) => (
                      <Button
                        leftSection={<IconUpload size={16} />}
                        {...props}
                        disabled={uploading}
                        size="md"
                      >
                        {uploading ? 'Mengunggah...' : 'Pilih File Bukti'}
                      </Button>
                    )}
                  </FileButton>
                </Group>
                {uploading && <Progress value={progress} mt="md" animated />}
              </Box>
            )}

            <Text size="xs" c="dimmed">
              Catatan: Setelah bukti pembayaran diunggah, Admin akan memverifikasi dalam 1×24 jam.
            </Text>
          </Stack>
        </Modal>
      </Container>
    </AppLayout>
  );
}
