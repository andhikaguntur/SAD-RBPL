'use client';

import { useAuth } from '../../../hooks/useAuth';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
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

// Mock data
const mockStats = {
  activeRentals: 2,
  pendingQuotes: 1,
  unpaidInvoices: 3,
  totalSpent: 15500000,
};

const mockRecentRentals = [
  {
    id: 'r1',
    machine: 'Genset 50kVA',
    startDate: '2026-03-20',
    endDate: '2026-03-27',
    status: 'active',
    location: 'Medan, Sumatera Utara',
  },
  {
    id: 'r2',
    machine: 'Loader 3T',
    startDate: '2026-03-15',
    endDate: '2026-03-18',
    status: 'completed',
    location: 'Jakarta, DKI Jakarta',
  },
];

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'id';
  const t = useTranslations('Dashboard');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(`/${locale}/login`);
    }
  }, [isAuthenticated, router, locale]);

  if (!isAuthenticated) return null;

  return (
    <AppLayout>
      <Container size="lg" py="xl">
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
              {mockStats.activeRentals}
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
              {mockStats.pendingQuotes}
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
              {mockStats.unpaidInvoices}
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
              Rp {(mockStats.totalSpent / 1000000).toFixed(1)}M
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
            {mockRecentRentals.length === 0 ? (
              <Text c="dimmed" ta="center" py="lg">
                Belum ada aktivitas terbaru
              </Text>
            ) : (
              mockRecentRentals.map((rental) => (
                <Card key={rental.id} withBorder p="md" radius="md">
                  <Group justify="space-between" mb="xs">
                    <div>
                      <Text fw={600}>{rental.machine}</Text>
                      <Text size="sm" c="dimmed">
                        {rental.location}
                      </Text>
                    </div>
                    <Badge
                      color={rental.status === 'active' ? 'green' : 'gray'}
                      variant="light"
                    >
                      {rental.status === 'active' ? t('active') : t('completed')}
                    </Badge>
                  </Group>
                  <Text size="sm" c="dimmed">
                    {rental.startDate} → {rental.endDate}
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
