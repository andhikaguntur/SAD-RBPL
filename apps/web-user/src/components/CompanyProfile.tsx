'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Container, Title, Text, Stack, Button, Grid, Card, Badge, Group, Paper } from '@mantine/core';
import { IconArrowRight, IconPhone, IconMail, IconMapPin } from '@tabler/icons-react';
import { useAuth } from '../hooks/useAuth';

export default function CompanyProfile() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handlePrimary = () => {
    if (isAuthenticated) {
      const locale = window.location.pathname.split('/')[1] || 'id';
      router.push(`/${locale}/dashboard`);
    } else {
      const locale = window.location.pathname.split('/')[1] || 'id';
      router.push(`/${locale}/login`);
    }
  };

  return (
    <Stack gap={0}>
      {/* Full-Screen Hero Section */}
      <div style={{ position: 'relative', height: '100vh', background: '#1a1a1a', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
            opacity: 0.8,
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 30% 50%, rgba(102, 126, 234, 0.1) 0%, transparent 50%)',
          }}
        />

        <Container size="lg" style={{ position: 'relative', zIndex: 2 }}>
          <Grid align="center" gutter="xl">
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Stack gap="lg">
                <div>
                  <Text size="sm" fw={600} c="dimmed" tt="uppercase" style={{ letterSpacing: "0.05em" }}>
                    Solusi Energi Terpercaya Indonesia
                  </Text>
                  <Title order={1} style={{ fontSize: '3.5rem', lineHeight: 1.1, color: 'white', marginTop: '1rem' }}>
                    CV. Sumber Anugerah Diesel
                  </Title>
                </div>

                <Text size="xl" c="dimmed" style={{ lineHeight: 1.6, maxWidth: '500px' }}>
                  Kami adalah mitra terpercaya untuk kebutuhan genset, bahan bakar diesel, dan layanan logistik terpadu. Dengan pengalaman lebih dari dua dekade, kami memastikan operasional bisnis Anda berjalan tanpa hambatan.
                </Text>

                <Group mt="lg">
                  <Button size="lg" color="violet" onClick={handlePrimary}>
                    {isAuthenticated ? 'Buka Dashboard' : 'Mulai Sekarang'}
                    <IconArrowRight size={18} style={{ marginLeft: '8px' }} />
                  </Button>
                  {!isAuthenticated && (
                    <Link href={`/register`}>
                      <Button size="lg" variant="outline" style={{ borderColor: '#667eea', color: '#667eea' }}>
                        Daftar Gratis
                      </Button>
                    </Link>
                  )}
                </Group>
              </Stack>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>
              <div
                style={{
                  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)',
                  borderRadius: '12px',
                  padding: '2rem',
                  border: '1px solid rgba(102, 126, 234, 0.3)',
                  minHeight: '300px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255, 255, 255, 0.5)',
                  textAlign: 'center',
                }}
              >
                <Text>Gambar Genset Professional</Text>
              </div>
            </Grid.Col>
          </Grid>
        </Container>
      </div>

      {/* Services Section */}
      <Paper p={{ base: 'md', md: 'xl' }} style={{ background: 'white' }}>
        <Container size="lg">
          <Stack gap="xl">
            <div style={{ textAlign: 'center' }}>
              <Text size="sm" fw={600} c="dimmed" tt="uppercase" style={{ letterSpacing: "0.05em" }}>
                Layanan Kami
              </Text>
              <Title order={2} mt="xs">
                Solusi Komprehensif untuk Bisnis Anda
              </Title>
              <Text c="dimmed" mt="sm" maw={600} mx="auto">
                Dari sewa genset hingga dukungan teknis 24/7, kami menyediakan semua yang Anda butuhkan
              </Text>
            </div>

            <Grid gutter="lg">
              {[
                {
                  title: 'Sewa Genset',
                  desc: 'Genset berkualitas tinggi dengan kapasitas 10 kVA hingga 500 kVA untuk berbagai kebutuhan industri dan acara.',
                  details: ['Maintenance rutin', 'Garansi 2 tahun', 'Pengiriman gratis'],
                },
                {
                  title: 'Distribusi Bahan Bakar',
                  desc: 'Pengiriman bahan bakar diesel berkualitas premium dengan sistem logistik terintegrasi ke lokasi Anda.',
                  details: ['Pengiriman tepat waktu', 'Kualitas terjamin', 'Invoice transparan'],
                },
                {
                  title: 'Dukungan Teknis 24/7',
                  desc: 'Tim teknisi berpengalaman siap memberikan konsultasi, perawatan, dan perbaikan kapan pun dibutuhkan.',
                  details: ['Response time <2 jam', 'Expert team', 'Emergency support'],
                },
              ].map((service) => (
                <Grid.Col key={service.title} span={{ base: 12, md: 4 }}>
                  <Card withBorder radius="md" p="lg" style={{ height: '100%', border: '2px solid #f0f0f0' }}>
                    <Stack gap="sm">
                      <Text fw={700} size="lg">
                        {service.title}
                      </Text>
                      <Text size="sm" c="dimmed">
                        {service.desc}
                      </Text>
                      <Group gap="xs" mt="auto">
                        {service.details.map((detail) => (
                          <Badge key={detail} variant="light" size="sm">
                            {detail}
                          </Badge>
                        ))}
                      </Group>
                    </Stack>
                  </Card>
                </Grid.Col>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Paper>

      {/* Why Us Section */}
      <Paper p={{ base: 'md', md: 'xl' }} style={{ background: '#f8f9fa' }}>
        <Container size="lg">
          <Grid align="center" gutter="xl">
            <Grid.Col span={{ base: 12, md: 6 }}>
              <div
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '12px',
                  padding: '3rem',
                  color: 'white',
                  minHeight: '400px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                }}
              >
                <Text size="lg">Gambar Operasional/Tim</Text>
              </div>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>
              <Stack gap="lg">
                <div>
                  <Text size="sm" fw={600} c="dimmed" tt="uppercase" style={{ letterSpacing: "0.05em" }}>
                    Mengapa Kami
                  </Text>
                  <Title order={2}>Kepercayaan yang Dibangun Selama Puluhan Tahun</Title>
                </div>

                {[
                  { label: '20+ Tahun', desc: 'Pengalaman melayani industri Indonesia' },
                  { label: '500+ Klien', desc: 'Kepuasan pelanggan adalah prioritas utama' },
                  { label: '24/7 Support', desc: 'Tim siap membantu kapan pun Anda butuh' },
                  { label: '100% Berkualitas', desc: 'Standar internasional untuk setiap layanan' },
                ].map((item) => (
                  <div key={item.label}>
                    <Group gap="md">
                      <div
                        style={{
                          width: 4,
                          height: 40,
                          background: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)',
                          borderRadius: '2px',
                        }}
                      />
                      <Stack gap="xs">
                        <Text fw={700} size="lg">
                          {item.label}
                        </Text>
                        <Text size="sm" c="dimmed">
                          {item.desc}
                        </Text>
                      </Stack>
                    </Group>
                  </div>
                ))}
              </Stack>
            </Grid.Col>
          </Grid>
        </Container>
      </Paper>

      {/* Process Section */}
      <Paper p={{ base: 'md', md: 'xl' }}>
        <Container size="lg">
          <Stack gap="xl">
            <div style={{ textAlign: 'center' }}>
              <Text size="sm" fw={600} c="dimmed" tt="uppercase" style={{ letterSpacing: "0.05em" }}>
                Cara Kerja
              </Text>
              <Title order={2} mt="xs">
                Proses Pemesanan yang Sederhana
              </Title>
            </div>

            <Grid gutter="xl">
              {[
                { num: '01', title: 'Daftar', desc: 'Buat akun dan lengkapi data bisnis Anda' },
                { num: '02', title: 'Pilih Layanan', desc: 'Tentukan genset dan durasi yang dibutuhkan' },
                { num: '03', title: 'Dapatkan Penawaran', desc: 'Tim kami memberikan harga terbaik' },
                { num: '04', title: 'Terima & Operasikan', desc: 'Peralatan siap pakai dengan support teknis' },
              ].map((step) => (
                <Grid.Col key={step.num} span={{ base: 12, sm: 6, md: 3 }}>
                  <Card withBorder radius="md" p="lg" style={{ textAlign: 'center', border: '2px solid #f0f0f0' }}>
                    <Text style={{ fontSize: '3rem', fontWeight: 700, color: '#667eea' }}>{step.num}</Text>
                    <Text fw={700} mt="md">
                      {step.title}
                    </Text>
                    <Text size="sm" c="dimmed" mt="xs">
                      {step.desc}
                    </Text>
                  </Card>
                </Grid.Col>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Paper>

      {/* Contact CTA Section */}
      <Paper
        p={{ base: 'md', md: 'xl' }}
        style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container size="lg">
          <Grid align="center" gutter="xl">
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Stack gap="lg">
                <div>
                  <Title order={2} style={{ color: 'white' }}>
                    Siap Untuk Memulai?
                  </Title>
                  <Text mt="md" size="lg" c="rgba(255, 255, 255, 0.8)">
                    Hubungi tim kami atau daftar sekarang untuk konsultasi gratis dan penawaran khusus.
                  </Text>
                </div>

                <Group>
                  <Button size="lg" color="white" className='text-black' onClick={handlePrimary}>
                    {isAuthenticated ? 'Dashboard' : 'Daftar Sekarang'}
                  </Button>
                  <Button size="lg" variant="outline" style={{ borderColor: 'white', color: 'white' }}>
                    Hubungi Kami
                  </Button>
                </Group>
              </Stack>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>
              <Stack
                gap="md"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  padding: '2rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <Group gap="md">
                  <IconPhone size={24} />
                  <Stack gap={0}>
                    <Text size="sm" c="rgba(255, 255, 255, 0.7)">
                      Telepon
                    </Text>
                    <Text fw={700}>(+62) 812 3456 7890</Text>
                  </Stack>
                </Group>
                <Group gap="md">
                  <IconMail size={24} />
                  <Stack gap={0}>
                    <Text size="sm" c="rgba(255, 255, 255, 0.7)">
                      Email
                    </Text>
                    <Text fw={700}>info@sumberanugerah.co.id</Text>
                  </Stack>
                </Group>
                <Group gap="md">
                  <IconMapPin size={24} />
                  <Stack gap={0}>
                    <Text size="sm" c="rgba(255, 255, 255, 0.7)">
                      Lokasi
                    </Text>
                    <Text fw={700}>Jakarta, Indonesia</Text>
                  </Stack>
                </Group>
              </Stack>
            </Grid.Col>
          </Grid>
        </Container>
      </Paper>

      {/* Footer */}
      <Paper p="md" style={{ background: '#0f0f0f', color: 'white', textAlign: 'center' }}>
        <Text size="sm" c="dimmed">
          © 2024 CV. Sumber Anugerah Diesel. Semua hak dilindungi. | Powered by SAD System
        </Text>
      </Paper>
    </Stack>
  );
}
