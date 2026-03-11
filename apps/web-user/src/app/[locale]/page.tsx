"use client";

import { useState, useEffect } from "react";
import { AppShell, Container, Stack, Group, Box, Title, Text, Paper, SimpleGrid, Button, Badge, Card, Center, ScrollArea, LoadingOverlay, Drawer, TextInput, NumberInput, Textarea, Select, Avatar, ActionIcon, Grid } from "@mantine/core";
import { IconSearch, IconMapPin, IconClock, IconCurrencyDollar, IconPhone, IconShoppingCart, IconX, IconArrowRight, IconFilter, IconStar } from "@tabler/icons-react";
import { Navbar } from "../../components/layout/Navbar";
import { notifications } from "@mantine/notifications";

// TYPE DEFINITIONS
export type Equipment = {
  id: string;
  name: string;
  category: string;
  image: string;
  price: number;
  unit: string;
  specs: string;
  rating: number;
  available: number;
  description: string;
};

export type CartItem = Equipment & { quantity: number; duration: number };

// Mock Equipment Data
const EQUIPMENT_DATA: Equipment[] = [
  {
    id: "GEN-50K-001",
    name: "Genset 50 kVA",
    category: "Genset",
    image: "⚡",
    price: 2500000,
    unit: "Per Hari",
    specs: "Kapasitas 50kVA, Efisiensi tinggi",
    rating: 4.8,
    available: 12,
    description: "Genset berkualitas tinggi untuk kebutuhan industri dan konstruksi. Konsumsi bahan bakar efisien, suara rendah.",
  },
  {
    id: "GEN-100K-001",
    name: "Genset 100 kVA",
    category: "Genset",
    image: "⚡",
    price: 4500000,
    unit: "Per Hari",
    specs: "Kapasitas 100kVA, Keluaran stabil",
    rating: 4.9,
    available: 8,
    description: "Genset industrial dengan daya besar untuk proyek skala menengah. Reliability tinggi, maintenance mudah.",
  },
  {
    id: "GEN-250K-001",
    name: "Genset 250 kVA",
    category: "Genset",
    image: "⚡",
    price: 8500000,
    unit: "Per Hari",
    specs: "Kapasitas 250kVA, Sumber daya besar",
    rating: 4.7,
    available: 5,
    description: "Solusi daya terbesar kami. Ideal untuk data center, pabrik besar, atau event berskala besar.",
  },
  {
    id: "TOWER-40M-001",
    name: "Tower Light 40M",
    category: "Tower Light",
    image: "💡",
    price: 1200000,
    unit: "Per Hari",
    specs: "Tinggi 40m, LED 2000W",
    rating: 4.6,
    available: 15,
    description: "Penerangan area luas untuk konstruksi malam hari. Hemat energi dengan LED berkualitas.",
  },
  {
    id: "COMPRESSOR-500-001",
    name: "Air Compressor 500L",
    category: "Compressor",
    image: "💨",
    price: 800000,
    unit: "Per Hari",
    specs: "Kapasitas 500L, Motor 15HP",
    rating: 4.5,
    available: 20,
    description: "Kompresor udara bergerak untuk berbagai aplikasi industri dan konstruksi.",
  },
  {
    id: "EXCAVATOR-330-001",
    name: "Excavator 330D",
    category: "Heavy Equipment",
    image: "🏗️",
    price: 5000000,
    unit: "Per Hari",
    specs: "CAT 330D, Bucket 1.59m³",
    rating: 4.9,
    available: 3,
    description: "Excavator kelas menengah dengan kontrol presisi dan konsumsi bahan bakar efisien.",
  },
  {
    id: "DOZER-D7-001",
    name: "Bulldozer CAT D7",
    category: "Heavy Equipment",
    image: "🏗️",
    price: 4500000,
    unit: "Per Hari",
    specs: "CAT D7, Blade 4.27m",
    rating: 4.8,
    available: 2,
    description: "Bulldozer powerful untuk earthmoving dan site preparation dengan performa andal.",
  },
  {
    id: "PUMP-WATER-001",
    name: "Water Pump 4 inch",
    category: "Pump",
    image: "💧",
    price: 600000,
    unit: "Per Hari",
    specs: "4 inch, Debit 200m³/jam",
    rating: 4.4,
    available: 25,
    description: "Pompa air untuk drainase, irigasi, dan pengalihan air dengan performa stabil.",
  },
];

