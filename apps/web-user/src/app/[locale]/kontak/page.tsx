'use client'

import { AppShell, Container, Stack, Group, Box, Title, Text, Paper, Button, TextInput, Textarea, Grid, Center, Card, Badge, Tabs, Avatar } from '@mantine/core';
import { IconPhone, IconMail, IconMapPin, IconClock, IconMessage, IconSend, IconCheck } from '@tabler/icons-react';
import { Navbar } from '../../../components/layout/Navbar';
import { useState } from 'react';
import { notifications } from '@mantine/notifications';

export default function Contact() {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!email || !subject || !message) {
      notifications.show({ title: 'Data Tidak Lengkap', message: 'Silakan isi semua kolom', color: 'red' });
      return;
    }

    setSubmitted(true);
    notifications.show({ title: 'Terima Kasih', message: 'Pesan Anda telah dikirim. Tim kami akan merespons dalam 24 jam.', color: 'green' });

    setTimeout(() => {
      setEmail('');
      setSubject('');
      setMessage('');
      setSubmitted(false);
    }, 2000);
  };

  return (
    <AppShell navbar={{ width: 0, breakpoint: 0 }} header={{ height: 70 }}>
      <Navbar />

      <Container size="lg" py="xl">
        <Stack gap="xl">
          {/* HEADER */}
          <Box>
            <Title order={1} mb="xs">Hubungi Kami</Title>
            <Text c="dimmed" size="lg">
              Kami siap membantu Anda 24/7. Hubungi kami melalui berbagai channel komunikasi yang tersedia.
            </Text>
          </Box>

          {/* CONTACT INFO CARDS */}
          <Grid>
            <Col span={{ base: 12, sm: 6 }}>
              <Card withBorder p="lg" radius="md">
                <Group mb="sm">
                  <Box style={{ fontSize: '24px' }}>📞</Box>
                  <Box>
                    <Text fw={700}>Telepon</Text>
                    <Text size="sm" c="dimmed">Hubungi kami langsung</Text>
                  </Box>
                </Group>
                <Stack gap="xs">
                  <Text fw={600}>+62 21 123 4567</Text>
                  <Text fw={600}>+62 812 3456 7890</Text>
                  <Text size="xs" c="dimmed">Senin - Jumat: 08:00 - 17:00 WIB</Text>
                  <Text size="xs" c="dimmed">Sabtu: 09:00 - 13:00 WIB</Text>
                </Stack>
              </Card>
            </Col>

            <Col span={{ base: 12, sm: 6 }}>
              <Card withBorder p="lg" radius="md">
                <Group mb="sm">
                  <Box style={{ fontSize: '24px' }}>📧</Box>
                  <Box>
                    <Text fw={700}>Email</Text>
                    <Text size="sm" c="dimmed">Kirim pertanyaan Anda</Text>
                  </Box>
                </Group>
                <Stack gap="xs">
                  <Text fw={600}>info@sadrentalindo.com</Text>
                  <Text fw={600}>support@sadrentalindo.com</Text>
                  <Text size="xs" c="dimmed">Respons dalam 24 jam kerja</Text>
                </Stack>
              </Card>
            </Col>

            <Col span={{ base: 12, sm: 6 }}>
              <Card withBorder p="lg" radius="md">
                <Group mb="sm">
                  <Box style={{ fontSize: '24px' }}>📍</Box>
                  <Box>
                    <Text fw={700}>Lokasi</Text>
                    <Text size="sm" c="dimmed">Kunjungi kantor kami</Text>
                  </Box>
                </Group>
                <Stack gap="xs">
                  <Text size="sm">
                    Jl. Sudirman No. 123<br />
                    Jakarta Pusat, 12190<br />
                    Indonesia
                  </Text>
                  <Button variant="light" size="sm">
                    Lihat di Maps
                  </Button>
                </Stack>
              </Card>
            </Col>

            <Col span={{ base: 12, sm: 6 }}>
              <Card withBorder p="lg" radius="md">
                <Group mb="sm">
                  <Box style={{ fontSize: '24px' }}>💬</Box>
                  <Box>
                    <Text fw={700}>Live Chat</Text>
                    <Text size="sm" c="dimmed">Chat dengan tim kami</Text>
                  </Box>
                </Group>
                <Stack gap="xs">
                  <Text size="sm">Tersedia untuk menjawab pertanyaan Anda</Text>
                  <Button variant="light" size="sm">
                    Mulai Chat
                  </Button>
                </Stack>
              </Card>
            </Col>
          </Grid>

          {/* CONTACT FORM & FAQ */}
          <Grid>
            <Col span={{ base: 12, lg: 6 }}>
              <Card withBorder p="lg">
                <Title order={3} mb="lg">Kirim Pesan</Title>

                {submitted ? (
                  <Center py="xl">
                    <Stack align="center">
                      <Box style={{ fontSize: '48px' }}>✅</Box>
                      <Text fw={700}>Pesan Terkirim!</Text>
                      <Text c="dimmed" ta="center" size="sm">
                        Terima kasih telah menghubungi kami. Tim kami akan segera merespons pesan Anda.
                      </Text>
                    </Stack>
                  </Center>
                ) : (
                  <Stack gap="md">
                    <TextInput
                      label="Email Anda"
                      placeholder="email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.currentTarget.value)}
                      required
                    />

                    <TextInput
                      label="Subjek"
                      placeholder="Pertanyaan atau keluhan Anda"
                      value={subject}
                      onChange={(e) => setSubject(e.currentTarget.value)}
                      required
                    />

                    <Textarea
                      label="Pesan"
                      placeholder="Ceritakan masalah atau pertanyaan Anda..."
                      value={message}
                      onChange={(e) => setMessage(e.currentTarget.value)}
                      minRows={6}
                      required
                    />

                    <Button fullWidth color="blue" size="lg" onClick={handleSubmit} leftSection={<IconSend size={18} />}>
                      Kirim Pesan
                    </Button>
                  </Stack>
                )}
              </Card>
            </Col>

            <Col span={{ base: 12, lg: 6 }}>
              <Card withBorder p="lg">
                <Title order={3} mb="lg">FAQ - Pertanyaan Umum</Title>

                <Tabs defaultValue="general">
                  <Tabs.List>
                    <Tabs.Tab value="general">Umum</Tabs.Tab>
                    <Tabs.Tab value="rental">Sewa</Tabs.Tab>
                    <Tabs.Tab value="payment">Pembayaran</Tabs.Tab>
                  </Tabs.List>

                  <Tabs.Panel value="general" pt="md">
                    <Stack gap="md">
                      <Box>
                        <Text fw={700} size="sm" mb="xs">Apa itu SAD Rental?</Text>
                        <Text size="sm" c="dimmed">
                          SAD Rental adalah platform penyewaan peralatan konstruksi dan industri terpercaya di Indonesia. Kami menyediakan berbagai peralatan berkualitas tinggi dengan harga kompetitif.
                        </Text>
                      </Box>

                      <Box>
                        <Text fw={700} size="sm" mb="xs">Area layanan SAD Rental mencakup?</Text>
                        <Text size="sm" c="dimmed">
                          Kami melayani seluruh wilayah Jabodetabek dan ekspansi ke kota-kota besar lainnya. Hubungi kami untuk informasi lebih lanjut.
                        </Text>
                      </Box>

                      <Box>
                        <Text fw={700} size="sm" mb="xs">Apakah peralatan diasuransikan?</Text>
                        <Text size="sm" c="dimmed">
                          Ya, semua peralatan sudah diasuransikan. Anda tidak perlu khawatir tentang risiko kerusakan.
                        </Text>
                      </Box>
                    </Stack>
                  </Tabs.Panel>

                  <Tabs.Panel value="rental" pt="md">
                    <Stack gap="md">
                      <Box>
                        <Text fw={700} size="sm" mb="xs">Berapa lama minimal sewa?</Text>
                        <Text size="sm" c="dimmed">
                          Minimal sewa adalah 1 hari. Untuk sewa jangka panjang (bulanan atau tahunan), hubungi kami untuk penawaran khusus.
                        </Text>
                      </Box>

                      <Box>
                        <Text fw={700} size="sm" mb="xs">Apakah termasuk operator/teknisi?</Text>
                        <Text size="sm" c="dimmed">
                          Untuk peralatan tertentu seperti excavator atau bulldozer, kami menyediakan operator berlisensi dengan biaya tambahan.
                        </Text>
                      </Box>

                      <Box>
                        <Text fw={700} size="sm" mb="xs">Bagaimana jika peralatan rusak?</Text>
                        <Text size="sm" c="dimmed">
                          Jika terjadi kerusakan karena penggunaan normal, semua ditanggung asuransi. Untuk kerusakan karena kelalaian, ada biaya tambahan.
                        </Text>
                      </Box>
                    </Stack>
                  </Tabs.Panel>

                  <Tabs.Panel value="payment" pt="md">
                    <Stack gap="md">
                      <Box>
                        <Text fw={700} size="sm" mb="xs">Metode pembayaran apa saja?</Text>
                        <Text size="sm" c="dimmed">
                          Kami menerima transfer bank, kartu kredit, e-wallet, dan cicilan tenor hingga 12 bulan.
                        </Text>
                      </Box>

                      <Box>
                        <Text fw={700} size="sm" mb="xs">Apakah ada biaya tambahan?</Text>
                        <Text size="sm" c="dimmed">
                          Harga yang ditampilkan sudah termasuk pengiriman gratis untuk area Jabodetabek. Luar area ada biaya tambahan.
                        </Text>
                      </Box>

                      <Box>
                        <Text fw={700} size="sm" mb="xs">Kapan pembayaran harus dilakukan?</Text>
                        <Text size="sm" c="dimmed">
                          Pembayaran dapat dilakukan setelah konfirmasi pesanan. Kami juga menerima pembayaran di tempat saat pengiriman.
                        </Text>
                      </Box>
                    </Stack>
                  </Tabs.Panel>
                </Tabs>
              </Card>
            </Col>
          </Grid>
        </Stack>
      </Container>
    </AppShell>
  );
}
