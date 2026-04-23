'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Container, Paper, Title, Text, TextInput, PasswordInput, Button, Stack, Group, Center } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useAuth } from '../../../hooks/useAuth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'id';

  const handleLogin = async () => {
    if (!email || !password) {
      showNotification({ title: 'Validasi', message: 'Email dan password tidak boleh kosong', color: 'red' });
      return;
    }

    setIsLoading(true);
    try {
      const result = await login(email, password);
      if (result.success) {
        showNotification({ title: 'Berhasil', message: 'Login berhasil!', color: 'green' });
        router.push(`/${locale}/dashboard`);
      } else {
        showNotification({ title: 'Gagal', message: result.error || 'Login gagal', color: 'red' });
      }
    } catch {
      showNotification({ title: 'Error', message: 'Terjadi kesalahan', color: 'red' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container size="sm" py="xl">
      <Center style={{ minHeight: '80vh' }}>
        <Paper withBorder radius="md" p="xl" style={{ width: '100%' }}>
          <Stack gap="lg">
            <div style={{ textAlign: 'center' }}>
              <Title order={2}>Masuk ke Akun Anda</Title>
              <Text c="dimmed" size="sm" mt="xs">
                Akses dashboard untuk mengelola pemesanan genset Anda
              </Text>
            </div>

            <Stack gap="md">
              <TextInput
                label="Email"
                placeholder="email@contoh.com"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                disabled={isLoading}
              />
              <PasswordInput
                label="Password"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                disabled={isLoading}
              />
            </Stack>

            <Button fullWidth color="violet" size="md" onClick={handleLogin} loading={isLoading}>
              Masuk
            </Button>

            <Group justify="center">
              <Text size="sm">Belum punya akun?</Text>
              <Link href={`/${locale}/register`}>
                <Text component="span" c="violet" fw={600} style={{ cursor: 'pointer' }}>
                  Daftar di sini
                </Text>
              </Link>
            </Group>

            <Group justify="center">
              <Link href="/">
                <Text component="span" size="sm" c="dimmed" style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                  Kembali ke beranda
                </Text>
              </Link>
            </Group>
          </Stack>
        </Paper>
      </Center>
    </Container>
  );
}
