'use client'

import { useState, useMemo, useEffect } from 'react';
import { 
  Group, Text, Paper, Title, Stack, Button, Box, SimpleGrid, Badge, 
  ThemeIcon, Container, Divider, Table, Progress, Avatar, 
  ActionIcon, Menu, ScrollArea, Select
} from '@mantine/core';
import { 
  IconCash, IconTruckDelivery, IconAlertCircle, IconArrowUpRight, 
  IconArrowDownRight, IconDotsVertical, IconEngine, IconCalendarStats,
  IconPlus, IconFileAnalytics, IconMessageReport, IconCircleCheck,
  IconCheck, IconX 
} from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';

export default function SADAdminDashboard() {
  const [period, setPeriod] = useState<string | null>('7d');
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:4000/api/dashboard/stats');
      const json = await res.json();
      if (json.success) {
        setStats(json.data);
      }
    } catch (error) {
      notifications.show({ title: 'Error', message: 'Gagal mengambil statistik dashboard', color: 'red' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handlePaymentAction = async (id: string, action: 'Lunas' | 'Ditolak') => {
    try {
      const res = await fetch(`http://localhost:4000/api/pembayaran/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: action })
      });
      const json = await res.json();
      if (json.success) {
        notifications.show({ title: 'Berhasil', message: `Pembayaran ${id} diubah ke ${action}`, color: action === 'Lunas' ? 'green' : 'red' });
        await fetchStats();
      }
    } catch (error) {
      notifications.show({ title: 'Error', message: 'Gagal memproses pembayaran', color: 'red' });
    }
  };

  const handleDeliveryAction = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:4000/api/pengiriman/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Disewa' })
      });
      const json = await res.json();
      if (json.success) {
        notifications.show({ title: 'Berhasil', message: `Unit pengiriman ${id} telah divalidasi`, color: 'green' });
        await fetchStats();
      }
    } catch (error) {
      notifications.show({ title: 'Error', message: 'Gagal memproses pengiriman', color: 'red' });
    }
  };

  if (!stats && loading) return <Container p="xl"><Text>Memuat data Dashboard...</Text></Container>;

  return (
    <Container size="100%" p="xl" bg="#fcfcfc">
      <Stack gap="xl">
        
        {/* --- 1. SMART HEADER --- */}
        <Group justify="space-between" align="center">
          <Box>
            <Title order={2} fw={900} style={{ letterSpacing: '-0.5px' }}>
              Dashboard Operasional
            </Title>
            <Text c="dimmed" size="sm">Selamat datang kembali, Admin. Berikut ringkasan hari ini.</Text>
          </Box>
          <Group gap="sm">
            <Select 
              value={period} onChange={setPeriod}
              data={[{ value: '24h', label: 'Hari Ini' }, { value: '7d', label: '7 Hari Terakhir' }, { value: '30d', label: '30 Hari Terakhir' }]}
              radius="md" w={160} variant="filled"
            />
            <Button color="blue" radius="md" leftSection={<IconPlus size={18}/>}>Input Permintaan</Button>
          </Group>
        </Group>

        {/* --- 2. KEY PERFORMANCE INDICATORS (KPI) --- */}
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg">
          <KPICard 
            title="Total Pendapatan" val={`Rp ${(stats?.revenue || 0).toLocaleString('id-ID')}`} trend="+ Real Time" 
            up={true} icon={<IconCash/>} color="green" 
          />
          <KPICard 
            title="Unit Sedang Disewa" val={`${stats?.rentedUnits || 0} Unit`} trend="Aktif" 
            up={true} icon={<IconTruckDelivery/>} color="blue" 
          />
          <KPICard 
            title="Menunggu Validasi" val={`${stats?.pendingRequests || 0} Order`} trend="Internal" 
            up={false} icon={<IconAlertCircle/>} color="orange" 
          />
          <KPICard 
            title="Siap Kirim" val={`${stats?.readyToShip || 0} Order`} trend="Logistik" 
            up={null} icon={<IconEngine/>} color="indigo" 
          />
        </SimpleGrid>

        <SimpleGrid cols={{ base: 1, lg: 3 }} spacing="lg">
          
          {/* --- 3. REVENUE TREND (Placeholder for Chart) --- */}
          <Paper withBorder radius="md" p="lg" shadow="sm" style={{ gridColumn: 'span 2' }}>
            <Group justify="space-between" mb="xl">
              <Box>
                <Text fw={800} size="lg">Tren Pendapatan Sewa</Text>
                <Text size="xs" c="dimmed">Visualisasi arus kas masuk</Text>
              </Box>
              <ActionIcon variant="subtle" color="gray"><IconDotsVertical size={18}/></ActionIcon>
            </Group>
            {/* Visualisasi pengganti Chart */}
            <Box h={250} bg="gray.0" style={{ borderRadius: '8px', border: '2px dashed #dee2e6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Stack align="center" gap={4}>
                    <IconFileAnalytics size={40} color="#adb5bd" stroke={1} />
                    <Text c="dimmed" size="xs">Data terpantau dalam 30 hari terakhir</Text>
                </Stack>
            </Box>
          </Paper>

          {/* --- 4. FLEET UTILIZATION --- */}
          <Paper withBorder radius="md" p="lg" shadow="sm">
            <Text fw={800} size="lg" mb="xl">Utilisasi Armada</Text>
            <Stack gap="xl">
               {(stats?.fleetUtilization || []).map((f: any) => (
                 <FleetProgress key={f.label} label={f.label} value={f.value} color={f.color} count={f.count} />
               ))}
               {!stats?.fleetUtilization?.length && <Text size="sm" c="dimmed">Belum ada unit mesin.</Text>}
            </Stack>
            <Divider my="xl" variant="dashed" />
            <Button fullWidth variant="light" color="blue" rightSection={<IconArrowUpRight size={14}/>}>
                Lihat Detail Inventaris
            </Button>
          </Paper>

        </SimpleGrid>

        {/* --- 5. RECENT TRANSACTIONS TABLE --- */}
        <Paper withBorder radius="md" shadow="sm" style={{ overflow: 'hidden' }}>
          <Box p="lg" bg="white">
             <Group justify="space-between">
                <Text fw={800} size="lg">Transaksi & Aksi Cepat</Text>
                <Button variant="subtle" size="xs">Lihat Semua Arsip</Button>
             </Group>
          </Box>
          <Table verticalSpacing="md" horizontalSpacing="lg">
            <Table.Thead bg="gray.0">
              <Table.Tr>
                <Table.Th>Pelanggan</Table.Th>
                <Table.Th>ID Order</Table.Th>
                <Table.Th>Nominal</Table.Th>
                <Table.Th>Status Sistem</Table.Th>
                <Table.Th ta="right">Aksi Operasional</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {(stats?.recentTransactions || []).map((t: any) => (
                <TransactionRow 
                  key={t.id} 
                  name={t.pelanggan} 
                  id={t.id} 
                  val={`Rp ${t.nominal.toLocaleString('id-ID')}`} 
                  status={t.status} 
                  paymentId={t.pembayaran?.id}
                  shippingId={t.pengiriman?.id}
                  onPay={handlePaymentAction}
                  onShip={handleDeliveryAction}
                />
              ))}
              {!stats?.recentTransactions?.length && (
                <Table.Tr>
                  <Table.Td colSpan={5} ta="center" p="xl"><Text c="dimmed">Belum ada transaksi terbaru.</Text></Table.Td>
                </Table.Tr>
              )}
            </Table.Tbody>
          </Table>
        </Paper>

      </Stack>
    </Container>
  );
}

// --- REUSABLE MINI COMPONENTS ---

function KPICard({ title, val, trend, up, icon, color }: any) {
  return (
    <Paper p="lg" radius="md" withBorder shadow="xs" style={{ position: 'relative' }}>
      <Group justify="space-between" mb="xs">
        <ThemeIcon size="lg" radius="md" variant="light" color={color}>{icon}</ThemeIcon>
        {up !== null && (
          <Badge 
            variant="light" 
            color={up ? 'green' : 'red'} 
          >
            {trend}
          </Badge>
        )}
      </Group>
      <Text size="xs" c="dimmed" fw={700} tt="uppercase" style={{ letterSpacing: '0.5px' }}>{title}</Text>
      <Text fw={900} size="24px" c="gray.8">{val}</Text>
    </Paper>
  );
}

function FleetProgress({ label, value, color, count }: any) {
    return (
        <Box>
            <Group justify="space-between" mb={4}>
                <Text size="xs" fw={700}>{label}</Text>
                <Text size="xs" c="dimmed">{count} Unit</Text>
            </Group>
            <Progress value={value} color={color} size="sm" radius="xl" />
        </Box>
    );
}

function TransactionRow({ name, id, val, status, paymentId, shippingId, onPay, onShip }: any) {
    const isPendingPayment = status === 'Menunggu Pembayaran' || (paymentId && status.includes('Validasi'));
    const isPendingDelivery = status === 'Dikirim';

    return (
        <Table.Tr>
            <Table.Td>
                <Group gap="sm">
                    <Avatar size="sm" radius="xl" color="blue">{name[0]}</Avatar>
                    <Text size="sm" fw={600}>{name}</Text>
                </Group>
            </Table.Td>
            <Table.Td><Text size="xs" c="dimmed">{id}</Text></Table.Td>
            <Table.Td><Text size="sm" fw={700}>{val}</Text></Table.Td>
            <Table.Td>
              <Badge color={status.includes('Lunas') ? 'green' : 'orange'} variant="dot" size="sm">
                {status}
              </Badge>
            </Table.Td>
            <Table.Td ta="right">
                <Group gap="xs" justify="flex-end">
                  {paymentId && status !== 'Lunas' && (
                    <>
                      <Button size="xs" variant="light" color="green" onClick={() => onPay(paymentId, 'Lunas')}>Terima Bayar</Button>
                      <Button size="xs" variant="light" color="red" onClick={() => onPay(paymentId, 'Ditolak')}>Tolak</Button>
                    </>
                  )}
                  {isPendingDelivery && (
                    <Button size="xs" color="indigo" variant="filled" onClick={() => onShip(shippingId)}>Validasi Terima Unit</Button>
                  )}
                  <ActionIcon variant="subtle" color="gray"><IconDotsVertical size={16}/></ActionIcon>
                </Group>
            </Table.Td>
        </Table.Tr>
    );
}