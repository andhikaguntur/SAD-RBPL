'use client'

// removed unused Paper, ActionIcon, Avatar, Grid and unused icons
import { AppShell, Container, Stack, Group, Box, Title, Text, Button, Badge, Card, Tabs, Table, Center, Drawer, Timeline } from '@mantine/core';
// keep icons we actually use: Eye, Download, Phone, MapPin, Calendar, MessageShare, Clock, Check
import { IconEye, IconDownload, IconPhone, IconMapPin, IconCalendar, IconMessageShare, IconClock, IconCheck } from '@tabler/icons-react';
import { Navbar } from '../../../components/layout/Navbar';
import { useState } from 'react';
import { notifications } from '@mantine/notifications';

export type Order = {
  id: string;
  number: string;
  date: string;
  dueDate: string;
  status: 'pending' | 'confirmed' | 'delivered' | 'completed' | 'cancelled';
  total: number;
  items: { name: string; quantity: number; duration: number; price: number }[];
  location: string;
  contact: string;
  notes: string;
};

export default function Orders() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [drawerOpened, setDrawerOpened] = useState(false);

  const orders: Order[] = [
    {
      id: '1',
      number: 'ORD-2024-001',
      date: '2024-03-05',
      dueDate: '2024-03-10',
      status: 'delivered',
      total: 10500000,
      items: [
        { name: 'Genset 50 kVA', quantity: 1, duration: 3, price: 2500000 },
        { name: 'Excavator 330D', quantity: 1, duration: 2, price: 5000000 },
      ],
      location: 'Jl. Sudirman No. 123, Jakarta',
      contact: '+62812345678',
      notes: 'Pengiriman pagi hari',
    },
    {
      id: '2',
      number: 'ORD-2024-002',
      date: '2024-02-28',
      dueDate: '2024-03-05',
      status: 'completed',
      total: 2500000,
      items: [
        { name: 'Tower Light 40M', quantity: 2, duration: 5, price: 1200000 },
      ],
      location: 'Jl. Gatot Subroto, Jakarta',
      contact: '+62812345678',
      notes: 'Untuk proyek konstruksi malam',
    },
    {
      id: '3',
      number: 'ORD-2024-003',
      date: '2024-03-01',
      dueDate: '2024-03-08',
      status: 'confirmed',
      total: 800000,
      items: [
        { name: 'Air Compressor 500L', quantity: 1, duration: 1, price: 800000 },
      ],
      location: 'Jl. Ahmad Yani, Bandung',
      contact: '+62812345678',
      notes: 'Pengiriman ke lokasi proyek',
    },
    {
      id: '4',
      number: 'ORD-2024-004',
      date: '2024-02-20',
      dueDate: '2024-02-28',
      status: 'cancelled',
      total: 5000000,
      items: [
        { name: 'Bulldozer CAT D7', quantity: 1, duration: 7, price: 4500000 },
      ],
      location: 'Jl. Pemuda, Surabaya',
      contact: '+62812345678',
      notes: 'Dibatalkan - proyek ditunda',
    },
  ];

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'all') return true;
    return order.status === activeTab;
  });

  const statusConfig = {
    pending: { label: 'Menunggu Konfirmasi', color: 'gray', icon: '⏳' },
    confirmed: { label: 'Dikonfirmasi', color: 'yellow', icon: '✓' },
    delivered: { label: 'Dikirim', color: 'blue', icon: '🚚' },
    completed: { label: 'Selesai', color: 'green', icon: '✅' },
    cancelled: { label: 'Dibatalkan', color: 'red', icon: '✗' },
  };

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setDrawerOpened(true);
  };

  return (
    <AppShell navbar={{ width: 0, breakpoint: 0 }} header={{ height: 70 }}>
      <Navbar />

      <Container size="lg" py="xl">
        <Stack gap="xl">
          {/* HEADER */}
          <Group justify="space-between" align="center">
            <Title order={1}>Pesanan Saya</Title>
            <Button variant="subtle" component="a" href="/">
              Pesan Lagi
            </Button>
          </Group>

          {/* STATS */}
          <Group grow>
            <Card withBorder p="md" radius="md">
              <Stack gap={0} align="center">
                <Text size="xl" fw={700} c="blue">{orders.length}</Text>
                <Text size="xs" c="dimmed">Total Pesanan</Text>
              </Stack>
            </Card>
            <Card withBorder p="md" radius="md">
              <Stack gap={0} align="center">
                <Text size="xl" fw={700} c="yellow">{orders.filter(o => o.status === 'confirmed').length}</Text>
                <Text size="xs" c="dimmed">Dalam Proses</Text>
              </Stack>
            </Card>
            <Card withBorder p="md" radius="md">
              <Stack gap={0} align="center">
                <Text size="xl" fw={700} c="green">{orders.filter(o => o.status === 'completed').length}</Text>
                <Text size="xs" c="dimmed">Selesai</Text>
              </Stack>
            </Card>
            <Card withBorder p="md" radius="md">
              <Stack gap={0} align="center">
                <Text size="xl" fw={700}>Rp {orders.reduce((sum, o) => sum + o.total, 0).toLocaleString('id-ID')}</Text>
                <Text size="xs" c="dimmed">Total Nilai</Text>
              </Stack>
            </Card>
          </Group>

          {/* TABS */}
          <Tabs value={activeTab} onChange={(val) => setActiveTab(val || 'all')}>
            <Tabs.List>
              <Tabs.Tab value="all">Semua Pesanan ({orders.length})</Tabs.Tab>
              <Tabs.Tab value="pending">Menunggu</Tabs.Tab>
              <Tabs.Tab value="confirmed">Dikonfirmasi</Tabs.Tab>
              <Tabs.Tab value="delivered">Dikirim</Tabs.Tab>
              <Tabs.Tab value="completed">Selesai</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value={activeTab} pt="xl">
              {filteredOrders.length > 0 ? (
                <Stack gap="md">
                  {filteredOrders.map((order) => {
                    const config = statusConfig[order.status];
                    return (
                      <Card key={order.id} withBorder padding="lg" shadow="sm">
                        <Group justify="space-between" mb="md">
                          <Box>
                            <Group gap="xs" mb="xs">
                              <Text fw={700} size="lg">{order.number}</Text>
                              <Badge color={config.color}>{config.label}</Badge>
                            </Group>
                            <Text size="sm" c="dimmed">
                              {new Date(order.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </Text>
                          </Box>
                          <Box ta="right">
                            <Text fw={700} size="lg" color="blue">Rp {order.total.toLocaleString('id-ID')}</Text>
                            <Text size="xs" c="dimmed">{order.items.length} item</Text>
                          </Box>
                        </Group>

                        <Stack gap="sm" mb="md">
                          {order.items.map((item, idx) => (
                            <Group key={idx} justify="space-between">
                              <Text size="sm">{item.name} × {item.quantity} ({item.duration} hari)</Text>
                              <Text size="sm" fw={600}>Rp {(item.price * item.quantity * item.duration).toLocaleString('id-ID')}</Text>
                            </Group>
                          ))}
                        </Stack>

                        <Group grow>
                          <Button variant="light" leftSection={<IconEye size={16} />} onClick={() => handleViewDetails(order)}>
                            Lihat Detail
                          </Button>
                          {order.status === 'completed' && (
                            <Button variant="light" leftSection={<IconDownload size={16} />} onClick={() => notifications.show({ title: 'Invoice', message: 'Invoice diunduh', color: 'green' })}>
                              Unduh Invoice
                            </Button>
                          )}
                          {order.status === 'confirmed' && (
                            <Button variant="light" leftSection={<IconPhone size={16} />} onClick={() => notifications.show({ title: 'Hubungi', message: 'Menghubungi customer service', color: 'blue' })}>
                              Hubungi Kami
                            </Button>
                          )}
                        </Group>
                      </Card>
                    );
                  })}
                </Stack>
              ) : (
                <Center py="xl">
                  <Stack align="center">
                    <Text size="lg" c="dimmed">Tidak ada pesanan</Text>
                    <Button component="a" href="/">Mulai Pesan</Button>
                  </Stack>
                </Center>
              )}
            </Tabs.Panel>
          </Tabs>
        </Stack>
      </Container>

      {/* ORDER DETAIL DRAWER */}
      <Drawer opened={drawerOpened} onClose={() => setDrawerOpened(false)} title="Detail Pesanan" padding="lg" size="lg" position="right">
        {selectedOrder && (
          <Stack gap="lg">
            <Box>
              <Group justify="space-between" mb="md">
                <Box>
                  <Text fw={700} size="lg">{selectedOrder.number}</Text>
                  <Text size="sm" c="dimmed">
                    {new Date(selectedOrder.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </Text>
                </Box>
                <Badge color={statusConfig[selectedOrder.status].color}>{statusConfig[selectedOrder.status].label}</Badge>
              </Group>
            </Box>

            <Box>
              <Text fw={600} mb="sm">Item Pesanan</Text>
              <Table striped>
                <Table.Tbody>
                  {selectedOrder.items.map((item, idx) => (
                    <Table.Tr key={idx}>
                      <Table.Td>
                        <Text size="sm">{item.name}</Text>
                      </Table.Td>
                      <Table.Td ta="right">
                        <Text size="sm" fw={600}>Rp {(item.price * item.quantity * item.duration).toLocaleString('id-ID')}</Text>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Box>

            <Box p="md" style={{ border: '1px solid #dee2e6', borderRadius: '8px' }}>
              <Group justify="space-between" mb="xs">
                <Text c="dimmed">Subtotal</Text>
                <Text>{selectedOrder.items.reduce((sum, i) => sum + (i.price * i.quantity * i.duration), 0).toLocaleString('id-ID')}</Text>
              </Group>
              <Group justify="space-between">
                <Text fw={700}>Total Pesanan</Text>
                <Text fw={700} c="blue">Rp {selectedOrder.total.toLocaleString('id-ID')}</Text>
              </Group>
            </Box>

            <Box>
              <Text fw={600} mb="sm" size="sm">Informasi Pengiriman</Text>
              <Stack gap="xs">
                <Group gap="xs">
                  <IconMapPin size={16} />
                  <Text size="sm">{selectedOrder.location}</Text>
                </Group>
                <Group gap="xs">
                  <IconPhone size={16} />
                  <Text size="sm">{selectedOrder.contact}</Text>
                </Group>
                <Group gap="xs">
                  <IconCalendar size={16} />
                  <Text size="sm">Jatuh tempo: {new Date(selectedOrder.dueDate).toLocaleDateString('id-ID')}</Text>
                </Group>
                {selectedOrder.notes && (
                  <Group gap="xs">
                    <IconMessageShare size={16} />
                    <Text size="sm">{selectedOrder.notes}</Text>
                  </Group>
                )}
              </Stack>
            </Box>

            <Timeline active={statusConfig[selectedOrder.status].color === 'green' ? 4 : statusConfig[selectedOrder.status].color === 'blue' ? 3 : statusConfig[selectedOrder.status].color === 'yellow' ? 2 : 1}>
              <Timeline.Item bullet={<IconClock size={16} />} title="Pesanan Diterima">
                <Text size="sm" c="dimmed">
                  {new Date(selectedOrder.date).toLocaleDateString('id-ID')}
                </Text>
              </Timeline.Item>
              <Timeline.Item bullet={<IconCheck size={16} />} title="Dikonfirmasi">
                <Text size="sm" c="dimmed">Tim kami telah mengkonfirmasi pesanan Anda</Text>
              </Timeline.Item>
              <Timeline.Item bullet={<IconPhone size={16} />} title="Dalam Pengiriman">
                <Text size="sm" c="dimmed">Peralatan sedang dalam perjalanan</Text>
              </Timeline.Item>
              <Timeline.Item bullet={<IconCheck size={16} />} title="Selesai">
                <Text size="sm" c="dimmed">Peralatan telah diterima</Text>
              </Timeline.Item>
            </Timeline>

            <Button fullWidth color="blue" onClick={() => setDrawerOpened(false)}>
              Tutup
            </Button>
          </Stack>
        )}
      </Drawer>
    </AppShell>
  );
}
