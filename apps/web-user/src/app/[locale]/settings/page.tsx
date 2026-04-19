'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
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
  const t = useTranslations('Settings');
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
      currentPassword: (value) => (!value ? t('passwordCurrentRequired') : null),
      newPassword: (value) => {
        if (!value) return t('passwordNewRequired');
        if (value.length < 6) return t('passwordMinLength');
        return null;
      },
      confirmPassword: (value, values) =>
        value !== values.newPassword ? t('passwordMismatch') : null,
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
        title: t('preferencesSaved'),
        message: t('preferencesSavedMessage'),
        color: 'green',
        icon: <IconCheck size={16} />,
      });
    } catch {
      showNotification({
        title: t('error'),
        message: t('preferencesErrorMessage'),
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
        title: t('passwordChanged'),
        message: t('passwordChangedMessage'),
        color: 'green',
        icon: <IconCheck size={16} />,
      });
      passwordForm.reset();
      setOpenedPasswordModal(false);
    } catch {
      showNotification({
        title: t('error'),
        message: t('passwordErrorMessage'),
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
            {t('title')}
          </Title>
          <Text c="dimmed">
            {t('description')}
          </Text>
        </div>

        {/* Notification Preferences */}
        <Paper withBorder p="lg" radius="md" mb="xl">
          <Group justify="space-between" mb="md">
            <div>
              <Title order={4}>
                <Group gap="xs">
                  <IconBell size={20} />
                  {t('notificationPreferences')}
                </Group>
              </Title>
              <Text size="sm" c="dimmed" mt="xs">
                {t('notificationPreferencesDesc')}
              </Text>
            </div>
          </Group>

          <Divider my="md" />

          <Stack gap="md">
            <Group justify="space-between">
              <div>
                <Text fw={500}>{t('emailNotifications')}</Text>
                <Text size="sm" c="dimmed">
                  {t('emailNotificationsDesc')}
                </Text>
              </div>
              <Switch
                checked={notifications.emailNotifications}
                onChange={() => handleNotificationChange('emailNotifications')}
              />
            </Group>

            <Group justify="space-between">
              <div>
                <Text fw={500}>{t('smsNotifications')}</Text>
                <Text size="sm" c="dimmed">
                  {t('smsNotificationsDesc')}
                </Text>
              </div>
              <Switch
                checked={notifications.smsNotifications}
                onChange={() => handleNotificationChange('smsNotifications')}
              />
            </Group>

            <Group justify="space-between">
              <div>
                <Text fw={500}>{t('rentalUpdates')}</Text>
                <Text size="sm" c="dimmed">
                  {t('rentalUpdatesDesc')}
                </Text>
              </div>
              <Switch
                checked={notifications.rentalUpdates}
                onChange={() => handleNotificationChange('rentalUpdates')}
              />
            </Group>

            <Group justify="space-between">
              <div>
                <Text fw={500}>{t('promotions')}</Text>
                <Text size="sm" c="dimmed">
                  {t('promotionsDesc')}
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
              {t('saveNotificationPreferences')}
            </Button>
          </Stack>
        </Paper>

        {/* General Preferences */}
        <Paper withBorder p="lg" radius="md" mb="xl">
          <Title order={4} mb="md">
            {t('generalPreferences')}
          </Title>

          <Stack gap="md">
            <Select
              label={t('language')}
              placeholder={t('languagePlaceholder')}
              data={[
                { value: 'id', label: 'Bahasa Indonesia' },
                { value: 'en', label: 'English' },
              ]}
              value={preferences.language}
              onChange={(value) => handlePreferenceChange('language', value || 'id')}
            />

            <Select
              label={t('currency')}
              placeholder={t('currencyPlaceholder')}
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
              {t('savePreferences')}
            </Button>
          </Stack>
        </Paper>

        {/* Security Section */}
        <Paper withBorder p="lg" radius="md" mb="xl">
          <Title order={4} mb="md">
            <Group gap="xs">
              <IconLock size={20} />
              {t('security')}
            </Group>
          </Title>

          <Stack gap="md">
            <Alert icon={<IconAlertCircle size={16} />} color="blue">
              {t('passwordLastChanged')}
            </Alert>

            <Button
              variant="outline"
              fullWidth
              onClick={() => setOpenedPasswordModal(true)}
            >
              {t('changePassword')}
            </Button>
          </Stack>
        </Paper>

        {/* Danger Zone */}
        <Paper withBorder p="lg" radius="md" style={{ borderColor: '#fa5252' }}>
          <Title order={4} mb="md" c="red">
            {t('dangerZone')}
          </Title>

          <Stack gap="md">
            <Alert icon={<IconAlertCircle size={16} />} color="red" title={t('warning')}>
              {t('irreversibleAction')}
            </Alert>

            <Button
              variant="outline"
              color="red"
              fullWidth
              disabled
            >
              {t('disableAccount')}
            </Button>
          </Stack>
        </Paper>
      </Container>

      {/* Change Password Modal */}
      <Modal
        opened={openedPasswordModal}
        onClose={() => setOpenedPasswordModal(false)}
        title={t('changePasswordModal')}
        centered
      >
        <Stack gap="md">
          <PasswordInput
            label={t('currentPassword')}
            placeholder={t('currentPasswordPlaceholder')}
            {...passwordForm.getInputProps('currentPassword')}
          />

          <PasswordInput
            label={t('newPassword')}
            placeholder={t('newPasswordPlaceholder')}
            {...passwordForm.getInputProps('newPassword')}
          />

          <PasswordInput
            label={t('confirmNewPassword')}
            placeholder={t('confirmNewPasswordPlaceholder')}
            {...passwordForm.getInputProps('confirmPassword')}
          />

          <Group justify="flex-end" mt="xl">
            <Button variant="outline" onClick={() => setOpenedPasswordModal(false)}>
              {t('cancel')}
            </Button>
            <Button onClick={handleChangePassword} loading={isLoading}>
              {t('changePassword')}
            </Button>
          </Group>
        </Stack>
      </Modal>
    </AppLayout>
  );
}
