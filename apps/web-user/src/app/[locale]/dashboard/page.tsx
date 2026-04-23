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
} from '@mantine/core';
import {
  IconPlus,
  IconFileInvoice,
  IconTruck,
  IconClipboardCheck,
  IconClock,
  IconCircleCheck
} from '@tabler/icons-react';
import AppLayout from '../../../components/AppLayout';

interface DashboardStats {
  activeRentals: number;
  pendingQuotes: number;
  unpaidInvoices: number;
  totalSpent: number;
  recentActivities: any[];
}

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'id';
  const t = useTranslations('Dashboard');

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(`/${locale}/login`);
    } else {
      fetchStats();
    }
  }, [isAuthenticated, router, locale]);

  const fetchStats = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/dashboard/user/${user?.name || 'User'}`);
      const json = await res.json();
      if (json.success) {
        setStats(json.data);
      }
    } catch (err) {
      console.error('Failed to fetch user stats', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) return null;

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
              <Text size="sm" fw={500} c="dimmed">
                {t('activeRentals')}
              </Text>
              <ThemeIcon size="lg" color="blue" variant="light">
                <IconTruck size={20} />
              </ThemeIcon>
            </Group>
            <Text fw={700} size="xl">
              {stats?.activeRentals || 0}
            </Text>
          </Card>

          <Card withBorder p="lg" radius="md">
            <Group justify="space-between" mb="xs">
              <Text size="sm" fw={500} c="dimmed">
                {t('pendingQuotes')}
              </Text>
              <ThemeIcon size="lg" color="yellow" variant="light">
                <IconClock size={20} />
              </ThemeIcon>
            </Group>
            <Text fw={700} size="xl">
              {stats?.pendingQuotes || 0}
            </Text>
          </Card>

          <Card withBorder p="lg" radius="md">
            <Group justify="space-between" mb="xs">
              <Text size="sm" fw={500} c="dimmed">
                {t('unpaidInvoices')}
              </Text>
              <ThemeIcon size="lg" color="red" variant="light">
                <IconFileInvoice size={20} />
              </ThemeIcon>
            </Group>
            <Text fw={700} size="xl">
              {stats?.unpaidInvoices || 0}
            </Text>
          </Card>

          <Card withBorder p="lg" radius="md">
            <Group justify="space-between" mb="xs">
              <Text size="sm" fw={500} c="dimmed">
                {t('totalSpent')}
              </Text>
              <ThemeIcon size="lg" color="green" variant="light">
                <IconCircleCheck size={20} />
              </ThemeIcon>
            </Group>
            <Text fw={700} size="xl">
              Rp {((stats?.totalSpent || 0) / 1000000).toFixed(1)}M
            </Text>
          </Card>
        </SimpleGrid>

        {/* Quick Actions */}
        <Card withBorder p="lg" radius="md" mb="xl">
          <Title order={3} mb="md">
            {t('quickActions')}
          </Title>
          <Group gap="md">
            <Button
              leftSection={<IconPlus size={16} />}
              color="blue"
              onClick={() => router.push(`/${locale}/rent`)}
            >
              {t('newRentalRequest')}
            </Button>
            <Button
              variant="outline"
              leftSection={<IconClipboardCheck size={16} />}
              onClick={() => router.push(`/${locale}/quotations`)}
            >
              {t('viewQuotations')}
            </Button>
            <Button
              variant="outline"
              leftSection={<IconFileInvoice size={16} />}
              onClick={() => router.push(`/${locale}/billing`)}
            >
              {t('viewInvoices')}
            </Button>
          </Group>
        </Card>

        {/* Recent Activity */}
        <Card withBorder p="lg" radius="md">
          <Title order={3} mb="md">
            {t('recentRentals')}
          </Title>
          <Stack gap="md">
            {(!stats?.recentActivities || stats.recentActivities.length === 0) ? (
              <Text c="dimmed" ta="center" py="lg">
                Belum ada aktivitas terbaru
              </Text>
            ) : (
              stats.recentActivities.map((rental) => (
                <Card key={rental.id} withBorder p="md" radius="md">
                  <Group justify="space-between" mb="xs">
                    <div>
                      <Text fw={600}>{rental.id}</Text>
                      <Text size="sm" c="dimmed">
                        {rental.location}
                      </Text>
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
                  <Text size="sm" c="dimmed">
                    {rental.date}
                  </Text>
                </Card>
              ))
            )}
          </Stack>
        </Card>
      </Container>
    </AppLayout>
  );
}
