'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
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

export default function NewRent() {
  const router = useRouter();
  const locale = useLocale();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.push(`/${locale}/rent`);
    } else {
      router.push(`/${locale}/login`);
    }
  }, [isAuthenticated, router, locale]);

  const [active, setActive] = useState(0);
  const [selectedMachine, setSelectedMachine] = useState<string | null>(null);

  const scheduleForm = useForm({
    initialValues: {
      startDate: '',
      endDate: '',
    },
    validate: {
      startDate: (v) => (v ? null : 'Tanggal mulai harus dipilih'),
      endDate: (v) => (v ? null : 'Tanggal selesai harus dipilih'),
    },
  });

  const locationForm = useForm({
    initialValues: {
      address: '',
      city: '',
      notes: '',
    },
    validate: {
      address: (v) => (v ? null : 'Alamat diperlukan'),
      city: (v) => (v ? null : 'Kota diperlukan'),
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
      title: 'Permintaan berhasil dikirim',
      message: 'Tim kami akan menghubungi Anda segera.',
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
          Permintaan Sewa Baru
        </Title>
        <Text color="dimmed" mb="md">
          Ikuti langkah sederhana untuk meminta sewa mesin. Kami akan meninjau lalu mengirimkan penawaran.
        </Text>

        <Stepper active={active} onStepClick={setActive}>
        <Stepper.Step label="Pilih Mesin" description="Pilih unit yang Anda butuhkan">
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
                    {selectedMachine === m.id ? 'Terpilih' : 'Pilih ini'}
                  </Button>
                </Group>
              </Card>
            ))}
          </SimpleGrid>

          <Group mt="md">
            <Button variant="default" onClick={handlePrev} disabled={active === 0}>
              Kembali
            </Button>
            <Button onClick={() => (selectedMachine ? handleNext() : showNotification({ title: 'Pilih mesin', message: 'Silakan pilih mesin terlebih dahulu', color: 'red' }))}>
              Lanjutkan
            </Button>
          </Group>
        </Stepper.Step>

        <Stepper.Step label="Jadwal" description="Pilih tanggal sewa">
          <Stack>
            <TextInput label="Tanggal Mulai (YYYY-MM-DD)" placeholder="2026-04-01" {...scheduleForm.getInputProps('startDate')} />
            <TextInput label="Tanggal Selesai (YYYY-MM-DD)" placeholder="2026-04-03" {...scheduleForm.getInputProps('endDate')} />

            <Group mt="md">
              <Button variant="default" onClick={handlePrev}>
                Kembali
              </Button>
              <Button onClick={() => { if (scheduleForm.validate().hasErrors) { scheduleForm.validate(); } else handleNext(); }}>
                Lanjutkan
              </Button>
            </Group>
          </Stack>
        </Stepper.Step>

        <Stepper.Step label="Lokasi" description="Dimana mesin diantar">
          <Stack>
            <TextInput label="Alamat lengkap" placeholder="Jl. Contoh No.1" {...locationForm.getInputProps('address')} />
            <TextInput label="Kota" placeholder="Bandung" {...locationForm.getInputProps('city')} />
            <Textarea label="Catatan untuk pengiriman" placeholder="Contoh: masuk gerbang B" {...locationForm.getInputProps('notes')} />

            <Group mt="md">
              <Button variant="default" onClick={handlePrev}>
                Kembali
              </Button>
              <Button onClick={() => { if (locationForm.validate().hasErrors) { locationForm.validate(); } else handleNext(); }}>
                Lanjutkan
              </Button>
            </Group>
          </Stack>
        </Stepper.Step>

        <Stepper.Step label="Konfirmasi" description="Periksa dan kirim">
          <Box>
            <Text fw={700} mb="xs">Ringkasan Permintaan</Text>
            <Stack gap="xs">
              <Text>{summary().machine?.name ?? 'Belum memilih mesin'}</Text>
              <Text color="dimmed">Durasi: {summary().days} hari</Text>
              <Text color="dimmed">Total perkiraan: Rp {summary().total.toLocaleString()}</Text>
            </Stack>

            <Group mt="md">
              <Button variant="default" onClick={handlePrev}>
                Kembali
              </Button>
              <Button color="violet" onClick={handleSubmit}>
                Kirim Permintaan
              </Button>
            </Group>
          </Box>
        </Stepper.Step>

        <Stepper.Completed>
          <Notification icon={<IconCheck size={18} />} color="green">
            Permintaan dikirim — Anda akan menerima penawaran dalam beberapa saat.
          </Notification>
        </Stepper.Completed>
        </Stepper>
      </Container>
    </AppLayout>
  );
}
