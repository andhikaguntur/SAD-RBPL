'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import {
  Container,
  Title,
  Text,
  Paper,
  Stack,
  Group,
  Badge,
  Button,
  Tabs,
} from '@mantine/core';
import {
  IconBell,
  IconTruck,
  IconFileInvoice,
  IconAlertCircle,
  IconCheck,
  IconX,
} from '@tabler/icons-react';
import AppLayout from '../../../components/AppLayout';
import { useAuth } from '../../../hooks/useAuth';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'rental' | 'invoice' | 'alert' | 'system';
  timestamp: string;
  read: boolean;
  icon: React.ReactNode;
}

const mockNotifications: Notification[] = [
  {
    id: 'n1',
    title: 'Pengiriman Berhasil',
    message: 'Genset 50kVA telah tiba di lokasi Anda. Tim teknis siap membantu setup.',
    type: 'rental',
    timestamp: '2 jam yang lalu',
    read: false,
    icon: <IconTruck size={20} />,
  },
  {
    id: 'n2',
    title: 'Invoice Baru',
    message: 'Invoice INV-2026-045 sebesar Rp 2.500.000 sudah dibuat. Jatuh tempo 7 hari.',
    type: 'invoice',
    timestamp: '1 hari yang lalu',
    read: false,
    icon: <IconFileInvoice size={20} />,
  },
  {
    id: 'n3',
    title: 'Pemeliharaan Mesin',
    message: 'Mesin memerlukan pemeliharaan berkala. Hubungi tim teknis kami.',
    type: 'alert',
    timestamp: '2 hari yang lalu',
    read: true,
    icon: <IconAlertCircle size={20} />,
  },
  {
    id: 'n4',
    title: 'Penawaran Diterima',
    message: 'Penawaran harga untuk Genset 100kVA telah diterima. Silakan tinjau di Dashboard.',
    type: 'system',
    timestamp: '3 hari yang lalu',
    read: true,
    icon: <IconCheck size={20} />,
  },
  {
    id: 'n5',
    title: 'Pembayaran Dikonfirmasi',
    message: 'Pembayaran Anda sebesar Rp 15.500.000 telah dikonfirmasi.',
    type: 'invoice',
    timestamp: '1 minggu yang lalu',
    read: true,
    icon: <IconCheck size={20} />,
  },
];

