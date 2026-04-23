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
  LoadingOverlay
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconCheck } from '@tabler/icons-react';
import { showNotification } from '@mantine/notifications';
import AppLayout from '../../../components/AppLayout';
import { useAuth } from '../../../hooks/useAuth';

interface Machine {
  idMesin: string;
  namaMesin: string;
  kapasitas: string;
  status: string;
  pricePerDay?: number; // Added for frontend logic
}

export default function RentPage() {
  const router = useRouter();
  const locale = useLocale();
  const { isAuthenticated, user } = useAuth();
  const t = useTranslations('Rent');

  const [active, setActive] = useState(0);
  const [selectedMachine, setSelectedMachine] = useState<string | null>(null);
  const [machines, setMachines] = useState<Machine[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    } else {
      fetchMachines();
    }
  }, [isAuthenticated, router, locale]);

  const fetchMachines = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/mesin');
      const json = await res.json();
      if (json.success) {
        // Only show available machines
        const available = json.data
          .filter((m: any) => m.status === 'Tersedia')
          .map((m: any) => ({
            ...m,
            pricePerDay: m.namaMesin.includes('100kVA') ? 800000 : 500000 // mock price fallback
          }));
        setMachines(available);
      }
    } catch (err) {
      showNotification({ title: 'Error', message: 'Gagal memuat data mesin', color: 'red' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => setActive((t) => Math.min(3, t + 1));
  const handlePrev = () => setActive((t) => Math.max(0, t - 1));

  const summary = () => {
    const machine = machines.find((m) => m.idMesin === selectedMachine);
    const days = 1; // simple mock calc
    const total = machine ? (machine.pricePerDay || 0) * days : 0;
    return { machine, days, total };
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const machine = summary().machine;
    
    try {
      const res = await fetch('http://localhost:4000/api/permintaan-sewa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idPermintaan: `REQ-${Date.now()}`,
          pelanggan: user?.name || 'User',
          durasi: summary().days,
          lokasi: `${locationForm.values.address}, ${locationForm.values.city}`,
          status: 'Menunggu',
          tanggalFormat: new Date().toLocaleDateString('id-ID'),
          mesin: [{
            idMesin: machine?.idMesin,
            qty: 1,
            harga: machine?.pricePerDay || 0,
            diskon: 0
          }]
        })
      });

      const json = await res.json();
      if (json.success) {
        showNotification({
          title: t('successTitle'),
          message: t('successMessage'),
          color: 'green',
          icon: <IconCheck size={16} />,
        });
        router.push(`/${locale}/quotations`);
      } else {
        throw new Error(json.message);
      }
    } catch (err: any) {
      showNotification({ title: 'Gagal', message: err.message || 'Gagal mengirim permintaan', color: 'red' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <AppLayout>
      <Container size="md" py="xl" pos="relative">
        <LoadingOverlay visible={isLoading || isSubmitting} />
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
              <Card shadow="sm" radius="md" withBorder key={m.idMesin}>
                <Group justify="space-between" mb="xs">
                  <Text fw={700}>{m.namaMesin}</Text>
                  <Badge>{`Rp ${(m.pricePerDay || 0).toLocaleString()}`}</Badge>
                </Group>
                <Text size="sm" c="dimmed" mb="md">
                  Kapasitas: {m.kapasitas}
                </Text>
                <Group justify="right">
                  <Button variant={selectedMachine === m.idMesin ? 'filled' : 'outline'} onClick={() => setSelectedMachine(m.idMesin)}>
                    {selectedMachine === m.idMesin ? t('selected') : t('selectThis')}
                  </Button>
                </Group>
              </Card>
            ))}
            {machines.length === 0 && !isLoading && (
              <Box py="xl" ta="center" style={{ gridColumn: '1 / -1' }}>
                <Text c="dimmed">Tidak ada mesin tersedia saat ini.</Text>
              </Box>
            )}
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
            <TextInput label={t('startDateLabel')} placeholder="YYYY-MM-DD" {...scheduleForm.getInputProps('startDate')} />
            <TextInput label={t('endDateLabel')} placeholder="YYYY-MM-DD" {...scheduleForm.getInputProps('endDate')} />

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
              <Text>{summary().machine?.namaMesin ?? t('noMachineSelected')}</Text>
              <Text color="dimmed">{t('duration')}: {summary().days} {t('days')}</Text>
              <Text color="dimmed">{t('estimatedTotal')}: Rp {summary().total.toLocaleString()}</Text>
            </Stack>

            <Group mt="md">
              <Button variant="default" onClick={handlePrev}>
                {t('back')}
              </Button>
              <Button color="violet" onClick={handleSubmit} loading={isSubmitting}>
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