function useBrowseEquipment() {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("popular");

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setEquipment(EQUIPMENT_DATA);
      setIsLoading(false);
    }, 600);
  }, []);

  const filteredEquipment = equipment
    .filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = !selectedCategory || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  return { equipment: filteredEquipment, isLoading, search, setSearch, selectedCategory, setSelectedCategory, sortBy, setSortBy };
}

// EQUIPMENT CARD COMPONENT
function EquipmentCard({ item, onSelect }: { item: Equipment; onSelect: () => void }) {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{ cursor: "pointer", transition: "all 0.3s ease" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "";
      }}
      onClick={onSelect}
    >
      <Center mb="md" style={{ fontSize: "48px", height: "120px", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
        {item.image}
      </Center>

      <Group justify="space-between" mb="xs">
        <Box>
          <Text fw={700} size="lg">
            {item.name}
          </Text>
          <Badge size="sm" variant="light" color="blue">
            {item.category}
          </Badge>
        </Box>
        <Group gap={4}>
          <Text size="sm" fw={600}>
            {item.rating}
          </Text>
          <IconStar size={16} style={{ color: "#ffd700", fill: "#ffd700" }} />
        </Group>
      </Group>

      <Text size="sm" c="dimmed" lineClamp={2} mb="md">
        {item.description}
      </Text>

      <Group justify="space-between" mb="md">
        <Box>
          <Text size="xs" c="dimmed">
            Harga
          </Text>
          <Text size="lg" fw={700} c="blue">
            Rp {item.price.toLocaleString("id-ID")}
          </Text>
          <Text size="xs" c="dimmed">
            {item.unit}
          </Text>
        </Box>
        <Box ta="right">
          <Text size="xs" c="dimmed">
            Tersedia
          </Text>
          <Text size="lg" fw={700} c="green">
            {item.available} Unit
          </Text>
        </Box>
      </Group>

      <Button fullWidth color="blue" rightSection={<IconShoppingCart size={16} />}>
        Pesan Sekarang
      </Button>
    </Card>
  );
}

