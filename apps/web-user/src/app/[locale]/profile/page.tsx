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
  const t = useTranslations('Profile');
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
      name: (value) => (!value ? t('nameRequired') : null),
      email: (value) => (!value ? t('emailRequired') : !/^\S+@\S+$/.test(value) ? t('emailInvalid') : null),
      phone: (value) => (!value ? t('phoneRequired') : null),
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
        title: t('saved'),
        message: t('savedMessage'),
        color: 'green',
        icon: <IconCheck size={16} />,
      });

      setIsEditing(false);
    } catch {
      showNotification({
        title: t('error'),
        message: t('errorMessage'),
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
                {t('activeMember')}
              </Badge>
            </div>
          </Group>
        </Paper>

        {/* Personal Information */}
        <Paper withBorder p="lg" radius="md" mb="xl">
          <Group justify="space-between" mb="md">
            <Title order={4}>{t('personalInfo')}</Title>
            <Button
              variant={isEditing ? 'outline' : 'light'}
              size="xs"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? t('cancel') : t('edit')}
            </Button>
          </Group>

          <Stack gap="md">
            <Group grow>
              <TextInput
                label={t('fullName')}
                placeholder={t('fullNamePlaceholder')}
                leftSection={<IconUser size={16} />}
                {...form.getInputProps('name')}
                disabled={!isEditing || isLoading}
              />
              <TextInput
                label={t('email')}
                placeholder={t('emailPlaceholder')}
                leftSection={<IconMail size={16} />}
                {...form.getInputProps('email')}
                disabled={!isEditing || isLoading}
              />
            </Group>

            <TextInput
              label={t('phone')}
              placeholder={t('phonePlaceholder')}
              leftSection={<IconPhone size={16} />}
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
                {t('save')}
              </Button>
            )}
          </Stack>
        </Paper>

        {/* Company Information */}
        <Paper withBorder p="lg" radius="md" mb="xl">
          <Title order={4} mb="md">
            {t('companyInfo')}
          </Title>

          <Stack gap="md">
            <TextInput
              label={t('companyName')}
              placeholder={t('companyNamePlaceholder')}
              leftSection={<IconUser size={16} />}
              {...form.getInputProps('companyName')}
              disabled={!isEditing || isLoading}
            />

            <TextInput
              label={t('companyAddress')}
              placeholder={t('companyAddressPlaceholder')}
              leftSection={<IconMapPin size={16} />}
              {...form.getInputProps('companyAddress')}
              disabled={!isEditing || isLoading}
            />

            {isEditing && (
              <Button
                fullWidth
                onClick={handleSave}
                loading={isLoading}
              >
                {t('save')}
              </Button>
            )}
          </Stack>
        </Paper>

        {/* Account Statistics */}
        <Paper withBorder p="lg" radius="md">
          <Title order={4} mb="md">
            {t('accountStats')}
          </Title>

          <Group grow>
            <div>
              <Text size="sm" c="dimmed">
                {t('totalRentals')}
              </Text>
              <Text fw={700} size="lg">
                12
              </Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">
                {t('activeRentals')}
              </Text>
              <Text fw={700} size="lg">
                2
              </Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">
                {t('totalSpending')}
              </Text>
              <Text fw={700} size="lg">
                Rp 15.5M
              </Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">
                {t('memberSince')}
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
