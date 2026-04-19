'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import {
  Container,
  Title,
  Stepper,
  Card,
  Group,
  Text,
  Button,
  SimpleGrid,
  TextInput,
  Textarea,
  Stack,
  Box,
  Badge,
  Notification,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconCheck } from '@tabler/icons-react';
import { showNotification } from '@mantine/notifications';
import AppLayout from '../../../components/AppLayout';
import { useAuth } from '../../../hooks/useAuth';

const machines = [
  { id: 'm1', name: 'Genset 50kVA', desc: 'Portable diesel genset, 50kVA', pricePerDay: 500000 },
  { id: 'm2', name: 'Genset 100kVA', desc: 'Heavy-duty diesel genset, 100kVA', pricePerDay: 800000 },
  { id: 'm3', name: 'Loader 3T', desc: 'Small loader for logistics', pricePerDay: 350000 },
];

export default function RentPage() {
  const router = useRouter();
  const locale = useLocale();
  const { isAuthenticated } = useAuth();
  const t = useTranslations('Rent');

  const [active, setActive] = useState(0);
  const [selectedMachine, setSelectedMachine] = useState<string | null>(null);

  const scheduleForm = useForm({
    initialValues: {
      startDate: '',
      endDate: '',
    },
    validate: {
      startDate: (v) => (v ? null : t('startDateRequired')),
      endDate: (v) => (v ? null : t('endDateRequired')),
    },
  });

  const locationForm = useForm({
    initialValues: {
      address: '',
      city: '',
      notes: '',
    },
    validate: {
      address: (v) => (v ? null : t('addressRequired')),
      city: (v) => (v ? null : t('cityRequired')),
    },
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(`/${locale}/login`);
    }
  }, [isAuthenticated, router, locale]);

  const handleNext = () => setActive((t) => Math.min(3, t + 1));
  const handlePrev = () => setActive((t) => Math.max(0, t - 1));

  const summary = () => {
    const machine = machines.find((m) => m.id === selectedMachine);
    const days = 1; // simple mock calc
    const total = machine ? machine.pricePerDay * days : 0;
    return { machine, days, total };
  };

  const handleSubmit = () => {
    // mock submit
    showNotification({
      title: t('successTitle'),
      message: t('successMessage'),
      color: 'green',
      icon: <IconCheck size={16} />,
    });
    router.push(`/${locale}/quotations`);
  };

  if (!isAuthenticated) return null;

  return (
    <AppLayout>
      <Container size="md" py="xl">
        <Title order={2} mb="sm">
          {t('title')}
        </Title>
        <Text color="dimmed" mb="md">
          {t('description')}
        </Text>

        <Stepper active={active} onStepClick={setActive}>
        <Stepper.Step label={t('step1Label')} description={t('step1Desc')}>
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
            {machines.map((m) => (
              <Card shadow="sm" radius="md" withBorder key={m.id}>
                <Group justify="space-between" mb="xs">
                  <Text fw={700}>{m.name}</Text>
                  <Badge>{`Rp ${m.pricePerDay.toLocaleString()}`}</Badge>
                </Group>
                <Text size="sm" c="dimmed" mb="md">
                  {m.desc}
                </Text>
                <Group justify="right">
                  <Button variant={selectedMachine === m.id ? 'filled' : 'outline'} onClick={() => setSelectedMachine(m.id)}>
                    {selectedMachine === m.id ? t('selected') : t('selectThis')}
                  </Button>
                </Group>
              </Card>
            ))}
          </SimpleGrid>

          <Group mt="md">
            <Button variant="default" onClick={handlePrev} disabled={active === 0}>
              {t('back')}
            </Button>
            <Button onClick={() => (selectedMachine ? handleNext() : showNotification({ title: t('selectMachine'), message: t('selectMachineMessage'), color: 'red' }))}>
              {t('continue')}
            </Button>
          </Group>
        </Stepper.Step>

        <Stepper.Step label={t('step2Label')} description={t('step2Desc')}>
          <Stack>
            <TextInput label={t('startDateLabel')} placeholder={t('startDatePlaceholder')} {...scheduleForm.getInputProps('startDate')} />
            <TextInput label={t('endDateLabel')} placeholder={t('endDatePlaceholder')} {...scheduleForm.getInputProps('endDate')} />

            <Group mt="md">
              <Button variant="default" onClick={handlePrev}>
                {t('back')}
              </Button>
              <Button onClick={() => { if (scheduleForm.validate().hasErrors) { scheduleForm.validate(); } else handleNext(); }}>
                {t('continue')}
              </Button>
            </Group>
          </Stack>
        </Stepper.Step>

        <Stepper.Step label={t('step3Label')} description={t('step3Desc')}>
          <Stack>
            <TextInput label={t('addressLabel')} placeholder={t('addressPlaceholder')} {...locationForm.getInputProps('address')} />
            <TextInput label={t('cityLabel')} placeholder={t('cityPlaceholder')} {...locationForm.getInputProps('city')} />
            <Textarea label={t('notesLabel')} placeholder={t('notesPlaceholder')} {...locationForm.getInputProps('notes')} />

            <Group mt="md">
              <Button variant="default" onClick={handlePrev}>
                {t('back')}
              </Button>
              <Button onClick={() => { if (locationForm.validate().hasErrors) { locationForm.validate(); } else handleNext(); }}>
                {t('continue')}
              </Button>
            </Group>
          </Stack>
        </Stepper.Step>

        <Stepper.Step label={t('step4Label')} description={t('step4Desc')}>
          <Box>
            <Text fw={700} mb="xs">{t('summaryTitle')}</Text>
            <Stack gap="xs">
              <Text>{summary().machine?.name ?? t('noMachineSelected')}</Text>
              <Text color="dimmed">{t('duration')}: {summary().days} {t('days')}</Text>
              <Text color="dimmed">{t('estimatedTotal')}: Rp {summary().total.toLocaleString()}</Text>
            </Stack>

            <Group mt="md">
              <Button variant="default" onClick={handlePrev}>
                {t('back')}
              </Button>
              <Button color="violet" onClick={handleSubmit}>
                {t('submit')}
              </Button>
            </Group>
          </Box>
        </Stepper.Step>

        <Stepper.Completed>
          <Notification icon={<IconCheck size={18} />} color="green">
            {t('completedMessage')}
          </Notification>
        </Stepper.Completed>
        </Stepper>
      </Container>
    </AppLayout>
  );
}
