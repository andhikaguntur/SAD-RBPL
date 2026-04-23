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
  status: 'pending' | 'accepted' | 'rejected' | 'expired';
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

const mockQuotations: Quotation[] = [
  {
    id: 'q1',
    ref: 'QUOTE-2026-001',
    machine: 'Genset 50kVA',
    duration: 7,
    totalPrice: 3500000,
    status: 'pending',
    createdDate: '2026-04-15',
    expiryDate: '2026-04-22',
    details: {
      machineType: 'Diesel Genset',
      machineCapacity: '50 kVA',
      rentalPeriod: '7 hari',
      deliveryLocation: 'Jakarta, DKI Jakarta',
      dailyRate: 500000,
      maintenanceFee: 0,
    },
  },
  {
    id: 'q2',
    ref: 'QUOTE-2026-002',
    machine: 'Genset 100kVA',
    duration: 14,
    totalPrice: 11200000,
    status: 'accepted',
    createdDate: '2026-04-10',
    expiryDate: '2026-04-24',
    details: {
      machineType: 'Diesel Genset',
      machineCapacity: '100 kVA',
      rentalPeriod: '14 hari',
      deliveryLocation: 'Bandung, Jawa Barat',
      dailyRate: 800000,
      maintenanceFee: 0,
    },
  },
  {
    id: 'q3',
    ref: 'QUOTE-2026-003',
    machine: 'Loader 3T',
    duration: 5,
    totalPrice: 1750000,
    status: 'rejected',
    createdDate: '2026-04-05',
    expiryDate: '2026-04-12',
    details: {
      machineType: 'Wheel Loader',
      machineCapacity: '3 Ton',
      rentalPeriod: '5 hari',
      deliveryLocation: 'Surabaya, Jawa Timur',
      dailyRate: 350000,
      maintenanceFee: 0,
    },
  },
];

