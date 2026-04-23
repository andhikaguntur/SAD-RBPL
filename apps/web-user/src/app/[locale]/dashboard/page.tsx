'use client';

import { useAuth } from '../../../hooks/useAuth';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import {
  Container,
  Title,
  Text,
  SimpleGrid,
  Card,
  Button,
  Group,
  Stack,
  Badge,
  ThemeIcon,
  LoadingOverlay,
  Paper,
} from '@mantine/core';
import {
  IconPlus,
  IconFileInvoice,
  IconTruck,
  IconClipboardCheck,
  IconClock,
  IconCircleCheck,
  IconPackage,
  IconMapPin,
} from '@tabler/icons-react';
import AppLayout from '../../../components/AppLayout';

interface DashboardStats {
  activeRentals: number;
  pendingQuotes: number;
  unpaidInvoices: number;
  totalSpent: number;
  recentActivities: any[];
}

interface DeliveryStatus {
  id: string;
  idPermintaan: string;
  tanggalKirim: string;
  sopir: string;
  status: string;
  permintaan?: { pelanggan: string };
}

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'id';
  const t = useTranslations('Dashboard');

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [deliveries, setDeliveries] = useState<DeliveryStatus[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(`/${locale}/login`);
    } else {
      fetchData();
    }
  }, [isAuthenticated, router, locale]);

  const fetchData = async () => {
    try {
      const [statsRes, deliveriesRes] = await Promise.all([
        fetch(`http://localhost:4000/api/dashboard/user/${user?.name || 'User'}`),
        fetch(`http://localhost:4000/api/pengiriman`),
      ]);
      const statsJson = await statsRes.json();
      const deliveriesJson = await deliveriesRes.json();

      if (statsJson.success) setStats(statsJson.data);
      if (deliveriesJson.success) {
        setDeliveries(
          deliveriesJson.data.filter(
            (d: DeliveryStatus) => d.permintaan?.pelanggan === user?.name
          )
        );
      }
    } catch (err) {
      console.error('Failed to fetch dashboard data', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) return null;

  const getDeliveryColor = (status: string) => {
    if (status === 'Dikirim') return 'blue';
    if (status === 'Disewa') return 'green';
    if (status === 'Selesai') return 'gray';
    return 'orange';
  };

  const getDeliveryLabel = (status: string) => {
    if (status === 'Dikirim') return '🚚 Dalam Pengiriman';
    if (status === 'Disewa') return '✅ Aktif Disewa';
    if (status === 'Selesai') return '📦 Selesai';
    return status;
  };

  return (
    <AppLayout>
      <Container size="lg" py="xl" pos="relative">
        <LoadingOverlay visible={loading} />

        {/* Welcome Header */}
        <div style={{ marginBottom: 32 }}>
          <Title order={1} mb="xs">
            {t('welcome', { name: user?.name || 'Pengguna' })}
          </Title>
          <Text c="dimmed" size="lg">
            {t('description')}
          </Text>
        </div>

        {/* Quick Stats */}
        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} mb="xl" spacing="lg">
          <Card withBorder p="lg" radius="md">
            <Group justify="space-between" mb="xs">
              <Text size="sm" fw={500} c="dimmed">{t('activeRentals')}</Text>
              <ThemeIcon size="lg" color="blue" variant="light"><IconTruck size={20} /></ThemeIcon>
            </Group>
            <Text fw={700} size="xl">{stats?.activeRentals || 0}</Text>
          </Card>

          <Card withBorder p="lg" radius="md">
            <Group justify="space-between" mb="xs">
              <Text size="sm" fw={500} c="dimmed">{t('pendingQuotes')}</Text>
              <ThemeIcon size="lg" color="yellow" variant="light"><IconClock size={20} /></ThemeIcon>
            </Group>
            <Text fw={700} size="xl">{stats?.pendingQuotes || 0}</Text>
          </Card>

          <Card withBorder p="lg" radius="md">
            <Group justify="space-between" mb="xs">
              <Text size="sm" fw={500} c="dimmed">{t('unpaidInvoices')}</Text>
              <ThemeIcon size="lg" color="red" variant="light"><IconFileInvoice size={20} /></ThemeIcon>
            </Group>
            <Text fw={700} size="xl">{stats?.unpaidInvoices || 0}</Text>
          </Card>

          <Card withBorder p="lg" radius="md">
            <Group justify="space-between" mb="xs">
              <Text size="sm" fw={500} c="dimmed">{t('totalSpent')}</Text>
              <ThemeIcon size="lg" color="green" variant="light"><IconCircleCheck size={20} /></ThemeIcon>
            </Group>
            <Text fw={700} size="xl">
              Rp {((stats?.totalSpent || 0) / 1000000).toFixed(1)}M
            </Text>
          </Card>
        </SimpleGrid>

        {/* Quick Actions */}
        <Card withBorder p="lg" radius="md" mb="xl">
          <Title order={3} mb="md">{t('quickActions')}</Title>
          <Group gap="md">
            <Button leftSection={<IconPlus size={16} />} color="blue" onClick={() => router.push(`/${locale}/rent`)}>
              {t('newRentalRequest')}
            </Button>
            <Button variant="outline" leftSection={<IconClipboardCheck size={16} />} onClick={() => router.push(`/${locale}/quotations`)}>
              {t('viewQuotations')}
            </Button>
            <Button variant="outline" leftSection={<IconFileInvoice size={16} />} onClick={() => router.push(`/${locale}/billing`)}>
              {t('viewInvoices')}
            </Button>
          </Group>
        </Card>

        {/* Delivery Status */}
        <Card withBorder p="lg" radius="md" mb="xl">
          <Group justify="space-between" mb="md">
            <Title order={3}>Status Pengiriman</Title>
            <ThemeIcon color="blue" variant="light" size="lg"><IconTruck size={20} /></ThemeIcon>
          </Group>
          <Stack gap="sm">
            {deliveries.length === 0 ? (
              <Paper p="md" bg="gray.0" radius="md" ta="center">
                <IconPackage size={32} color="gray" style={{ opacity: 0.4, margin: '0 auto 8px' }} />
                <Text c="dimmed" size="sm">Tidak ada pengiriman aktif saat ini</Text>
              </Paper>
            ) : (
              deliveries.map((d) => (
                <Paper key={d.id} withBorder p="md" radius="md"
                  style={{ borderLeft: `4px solid var(--mantine-color-${getDeliveryColor(d.status)}-5)` }}
                >
                  <Group justify="space-between">
                    <Group gap="sm">
                      <ThemeIcon variant="light" color={getDeliveryColor(d.status)} size="md">
                        <IconTruck size={16} />
                      </ThemeIcon>
                      <div>
                        <Text fw={700} size="sm">{d.idPermintaan}</Text>
                        <Group gap="xs">
                          <IconMapPin size={12} color="gray" />
                          <Text size="xs" c="dimmed">Sopir: {d.sopir} · {d.tanggalKirim}</Text>
                        </Group>
                      </div>
                    </Group>
                    <Badge color={getDeliveryColor(d.status)} variant="light">
                      {getDeliveryLabel(d.status)}
                    </Badge>
                  </Group>
                </Paper>
              ))
            )}
          </Stack>
        </Card>

        {/* Recent Activity */}
        <Card withBorder p="lg" radius="md">
          <Title order={3} mb="md">{t('recentRentals')}</Title>
          <Stack gap="md">
            {(!stats?.recentActivities || stats.recentActivities.length === 0) ? (
              <Text c="dimmed" ta="center" py="lg">Belum ada aktivitas terbaru</Text>
            ) : (
              stats.recentActivities.map((rental) => (
                <Card key={rental.id} withBorder p="md" radius="md">
                  <Group justify="space-between" mb="xs">
                    <div>
                      <Text fw={600}>{rental.id}</Text>
                      <Text size="sm" c="dimmed">{rental.location}</Text>
                    </div>
                    <Badge
                      color={
                        rental.status === 'Disewa' || rental.status === 'Diterima'
                          ? 'green'
                          : rental.status === 'Menunggu'
                            ? 'yellow'
                            : 'gray'
                      }
                      variant="light"
                    >
                      {rental.status}
                    </Badge>
                  </Group>
                  <Text size="sm" c="dimmed">{rental.date}</Text>
                </Card>
              ))
            )}
          </Stack>
        </Card>
      </Container>
    </AppLayout>
  );
}
