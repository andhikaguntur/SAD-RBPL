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
  Switch,
  Select,
  Button,
  Divider,
  Alert,
  Modal,
  PasswordInput,
} from '@mantine/core';
import { IconAlertCircle, IconLock, IconBell, IconCheck } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import AppLayout from '../../../components/AppLayout';
import { useAuth } from '../../../hooks/useAuth';

export default function SettingsPage() {
  const router = useRouter();
  const locale = useLocale();
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [openedPasswordModal, setOpenedPasswordModal] = useState(false);
  const [notifications, setNotifications] = useState<{
    emailNotifications: boolean;
    smsNotifications: boolean;
    rentalUpdates: boolean;
    promotions: boolean;
  }>({
    emailNotifications: true,
    smsNotifications: false,
    rentalUpdates: true,
    promotions: false,
  });
  const [preferences, setPreferences] = useState<{
    language: string;
    currency: string;
  }>({
    language: 'id',
    currency: 'IDR',
  });

  const passwordForm = useForm<{
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }>({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validate: {
      currentPassword: (value) => (!value ? 'Password saat ini harus diisi' : null),
      newPassword: (value) => {
        if (!value) return 'Password baru harus diisi';
        if (value.length < 6) return 'Password minimal 6 karakter';
        return null;
      },
      confirmPassword: (value, values) =>
        value !== values.newPassword ? 'Password tidak cocok' : null,
    },
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(`/${locale}/login`);
    }
  }, [isAuthenticated, router, locale]);

  if (!isAuthenticated) return null;

  const handleNotificationChange = (key: string): void => {
    setNotifications((prev) => ({
      ...prev,
      [key as keyof typeof prev]: !prev[key as keyof typeof prev],
    }));
  };

  const handlePreferenceChange = (key: string, value: string): void => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSavePreferences = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      showNotification({
        title: 'Preferensi Tersimpan',
        message: 'Pengaturan Anda telah diperbarui dengan sukses.',
        color: 'green',
        icon: <IconCheck size={16} />,
      });
    } catch {
      showNotification({
        title: 'Error',
        message: 'Gagal menyimpan preferensi.',
        color: 'red',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async (): Promise<void> => {
    if (passwordForm.validate().hasErrors) return;

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      showNotification({
        title: 'Password Berhasil Diubah',
        message: 'Password Anda telah diperbarui dengan aman.',
        color: 'green',
        icon: <IconCheck size={16} />,
      });
      passwordForm.reset();
      setOpenedPasswordModal(false);
    } catch {
      showNotification({
        title: 'Error',
        message: 'Gagal mengubah password.',
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
            Pengaturan Akun
          </Title>
          <Text c="dimmed">
            Kelola preferensi, notifikasi, dan keamanan akun Anda
          </Text>
        </div>

        {/* Notification Preferences */}
        <Paper withBorder p="lg" radius="md" mb="xl">
          <Group justify="space-between" mb="md">
            <div>
              <Title order={4}>
                <Group gap="xs">
                  <IconBell size={20} />
                  Preferensi Notifikasi
                </Group>
              </Title>
              <Text size="sm" c="dimmed" mt="xs">
                Pilih bagaimana Anda ingin menerima pemberitahuan dari kami
              </Text>
            </div>
          </Group>

          <Divider my="md" />

          <Stack gap="md">
            <Group justify="space-between">
              <div>
                <Text fw={500}>Notifikasi Email</Text>
                <Text size="sm" c="dimmed">
                  Terima pemberitahuan melalui email
                </Text>
              </div>
              <Switch
                checked={notifications.emailNotifications}
                onChange={() => handleNotificationChange('emailNotifications')}
              />
            </Group>

            <Group justify="space-between">
              <div>
                <Text fw={500}>Notifikasi SMS</Text>
                <Text size="sm" c="dimmed">
                  Terima pemberitahuan melalui SMS (biaya SMS berlaku)
                </Text>
              </div>
              <Switch
                checked={notifications.smsNotifications}
                onChange={() => handleNotificationChange('smsNotifications')}
              />
            </Group>

            <Group justify="space-between">
              <div>
                <Text fw={500}>Update Sewa</Text>
                <Text size="sm" c="dimmed">
                  Pemberitahuan status sewa dan pengiriman
                </Text>
              </div>
              <Switch
                checked={notifications.rentalUpdates}
                onChange={() => handleNotificationChange('rentalUpdates')}
              />
            </Group>

            <Group justify="space-between">
              <div>
                <Text fw={500}>Promosi & Penawaran</Text>
                <Text size="sm" c="dimmed">
                  Penawaran khusus dan promosi terbatas
                </Text>
              </div>
              <Switch
                checked={notifications.promotions}
                onChange={() => handleNotificationChange('promotions')}
              />
            </Group>

            <Button
              fullWidth
              onClick={handleSavePreferences}
              loading={isLoading}
              mt="md"
            >
              Simpan Preferensi Notifikasi
            </Button>
          </Stack>
        </Paper>

        {/* General Preferences */}
        <Paper withBorder p="lg" radius="md" mb="xl">
          <Title order={4} mb="md">
            Preferensi Umum
          </Title>

          <Stack gap="md">
            <Select
              label="Bahasa"
              placeholder="Pilih bahasa"
              data={[
                { value: 'id', label: 'Bahasa Indonesia' },
                { value: 'en', label: 'English' },
              ]}
              value={preferences.language}
              onChange={(value) => handlePreferenceChange('language', value || 'id')}
            />

            <Select
              label="Mata Uang"
              placeholder="Pilih mata uang"
              data={[
                { value: 'IDR', label: 'Rupiah (IDR)' },
                { value: 'USD', label: 'US Dollar (USD)' },
              ]}
              value={preferences.currency}
              onChange={(value) => handlePreferenceChange('currency', value || 'IDR')}
            />

            <Button
              fullWidth
              onClick={handleSavePreferences}
              loading={isLoading}
              mt="md"
            >
              Simpan Preferensi
            </Button>
          </Stack>
        </Paper>

        {/* Security Section */}
        <Paper withBorder p="lg" radius="md" mb="xl">
          <Title order={4} mb="md">
            <Group gap="xs">
              <IconLock size={20} />
              Keamanan
            </Group>
          </Title>

          <Stack gap="md">
            <Alert icon={<IconAlertCircle size={16} />} color="blue">
              Password terakhir diubah pada 15 Maret 2026
            </Alert>

            <Button
              variant="outline"
              fullWidth
              onClick={() => setOpenedPasswordModal(true)}
            >
              Ubah Password
            </Button>
          </Stack>
        </Paper>

        {/* Danger Zone */}
        <Paper withBorder p="lg" radius="md" style={{ borderColor: '#fa5252' }}>
          <Title order={4} mb="md" c="red">
            Zona Berbahaya
          </Title>

          <Stack gap="md">
            <Alert icon={<IconAlertCircle size={16} />} color="red" title="Perhatian">
              Tindakan di bagian ini tidak dapat dibatalkan. Pastikan Anda benar-benar ingin melakukannya.
            </Alert>

            <Button
              variant="outline"
              color="red"
              fullWidth
              disabled
            >
              Nonaktifkan Akun
            </Button>
          </Stack>
        </Paper>
      </Container>

      {/* Change Password Modal */}
      <Modal
        opened={openedPasswordModal}
        onClose={() => setOpenedPasswordModal(false)}
        title="Ubah Password"
        centered
      >
        <Stack gap="md">
          <PasswordInput
            label="Password Saat Ini"
            placeholder="Masukkan password Anda"
            {...passwordForm.getInputProps('currentPassword')}
          />

          <PasswordInput
            label="Password Baru"
            placeholder="Masukkan password baru"
            {...passwordForm.getInputProps('newPassword')}
          />

          <PasswordInput
            label="Konfirmasi Password Baru"
            placeholder="Ulangi password baru"
            {...passwordForm.getInputProps('confirmPassword')}
          />

          <Group justify="flex-end" mt="xl">
            <Button variant="outline" onClick={() => setOpenedPasswordModal(false)}>
              Batal
            </Button>
            <Button onClick={handleChangePassword} loading={isLoading}>
              Ubah Password
            </Button>
          </Group>
        </Stack>
      </Modal>
    </AppLayout>
  );
}
