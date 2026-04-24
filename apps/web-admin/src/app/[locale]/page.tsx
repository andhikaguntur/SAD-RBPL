'use client'

import { useState, useEffect } from 'react';
import { 
  Group, Text, Paper, Title, Stack, Button, Box, Badge, 
  SimpleGrid, Avatar, ScrollArea, Table, ThemeIcon, LoadingOverlay, Center,
  Container, Divider, Modal
} from '@mantine/core';
import { 
  IconCash, IconEngine, IconUsers, IconAlertCircle,
  IconTrendingUp, IconTrendingDown, IconActivity,
  IconClock, IconCheck, IconTruckDelivery
} from '@tabler/icons-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

export default function AdministrativeDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTrx, setSelectedTrx] = useState<any>(null);
  const [modalOpened, setModalOpened] = useState(false);

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:4000/api/dashboard/stats');
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const json = await res.json();
      if (json.success) {
        setStats(json.data);
      }
    } catch (err: any) {
      setError(err.message || 'Gagal memuat statistik dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading && !stats) {
    return (
      <Box h="100vh" style={{ position: 'relative' }}>
        <LoadingOverlay visible={true} overlayProps={{ blur: 2 }} />
      </Box>
    );
  }

  const revenueChartData = stats?.revenueChart || [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Apr', value: 4500 },
    { name: 'Mei', value: 6000 },
    { name: 'Jun', value: 5500 },
  ];

  return (
    <Container size="100%" p="xl" bg="#f8f9fa" style={{ minHeight: '100vh' }}>
      <Stack gap="xl">
        
        {/* --- 1. TOP HEADER --- */}
        <Group justify="space-between">
          <Box>
            <Title order={2} fw={900} c="gray.8">Management Dashboard</Title>
            <Text c="dimmed" size="sm">Otomasi & Monitoring Real-time CV. Sarana Abadi Diesel</Text>
          </Box>
          <Group>
            <Button variant="light" leftSection={<IconClock size={16}/>} color="gray">
              {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </Button>
            <Button variant="filled" color="blue" onClick={fetchStats}>Refresh Data</Button>
          </Group>
        </Group>

        {/* --- 2. KEY PERFORMANCE INDICATORS --- */}
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg">
          <KPICard 
            title="Total Revenue" 
            value={`Rp ${(stats?.revenue || 0).toLocaleString()}`} 
            trend="+12.5%" 
            icon={<IconCash />} 
            color="green" 
          />
          <KPICard 
            title="Units Rented" 
            value={stats?.rentedUnits || 0} 
            trend="+3 Units" 
            icon={<IconEngine />} 
            color="blue" 
          />
          <KPICard 
            title="Active Customers" 
            value={stats?.activeCustomers || 0} 
            trend="+1 this week" 
            icon={<IconUsers />} 
            color="indigo" 
          />
          <KPICard 
            title="Pending Actions" 
            value={stats?.pendingActions || 0} 
            trend="Priority" 
            icon={<IconAlertCircle />} 
            color="orange" 
          />
        </SimpleGrid>

      {/* --- DETAIL MODAL --- */}
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title={<Text fw={900} size="lg">Order Details: {selectedTrx?.id}</Text>}
        size="lg"
        radius="md"
      >
        {selectedTrx && (
          <Stack gap="md">
            <Paper withBorder p="md" bg="gray.0">
              <SimpleGrid cols={2}>
                <Box>
                  <Text size="xs" fw={700} c="dimmed">CUSTOMER</Text>
                  <Text fw={700}>{selectedTrx.customer}</Text>
                </Box>
                <Box>
                  <Text size="xs" fw={700} c="dimmed">STATUS</Text>
                  <Badge color={getStatusColor(selectedTrx.status)} variant="filled">{selectedTrx.status}</Badge>
                </Box>
                <Box>
                  <Text size="xs" fw={700} c="dimmed">LOKASI</Text>
                  <Text size="sm">{selectedTrx.lokasi}</Text>
                </Box>
                <Box>
                  <Text size="xs" fw={700} c="dimmed">DURASI</Text>
                  <Text size="sm">{selectedTrx.durasi} Hari</Text>
                </Box>
              </SimpleGrid>
            </Paper>

            <Box>
              <Text fw={800} size="sm" mb="xs">LIST UNIT</Text>
              <Stack gap="xs">
                {selectedTrx.mesin.map((m: any, i: number) => (
                  <Paper key={i} withBorder p="xs" radius="xs">
                    <Group justify="space-between">
                      <Box>
                        <Text size="sm" fw={700}>{m.nama}</Text>
                        <Text size="xs" c="dimmed">{m.qty} Unit x Rp {(m.harga - m.diskon).toLocaleString()}</Text>
                      </Box>
                      <Text fw={700} size="sm">Rp {( (m.harga - m.diskon) * m.qty * selectedTrx.durasi ).toLocaleString()}</Text>
                    </Group>
                  </Paper>
                ))}
              </Stack>
            </Box>

            <Divider />
            
            <Group justify="space-between">
               <Box>
                  <Text size="xs" fw={700} c="dimmed">TOTAL INVOICE</Text>
                  <Text size="xl" fw={900} c="blue.9">Rp {(selectedTrx.amount * selectedTrx.durasi).toLocaleString()}</Text>
               </Box>
               {selectedTrx.status === 'Menunggu Validasi' && (
                 <Button color="blue" onClick={() => window.location.href='/permintaan'}>Process Order</Button>
               )}
               {selectedTrx.status === 'Lunas' && (
                 <Button color="orange" onClick={() => window.location.href='/po'}>Prepare Shipment</Button>
               )}
            </Group>
          </Stack>
        )}
      </Modal>

      <SimpleGrid cols={{ base: 1, lg: 3 }} spacing="lg">
          <Paper withBorder p="xl" radius="md" shadow="sm" style={{ gridColumn: 'span 2' }}>
            <Group justify="space-between" mb="xl">
              <Box>
                <Text fw={800} size="lg">Revenue Analytics</Text>
                <Text size="xs" c="dimmed">Trend pendapatan penyewaan 6 bulan terakhir</Text>
              </Box>
              <Badge variant="light" color="green" size="lg" leftSection={<IconTrendingUp size={14}/>}>
                Growing
              </Badge>
            </Group>
            <Box h={300}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueChartData}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#228be6" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#228be6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#888'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#888'}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#228be6" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Paper>

          <Paper withBorder p="xl" radius="md" shadow="sm">
            <Text fw={800} size="lg" mb="xl">Fleet Status</Text>
            <Stack gap="lg">
              <StatusProgressBar label="Rented Units" val={stats?.rentedUnits || 0} max={100} color="blue" />
              <StatusProgressBar label="Available" val={stats?.availableUnits || 0} max={100} color="green" />
              <StatusProgressBar label="In Maintenance" val={stats?.maintenanceUnits || 0} max={100} color="red" />
              
              <Divider my="sm" />
              
              <Box>
                <Text fw={700} size="sm" mb="xs">Quick Insights</Text>
                <Group gap="xs">
                  <ThemeIcon color="green.0" c="green.9" size="sm"><IconCheck size={12}/></ThemeIcon>
                  <Text size="xs">Operating at 85% capacity</Text>
                </Group>
                <Group gap="xs" mt={8}>
                  <ThemeIcon color="blue.0" c="blue.9" size="sm"><IconActivity size={12}/></ThemeIcon>
                  <Text size="xs">High demand for 500kVA units</Text>
                </Group>
              </Box>
            </Stack>
          </Paper>
        </SimpleGrid>

        {/* --- 4. RECENT TRANSACTIONS --- */}
        <Paper withBorder radius="md" shadow="sm" style={{ overflow: 'hidden' }}>
          <Box p="lg" bg="white">
             <Group justify="space-between">
                <Text fw={800} size="lg">Recent Transactions & Actions</Text>
                <Button variant="subtle" size="xs">View All</Button>
             </Group>
          </Box>
          <ScrollArea>
            <Table verticalSpacing="md" horizontalSpacing="lg" miw={800}>
              <Table.Thead bg="gray.0">
                <Table.Tr>
                  <Table.Th>Customer</Table.Th>
                  <Table.Th>ID Order</Table.Th>
                  <Table.Th>Amount</Table.Th>
                  <Table.Th>System Status</Table.Th>
                  <Table.Th ta="right">Action</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {(stats?.recentTransactions || []).map((trx: any) => (
                  <Table.Tr key={trx.id}>
                    <Table.Td>
                      <Group gap="sm">
                        <Avatar size="sm" color="blue" radius="xl">{(trx.customer || 'C')[0]}</Avatar>
                        <Text size="sm" fw={600}>{trx.customer}</Text>
                      </Group>
                    </Table.Td>
                    <Table.Td>
                      <Text size="xs" fw={700} c="dimmed">
                        {trx.id.includes('-') ? `REQ-${trx.id.substring(0, 8).toUpperCase()}` : trx.id}
                      </Text>
                    </Table.Td>
                    <Table.Td><Text size="sm" fw={700}>Rp {(trx.amount || 0).toLocaleString()}</Text></Table.Td>
                    <Table.Td>
                      <Badge variant="light" color={getStatusColor(trx.status || '')} size="sm">
                        {trx.status}
                      </Badge>
                    </Table.Td>
                    <Table.Td ta="right">
                      <Group gap="xs" justify="flex-end">
                        {trx.status === 'Menunggu Validasi' && (
                          <Button variant="light" size="xs" color="yellow" onClick={() => window.location.href='/permintaan'}>
                            Validate
                          </Button>
                        )}
                        {trx.status === 'Lunas' && (
                          <Button variant="light" size="xs" color="green" onClick={() => window.location.href='/po'}>
                            Ship
                          </Button>
                        )}
                        <Button 
                          variant="subtle" 
                          size="xs" 
                          color="blue" 
                          onClick={() => {
                            setSelectedTrx(trx);
                            setModalOpened(true);
                          }}
                        >
                          Details
                        </Button>
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </ScrollArea>
        </Paper>
      </Stack>
    </Container>
  );
}

// --- REUSABLE COMPONENTS ---

function KPICard({ title, value, trend, icon, color }: any) {
  const isUp = trend?.startsWith('+');
  return (
    <Paper p="xl" radius="md" withBorder shadow="xs">
      <Group justify="space-between" align="flex-start">
        <Box>
          <Text size="xs" c="dimmed" fw={800} tt="uppercase">{title}</Text>
          <Title order={3} fw={900} mt={4}>{value}</Title>
          <Group gap={4} mt={8}>
            {isUp ? <IconTrendingUp size={14} color="green"/> : <IconTrendingDown size={14} color="red"/>}
            <Text size="xs" fw={700} c={isUp ? 'green.7' : 'red.7'}>{trend}</Text>
            <Text size="xs" c="dimmed">vs last month</Text>
          </Group>
        </Box>
        <ThemeIcon size={48} radius="md" variant="light" color={color}>
          {icon}
        </ThemeIcon>
      </Group>
    </Paper>
  );
}

function StatusProgressBar({ label, val, max, color }: any) {
  return (
    <Box>
      <Group justify="space-between" mb={4}>
        <Text size="xs" fw={700}>{label}</Text>
        <Text size="xs" c="dimmed">{val}/{max} Units</Text>
      </Group>
      <Box h={8} bg="gray.1" style={{ borderRadius: 10, overflow: 'hidden' }}>
        <Box h="100%" bg={color} style={{ width: `${(val/max)*100}%`, borderRadius: 10 }} />
      </Box>
    </Box>
  );
}

function getStatusColor(status: string) {
  switch (status) {
    case 'Menunggu':
    case 'Menunggu Validasi':
      return 'yellow';
    case 'Divalidasi':
    case 'Menunggu Pembayaran':
      return 'cyan';
    case 'Lunas':
    case 'Dikirim':
      return 'blue';
    case 'Diterima':
    case 'Disewa':
      return 'green';
    case 'Selesai':
      return 'gray';
    case 'Ditolak':
      return 'red';
    default:
      return 'blue';
  }
}