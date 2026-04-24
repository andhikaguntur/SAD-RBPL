'use client'
import { AppShell, Burger, Text, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import type { ReactNode } from 'react';
import { Navbar } from './Navbar';

export function MainLayout({ children }: { children: ReactNode }) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
            <Group>
                <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                <Text fw={900} size="xl">SUMBER ANUGERAH DIESEL</Text>
            </Group>
            
            {/* Area Header Kanan bisa untuk profil/notifikasi nanti */}
            <Group hiddenFrom="xs">
                <Text size="xs" fw={700} c="dimmed">ADMIN APP</Text>
            </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="xs">
        <Navbar />
      </AppShell.Navbar>

      <AppShell.Main bg="gray.0">{children}</AppShell.Main>
    </AppShell>
  );
}