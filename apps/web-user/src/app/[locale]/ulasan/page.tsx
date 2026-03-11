'use client'

import { AppShell, Container, Stack, Group, Box, Title, Text, Paper, Button, Card, Rating, Textarea, Grid, Center, Avatar, Badge, ActionIcon } from '@mantine/core';
import { IconStar, IconMessageShare, IconThumbUp, IconTrash } from '@tabler/icons-react';
import { Navbar } from '../../../components/layout/Navbar';
import { useState } from 'react';
import { notifications } from '@mantine/notifications';

export type Review = {
  id: string;
  orderId: string;
  productName: string;
  rating: number;
  title: string;
  comment: string;
  createdAt: string;
  helpful: number;
};

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      orderId: 'ORD-2024-002',
      productName: 'Tower Light 40M',
      rating: 5,
      title: 'Sangat puas dengan kualitas dan pelayanan',
      comment: 'Peralatan berkualitas tinggi, pengiriman tepat waktu, dan tim customer service yang responsif. Akan order lagi!',
      createdAt: '2024-03-05',
      helpful: 12,
    },
    {
      id: '2',
      orderId: 'ORD-2024-001',
      productName: 'Excavator 330D',
      rating: 4,
      title: 'Kondisi barang bagus, operasional lancar',
      comment: 'Barang datang dalam kondisi sempurna dan siap pakai. Hanya saja waktu pengiriman sedikit terlambat.',
      createdAt: '2024-03-02',
      helpful: 8,
    },
  ]);

  const [newReview, setNewReview] = useState({
    productName: '',
    rating: 5,
    title: '',
    comment: '',
  });

  const [showForm, setShowForm] = useState(false);

  const handleSubmitReview = () => {
    if (!newReview.productName || !newReview.title || !newReview.comment) {
      notifications.show({ title: 'Data Tidak Lengkap', message: 'Silakan isi semua kolom', color: 'red' });
      return;
    }

    const review: Review = {
      id: (reviews.length + 1).toString(),
      orderId: `ORD-2024-${String(reviews.length + 1).padStart(3, '0')}`,
      productName: newReview.productName,
      rating: newReview.rating,
      title: newReview.title,
      comment: newReview.comment,
      createdAt: new Date().toISOString().split('T')[0],
      helpful: 0,
    };

    setReviews([review, ...reviews]);
    setNewReview({ productName: '', rating: 5, title: '', comment: '' });
    setShowForm(false);
    notifications.show({ title: 'Sukses', message: 'Ulasan Anda telah dikirim', color: 'green' });
  };

  const averageRating = reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : 0;

  return (
    <AppShell navbar={{ width: 0, breakpoint: 0 }} header={{ height: 70 }}>
      <Navbar />

      <Container size="lg" py="xl">
        <Stack gap="xl">
          {/* HEADER */}
          <Title order={1}>Ulasan & Rating</Title>

          {/* STATS */}
          <Card withBorder p="lg">
            <Group grow>
              <Box>
                <Stack gap={0}>
                  <Group gap="xs" mb="sm">
                    <Text size="xl" fw={700}>{averageRating}</Text>
                    <Group gap={2}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <IconStar
                          key={star}
                          size={20}
                          style={{
                            color: star <= Math.round(Number(averageRating)) ? '#ffd700' : '#e0e0e0',
                            fill: star <= Math.round(Number(averageRating)) ? '#ffd700' : 'none',
                          }}
                        />
                      ))}
                    </Group>
                  </Group>
                  <Text size="sm" c="dimmed">
                    Berdasarkan {reviews.length} ulasan
                  </Text>
                </Stack>
              </Box>
              <Box>
                <Group justify="flex-end">
                  <Button color="blue" onClick={() => setShowForm(!showForm)} leftSection={<IconMessageShare size={16} />}>
                    Tulis Ulasan
                  </Button>
                </Group>
              </Box>
            </Group>
          </Card>

          {/* ADD REVIEW FORM */}
          {showForm && (
            <Card withBorder p="lg" bg="blue.0">
              <Stack gap="md">
                <Title order={4}>Tulis Ulasan Anda</Title>

                <Group>
                  <Text fw={600} size="sm">Rating</Text>
                  <Rating value={newReview.rating} onChange={(val) => setNewReview({ ...newReview, rating: val })} />
                </Group>

                <Textarea
                  label="Nama Produk"
                  placeholder="Contoh: Genset 50 kVA"
                  value={newReview.productName}
                  onChange={(e) => setNewReview({ ...newReview, productName: e.currentTarget.value })}
                />

                <Textarea
                  label="Judul Ulasan"
                  placeholder="Ringkas pengalaman Anda dalam satu kalimat"
                  value={newReview.title}
                  onChange={(e) => setNewReview({ ...newReview, title: e.currentTarget.value })}
                />

                <Textarea
                  label="Ulasan Detail"
                  placeholder="Ceritakan pengalaman Anda menggunakan produk ini..."
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.currentTarget.value })}
                  minRows={4}
                />

                <Group>
                  <Button variant="light" onClick={() => setShowForm(false)}>
                    Batal
                  </Button>
                  <Button color="blue" onClick={handleSubmitReview}>
                    Kirim Ulasan
                  </Button>
                </Group>
              </Stack>
            </Card>
          )}

          {/* REVIEWS LIST */}
          <Stack gap="md">
            <Title order={3}>Ulasan Terbaru</Title>

            {reviews.length > 0 ? (
              reviews.map((review) => (
                <Card key={review.id} withBorder p="lg">
                  <Group justify="space-between" mb="md">
                    <Box>
                      <Group gap="sm" mb="xs">
                        <Avatar name={review.productName[0]} color="blue" />
                        <Box>
                          <Text fw={700}>{review.productName}</Text>
                          <Text size="xs" c="dimmed">{review.orderId}</Text>
                        </Box>
                      </Group>
                    </Box>
                    <Group>
                      <Rating value={review.rating} readOnly />
                      <ActionIcon variant="light" color="red" size="sm">
                        <IconTrash size={14} />
                      </ActionIcon>
                    </Group>
                  </Group>

                  <Stack gap="sm">
                    <Box>
                      <Text fw={700}>{review.title}</Text>
                      <Text size="sm">{review.comment}</Text>
                    </Box>

                    <Group justify="space-between" pt="sm" style={{ borderTop: '1px solid #e0e0e0' }}>
                      <Text size="xs" c="dimmed">
                        {new Date(review.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </Text>
                      <Button variant="subtle" size="xs" leftSection={<IconThumbUp size={14} />}>
                        Membantu ({review.helpful})
                      </Button>
                    </Group>
                  </Stack>
                </Card>
              ))
            ) : (
              <Center py="xl">
                <Stack align="center">
                  <IconMessageSquare size={48} style={{ color: '#adb5bd' }} />
                  <Text c="dimmed">Belum ada ulasan</Text>
                </Stack>
              </Center>
            )}
          </Stack>
        </Stack>
      </Container>
    </AppShell>
  );
}
