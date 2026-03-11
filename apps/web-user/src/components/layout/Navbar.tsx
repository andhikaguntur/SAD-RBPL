'use client'

import { AppShell, Group, Box, Title, Button, Badge, Avatar, Menu, Stack, Text, Drawer, Table, ActionIcon, Center } from '@mantine/core';
import { IconShoppingCart, IconUser, IconLogout, IconUserCircle, IconMenu2, IconX, IconHome, IconHistory, IconStar, IconPhone } from '@tabler/icons-react';
import Link from 'next/link';
import { useState } from 'react';
import { notifications } from '@mantine/notifications';

export function Navbar() {
  const [mobileOpened, setMobileOpened] = useState(false);
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  // Mock user data
  const user = {
    name: 'Budi Santoso',
    email: 'budi@example.com',
    phone: '+62812345678',
    totalRentals: 5,
  };

  const cartItems = [
    { id: 1, name: 'Genset 50 kVA', quantity: 1, duration: 3, price: 2500000 },
    { id: 2, name: 'Excavator 330D', quantity: 1, duration: 2, price: 5000000 },
  ];

  const totalCart = cartItems.reduce((sum, item) => sum + (item.price * item.quantity * item.duration), 0);

  return (
    <>
      <AppShell.Header bg="white" withBorder px="md" h={70}>
        <Group justify="space-between" h="100%">
          {/* LOGO */}
          <Link href="/">
            <Group gap="xs">
              <Box fw={700} size="lg" style={{ cursor: 'pointer', fontSize: '24px' }}>
                ⚡ SAD Rental
              </Box>
            </Group>
          </Link>

          {/* DESKTOP NAV */}
          <Group gap="xs" visibleFrom="sm">
            <Button variant="subtle" leftSection={<IconHome size={18} />} component={Link} href="/">
              Beranda
            </Button>
            <Button variant="subtle" leftSection={<IconHistory size={18} />} component={Link} href="/pesanan">
              Pesanan Saya
            </Button>
            <Button variant="subtle" leftSection={<IconStar size={18} />} component={Link} href="/ulasan">
              Ulasan
            </Button>
            <Button variant="subtle" leftSection={<IconPhone size={18} />} component={Link} href="/kontak">
              Kontak
            </Button>
          </Group>

          {/* RIGHT SECTION */}
          <Group gap="xs">
            {/* CART BUTTON */}
            <Box style={{ position: 'relative' }} onClick={() => setCartOpen(true)}>
              <Button variant="light" color="blue" leftSection={<IconShoppingCart size={18} />}>
                Keranjang
              </Button>
              {cartItems.length > 0 && (
                <Badge color="red" style={{ position: 'absolute', top: '-8px', right: '-8px' }}>
                  {cartItems.length}
                </Badge>
              )}
            </Box>

            {/* USER MENU */}
            <Menu position="bottom-end" withArrow>
              <Menu.Target>
                <Button variant="light" leftSection={<IconUser size={18} />}>
                  Akun
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item leftSection={<IconUserCircle size={16} />}>
                  <Stack gap={2}>
                    <Text fw={600} size="sm">{user.name}</Text>
                    <Text size="xs" c="dimmed">{user.email}</Text>
                  </Stack>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item leftSection={<IconHistory size={16} />} component={Link} href="/pesanan">
                  Pesanan Saya
                </Menu.Item>
                <Menu.Item leftSection={<IconStar size={16} />} component={Link} href="/ulasan">
                  Ulasan & Rating
                </Menu.Item>
                <Menu.Item leftSection={<IconUserCircle size={16} />} component={Link} href="/profil">
                  Profil
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item
                  leftSection={<IconLogout size={16} />}
                  color="red"
                  onClick={() => {
                    notifications.show({ title: 'Logout', message: 'Terima kasih telah menggunakan SAD Rental', color: 'green' });
                  }}
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>

            {/* MOBILE MENU */}
            <ActionIcon hiddenFrom="sm" variant="light" onClick={() => setMobileOpened(!mobileOpened)} size="lg">
              {mobileOpened ? <IconX size={18} /> : <IconMenu2 size={18} />}
            </ActionIcon>
          </Group>
        </Group>
      </AppShell.Header>

      {/* CART DRAWER */}
      <Drawer opened={cartOpen} onClose={() => setCartOpen(false)} title="Keranjang Sewa" padding="lg" size="lg" position="right">
        <Stack gap="lg">
          {cartItems.length > 0 ? (
            <>
              <Table striped>
                <Table.Tbody>
                  {cartItems.map((item) => (
                    <Table.Tr key={item.id}>
                      <Table.Td>
                        <Stack gap={0}>
                          <Text fw={600} size="sm">{item.name}</Text>
                          <Text size="xs" c="dimmed">{item.quantity} × {item.duration} hari</Text>
                        </Stack>
                      </Table.Td>
                      <Table.Td align="right">
                        <Text fw={600}>Rp {(item.price * item.quantity * item.duration).toLocaleString('id-ID')}</Text>
                      </Table.Td>
                      <Table.Td align="right">
                        <ActionIcon variant="light" color="red" size="sm" onClick={() => notifications.show({ title: 'Dihapus', message: 'Item dihapus dari keranjang', color: 'green' })}>
                          <IconX size={14} />
                        </ActionIcon>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>

              <Box p="md" style={{ border: '1px solid #dee2e6', borderRadius: '8px' }}>
                <Group justify="space-between" mb="xs">
                  <Text fw={600}>Subtotal</Text>
                  <Text>Rp {totalCart.toLocaleString('id-ID')}</Text>
                </Group>
                <Group justify="space-between" mb="md">
                  <Text fw={600}>Ongkos Kirim</Text>
                  <Text>Rp 500.000</Text>
                </Group>
                <Group justify="space-between">
                  <Text fw={700} size="lg">Total</Text>
                  <Text fw={700} size="lg" color="blue">Rp {(totalCart + 500000).toLocaleString('id-ID')}</Text>
                </Group>
              </Box>

              <Button fullWidth color="blue" size="lg" onClick={() => {
                setCartOpen(false);
                notifications.show({ title: 'Melanjutkan Checkout', message: 'Arahkan ke halaman pembayaran', color: 'blue' });
              }}>
                Lanjutkan Checkout
              </Button>
            </>
          ) : (
            <Center py="xl">
              <Stack align="center">
                <IconShoppingCart size={48} style={{ color: '#adb5bd' }} />
                <Text c="dimmed">Keranjang Anda kosong</Text>
              </Stack>
            </Center>
          )}
        </Stack>
      </Drawer>

      {/* MOBILE MENU DRAWER */}
      <Drawer opened={mobileOpened} onClose={() => setMobileOpened(false)} title="Menu" padding="lg" size="xs">
        <Stack gap="sm">
          <Button fullWidth variant="light" component={Link} href="/" onClick={() => setMobileOpened(false)}>
            Beranda
          </Button>
          <Button fullWidth variant="light" component={Link} href="/pesanan" onClick={() => setMobileOpened(false)}>
            Pesanan Saya
          </Button>
          <Button fullWidth variant="light" component={Link} href="/ulasan" onClick={() => setMobileOpened(false)}>
            Ulasan
          </Button>
          <Button fullWidth variant="light" component={Link} href="/kontak" onClick={() => setMobileOpened(false)}>
            Kontak
          </Button>
        </Stack>
      </Drawer>
    </>
  );
}
