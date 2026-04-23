'use client'

import { 
  Container, SimpleGrid, Paper, Text, Group, Title, 
  Stack, Progress, Box, ActionIcon, Divider, Table, Badge, LoadingOverlay
} from '@mantine/core';
import { 
  IconCash, IconTruckDelivery, IconAlertOctagon, IconUsers, 
  IconRefresh, IconChevronRight, IconArrowUpRight, IconArrowDownRight 
} from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import { notifications } from '@mantine/notifications';

export default function MinimalistExecutiveDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:4000/api/dashboard/stats');
      if (!res.ok) throw new Error('Gagal memuat statistik dashboard');
      const json = await res.json();
      if (json.success) {
        setStats(json.data);
      }
    } catch (error: any) {
      notifications.show({
        title: 'Error Koneksi',
        message: error.message,
        color: 'red'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <Container size="100%" p="xl" bg="white" style={{ minHeight: '100vh', position: 'relative' }}>
      <LoadingOverlay visible={loading} overlayProps={{ blur: 2 }} />
      <Stack gap="xl">
        
        {/* --- 1. MINIMALIST HEADER --- */}
        <Group justify="space-between" align="flex-end">
          <Box>
            <Title order={2} fw={900} style={{ letterSpacing: '-0.5px' }}>
              Executive Dashboard
            </Title>
            <Text c="dimmed" size="xs" fw={700} tt="uppercase" mt={4}>
              SAD Fleet Management • Update: {new Date().toLocaleDateString('id-ID')}
            </Text>
          </Box>
          <Group gap="xs">
            <ActionIcon variant="outline" color="gray" size="lg" radius="md" onClick={fetchStats}>
              <IconRefresh size={18} />
            </ActionIcon>
            <ActionIcon variant="outline" color="gray" size="lg" radius="md">
              <IconArrowUpRight size={18} />
            </ActionIcon>
          </Group>
        </Group>

        <Divider color="gray.1" />

        {/* --- 2. FLAT STATS GRID --- */}
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md">
          <StatBox 
            label="Total Revenue" val={`Rp ${(stats?.revenue || 0).toLocaleString('id-ID')}`} 
            trend="+0%" color="green" icon={<IconCash size={20}/>} 
          />
          <StatBox 
            label="Unit On Site" val={`${stats?.rentedUnits || 0} Unit`} 
            trend="+0" color="blue" icon={<IconTruckDelivery size={20}/>} 
          />
          <StatBox 
            label="Permintaan Baru" val={`${stats?.pendingRequests || 0} Req`} 
            trend="New" color="orange" icon={<IconAlertOctagon size={20}/>} 
          />
          <StatBox 
            label="Siap Kirim" val={`${stats?.readyToShip || 0} Unit`} 
            trend="Ready" color="indigo" icon={<IconTruckDelivery size={20}/>} 
          />
        </SimpleGrid>

        <SimpleGrid cols={{ base: 1, lg: 3 }} spacing="md" mt="md">
          
          {/* --- 3. UTILIZATION LIST (Clean & Structured) --- */}
          <Paper withBorder p="lg" radius="md" style={{ gridColumn: 'span 2' }}>
            <Group justify="space-between" mb="lg">
              <Title order={4} fw={800}>Utilisasi Armada</Title>
              <Text size="xs" c="dimmed" fw={700} tt="uppercase">Statistik Inventaris</Text>
            </Group>
            
            <Stack gap="lg">
              {stats?.fleetUtilization?.map((item: any) => (
                <UtilItem key={item.label} label={item.label} val={item.value} total={item.count} />
              ))}
              {(!stats?.fleetUtilization || stats.fleetUtilization.length === 0) && (
                <Text c="dimmed" size="xs" ta="center">Tidak ada data armada aktif</Text>
              )}
            </Stack>
          </Paper>

          {/* --- 4. OPERATIONAL ALERTS (Standardized List) --- */}
          <Paper withBorder p="lg" radius="md">
            <Title order={4} fw={800} mb="lg">Transaksi Terbaru</Title>
            <Stack gap="xs">
              {stats?.recentTransactions?.map((t: any) => (
                <AlertRow 
                  key={t.id}
                  status={t.status} 
                  msg={`${t.id}: ${t.pelanggan}`} 
                  time={`Rp ${t.nominal.toLocaleString('id-ID')}`} 
                  dotColor={t.status === 'Lunas' ? 'green' : 'blue'} 
                />
              ))}
              {(!stats?.recentTransactions || stats.recentTransactions.length === 0) && (
                <Text c="dimmed" size="xs" ta="center">Tidak ada transaksi terbaru</Text>
              )}
            </Stack>
          </Paper>

        </SimpleGrid>
      </Stack>
    </Container>
  );
}

// --- MINIMALIST COMPONENTS ---

function StatBox({ label, val, trend, color, icon }: any) {
  return (
    <Paper withBorder p="md" radius="sm" style={{ backgroundColor: '#fcfcfc' }}>
      <Group gap="xs" mb={8}>
        <Box c="dimmed" style={{ display: 'flex' }}>{icon}</Box>
        <Text size="xs" c="dimmed" fw={800} tt="uppercase">{label}</Text>
      </Group>
      <Group align="flex-end" justify="space-between">
        <Text fw={900} size="xl" c="gray.8" style={{ lineHeight: 1 }}>{val}</Text>
        <Text size="xs" fw={800} c={trend.includes('-') ? 'red.7' : 'green.7'}>
          {trend}
        </Text>
      </Group>
    </Paper>
  );
}

function UtilItem({ label, val, total }: any) {
  return (
    <Box>
      <Group justify="space-between" mb={6}>
        <Text size="sm" fw={700} c="gray.7">{label}</Text>
        <Text size="xs" fw={800}>{total} <Text span c="dimmed" fw={500}>Unit</Text></Text>
      </Group>
      <Progress 
        value={val} 
        size="sm" 
        radius="xs" 
        color="blue.8"
        bg="gray.1"
      />
    </Box>
  );
}

function AlertRow({ status, msg, time, dotColor }: any) {
  return (
    <Paper 
      p="sm" 
      radius="xs" 
      withBorder 
      style={{ 
        border: 'none', 
        borderBottom: '1px solid var(--mantine-color-gray-1)',
        cursor: 'pointer'
      }}
    >
      <Group justify="space-between" wrap="nowrap">
        <Group gap="sm">
          <Box 
            w={8} h={8} 
            style={{ borderRadius: '50%', backgroundColor: `var(--mantine-color-${dotColor}-6)` }} 
          />
          <Box>
            <Text size="xs" fw={800} c="gray.8" mb={2}>{msg}</Text>
            <Badge size="xs" variant="transparent" p={0} c="dimmed">{status}</Badge>
          </Box>
        </Group>
        <Text size="10px" c="dimmed" fw={600}>{time}</Text>
      </Group>
    </Paper>
  );
}