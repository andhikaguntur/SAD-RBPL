'use client'

// removed unused Paper, IconCheck, IconTruck
import { AppShell, Container, Stack, Group, Box, Title, Text, Button, Table, ActionIcon, TextInput, Select, NumberInput, Badge, Card, Stepper, Divider, Center } from '@mantine/core';
import { IconX, IconArrowLeft, IconCreditCard, IconClipboardList } from '@tabler/icons-react';
import { Navbar } from '../../../components/layout/Navbar';
import { useState } from 'react';
import { notifications } from '@mantine/notifications';

export type CheckoutItem = {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  duration: number;
  location: string;
};

export default function Checkout() {
  const [step, setStep] = useState(0);
  const [items, setItems] = useState<CheckoutItem[]>([
    { id: '1', name: 'Genset 50 kVA', category: 'Genset', price: 2500000, quantity: 1, duration: 3, location: 'Jl. Sudirman No. 123' },
    { id: '2', name: 'Excavator 330D', category: 'Heavy Equipment', price: 5000000, quantity: 1, duration: 2, location: 'Jl. Sudirman No. 123' },
  ]);

  const [formData, setFormData] = useState({
    contactName: 'Budi Santoso',
    contactPhone: '+62812345678',
    email: 'budi@example.com',
    location: 'Jl. Sudirman No. 123, Jakarta Pusat, 12190',
    notes: '',
    paymentMethod: 'transfer-bank',
    termsAgreed: false,
  });

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity * item.duration), 0);
  const shippingCost = 500000;
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + shippingCost + tax;

  const handleRemoveItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    notifications.show({ title: 'Sukses', message: 'Item dihapus dari keranjang', color: 'green' });
  };

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
    ));
  };

  const handleCheckout = () => {
    if (!formData.contactName || !formData.contactPhone || !formData.location) {
      notifications.show({ title: 'Data Tidak Lengkap', message: 'Silakan isi semua data yang diperlukan', color: 'red' });
      return;
    }
    if (step === 2) {
      notifications.show({ title: 'Pesanan Berhasil', message: 'Pesanan Anda telah diterima. Nomor pesanan: ORD-2024-001', color: 'green' });
      setStep(3);
    } else {
      setStep(step + 1);
    }
  };

  return (
    <AppShell navbar={{ width: 0, breakpoint: 0 }} header={{ height: 70 }}>
      <Navbar />

      <Container size="lg" py="xl">
        <Stack gap="xl">
          {/* HEADER */}
          <Group justify="space-between" align="center">
            <Title order={1}>Checkout Pesanan</Title>
            <Button variant="subtle" leftSection={<IconArrowLeft size={18} />} component="a" href="/">
              Lanjut Belanja
            </Button>
          </Group>

          {/* STEPPER */}
          <Card withBorder padding="lg">
            <Stepper active={step} onStepClick={setStep} allowNextStepsSelect={false}>
              <Stepper.Step label="Keranjang" description="Verifikasi Pesanan">
                <Stack gap="lg" mt="xl">
                  <Title order={3}>Item Pesanan Anda</Title>
                  
                  {items.length > 0 ? (
                    <>
                      <Table striped>
                        <Table.Thead>
                          <Table.Tr>
                            <Table.Th>Peralatan</Table.Th>
                            <Table.Th>Harga/Hari</Table.Th>
                            <Table.Th ta="center">Jumlah</Table.Th>
                            <Table.Th ta="center">Durasi</Table.Th>
                            <Table.Th align="right">Total</Table.Th>
                            <Table.Th align="center">Aksi</Table.Th>
                          </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                          {items.map((item) => (
                            <Table.Tr key={item.id}>
                              <Table.Td>
                                <Stack gap={0}>
                                  <Text fw={600}>{item.name}</Text>
                                  <Text size="xs" c="dimmed">{item.category}</Text>
                                  <Text size="xs" c="dimmed">{item.location}</Text>
                                </Stack>
                              </Table.Td>
                              <Table.Td>Rp {item.price.toLocaleString('id-ID')}</Table.Td>
                              <Table.Td ta="center">
                                <NumberInput value={item.quantity} onChange={(val) => handleUpdateQuantity(item.id, Number(val) || 1)} size="xs" w={60} />
                              </Table.Td>
                              <Table.Td ta="center">{item.duration} hari</Table.Td>
                              <Table.Td align="right" fw={600}>Rp {(item.price * item.quantity * item.duration).toLocaleString('id-ID')}</Table.Td>
                              <Table.Td align="center">
                                <ActionIcon variant="light" color="red" size="sm" onClick={() => handleRemoveItem(item.id)}>
                                  <IconX size={14} />
                                </ActionIcon>
                              </Table.Td>
                            </Table.Tr>
                          ))}
                        </Table.Tbody>
                      </Table>

                      <Box p="md" style={{ border: '1px solid #dee2e6', borderRadius: '8px', marginLeft: 'auto', width: '100%', maxWidth: '400px' }}>
                        <Group justify="space-between" mb="xs">
                          <Text c="dimmed">Subtotal</Text>
                          <Text>Rp {subtotal.toLocaleString('id-ID')}</Text>
                        </Group>
                        <Group justify="space-between" mb="xs">
                          <Text c="dimmed">Ongkos Kirim</Text>
                          <Text>Rp {shippingCost.toLocaleString('id-ID')}</Text>
                        </Group>
                        <Group justify="space-between" mb="xs">
                          <Text c="dimmed">PPN 10%</Text>
                          <Text>Rp {tax.toLocaleString('id-ID')}</Text>
                        </Group>
                        <Divider my="sm" />
                        <Group justify="space-between">
                          <Text fw={700}>Total Pesanan</Text>
                          <Text fw={700} size="lg" c="blue">Rp {total.toLocaleString('id-ID')}</Text>
                        </Group>
                      </Box>
                    </>
                  ) : (
                    <Center py="xl">
                      <Text c="dimmed">Keranjang Anda kosong</Text>
                    </Center>
                  )}

                  <Button fullWidth color="blue" size="lg" onClick={handleCheckout}>
                    Lanjut ke Data Pengiriman
                  </Button>
                </Stack>
              </Stepper.Step>

              <Stepper.Step label="Pengiriman" description="Alamat & Kontak">
                <Stack gap="lg" mt="xl">
                  <Title order={3}>Data Pengiriman</Title>

                  <Stack gap="md">
                    <TextInput
                      label="Nama Penerima"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.currentTarget.value })}
                      placeholder="Nama lengkap penerima"
                    />
                    <TextInput
                      label="Nomor Telepon"
                      value={formData.contactPhone}
                      onChange={(e) => setFormData({ ...formData, contactPhone: e.currentTarget.value })}
                      placeholder="+62812345678"
                    />
                    <TextInput
                      label="Email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.currentTarget.value })}
                      placeholder="email@example.com"
                    />
                    <TextInput
                      label="Alamat Lengkap"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.currentTarget.value })}
                      placeholder="Jl. Sudirman No. 123, Jakarta Pusat"
                    />
                    <TextInput
                      label="Catatan Tambahan (Opsional)"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.currentTarget.value })}
                      placeholder="Instruksi khusus untuk pengiriman"
                    />
                  </Stack>

                  <Group grow>
                    <Button variant="light" onClick={() => setStep(0)}>Kembali</Button>
                    <Button color="blue" onClick={handleCheckout}>Lanjut ke Pembayaran</Button>
                  </Group>
                </Stack>
              </Stepper.Step>

              <Stepper.Step label="Pembayaran" description="Metode Pembayaran">
                <Stack gap="lg" mt="xl">
                  <Title order={3}>Metode Pembayaran</Title>

                  <Select
                    label="Pilih Metode Pembayaran"
                    value={formData.paymentMethod}
                    onChange={(val) => setFormData({ ...formData, paymentMethod: val || '' })}
                    data={[
                      { value: 'transfer-bank', label: '💳 Transfer Bank' },
                      { value: 'kartu-kredit', label: '🏦 Kartu Kredit' },
                      { value: 'e-wallet', label: '📱 E-Wallet (OVO, DANA, GCash)' },
                      { value: 'cash', label: '💵 Cicilan / Tenor' },
                    ]}
                  />

                  <Card withBorder p="lg" bg="blue.0">
                    <Stack gap="xs">
                      <Group justify="space-between">
                        <Text fw={600}>Subtotal</Text>
                        <Text>Rp {subtotal.toLocaleString('id-ID')}</Text>
                      </Group>
                      <Group justify="space-between">
                        <Text fw={600}>Ongkos Kirim</Text>
                        <Text>Rp {shippingCost.toLocaleString('id-ID')}</Text>
                      </Group>
                      <Group justify="space-between">
                        <Text fw={600}>PPN 10%</Text>
                        <Text>Rp {tax.toLocaleString('id-ID')}</Text>
                      </Group>
                      <Divider my="xs" />
                      <Group justify="space-between">
                        <Text fw={700} size="lg">Total Pembayaran</Text>
                        <Text fw={700} size="lg" color="blue">Rp {total.toLocaleString('id-ID')}</Text>
                      </Group>
                    </Stack>
                  </Card>

                  <Button fullWidth variant="subtle" size="lg">
                    <input type="checkbox" checked={formData.termsAgreed} onChange={(e) => setFormData({ ...formData, termsAgreed: e.target.checked })} /> 
                    <Text ml="xs" size="sm">Saya setuju dengan syarat & ketentuan</Text>
                  </Button>

                  <Group grow>
                    <Button variant="light" onClick={() => setStep(1)}>Kembali</Button>
                    <Button color="blue" size="lg" onClick={handleCheckout} leftSection={<IconCreditCard size={18} />} disabled={!formData.termsAgreed}>
                      Proses Pembayaran
                    </Button>
                  </Group>
                </Stack>
              </Stepper.Step>

              <Stepper.Step label="Sukses" description="Pesanan Selesai">
                <Stack gap="lg" mt="xl" align="center">
                  <Box style={{ fontSize: '64px' }}>✅</Box>
                  <Title order={2}>Pesanan Berhasil Dibuat!</Title>
                  <Text c="dimmed" ta="center">Pesanan Anda telah diterima dan akan segera diproses oleh tim kami.</Text>
                  
                  <Card withBorder p="lg" w="100%">
                    <Stack gap="xs">
                      <Group justify="space-between">
                        <Text fw={600}>Nomor Pesanan</Text>
                        <Badge color="blue">ORD-2024-001</Badge>
                      </Group>
                      <Group justify="space-between">
                        <Text fw={600}>Total Pesanan</Text>
                        <Text fw={700}>Rp {total.toLocaleString('id-ID')}</Text>
                      </Group>
                      <Group justify="space-between">
                        <Text fw={600}>Status</Text>
                        <Badge color="yellow">Menunggu Konfirmasi</Badge>
                      </Group>
                    </Stack>
                  </Card>

                  <Group grow>
                    <Button variant="light" component="a" href="/">Lanjut Belanja</Button>
                    <Button color="blue" component="a" href="/pesanan" leftSection={<IconClipboardList size={18} />}>Lihat Pesanan</Button>
                  </Group>
                </Stack>
              </Stepper.Step>
            </Stepper>
          </Card>
        </Stack>
      </Container>
    </AppShell>
  );
}
