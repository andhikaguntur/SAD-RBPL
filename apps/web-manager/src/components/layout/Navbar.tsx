'use client'

import { AppShell, Badge, Box, NavLink, ScrollArea, Stack, Text } from '@mantine/core';
import {
  IconDashboard,
  IconTruck,
  IconPresentationAnalytics,
  IconEngine,
  IconHistory,
  IconSettings,
  Icon,
  IconArchive,
  IconPackageExport,
  IconClipboardData,
} from '@tabler/icons-react';

interface NavItem {
  label: string;
  icon: Icon;
  link: string;
  badge?: number;
  badgeColor?: string;
}

interface NavGroup {
  group: string;
  items: NavItem[];
}

const navData: NavGroup[] = [
  {
    group: 'Analisis & Laporan',
    items: [
      { 
        label: 'Executive Dashboard', 
        icon: IconDashboard, 
        link: '/' 
      },
      { 
        label: 'Laporan Akhir Sewa', // RF-013: Data transaksi, bayar, & kirim
        icon: IconPresentationAnalytics, 
        link: '/laporan',
        badge: 2,
        badgeColor: 'blue'
      },
    ]
  },
  {
    group: 'Kontrol Logistik',
    items: [
      { 
        label: 'Antrean Pengiriman', // RF-011: Catat data sopir & tgl kirim
        icon: IconPackageExport, 
        link: '/pengiriman',
        badge: 4,
        badgeColor: 'orange'
      },
      { 
        label: 'Monitoring Armada', // Pantau unit yang sedang di jalan
        icon: IconTruck, 
        link: '/monitoring' 
      },
    ]
  },
  {
    group: 'Inventaris & Arsip',
    items: [
      { 
        label: 'Status Stok Unit', // RF-004 & RF-012: Pantau ketersediaan mesin
        icon: IconEngine, 
        link: '/stok-aset' 
      },
      { 
        label: 'Arsip Purchase Order', // Data historis PO
        icon: IconArchive, 
        link: '/arsip-po' 
      },
    ]
  },
  {
    group: 'Audit & Keamanan',
    items: [
      { 
        label: 'Log Aktivitas Staff', // RNF-008: Pantau siapa melakukan apa
        icon: IconHistory, 
        link: '/audit-log' 
      },
    ]
  }
];

export function Navbar() {
  return (
    <>
      <AppShell.Section grow component={ScrollArea} mx="-xs" px="xs">
        <Stack gap="xs">
          {navData.map((section, idx) => (
            <Box key={idx} mb="sm">
              {section.group && (
                <Text size="xs" fw={800} c="dimmed" tt="uppercase" mb={8} ml="xs" style={{ letterSpacing: '0.5px' }}>
                  {section.group}
                </Text>
              )}
              
              {section.items.map((item) => (
                <NavLink
                  key={item.label}
                  label={item.label}
                  leftSection={<item.icon size={20} stroke={1.5} />}
                  href={item.link}
                  component="a"
                  rightSection={
                    item.badge ? (
                      <Badge size="xs" color={item.badgeColor || 'gray'} variant="filled">
                        {item.badge}
                      </Badge>
                    ) : null
                  }
                  styles={{
                    label: { fontWeight: 600, fontSize: '13px' },
                    root: { 
                      borderRadius: '8px',
                      marginBottom: '2px'
                    }
                  }}
                />
              ))}
            </Box>
          ))}
        </Stack>
      </AppShell.Section>

      <AppShell.Section style={{ borderTop: '1px solid var(--mantine-color-gray-3)', paddingTop: '10px' }}>
        <NavLink
          label="Pengaturan Sistem"
          leftSection={<IconSettings size={20} stroke={1.5} />}
          styles={{ 
            root: { borderRadius: '8px' },
            label: { fontWeight: 600 } 
          }}
        />
      </AppShell.Section>
    </>
  );
}