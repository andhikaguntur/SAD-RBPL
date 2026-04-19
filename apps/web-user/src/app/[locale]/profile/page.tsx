'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import {
  Container,
  Title,
  Text,
  Paper,
  Stack,
  Group,
  TextInput,
  Button,
  Avatar,
  Divider,
  Badge,
} from '@mantine/core';
import { IconUser, IconPhone, IconMail, IconMapPin, IconCheck } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import AppLayout from '../../../components/AppLayout';
import { useAuth } from '../../../hooks/useAuth';

export default function ProfilePage() {
  const router = useRouter();
  const locale = useLocale();
  const { isAuthenticated, user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<{
    name: string;
    email: string;
    phone: string;
    companyName: string;
    companyAddress: string;
  }>({
    initialValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      companyName: '',
      companyAddress: '',
    },
    validate: {
      name: (value) => (!value ? 'Nama tidak boleh kosong' : null),
      email: (value) => (!value ? 'Email tidak boleh kosong' : !/^\S+@\S+$/.test(value) ? 'Email tidak valid' : null),
      phone: (value) => (!value ? 'Nomor telepon tidak boleh kosong' : null),
    },
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(`/${locale}/login`);
    }
  }, [isAuthenticated, router, locale]);

  if (!isAuthenticated) return null;

  const handleSave = async (): Promise<void> => {
    if (form.validate().hasErrors) return;

    setIsLoading(true);
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      showNotification({
        title: 'Profil Tersimpan',
        message: 'Data profil Anda telah diperbarui dengan sukses.',
        color: 'green',
        icon: <IconCheck size={16} />,
      });

      setIsEditing(false);
    } catch {
      showNotification({
        title: 'Error',
        message: 'Gagal menyimpan profil. Silakan coba lagi.',
        color: 'red',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppLayout>
      <Container size="md" py="xl">
        <div style={{ marginBottom: 32 }}>
          <Title order={2} mb="xs">
            Profil Saya
          </Title>
          <Text c="dimmed">
            Kelola informasi pribadi dan perusahaan Anda
          </Text>
        </div>

        {/* Profile Header */}
        <Paper withBorder p="lg" radius="md" mb="xl">
          <Group mb="md">
            <Avatar name={user?.name || 'User'} size="lg" radius="md" />
            <div>
              <Text fw={700} size="lg">
                {user?.name || 'Pengguna'}
              </Text>
              <Text size="sm" c="dimmed">
                {user?.email || 'email@contoh.com'}
              </Text>
              <Badge mt="xs" variant="light">
                Anggota aktif sejak 2026
              </Badge>
            </div>
          </Group>
        </Paper>

        {/* Personal Information */}
        <Paper withBorder p="lg" radius="md" mb="xl">
          <Group justify="space-between" mb="md">
            <Title order={4}>Informasi Pribadi</Title>
            <Button
              variant={isEditing ? 'outline' : 'light'}
              size="xs"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Batal' : 'Ubah'}
            </Button>
          </Group>

          <Stack gap="md">
            <Group grow>
              <TextInput
                label="Nama Lengkap"
                placeholder="Masukkan nama Anda"
                // input={<IconUser size={16} />}
                {...form.getInputProps('name')}
                disabled={!isEditing || isLoading}
              />
              <TextInput
                label="Email"
                placeholder="email@contoh.com"
                // icon={<IconMail size={16} />}
                {...form.getInputProps('email')}
                disabled={!isEditing || isLoading}
              />
            </Group>

            <TextInput
              label="Nomor Telepon"
              placeholder="08123456789"
              // icon={<IconPhone size={16} />}
              {...form.getInputProps('phone')}
              disabled={!isEditing || isLoading}
            />

            {isEditing && (
              <Button
                fullWidth
                onClick={handleSave}
                loading={isLoading}
                mt="md"
              >
                Simpan Perubahan
              </Button>
            )}
          </Stack>
        </Paper>

        {/* Company Information */}
        <Paper withBorder p="lg" radius="md" mb="xl">
          <Title order={4} mb="md">
            Informasi Perusahaan
          </Title>

          <Stack gap="md">
            <TextInput
              label="Nama Perusahaan"
              placeholder="PT. Contoh Indonesia"
              // icon={<IconUser size={16} />}
              {...form.getInputProps('companyName')}
              disabled={!isEditing || isLoading}
            />

            <TextInput
              label="Alamat Perusahaan"
              placeholder="Jl. Contoh No. 1, Jakarta"
              // icon={<IconMapPin size={16} />}
              {...form.getInputProps('companyAddress')}
              disabled={!isEditing || isLoading}
            />

            {isEditing && (
              <Button
                fullWidth
                onClick={handleSave}
                loading={isLoading}
              >
                Simpan Perubahan
              </Button>
            )}
          </Stack>
        </Paper>

        {/* Account Statistics */}
        <Paper withBorder p="lg" radius="md">
          <Title order={4} mb="md">
            Statistik Akun
          </Title>

          <Group grow>
            <div>
              <Text size="sm" c="dimmed">
                Total Sewa
              </Text>
              <Text fw={700} size="lg">
                12
              </Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">
                Sewa Aktif
              </Text>
              <Text fw={700} size="lg">
                2
              </Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">
                Total Pengeluaran
              </Text>
              <Text fw={700} size="lg">
                Rp 15.5M
              </Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">
                Member Sejak
              </Text>
              <Text fw={700} size="lg">
                Mar 2026
              </Text>
            </div>
          </Group>
        </Paper>
      </Container>
    </AppLayout>
  );
}
