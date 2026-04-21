import { AppShell, Badge, Box, NavLink, ScrollArea, Stack, Text } from '@mantine/core';
import {
  IconDashboard,
  IconReceipt,
  IconFileInvoice,
  IconEngine,
  IconHistory,
  IconSettings,
  Icon,
  IconCheckupList,
  IconFileDescription,
} from '@tabler/icons-react';

interface NavItem {
  label: string;
  icon: Icon;
  link: string;
  badge?: number;
}

interface NavGroup {
  group: string;
  items: NavItem[];
}

const navData: NavGroup[] = [
  {
    group: 'Ringkasan Kerja',
    items: [
      { label: 'Dashboard Utama', icon: IconDashboard, link: '/' },
    ]
  },
  {
    group: 'Proses Transaksi',
    items: [
      { 
        label: 'Permintaan Sewa', // RF-002 & RF-003: Validasi harga awal
        icon: IconFileDescription, 
        link: '/permintaan', 
        badge: 3 
      },
      { 
        label: 'Verifikasi Pembayaran', // RF-010: Cek bukti transfer
        icon: IconFileInvoice, 
        link: '/pembayaran', 
        badge: 5 
      },
      { 
        label: 'Konfirmasi Penerimaan', // RF-012: Ubah status dari Dikirim -> Diterima
        icon: IconReceipt, 
        link: '/konfirmasi-terima' 
      },
    ]
  },
  {
    group: 'Manajemen Aset',
    items: [
      { 
        label: 'Status & Kondisi Unit', // RF-012 & RNF-007: Kelola unit tersedia/rusak
        icon: IconEngine, 
        link: '/kelola-aset' 
      },
      { 
        label: 'Arsip Purchase Order', // 4.1.9: Memantau hasil otomatisasi sistem
        icon: IconCheckupList, 
        link: '/po' 
      },
    ]
  },
  {
    group: 'Sistem & Keamanan',
    items: [
      { 
        label: 'Log Aktivitas', // RNF-008: Jejak audit operasional (Mutlak ada)
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
                <Text size="xs" fw={700} c="dimmed" tt="uppercase" mb={8} ml="xs">
                  {section.group}
                </Text>
              )}
              
              {/* Handle item tunggal atau list item dalam grup */}
              {(section.items || []).map((item) => (
                <NavLink
                  key={item.label}
                  label={item.label}
                  leftSection={<item.icon size={18} stroke={1.5} />}
                  href={item.link}
                  component="a"
                  rightSection={
                    item.badge ? (
                      <Badge size="xs" color="red" variant="filled">
                        {item.badge}
                      </Badge>
                    ) : null
                  }
                  styles={{
                    label: { fontWeight: 500 },
                    root: { borderRadius: '8px' }
                  }}
                />
              ))}
            </Box>
          ))}
        </Stack>
      </AppShell.Section>

      {/* Footer Navbar untuk Logout/Settings agar tidak bercampur dengan operasional */}
      <AppShell.Section style={{ borderTop: '1px solid var(--mantine-color-gray-3)', paddingTop: '10px' }}>
        <NavLink
          label="Pengaturan"
          leftSection={<IconSettings size={18} stroke={1.5} />}
          styles={{ root: { borderRadius: '8px' } }}
        />
      </AppShell.Section>
    </>
  )
}