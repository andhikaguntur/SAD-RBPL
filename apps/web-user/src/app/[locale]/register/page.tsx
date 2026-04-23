'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Container, Paper, Title, Text, TextInput, PasswordInput, Button, Stack, Group } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useAuth } from '../../../hooks/useAuth';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'id';

  const handleRegister = async () => {
    if (!name || !email || !phone || !password || !confirmPassword) {
      showNotification({ title: 'Validasi', message: 'Semua field harus diisi', color: 'red' });
      return;
    }

    if (password !== confirmPassword) {
      showNotification({ title: 'Validasi', message: 'Password tidak cocok', color: 'red' });
      return;
    }

    setIsLoading(true);
    try {
      const result = await register(name, email, phone, password);
      if (result.success) {
        showNotification({ title: 'Berhasil', message: 'Registrasi berhasil! Silakan masuk.', color: 'green' });
        router.push(`/${locale}/dashboard`);
      } else {
        showNotification({ title: 'Gagal', message: result.error || 'Registrasi gagal', color: 'red' });
      }
    } catch {
      showNotification({ title: 'Error', message: 'Terjadi kesalahan', color: 'red' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container size="sm" py="xl">
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Paper withBorder radius="md" p="xl" style={{ width: '100%' }}>
          <Stack gap="lg">
            <div style={{ textAlign: 'center' }}>
              <Title order={2}>Daftar Akun Baru</Title>
              <Text c="dimmed" size="sm" mt="xs">
                Bergabunglah dengan ribuan klien yang telah mempercayai kami
              </Text>
            </div>

            <Stack gap="md">
              <TextInput
                label="Nama Lengkap"
                placeholder="Masukkan nama Anda"
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
                disabled={isLoading}
              />
              <TextInput
                label="Email"
                placeholder="email@contoh.com"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                disabled={isLoading}
              />
              <TextInput
                label="Nomor Telepon"
                placeholder="08123456789"
                value={phone}
                onChange={(e) => setPhone(e.currentTarget.value)}
                disabled={isLoading}
              />
              <PasswordInput
                label="Password"
                placeholder="Buat password yang kuat"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                disabled={isLoading}
              />
              <PasswordInput
                label="Konfirmasi Password"
                placeholder="Ulangi password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.currentTarget.value)}
                disabled={isLoading}
              />
            </Stack>

            <Button fullWidth color="violet" size="md" onClick={handleRegister} loading={isLoading}>
              Daftar
            </Button>

            <Group justify="center">
              <Text size="sm">Sudah punya akun?</Text>
              <Link href={`/${locale}/login`}>
                <Text component="span" c="violet" fw={600} style={{ cursor: 'pointer' }}>
                  Masuk di sini
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
      </div>
    </Container>
  );
}
