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
    try {
      const res = await fetch('http://localhost:4000/api/pembayaran');
      const json = await res.json();
      if (json.success) {
        // Filter by user (via nested permintaan)
        const filtered = json.data
          .filter((p: any) => p.permintaan?.pelanggan === user?.name)
          .map((p: any) => ({
            id: p.id,
            ref: `INV-${p.id.substring(0, 8).toUpperCase()}`,
            date: p.tanggal,
            total: p.total,
            status: p.status,
            bukti: p.bukti
          }));
        setInvoices(filtered);
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
      // compress image (RNF-006)
      const compressed = await compressImageFile(file, 1280, 0.7);
      setProgress(50);

      // convert to base64
      const b64 = await fileToBase64(compressed);
      setProgress(70);

      // Save to backend
      const res = await fetch(`http://localhost:4000/api/pembayaran/${active.id}/proof`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bukti: b64 })
      });

      const json = await res.json();
      if (json.success) {
        setProgress(100);
        showNotification({ 
          title: 'Berhasil', 
          message: 'Bukti pembayaran berhasil diunggah', 
          color: 'green', 
          icon: <IconCheck size={16} /> 
        });
        fetchInvoices();
        setOpened(false);
      } else {
        throw new Error(json.message);
      }
    } catch (err: any) {
      showNotification({ title: 'Gagal', message: err.message || 'Gagal mengunggah bukti', color: 'red' });
    } finally {
      if (mountedRef.current) setUploading(false);
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
            <Paper withBorder p="lg" radius="md" ta="center">
              <Text c="dimmed">Tidak ada invoice ditemukan.</Text>
            </Paper>
          ) : (
            invoices.map((inv) => (
              <Paper withBorder p="md" radius="md" key={inv.id}>
                <Group justify="apart">
                  <Group>
                    <IconReceipt />
                    <div>
                      <Text fw={700}>{inv.ref}</Text>
                      <Text size="sm" c="dimmed">{inv.date}</Text>
                    </div>
                  </Group>

                  <Group>
                    <Badge variant="light" size="lg" color="blue">
                      {`Rp ${inv.total.toLocaleString()}`}
                    </Badge>
                    <Button variant="subtle" onClick={() => openInvoice(inv)}>{t('view')}</Button>
                    <Badge color={inv.status === 'Lunas' ? 'green' : 'orange'}>
                      {inv.status}
                    </Badge>
                  </Group>
                </Group>
              </Paper>
            ))
          )}
        </Stack>

        <Modal opened={opened} onClose={() => setOpened(false)} title={active?.ref || 'Invoice'} size="lg">
          <Stack gap="md" pos="relative">
            <LoadingOverlay visible={uploading} />
            <Group justify="apart">
              <div>
                <Text fw={700}>{active?.ref}</Text>
                <Text size="sm" c="dimmed">{t('date')}: {active?.date}</Text>
              </div>
              <Badge size="xl">Rp {active?.total.toLocaleString()}</Badge>
            </Group>

            <Text c="dimmed">{t('status')}: {active?.status}</Text>

            {active?.bukti ? (
              <Box p="md" bg="gray.0" style={{ borderRadius: 8 }}>
                <Text size="sm" fw={500} mb="xs">Bukti Terunggah:</Text>
                <img src={active.bukti} alt="Bukti Pembayaran" style={{ maxWidth: '100%', borderRadius: 8 }} />
              </Box>
            ) : (
              <div>
                <Text size="sm" c="dimmed" mb="xs">{t('uploadProof')}</Text>
                <Group>
                  <FileButton onChange={handleUpload} accept="image/*,application/pdf">
                    {(props) => (
                      <Button leftSection={<IconUpload size={16} />} {...props} disabled={uploading}>
                        {uploading ? t('uploading') : t('selectFile')}
                      </Button>
                    )}
                  </FileButton>
                  {uploading && <Progress value={progress} style={{ width: 200 }} />}
                </Group>
              </div>
            )}

            <Text size="sm" c="dimmed">
              Catatan: Silakan unggah bukti transfer ATM/Mobile Banking Anda di sini.
            </Text>
          </Stack>
        </Modal>
      </Container>
    </AppLayout>
  );
}
