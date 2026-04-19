'use client';

import { useState, useRef } from 'react';
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
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconReceipt, IconUpload, IconCheck } from '@tabler/icons-react';
import { compressImageFile, fileToBase64 } from '../../../lib/compress';
import AppLayout from '../../../components/AppLayout';
import { useAuth } from '../../../hooks/useAuth';
import { useEffect } from 'react';

type Invoice = { id: string; ref: string; date: string; total: number; status: string };

const mockInvoices: Invoice[] = [
  { id: 'inv1', ref: 'INV-2026-001', date: '2026-03-01', total: 1500000, status: 'Unpaid' },
  { id: 'inv2', ref: 'INV-2026-002', date: '2026-02-20', total: 700000, status: 'Paid' },
];

export default function BillingPage() {
  const router = useRouter();
  const locale = useLocale();
  const { isAuthenticated } = useAuth();
  const t = useTranslations('Billing');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(`/${locale}/login`);
    }
  }, [isAuthenticated, router, locale]);

  if (!isAuthenticated) return null;

  const [invoices] = useState<Invoice[]>(mockInvoices);
  const [opened, setOpened] = useState(false);
  const [active, setActive] = useState<Invoice | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const mountedRef = useRef(true);

  const openInvoice = (inv: Invoice) => {
    setActive(inv);
    setOpened(true);
  };

  const handleUpload = async (file: File | null) => {
    if (!file || !active) return;
    setUploading(true);
    setProgress(10);

    // compress image (RNF-006)
    const compressed = await compressImageFile(file, 1280, 0.7);
    setProgress(50);

    // convert to base64 to simulate storage
    const b64 = await fileToBase64(compressed);
    setProgress(90);

    // simulate saving to server/localStorage
    try {
      localStorage.setItem(`invoice_upload_${active.id}`, JSON.stringify({ name: file.name, content: b64, uploadedAt: new Date().toISOString() }));
      showNotification({ title: t('uploadSuccessTitle'), message: t('uploadSuccessMessage'), color: 'green', icon: <IconCheck size={16} /> });
      setProgress(100);
    } catch (e) {
      showNotification({ title: t('uploadErrorTitle'), message: t('uploadErrorMessage'), color: 'red' });
    }

    // small delay so user sees progress
    await new Promise((r) => setTimeout(r, 400));
    if (mountedRef.current) setUploading(false);
  };

  return (
    <AppLayout>
      <Container size="lg" py="xl">
        <Title order={2} mb="sm">{t('title')}</Title>
        <Text c="dimmed" mb="md">{t('description')}</Text>

        <Stack gap="md">
          {invoices.map((inv) => (
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
                  <Badge>{`Rp ${inv.total.toLocaleString()}`}</Badge>
                  <Button variant="subtle" onClick={() => openInvoice(inv)}>{t('view')}</Button>
                  <Text c={inv.status === 'Paid' ? 'green' : 'orange'}>{inv.status}</Text>
                </Group>
              </Group>
            </Paper>
          ))}
        </Stack>

        <Modal opened={opened} onClose={() => setOpened(false)} title={active?.ref ?? t('invoiceModal')} size="lg">
          <Stack gap="md">
            <Group justify="apart">
              <div>
                <Text fw={700}>{active?.ref}</Text>
                <Text size="sm" c="dimmed">{t('date')}: {active?.date}</Text>
              </div>
              <Badge>{active ? `Rp ${active.total.toLocaleString()}` : ''}</Badge>
            </Group>

            <Text c="dimmed">{t('status')}: {active?.status}</Text>

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

            <div>
              <Text size="sm" c="dimmed">{t('note')}</Text>
            </div>
          </Stack>
        </Modal>
      </Container>
    </AppLayout>
  );
}
