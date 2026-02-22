'use client'

import { 
  Container, SimpleGrid, Paper, Text, Group, Title, 
  Stack, Progress, Box, ActionIcon, Divider, Table, Badge
} from '@mantine/core';
import { 
  IconCash, IconTruckDelivery, IconAlertOctagon, IconUsers, 
  IconRefresh, IconChevronRight, IconArrowUpRight, IconArrowDownRight 
} from '@tabler/icons-react';

export default function MinimalistExecutiveDashboard() {
  return (
    <Container size="100%" p="xl" bg="white" style={{ minHeight: '100vh' }}>
      <Stack gap="xl">
        
        {/* --- 1. MINIMALIST HEADER --- */}
        <Group justify="space-between" align="flex-end">
          <Box>
            <Title order={2} fw={900} style={{ letterSpacing: '-0.5px' }}>
              Executive Dashboard
            </Title>
            <Text c="dimmed" size="xs" fw={700} tt="uppercase" mt={4}>
              SAD Fleet Management • Update Terakhir: 22 Feb 2026
            </Text>
          </Box>
          <Group gap="xs">
            <ActionIcon variant="outline" color="gray" size="lg" radius="md">
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
            label="Total Revenue" val="Rp 420.5M" 
            trend="+12.5%" color="green" icon={<IconCash size={20}/>} 
          />
          <StatBox 
            label="Unit On Site" val="32 Unit" 
            trend="+3" color="blue" icon={<IconTruckDelivery size={20}/>} 
          />
          <StatBox 
            label="Unit Maintenance" val="4 Unit" 
            trend="-2" color="red" icon={<IconAlertOctagon size={20}/>} 
          />
          <StatBox 
            label="Customer Baru" val="8 Leads" 
            trend="+5" color="indigo" icon={<IconUsers size={20}/>} 
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
              <UtilItem label="Genset 50kVA" val={90} total="18/20" />
              <UtilItem label="Genset 100kVA" val={60} total="6/10" />
              <UtilItem label="Alat Berat / Excavator" val={45} total="4/9" />
            </Stack>
          </Paper>

          {/* --- 4. OPERATIONAL ALERTS (Standardized List) --- */}
          <Paper withBorder p="lg" radius="md">
            <Title order={4} fw={800} mb="lg">Atensi Manajer</Title>
            <Stack gap="xs">
              <AlertRow 
                status="Critical" 
                msg="MSN-101: Overdue Service" 
                time="2h ago" 
                dotColor="red" 
              />
              <AlertRow 
                status="Pending" 
                msg="INV-202: Payment Validation" 
                time="5h ago" 
                dotColor="orange" 
              />
              <AlertRow 
                status="Logistic" 
                msg="ORD-505: Ready to Dispatch" 
                time="1d ago" 
                dotColor="blue" 
              />
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