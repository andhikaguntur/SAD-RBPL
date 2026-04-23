'use client';

import { ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AppShell, Stack, Button, Tooltip, Box } from '@mantine/core';
import {
  IconHome,
  IconPlus,
  IconFileInvoice,
  IconUser,
  IconBell,
  IconSettings,
  IconLogout,
} from '@tabler/icons-react';
import { useAuth } from '../hooks/useAuth';

interface AppLayoutProps {
  children: ReactNode;
}

const NAV_ITEMS = [
  { icon: IconHome, label: 'Home', href: '/dashboard', tooltip: 'Dashboard' },
  { icon: IconPlus, label: 'New Request', href: '/rent', tooltip: 'Buat Permintaan Baru' },
  { icon: IconFileInvoice, label: 'Billing', href: '/billing', tooltip: 'Billing & Invoice' },
  { icon: IconBell, label: 'Notifications', href: '/notifications', tooltip: 'Notifikasi' },
];

const USER_NAV_ITEMS = [
  { icon: IconUser, label: 'Profile', href: '/profile', tooltip: 'Profil Saya' },
  { icon: IconSettings, label: 'Settings', href: '/settings', tooltip: 'Pengaturan' },
];

export default function AppLayout({ children }: AppLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useAuth();
  const locale = pathname?.split('/')[1] || 'id';

  const isActive = (href: string) => {
    const currentPath = pathname?.split('/').slice(2).join('/');
    const navPath = href.replace(/^\//, '');
    return currentPath?.includes(navPath);
  };

  const handleNavigation = (href: string) => {
    router.push(`/${locale}${href}`);
  };

  const handleLogout = () => {
    logout();
    router.push(`/${locale}/login`);
  };

  return (
    <AppShell
      layout="alt"
      navbar={{
        width: 80,
        breakpoint: 'sm',
        collapsed: { mobile: true, desktop: false },
      }}
    >
      <AppShell.Navbar p="md" withBorder>
        <Stack gap="xs" justify="space-between" h="100%">
          {/* Top Navigation Items */}
          <Stack gap="xs">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Tooltip key={item.label} label={item.tooltip} position="right" withArrow>
                  <Button
                    variant={active ? 'filled' : 'subtle'}
                    color={active ? 'blue' : 'gray'}
                    p="md"
                    w="100%"
                    h={56}
                    onClick={() => handleNavigation(item.href)}
                  >
                    <Icon size={24} />
                  </Button>
                </Tooltip>
              );
            })}
          </Stack>

          {/* User Section - Bottom */}
          <Stack gap="xs" pb="lg">
            {USER_NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Tooltip key={item.label} label={item.tooltip} position="right" withArrow>
                  <Button
                    variant={active ? 'filled' : 'subtle'}
                    color={active ? 'blue' : 'gray'}
                    p="md"
                    w="100%"
                    h={56}
                    onClick={() => handleNavigation(item.href)}
                  >
                    <Icon size={24} />
                  </Button>
                </Tooltip>
              );
            })}

            {/* Logout Button */}
            <Tooltip label="Logout" position="right" withArrow>
              <Button
                variant="subtle"
                color="red"
                p="md"
                w="100%"
                h={56}
                onClick={handleLogout}
              >
                <IconLogout size={24} />
              </Button>
            </Tooltip>
          </Stack>
        </Stack>
      </AppShell.Navbar>

      {/* Main Content */}
      <AppShell.Main>
        <Box component="main">{children}</Box>
      </AppShell.Main>
    </AppShell>
  );
}

