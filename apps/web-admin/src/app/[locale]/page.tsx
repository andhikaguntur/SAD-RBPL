'use client'

import { useState, useEffect } from 'react';
import { notifications } from '@mantine/notifications';
import {
  Container, Stack, Group, Box, Title, Text, Paper, SimpleGrid, Button, Select,
  Table, Progress, Badge, ActionIcon, ThemeIcon, Avatar, Divider,
  LoadingOverlay, Modal, TextInput, Textarea, NumberInput, FileInput,
  Menu, ScrollArea, Skeleton
} from '@mantine/core';
import {
  ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis,
  Tooltip, Area
} from 'recharts';
import {
  IconPlus, IconCash, IconTruckDelivery, IconAlertCircle, IconEngine,
  IconDotsVertical, IconArrowUpRight, IconArrowDownRight,
  IconCalendarStats, IconFileAnalytics, IconMessageReport, IconCircleCheck
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

// --- TYPE DEFINITIONS ---
export type Transaction = {
  id: string;
  name: string;
  val: string;
  status: string;
  color: string;
};

export type RevenueData = {
  month: string;
  total: number;
};

export type FleetData = {
  label: string;
  value: number;
  color: string;
  count: string;
};

export type DashboardData = {
  kpi: {
    revenue: string;
    revenueTrend: string;
    activeUnits: string;
    activeTrend: string;
    waitingValidation: string;
    readyToShip: string;
  };
  fleet: FleetData[];
  transactions: Transaction[];
  revenueChart: RevenueData[];
};

export function useAdminDashboard() {
  const [period, setPeriod] = useState<string | null>('7d');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 1. FETCH DATA LOGIC (GET)
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(`http://localhost:4000/api/dashboard?period=${period}`);
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const result = await response.json();
        setDashboardData(result.data || result);
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Failed to load dashboard data';
        setError(errorMsg);
        console.error('Dashboard fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [period]);

  // 2. SUBMIT DATA LOGIC (POST)
  const submitPermintaan = async (formData: any, onSuccess: () => void) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('http://localhost:4000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const result = await response.json();
      console.log('Request submitted successfully:', result);
      onSuccess();
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to submit request';
      setError(errorMsg);
      console.error('Submit error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    period,
    setPeriod,
    isLoading,
    dashboardData,
    isSubmitting,
    error,
    submitPermintaan
  };
}

export default function SADAdminDashboard() {
  // --- INTEGRASI BACKEND ---
  const { 
    period, setPeriod, isLoading, dashboardData, isSubmitting, error, submitPermintaan 
  } = useAdminDashboard();
  
  // --- STATE UI ---
  const [opened, { open, close }] = useDisclosure(false);
  const [formData, setFormData] = useState({ clientName: '', unitType: '', duration: 1, location: '' });

  // --- HANDLER ---
  const handleFormSubmit = () => {
    submitPermintaan(formData, () => {
      setFormData({ clientName: '', unitType: '', duration: 1, location: '' });
      close();
    });
  };

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
            title="Total Pendapatan" val="Rp 128.5M" trend="+12.5%" 
            up={true} icon={<IconCash/>} color="green" 
          />
          <KPICard 
            title="Unit Sedang Disewa" val="24 Unit" trend="+3 unit" 
            up={true} icon={<IconTruckDelivery/>} color="blue" 
          />
          <KPICard 
            title="Menunggu Validasi" val="12 Order" trend="-2" 
            up={false} icon={<IconAlertCircle/>} color="orange" 
          />
          <KPICard 
            title="Siap Kirim" val="5 Order" trend="Gudang" 
            up={null} icon={<IconEngine/>} color="indigo" 
          />
        </SimpleGrid>

        <SimpleGrid cols={{ base: 1, lg: 3 }} spacing="lg">
          
          {/* --- 3. REVENUE TREND (Placeholder for Chart) --- */}
          <Paper withBorder radius="md" p="lg" shadow="sm" style={{ gridColumn: 'span 2' }}>
            <Group justify="space-between" mb="xl">
              <Box>
                <Text fw={800} size="lg">Tren Pendapatan Sewa</Text>
                <Text size="xs" c="dimmed">Visualisasi arus kas masuk bulanan</Text>
              </Box>
              <ActionIcon variant="subtle" color="gray"><IconDotsVertical size={18}/></ActionIcon>
            </Group>
            
            <Skeleton visible={isLoading}>
              <Box h={280}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={dashboardData?.revenueChart || []}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--mantine-color-blue-6)" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="var(--mantine-color-blue-6)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e9ecef" />
                    <XAxis 
                      dataKey="month" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 12, fill: '#868e96', fontWeight: 600 }} 
                      dy={10} 
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 12, fill: '#868e96', fontWeight: 600 }} 
                      tickFormatter={(value: number) => `${value}M`} 
                    />
                    <Tooltip 
                      // formatter={(value: number) => [`Rp ${value} Juta`, 'Pendapatan']}
                      labelStyle={{ fontWeight: 800, color: '#495057', marginBottom: '4px' }}
                      contentStyle={{ borderRadius: '8px', border: '1px solid #dee2e6', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="total" 
                      stroke="var(--mantine-color-blue-6)" 
                      strokeWidth={3} 
                      fillOpacity={1} 
                      fill="url(#colorRevenue)" 
                      activeDot={{ r: 6, strokeWidth: 0, fill: 'var(--mantine-color-blue-8)' }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </Skeleton>
          </Paper>

          {/* --- 4. FLEET UTILIZATION --- */}
          <Paper withBorder radius="md" p="lg" shadow="sm">
            <Text fw={800} size="lg" mb="xl">Utilisasi Armada</Text>
            <Stack gap="xl">
               <FleetProgress label="Genset 50kVA" value={85} color="blue" count="12/15" />
               <FleetProgress label="Genset 100kVA" value={60} color="indigo" count="6/10" />
               <FleetProgress label="Genset 250kVA" value={40} color="cyan" count="2/5" />
               <FleetProgress label="Alat Berat" value={95} color="teal" count="19/20" />
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
                <Text fw={800} size="lg">Transaksi Terbaru</Text>
                <Button variant="subtle" size="xs">Lihat Semua Arsip</Button>
             </Group>
          </Box>
          <Table verticalSpacing="md" horizontalSpacing="lg">
            <Table.Thead bg="gray.0">
              <Table.Tr>
                <Table.Th>Pelanggan</Table.Th>
                <Table.Th>ID Order</Table.Th>
                <Table.Th>Nominal</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th ta="right">Aksi</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              <TransactionRow name="PT. Maju Jaya" id="ORD-881" val="Rp 15.000.000" status="Diterima" color="green" />
              <TransactionRow name="CV. Bangun Pagi" id="ORD-882" val="Rp 8.500.000" status="Dikirim" color="blue" />
              <TransactionRow name="Indo Karya" id="ORD-883" val="Rp 22.000.000" status="Validasi" color="orange" />
              <TransactionRow name="Personal - Budi" id="ORD-884" val="Rp 1.200.000" status="Pending" color="gray" />
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
            leftSection={up ? <IconArrowUpRight size={10}/> : <IconArrowDownRight size={10}/>}
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

function TransactionRow({ name, id, val, status, color }: any) {
    return (
        <Table.Tr>
            <Table.Td>
                <Group gap="sm">
                    <Avatar size="sm" radius="xl" color={color}>{name[0]}</Avatar>
                    <Text size="sm" fw={600}>{name}</Text>
                </Group>
            </Table.Td>
            <Table.Td><Text size="xs" c="dimmed">{id}</Text></Table.Td>
            <Table.Td><Text size="sm" fw={700}>{val}</Text></Table.Td>
            <Table.Td><Badge color={color} variant="dot" size="sm">{status}</Badge></Table.Td>
            <Table.Td ta="right">
                <ActionIcon variant="subtle" color="gray"><IconDotsVertical size={16}/></ActionIcon>
            </Table.Td>
        </Table.Tr>
    );
}