export default function NotificationsPage() {
  const router = useRouter();
  const locale = useLocale();
  const { isAuthenticated } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [activeTab, setActiveTab] = useState<string | null>('all');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(`/${locale}/login`);
    }
  }, [isAuthenticated, router, locale]);

  if (!isAuthenticated) return null;

  const unreadCount = notifications.filter((n) => !n.read).length;
  const allNotifications = notifications;
  const unreadNotifications = notifications.filter((n) => !n.read);

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'rental':
        return 'blue';
      case 'invoice':
        return 'green';
      case 'alert':
        return 'red';
      case 'system':
        return 'violet';
      default:
        return 'gray';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'rental':
        return 'Sewa';
      case 'invoice':
        return 'Invoice';
      case 'alert':
        return 'Peringatan';
      case 'system':
        return 'Sistem';
      default:
        return 'Lainnya';
    }
  };

  const renderNotification = (notification: Notification) => (
    <Paper
      key={notification.id}
      withBorder
      p="md"
      radius="md"
      style={{
        backgroundColor: notification.read ? 'white' : '#f0f7ff',
        borderLeft: `4px solid ${notification.read ? '#e0e0e0' : '#228be6'}`,
      }}
    >
      <Group justify="space-between" mb="xs">
        <Group gap="sm">
          <div style={{ color: getTypeColor(notification.type) }}>
            {notification.icon}
          </div>
          <div style={{ flex: 1 }}>
            <Group gap="xs" mb="xs">
              <Text fw={600}>{notification.title}</Text>
              <Badge size="sm" variant="light" color={getTypeColor(notification.type)}>
                {getTypeLabel(notification.type)}
              </Badge>
              {!notification.read && (
                <Badge size="sm" variant="dot" color="blue">
                  Baru
                </Badge>
              )}
            </Group>
            <Text size="sm" c="dimmed">
              {notification.message}
            </Text>
            <Text size="xs" c="dimmed" mt="xs">
              {notification.timestamp}
            </Text>
          </div>
        </Group>

        <Group gap="xs">
          {!notification.read && (
            <Button
              variant="subtle"
              size="xs"
              onClick={() => handleMarkAsRead(notification.id)}
            >
              <IconCheck size={16} />
            </Button>
          )}
          <Button
            variant="subtle"
            size="xs"
            color="red"
            onClick={() => handleDelete(notification.id)}
          >
            <IconX size={16} />
          </Button>
        </Group>
      </Group>
    </Paper>
  );

  return (
    <AppLayout>
      <Container size="md" py="xl">
        <Group justify="space-between" mb="xl">
          <div>
            <Title order={2}>Notifikasi</Title>
            <Text c="dimmed" size="sm" mt="xs">
              Kelola semua pemberitahuan dari kami
            </Text>
          </div>
          {unreadCount > 0 && (
            <Button
              variant="light"
              size="sm"
              onClick={handleMarkAllAsRead}
            >
              Tandai Semua Sebagai Dibaca
            </Button>
          )}
        </Group>

        <Tabs value={activeTab} onChange={setActiveTab} mb="xl">
          <Tabs.List>
            <Tabs.Tab value="all" leftSection={<IconBell size={14} />}>
              Semua ({allNotifications.length})
            </Tabs.Tab>
            <Tabs.Tab value="unread" leftSection={<IconAlertCircle size={14} />}>
              Belum Dibaca ({unreadCount})
            </Tabs.Tab>
            <Tabs.Tab value="rentals" leftSection={<IconTruck size={14} />}>
              Sewa
            </Tabs.Tab>
            <Tabs.Tab value="invoices" leftSection={<IconFileInvoice size={14} />}>
              Invoice
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="all" pt="xl">
            <Stack gap="md">
              {allNotifications.length === 0 ? (
                <Paper withBorder p="lg" radius="md" ta="center">
                  <IconBell size={48} style={{ margin: '0 auto', opacity: 0.3 }} />
                  <Text c="dimmed" mt="md">Tidak ada notifikasi</Text>
                </Paper>
              ) : (
                allNotifications.map(renderNotification)
              )}
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="unread" pt="xl">
            <Stack gap="md">
              {unreadNotifications.length === 0 ? (
                <Paper withBorder p="lg" radius="md" ta="center">
                  <IconCheck size={48} style={{ margin: '0 auto', opacity: 0.3 }} />
                  <Text c="dimmed" mt="md">Tidak ada notifikasi baru</Text>
                </Paper>
              ) : (
                unreadNotifications.map(renderNotification)
              )}
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="rentals" pt="xl">
            <Stack gap="md">
              {allNotifications.filter((n) => n.type === 'rental').length === 0 ? (
                <Paper withBorder p="lg" radius="md" ta="center">
                  <IconTruck size={48} style={{ margin: '0 auto', opacity: 0.3 }} />
                  <Text c="dimmed" mt="md">Tidak ada notifikasi sewa</Text>
                </Paper>
              ) : (
                allNotifications
                  .filter((n) => n.type === 'rental')
                  .map(renderNotification)
              )}
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="invoices" pt="xl">
            <Stack gap="md">
              {allNotifications.filter((n) => n.type === 'invoice').length === 0 ? (
                <Paper withBorder p="lg" radius="md" ta="center">
                  <IconFileInvoice size={48} style={{ margin: '0 auto', opacity: 0.3 }} />
                  <Text c="dimmed" mt="md">Tidak ada notifikasi invoice</Text>
                </Paper>
              ) : (
                allNotifications
                  .filter((n) => n.type === 'invoice')
                  .map(renderNotification)
              )}
            </Stack>
          </Tabs.Panel>
        </Tabs>
      </Container>
    </AppLayout>
  );
}
