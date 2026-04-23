"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Group, Container, Button, Text, Menu, ActionIcon, Paper } from "@mantine/core";
import { IconUser, IconLogout, IconLogin, IconMenu2 } from "@tabler/icons-react";
import { useAuth } from "../hooks/useAuth";

export default function NavBar() {
  const { user, logout, isAuthenticated } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Paper p="sm" style={{ borderBottom: '1px solid var(--mantine-color-gray-2)', position: 'sticky', top: 0, zIndex: 100 }}>
      <Container size="lg" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Group gap="xs">
          <Link href="/">
            <Text fw={700} style={{ cursor: 'pointer', fontSize: '1.1rem' }}>CV. Sumber Anugerah Diesel</Text>
          </Link>
        </Group>

        <Group gap="md">
          {!isAuthenticated ? (
            <>
              <Link href="/login">
                <Button variant="outline" color="violet" leftSection={<IconLogin size={16} />}>Masuk</Button>
              </Link>
              <Link href="/register">
                <Button color="violet">Daftar</Button>
              </Link>
            </>
          ) : (
            <Menu shadow="md" withArrow>
              <Menu.Target>
                <ActionIcon size="lg" variant="light"><IconMenu2 /></ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>{user?.name ?? user?.email}</Menu.Label>
                <Menu.Item leftSection={<IconUser size={14} />} onClick={() => router.push(`/${pathname.split('/')[1] || 'id'}/profile`)}>Profile</Menu.Item>
                <Menu.Item leftSection={<IconLogout size={14} />} onClick={() => logout()}>Logout</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          )}
        </Group>
      </Container>
    </Paper>
  );
}
