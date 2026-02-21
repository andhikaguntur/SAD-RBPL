'use client'

import { useState } from 'react';
import { 
  Group, Text, Paper, Title, Stack, Button, Box, SimpleGrid, Badge, 
  ThemeIcon, Container, Divider, Table, Progress, Avatar, 
  ActionIcon, Menu, ScrollArea, Select
} from '@mantine/core';
import { 
  IconCash, IconTruckDelivery, IconAlertCircle, IconArrowUpRight, 
  IconArrowDownRight, IconDotsVertical, IconEngine, IconCalendarStats,
  IconPlus, IconFileAnalytics, IconMessageReport, IconCircleCheck
} from '@tabler/icons-react';

export default function SADAdminDashboard() {
  const [period, setPeriod] = useState<string | null>('7d');

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
            {/* Visualisasi pengganti Chart */}
            <Box h={250} bg="gray.0" style={{ borderRadius: '8px', border: '2px dashed #dee2e6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Stack align="center" gap={4}>
                    <IconFileAnalytics size={40} color="#adb5bd" stroke={1} />
                    <Text c="dimmed" size="xs">Integrasi Grafik Penjualan (Recharts/ApexCharts)</Text>
                </Stack>
            </Box>
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