// BOOKING DETAIL DRAWER
function BookingDetailDrawer({
  opened,
  onClose,
  item,
  onAddToCart,
}: {
  opened: boolean;
  onClose: () => void;
  item: Equipment | null;
  onAddToCart: (item: CartItem) => void;
}) {
  const [quantity, setQuantity] = useState(1);
  const [duration, setDuration] = useState(1);
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");

  const handleAdd = () => {
    if (!location.trim()) {
      notifications.show({ title: "Lokasi diperlukan", message: "Silakan masukkan lokasi pengiriman", color: "red" });
      return;
    }
    if (item) {
      onAddToCart({ ...item, quantity, duration });
      notifications.show({ title: "Sukses", message: `${quantity} unit ditambahkan ke keranjang`, color: "green" });
      onClose();
    }
  };

  return (
    <Drawer opened={opened} onClose={onClose} title={item?.name} padding="lg" size="lg" position="right">
      {item && (
        <Stack gap="lg">
          <Center style={{ fontSize: "80px", height: "200px", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
            {item.image}
          </Center>

          <Box>
            <Group justify="space-between" mb="xs">
              <Text size="sm" c="dimmed">
                Rating
              </Text>
              <Group gap={4}>
                <Text fw={700}>{item.rating}</Text>
                <IconStar size={16} style={{ color: "#ffd700", fill: "#ffd700" }} />
              </Group>
            </Group>
            <Text size="sm" c="dimmed" mb="md">
              {item.description}
            </Text>
            <Text size="sm" c="dimmed">
              Spesifikasi: {item.specs}
            </Text>
          </Box>

          <Box>
            <Text size="sm" fw={600} mb={4}>
              Harga Per Hari
            </Text>
            <Text size="xl" fw={700} c="blue">
              Rp {item.price.toLocaleString("id-ID")}
            </Text>
            <Text size="xs" c="dimmed">
              Tersedia: {item.available} unit
            </Text>
          </Box>

          <Stack gap="sm">
            <NumberInput label="Jumlah Unit" value={quantity} onChange={(val) => setQuantity(Math.max(1, Number(val) || 1))} min={1} max={item.available} />
            <NumberInput label="Durasi Sewa (Hari)" value={duration} onChange={(val) => setDuration(Math.max(1, Number(val) || 1))} min={1} />
            <TextInput label="Lokasi Pengiriman" placeholder="Contoh: Jl. Sudirman No. 123, Jakarta" value={location} onChange={(e) => setLocation(e.currentTarget.value)} />
            <Textarea label="Catatan Khusus (Opsional)" placeholder="Instruksi khusus atau kebutuhan khusus" value={notes} onChange={(e) => setNotes(e.currentTarget.value)} minRows={3} />
          </Stack>

          <Box>
            <Group justify="space-between" mb="xs">
              <Text size="sm">
                Total Harga ({quantity} × {duration} hari)
              </Text>
              <Text size="lg" fw={700} c="blue">
                Rp {(item.price * quantity * duration).toLocaleString("id-ID")}
              </Text>
            </Group>
          </Box>

          <Group grow>
            <Button variant="light" onClick={onClose}>
              Batal
            </Button>
            <Button color="blue" onClick={handleAdd}>
              Tambah ke Keranjang
            </Button>
          </Group>
        </Stack>
      )}
    </Drawer>
  );
}

export default function BrowseEquipment() {
  const { equipment: filteredEquipment, isLoading, search, setSearch, selectedCategory, setSelectedCategory, sortBy, setSortBy } = useBrowseEquipment();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<Equipment | null>(null);
  const [drawerOpened, setDrawerOpened] = useState(false);

  const categories = ["Genset", "Tower Light", "Compressor", "Heavy Equipment", "Pump"];

  return (
    <AppShell navbar={{ width: 0, breakpoint: 0 }} header={{ height: 0 }}>
      <Navbar />

      <Container size="xl" py="xl">
        <Stack gap="xl">
          {/* HERO SECTION */}
          <Box bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" p="xl" style={{ borderRadius: '8px', color: "white" }}>
            <Title order={1} size="h2" mb="xs">
              Sewa Peralatan Mudah dan Terpercaya
            </Title>
            <Text size="lg" mb="lg">
              Genset, Alat Berat, dan Perlengkapan Konstruksi. Pengiriman Cepat, Harga Kompetitif.
            </Text>
            <Text size="sm" opacity={0.9}>
              Lebih dari 100+ peralatan siap disewa untuk berbagai kebutuhan Anda
            </Text>
          </Box>

          {/* SEARCH & FILTER */}
          <Card withBorder padding="lg">
            <Stack gap="md">
              <TextInput
                placeholder="Cari peralatan, kategori, atau kebutuhan Anda..."
                leftSection={<IconSearch size={18} />}
                value={search}
                onChange={(e) => setSearch(e.currentTarget.value)}
                size="md"
                radius="md"
              />

              <Group grow>
                <Select
                  label="Kategori"
                  placeholder="Semua Kategori"
                  value={selectedCategory}
                  onChange={setSelectedCategory}
                  data={[{ value: "", label: "Semua Kategori" }, ...categories.map((c) => ({ value: c, label: c }))]}
                  clearable
                  searchable
                  leftSection={<IconFilter size={16} />}
                />
                <Select
                  label="Urutkan"
                  value={sortBy}
                  onChange={(val) => setSortBy(val || "popular")}
                  data={[
                    { value: "popular", label: "Populer" },
                    { value: "rating", label: "Rating Tertinggi" },
                    { value: "price-low", label: "Harga Terendah" },
                    { value: "price-high", label: "Harga Tertinggi" },
                  ]}
                />
              </Group>
            </Stack>
          </Card>

          {/* EQUIPMENT GRID */}
          <LoadingOverlay visible={isLoading} />

          {filteredEquipment.length > 0 ? (
            <>
              <Text size="sm" c="dimmed">
                Menampilkan {filteredEquipment.length} peralatan
              </Text>
              <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
                {filteredEquipment.map((item) => (
                  <EquipmentCard
                    key={item.id}
                    item={item}
                    onSelect={() => {
                      setSelectedItem(item);
                      setDrawerOpened(true);
                    }}
                  />
                ))}
              </SimpleGrid>
            </>
          ) : (
            <Center py="xl">
              <Stack align="center">
                <Text size="lg" c="dimmed">
                  Peralatan tidak ditemukan
                </Text>
                <Button
                  variant="light"
                  onClick={() => {
                    setSearch("");
                    setSelectedCategory(null);
                  }}
                >
                  Reset Filter
                </Button>
              </Stack>
            </Center>
          )}
        </Stack>
      </Container>

      {/* BOOKING DETAIL DRAWER */}
      <BookingDetailDrawer
        opened={drawerOpened}
        onClose={() => setDrawerOpened(false)}
        item={selectedItem}
        onAddToCart={(item) => {
          const existingIndex = cart.findIndex((c) => c.id === item.id);
          if (existingIndex > -1) {
            const newCart = [...cart];
            newCart[existingIndex].quantity += item.quantity;
            setCart(newCart);
          } else {
            setCart([...cart, item]);
          }
        }}
      />
    </AppShell>
  );
}