export default function QuotationsPage() {
  const router = useRouter();
  const locale = useLocale();
  const { isAuthenticated } = useAuth();
  const t = useTranslations('Quotations');
  const [quotations, setQuotations] = useState<Quotation[]>(mockQuotations);
  const [activeTab, setActiveTab] = useState<string | null>('pending');
  const [selectedQuote, setSelectedQuote] = useState<Quotation | null>(null);
  const [openedModal, setOpenedModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(`/${locale}/login`);
    }
  }, [isAuthenticated, router, locale]);

  if (!isAuthenticated) return null;

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'pending':
        return 'yellow';
      case 'accepted':
        return 'green';
      case 'rejected':
        return 'red';
      case 'expired':
        return 'gray';
      default:
        return 'blue';
    }
  };

  const getStatusLabel = (status: string): string => {
    switch (status) {
      case 'pending':
        return t('statusPending');
      case 'accepted':
        return t('statusAccepted');
      case 'rejected':
        return t('statusRejected');
      case 'expired':
        return t('statusExpired');
      default:
        return 'Unknown';
    }
  };

  const getStatusIcon = (status: string): React.ReactNode => {
    switch (status) {
      case 'pending':
        return <IconClock size={16} />;
      case 'accepted':
        return <IconCheck size={16} />;
      case 'rejected':
        return <IconX size={16} />;
      case 'expired':
        return <IconAlertCircle size={16} />;
      default:
        return null;
    }
  };

  const handleAcceptQuote = async (id: string): Promise<void> => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setQuotations((prev) =>
        prev.map((q) =>
          q.id === id ? { ...q, status: 'accepted' as const } : q
        )
      );

      showNotification({
        title: t('acceptedTitle'),
        message: t('acceptedMessage'),
        color: 'green',
        icon: <IconCheck size={16} />,
      });

      setOpenedModal(false);
      router.push(`/${locale}/billing`);
    } catch {
      showNotification({
        title: t('error'),
        message: t('acceptErrorMessage'),
        color: 'red',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRejectQuote = async (id: string): Promise<void> => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setQuotations((prev) =>
        prev.map((q) =>
          q.id === id ? { ...q, status: 'rejected' as const } : q
        )
      );

      showNotification({
        title: t('rejectedTitle'),
        message: t('rejectedMessage'),
        color: 'orange',
      });

      setOpenedModal(false);
    } catch {
      showNotification({
        title: t('error'),
        message: t('rejectErrorMessage'),
        color: 'red',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadPDF = (ref: string): void => {
    showNotification({
      title: t('downloadStarted'),
      message: t('downloadMessage', { ref }),
      color: 'blue',
    });
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
        <Badge
          leftSection={getStatusIcon(quotation.status)}
          color={getStatusColor(quotation.status)}
        >
          {getStatusLabel(quotation.status)}
        </Badge>
      </Group>

      <Divider my="md" />

      <Group justify="space-between" mb="md">
        <div>
          <Text size="sm" c="dimmed">
            Total
          </Text>
          <Text fw={700} size="lg">
            Rp {quotation.totalPrice.toLocaleString('id-ID')}
          </Text>
        </div>
        <div>
          <Text size="sm" c="dimmed">
            Periode
          </Text>
          <Text fw={600}>
            {quotation.duration} hari
          </Text>
        </div>
        <div>
          <Text size="sm" c="dimmed">
            Berlaku Hingga
          </Text>
          <Text fw={600}>
            {quotation.expiryDate}
          </Text>
        </div>
      </Group>

      <Group grow>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleDownloadPDF(quotation.ref)}
        >
          <IconDownload size={16} />
        </Button>
        <Button
          variant="light"
          size="sm"
          onClick={() => {
            setSelectedQuote(quotation);
            setOpenedModal(true);
          }}
        >
          <IconExternalLink size={16} />
        </Button>
      </Group>
    </Card>
  );

  const pendingQuotes = quotations.filter((q) => q.status === 'pending');
  const acceptedQuotes = quotations.filter((q) => q.status === 'accepted');
  const rejectedQuotes = quotations.filter((q) => q.status === 'rejected');
  const allQuotes = quotations;

  return (
    <AppLayout>
      <Container size="lg" py="xl">
        <div style={{ marginBottom: 32 }}>
          <Title order={2} mb="xs">
            {t('title')}
          </Title>
          <Text c="dimmed">
            {t('description')}
          </Text>
        </div>

        <Tabs value={activeTab} onChange={setActiveTab} mb="xl">
          <Tabs.List>
            <Tabs.Tab value="pending" leftSection={<IconClock size={14} />}>
              {t('pendingTab')} ({pendingQuotes.length})
            </Tabs.Tab>
            <Tabs.Tab value="accepted" leftSection={<IconCheck size={14} />}>
              {t('acceptedTab')} ({acceptedQuotes.length})
            </Tabs.Tab>
            <Tabs.Tab value="rejected" leftSection={<IconX size={14} />}>
              {t('rejectedTab')} ({rejectedQuotes.length})
            </Tabs.Tab>
            <Tabs.Tab value="all" leftSection={<IconFileText size={14} />}>
              {t('allTab')} ({allQuotes.length})
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="pending" pt="xl">
            <Grid gutter="md">
              {pendingQuotes.length === 0 ? (
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
              {acceptedQuotes.length === 0 ? (
                <Grid.Col span={12}>
                  <Paper withBorder p="lg" radius="md" ta="center">
                    <Text c="dimmed">Tidak ada penawaran yang diterima</Text>
                  </Paper>
                </Grid.Col>
              ) : (
                acceptedQuotes.map((q) => (
                  <Grid.Col key={q.id} span={{ base: 12, sm: 6, md: 4 }}>
                    {renderQuotationCard(q)}
                  </Grid.Col>
                ))
              )}
            </Grid>
          </Tabs.Panel>

          <Tabs.Panel value="rejected" pt="xl">
            <Grid gutter="md">
              {rejectedQuotes.length === 0 ? (
                <Grid.Col span={12}>
                  <Paper withBorder p="lg" radius="md" ta="center">
                    <Text c="dimmed">Tidak ada penawaran yang ditolak</Text>
                  </Paper>
                </Grid.Col>
              ) : (
                rejectedQuotes.map((q) => (
                  <Grid.Col key={q.id} span={{ base: 12, sm: 6, md: 4 }}>
                    {renderQuotationCard(q)}
                  </Grid.Col>
                ))
              )}
            </Grid>
          </Tabs.Panel>

          <Tabs.Panel value="all" pt="xl">
            <Grid gutter="md">
              {allQuotes.length === 0 ? (
                <Grid.Col span={12}>
                  <Paper withBorder p="lg" radius="md" ta="center">
                    <Text c="dimmed">{t('noQuotations')}</Text>
                  </Paper>
                </Grid.Col>
              ) : (
                allQuotes.map((q) => (
                  <Grid.Col key={q.id} span={{ base: 12, sm: 6, md: 4 }}>
                    {renderQuotationCard(q)}
                  </Grid.Col>
                ))
              )}
            </Grid>
          </Tabs.Panel>
        </Tabs>
      </Container>

      {/* Quotation Detail Modal */}
      <Modal
        opened={openedModal}
        onClose={() => setOpenedModal(false)}
        title={selectedQuote?.ref || t('detailModal')}
        size="lg"
      >
        {selectedQuote && (
          <Stack gap="md">
            {/* Header */}
            <Group justify="space-between">
              <div>
                <Text fw={600}>{selectedQuote.machine}</Text>
                <Text size="sm" c="dimmed">
                  {selectedQuote.ref}
                </Text>
              </div>
              <Badge
                leftSection={getStatusIcon(selectedQuote.status)}
                color={getStatusColor(selectedQuote.status)}
              >
                {getStatusLabel(selectedQuote.status)}
              </Badge>
            </Group>

            <Divider />

            {/* Details Grid */}
            <Grid gutter="md">
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <div>
                  <Text size="sm" c="dimmed">
                    {t('machineType')}
                  </Text>
                  <Text fw={600}>{selectedQuote.details.machineType}</Text>
                </div>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <div>
                  <Text size="sm" c="dimmed">
                    {t('capacity')}
                  </Text>
                  <Text fw={600}>{selectedQuote.details.machineCapacity}</Text>
                </div>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <div>
                  <Text size="sm" c="dimmed">
                    {t('rentalPeriod')}
                  </Text>
                  <Text fw={600}>{selectedQuote.details.rentalPeriod}</Text>
                </div>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <div>
                  <Text size="sm" c="dimmed">
                    {t('deliveryLocation')}
                  </Text>
                  <Text fw={600}>{selectedQuote.details.deliveryLocation}</Text>
                </div>
              </Grid.Col>
            </Grid>

            <Divider />

            {/* Pricing */}
            <Stack gap="xs">
              <Group justify="space-between">
                <Text>{t('dailyRate')}</Text>
                <Text fw={600}>
                  Rp {selectedQuote.details.dailyRate.toLocaleString('id-ID')}
                </Text>
              </Group>
              <Group justify="space-between">
                <Text>{t('maintenanceFee')}</Text>
                <Text fw={600}>
                  Rp {selectedQuote.details.maintenanceFee.toLocaleString('id-ID')}
                </Text>
              </Group>
              <Divider />
              <Group justify="space-between">
                <Text fw={700} size="lg">
                  {t('total')}
                </Text>
                <Text fw={700} size="lg" color="blue">
                  Rp {selectedQuote.totalPrice.toLocaleString('id-ID')}
                </Text>
              </Group>
            </Stack>

            {/* Dates */}
            <Group justify="space-between" p="md" bg="gray.0">
              <div>
                <Text size="sm" c="dimmed">
                  {t('created')}
                </Text>
                <Text fw={600}>{selectedQuote.createdDate}</Text>
              </div>
              <div>
                <Text size="sm" c="dimmed">
                  {t('expiryDate')}
                </Text>
                <Text fw={600}>{selectedQuote.expiryDate}</Text>
              </div>
            </Group>

            {/* Actions */}
            {selectedQuote.status === 'pending' && (
              <Group justify="flex-end" mt="xl">
                <Button
                  variant="outline"
                  onClick={() => handleRejectQuote(selectedQuote.id)}
                  loading={isLoading}
                >
                  {t('reject')}
                </Button>
                <Button
                  onClick={() => handleAcceptQuote(selectedQuote.id)}
                  loading={isLoading}
                >
                  {t('accept')}
                </Button>
              </Group>
            )}
          </Stack>
        )}
      </Modal>
    </AppLayout>
  );
}
