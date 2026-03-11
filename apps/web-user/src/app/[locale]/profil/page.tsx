'use client'

import { AppShell, Container, Stack, Group, Box, Title, Text, Paper, Button, TextInput, Textarea, Grid, Avatar, Card, Badge, Tabs, ActionIcon, Modal } from '@mantine/core';
import { IconEdit, IconCamera, IconLock, IconMapPin, IconPhone, IconMail, IconCheck, IconX } from '@tabler/icons-react';
import { Navbar } from '@/components/layout/Navbar';
import { useState } from 'react';
import { notifications } from '@mantine/notifications';

export default function Profile() {
  const [editMode, setEditMode] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);

  const [profile, setProfile] = useState({
    name: 'Budi Santoso',
    email: 'budi@example.com',
    phone: '+62812345678',
    company: 'PT. Maju Jaya Konstruksi',
    location: 'Jakarta Pusat',
    address: 'Jl. Sudirman No. 123, Jakarta Pusat, 12190',
    bio: 'Pengusaha konstruksi dengan pengalaman 10 tahun di industri',
  });

  const [editProfile, setEditProfile] = useState(profile);

  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const handleSaveProfile = () => {
    setProfile(editProfile);
    setEditMode(false);
    notifications.show({ title: 'Sukses', message: 'Profil Anda telah diperbarui', color: 'green' });
  };

  const handleChangePassword = () => {
    if (!password.current || !password.new || !password.confirm) {
      notifications.show({ title: 'Data Tidak Lengkap', message: 'Silakan isi semua kolom', color: 'red' });
      return;
    }
    if (password.new !== password.confirm) {
      notifications.show({ title: 'Password Tidak Cocok', message: 'Password baru dan konfirmasi harus sama', color: 'red' });
      return;
    }
    setPasswordModalOpen(false);
    setPassword({ current: '', new: '', confirm: '' });
    notifications.show({ title: 'Sukses', message: 'Password Anda telah diubah', color: 'green' });
  };

  return (
    <AppShell navbar={{ width: 0, breakpoint: 0 }} header={{ height: 70 }}>
      <Navbar />

      <Container size="lg" py="xl">
        <Stack gap="xl">
          {/* HEADER */}
          <Group justify="space-between" align="flex-start">
            <Title order={1}>Profil Saya</Title>
            {!editMode && (
              <Button leftSection={<IconEdit size={18} />} onClick={() => setEditMode(true)}>
                Edit Profil
              </Button>
            )}
          </Group>

          {/* PROFILE CARD */}
          <Card withBorder p="lg">
            <Group mb="lg">
              <Box style={{ position: 'relative' }}>
                <Avatar name={profile.name[0]} size="xl" radius="xl" color="blue" />
                <ActionIcon
                  size="sm"
                  radius="xl"
                  style={{ position: 'absolute', bottom: 0, right: 0, backgroundColor: 'blue' }}
                  color="white"
                >
                  <IconCamera size={14} />
                </ActionIcon>
              </Box>
              <Box>
                <Text fw={700} size="lg">
                  {profile.name}
                </Text>
                <Text size="sm" c="dimmed">
                  {profile.company}
                </Text>
              </Box>
            </Group>

            {editMode ? (
              <Stack gap="md">
                <Grid>
                  <Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="Nama Lengkap"
                      value={editProfile.name}
                      onChange={(e) => setEditProfile({ ...editProfile, name: e.currentTarget.value })}
                    />
                  </Col>
                  <Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="Email"
                      type="email"
                      value={editProfile.email}
                      onChange={(e) => setEditProfile({ ...editProfile, email: e.currentTarget.value })}
                    />
                  </Col>
                  <Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="Nomor Telepon"
                      value={editProfile.phone}
                      onChange={(e) => setEditProfile({ ...editProfile, phone: e.currentTarget.value })}
                    />
                  </Col>
                  <Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="Nama Perusahaan"
                      value={editProfile.company}
                      onChange={(e) => setEditProfile({ ...editProfile, company: e.currentTarget.value })}
                    />
                  </Col>
                  <Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="Kota"
                      value={editProfile.location}
                      onChange={(e) => setEditProfile({ ...editProfile, location: e.currentTarget.value })}
                    />
                  </Col>
                  <Col span={12}>
                    <TextInput
                      label="Alamat Lengkap"
                      value={editProfile.address}
                      onChange={(e) => setEditProfile({ ...editProfile, address: e.currentTarget.value })}
                    />
                  </Col>
                  <Col span={12}>
                    <Textarea
                      label="Bio / Tentang Anda"
                      value={editProfile.bio}
                      onChange={(e) => setEditProfile({ ...editProfile, bio: e.currentTarget.value })}
                      minRows={3}
                    />
                  </Col>
                </Grid>

                <Group>
                  <Button variant="light" onClick={() => { setEditMode(false); setEditProfile(profile); }}>
                    Batal
                  </Button>
                  <Button color="blue" leftSection={<IconSave size={18} />} onClick={handleSaveProfile}>
                    Simpan Perubahan
                  </Button>
                </Group>
              </Stack>
            ) : (
              <Stack gap="md">
                <Grid>
                  <Col span={{ base: 12, sm: 6 }}>
                    <Box>
                      <Text size="xs" c="dimmed" fw={600}>
                        Email
                      </Text>
                      <Group gap="xs">
                        <IconMail size={16} />
                        <Text>{profile.email}</Text>
                      </Group>
                    </Box>
                  </Col>
                  <Col span={{ base: 12, sm: 6 }}>
                    <Box>
                      <Text size="xs" c="dimmed" fw={600}>
                        Nomor Telepon
                      </Text>
                      <Group gap="xs">
                        <IconPhone size={16} />
                        <Text>{profile.phone}</Text>
                      </Group>
                    </Box>
                  </Col>
                  <Col span={{ base: 12, sm: 6 }}>
                    <Box>
                      <Text size="xs" c="dimmed" fw={600}>
                        Kota
                      </Text>
                      <Group gap="xs">
                        <IconMapPin size={16} />
                        <Text>{profile.location}</Text>
                      </Group>
                    </Box>
                  </Col>
                  <Col span={{ base: 12, sm: 6 }}>
                    <Box>
                      <Text size="xs" c="dimmed" fw={600}>
                        Perusahaan
                      </Text>
                      <Text>{profile.company}</Text>
                    </Box>
                  </Col>
                  <Col span={12}>
                    <Box>
                      <Text size="xs" c="dimmed" fw={600} mb="xs">
                        Alamat Lengkap
                      </Text>
                      <Text>{profile.address}</Text>
                    </Box>
                  </Col>
                  <Col span={12}>
                    <Box>
                      <Text size="xs" c="dimmed" fw={600} mb="xs">
                        Bio
                      </Text>
                      <Text>{profile.bio}</Text>
                    </Box>
                  </Col>
                </Grid>
              </Stack>
            )}
          </Card>

          {/* SECURITY SECTION */}
          <Card withBorder p="lg">
            <Title order={3} mb="lg">
              Keamanan Akun
            </Title>

            <Stack gap="md">
              <Button
                variant="light"
                leftSection={<IconLock size={18} />}
                onClick={() => setPasswordModalOpen(true)}
              >
                Ubah Password
              </Button>

              <Box p="md" bg="orange.0" style={{ border: '1px solid #dee2e6', borderRadius: '8px' }}>
                <Text fw={600} size="sm" mb="xs">
                  ⚠️ Hapus Akun
                </Text>
                <Text size="sm" c="dimmed" mb="md">
                  Menghapus akun bersifat permanen dan tidak dapat dipulihkan. Pastikan Anda telah mengunduh semua data penting sebelumnya.
                </Text>
                <Button variant="light" color="red" size="sm">
                  Hapus Akun Saya
                </Button>
              </Box>
            </Stack>
          </Card>

          {/* STATS */}
          <Grid>
            <Col span={{ base: 6, sm: 3 }}>
              <Card withBorder p="md" radius="md">
                <Stack gap={0} align="center">
                  <Text size="xl" fw={700} color="blue">
                    5
                  </Text>
                  <Text size="xs" c="dimmed">
                    Total Pesanan
                  </Text>
                </Stack>
              </Card>
            </Col>
            <Col span={{ base: 6, sm: 3 }}>
              <Card withBorder p="md" radius="md">
                <Stack gap={0} align="center">
                  <Text size="xl" fw={700} color="green">
                    4.8
                  </Text>
                  <Text size="xs" c="dimmed">
                    Rating
                  </Text>
                </Stack>
              </Card>
            </Col>
            <Col span={{ base: 6, sm: 3 }}>
              <Card withBorder p="md" radius="md">
                <Stack gap={0} align="center">
                  <Text size="xl" fw={700} color="blue">
                    100%
                  </Text>
                  <Text size="xs" c="dimmed">
                    Pembayaran Tepat
                  </Text>
                </Stack>
              </Card>
            </Col>
            <Col span={{ base: 6, sm: 3 }}>
              <Card withBorder p="md" radius="md">
                <Stack gap={0} align="center">
                  <Badge color="green">Verified</Badge>
                  <Text size="xs" c="dimmed">
                    Identitas Terverifikasi
                  </Text>
                </Stack>
              </Card>
            </Col>
          </Grid>
        </Stack>
      </Container>

      {/* CHANGE PASSWORD MODAL */}
      <Modal
        opened={passwordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
        title="Ubah Password"
        centered
      >
        <Stack gap="md">
          <TextInput
            label="Password Saat Ini"
            type="password"
            value={password.current}
            onChange={(e) => setPassword({ ...password, current: e.currentTarget.value })}
            placeholder="Masukkan password saat ini"
          />

          <TextInput
            label="Password Baru"
            type="password"
            value={password.new}
            onChange={(e) => setPassword({ ...password, new: e.currentTarget.value })}
            placeholder="Masukkan password baru"
          />

          <TextInput
            label="Konfirmasi Password Baru"
            type="password"
            value={password.confirm}
            onChange={(e) => setPassword({ ...password, confirm: e.currentTarget.value })}
            placeholder="Konfirmasi password baru"
          />

          <Group grow>
            <Button variant="light" onClick={() => setPasswordModalOpen(false)}>
              Batal
            </Button>
            <Button color="blue" onClick={handleChangePassword}>
              Ubah Password
            </Button>
          </Group>
        </Stack>
      </Modal>
    </AppShell>
  );
}
