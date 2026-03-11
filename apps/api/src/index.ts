import express, { Request, Response } from "express";
import cors from "cors";
import { User } from "@shared/types";
import {
  DashboardData,
  Machine,
  RentalRequest,
  PaymentData,
  OrderData,
  ActivityLog,
  PurchaseOrder,
  PermintaanData,
  ApiResponse,
  DeliveryTrack,
  DispatchQueue,
  DispatchData,
  MaintenanceLog,
  ReportData,
  POArchive,
} from "@shared/api.types";

const app = express();
app.use(cors());
app.use(express.json());

// ========== MOCK DATA STORAGE ==========
const mockDashboardData: DashboardData = {
  kpi: {
    revenue: "Rp 128.5M",
    revenueTrend: "+12.5%",
    activeUnits: "24 Unit",
    activeTrend: "+3 unit",
    waitingValidation: "12 Order",
    readyToShip: "5 Order",
  },
  fleet: [
    { label: "Genset 50kVA", value: 85, color: "blue", count: "12/15" },
    { label: "Genset 100kVA", value: 60, color: "indigo", count: "6/10" },
    { label: "Genset 250kVA", value: 40, color: "cyan", count: "2/5" },
    { label: "Alat Berat", value: 95, color: "teal", count: "19/20" },
  ],
  transactions: [
    {
      id: "ORD-881",
      name: "PT. Maju Jaya",
      val: "Rp 15.000.000",
      status: "Diterima",
      color: "green",
    },
    {
      id: "ORD-882",
      name: "CV. Bangun Pagi",
      val: "Rp 8.500.000",
      status: "Dikirim",
      color: "blue",
    },
    {
      id: "ORD-883",
      name: "Indo Karya",
      val: "Rp 22.000.000",
      status: "Validasi",
      color: "orange",
    },
    {
      id: "ORD-884",
      name: "Personal - Budi",
      val: "Rp 1.200.000",
      status: "Pending",
      color: "gray",
    },
  ],
  revenueChart: [
    { month: "Jan", total: 45 },
    { month: "Feb", total: 68 },
    { month: "Mar", total: 55 },
    { month: "Apr", total: 85 },
    { month: "Mei", total: 105 },
    { month: "Jun", total: 128.5 },
  ],
};

let machines: Machine[] = [
  {
    id: "MSN-501",
    model: "Genset Perkins",
    cap: "50kVA",
    status: "Tersedia",
    location: "Gudang Utama",
    lastService: "2026-01-10",
    customer: null,
  },
  {
    id: "MSN-502",
    model: "Genset Perkins",
    cap: "50kVA",
    status: "Disewa",
    location: "Site Sleman",
    lastService: "2025-12-12",
    customer: "PT. Maju Jaya",
  },
  {
    id: "MSN-101",
    model: "Genset Cummins",
    cap: "100kVA",
    status: "Perbaikan",
    location: "Bengkel Pusat",
    lastService: "2026-02-15",
    customer: null,
  },
  {
    id: "MSN-102",
    model: "Genset Cummins",
    cap: "100kVA",
    status: "Dipesan",
    location: "Gudang Utama",
    lastService: "2026-02-01",
    customer: "CV. Bangun Pagi",
  },
];

let rentalRequests: RentalRequest[] = [
  {
    id: "REQ-001",
    pelanggan: "PT. Maju Jaya",
    lokasi: "Sleman",
    status: "Menunggu Validasi",
    machines: [
      { id: "M-01", jenis: "Genset 50kVA", qty: 2, harga: 1500000, diskon: 0 },
      { id: "M-02", jenis: "Genset 100kVA", qty: 1, harga: 2500000, diskon: 0 },
    ],
  },
  {
    id: "REQ-002",
    pelanggan: "PT. Maju Prima",
    lokasi: "Sleman",
    status: "Menunggu Validasi",
    machines: [
      { id: "M-03", jenis: "Genset 50kVA", qty: 1, harga: 750000, diskon: 0 },
      { id: "M-04", jenis: "Genset 100kVA", qty: 1, harga: 2500000, diskon: 0 },
    ],
  },
];

let payments: PaymentData[] = [
  {
    id: "INV-001",
    pelanggan: "PT. Maju Jaya",
    total: 5500000,
    tanggal: "20 Okt 2025",
    status: "Menunggu Validasi",
    bukti: "https://placehold.co/1000x1500?text=Bukti+INV-001",
  },
  {
    id: "INV-002",
    pelanggan: "CV. Bangun Pagi",
    total: 3250000,
    tanggal: "21 Okt 2025",
    status: "Menunggu Validasi",
    bukti: "https://placehold.co/1000x1500?text=Bukti+INV-002",
  },
];

let deliveries: OrderData[] = [
  {
    id: "ORD-502",
    pelanggan: "PT. Maju Jaya",
    tanggalKirim: "18 Okt 2025",
    sopir: "Andi Supriadi",
    status: "Dikirim",
    unit: [
      { id: "MSN-001", jenis: "Genset 50kVA" },
      { id: "MSN-002", jenis: "Genset 50kVA" },
    ],
    buktiSuratJalan: "https://placehold.co/800x1200?text=Surat+Jalan+ORD-501",
  },
  {
    id: "ORD-505",
    pelanggan: "CV. Bangun Pagi",
    tanggalKirim: "19 Okt 2025",
    sopir: "Budi Santoso",
    status: "Dikirim",
    unit: [{ id: "MSN-099", jenis: "Genset 100kVA" }],
    buktiSuratJalan: "https://placehold.co/800x1200?text=Surat+Jalan+ORD-505",
  },
];

const activityLogs: ActivityLog[] = [
  {
    id: "LOG-881",
    timestamp: "19 Feb 2026, 14:20",
    admin: "Budi Santoso",
    action: "Validasi Pembayaran",
    target: "INV-2026-001",
    type: "finance",
    detail: {
      old: "Menunggu",
      new: "Lunas",
      note: "Bukti transfer valid (BCA)",
    },
  },
  {
    id: "LOG-880",
    timestamp: "19 Feb 2026, 11:05",
    admin: "Siti Aminah",
    action: "Update Status Mesin",
    target: "MSN-501 (Genset 50kVA)",
    type: "logistic",
    detail: { old: "Dikirim", new: "Disewa", note: "Unit diterima di Site Sleman" },
  },
];

const purchaseOrders: PurchaseOrder[] = [
  {
    id: "PO-2026-001",
    date: "20 Feb 2026",
    client: "PT. Maju Jaya",
    address: "Jl. Kaliurang KM 12, Sleman",
    total: 15500000,
    status: "Selesai",
    items: [
      { name: "Sewa Genset 50kVA", qty: 1, price: 15000000 },
      { name: "Biaya Mobilisasi", qty: 1, price: 500000 },
    ],
  },
  {
    id: "PO-2026-002",
    date: "18 Jan 2026",
    client: "CV. Bangun Pagi",
    address: "Jl. Godean, Yogyakarta",
    total: 8200000,
    status: "Dibatalkan",
    items: [{ name: "Sewa Genset 25kVA", qty: 1, price: 8200000 }],
  },
];

// Manager-specific mock data
let deliveryTracks: DeliveryTrack[] = [
  {
    id: 'ORD-510',
    pelanggan: 'Indo Karya Corp',
    sopir: 'Herman',
    kontak: '0812-3456-7890',
    plat: 'H 8888 AA',
    berangkatAt: '2026-02-23T07:15:00',
    status: 'OTW',
    items: '1x Excavator',
    lastLocation: 'Tol Semarang-Solo KM 422',
    progress: 65,
    detailItems: [{ sn: 'EXC-992', model: 'Excavator PC200' }]
  },
  {
    id: 'ORD-501',
    pelanggan: 'PT. Maju Jaya',
    sopir: 'Andi Supriadi',
    kontak: '0857-1122-3344',
    plat: 'AB 1234 XY',
    berangkatAt: '2026-02-23T08:00:00',
    status: 'OTW',
    items: '2x Genset 50kVA',
    lastLocation: 'Ringroad Utara Yogyakarta',
    progress: 30,
    detailItems: [
      { sn: 'MSN-001', model: 'Genset 50kVA' },
      { sn: 'MSN-002', model: 'Genset 50kVA' }
    ]
  },
  {
    id: 'ORD-499',
    pelanggan: 'CV. Bangun Pagi',
    sopir: 'Budi Santoso',
    kontak: '0813-9988-7766',
    plat: 'B 9999 SAD',
    berangkatAt: '2026-02-22T14:00:00',
    status: 'DISEWA',
    items: '1x Genset 100kVA',
    lastLocation: 'Site Sleman (Arrived)',
    progress: 100,
    detailItems: [{ sn: 'MSN-099', model: 'Genset 100kVA' }]
  },
];

let dispatchQueue: DispatchQueue[] = [
  {
    id: 'ORD-501',
    client: 'PT. Maju Jaya',
    time: '2h ago',
    units: ['MSN-001 (50kVA)', 'MSN-002 (50kVA)'],
    status: 'Priority'
  },
  {
    id: 'ORD-505',
    client: 'CV. Bangun Pagi',
    time: '5h ago',
    units: ['MSN-099 (100kVA)'],
    status: 'Normal'
  },
];

let maintenanceLogs: MaintenanceLog[] = [
  {
    id: 'MAINT-001',
    unitId: 'MSN-099',
    kategori: 'Rutin',
    hmSaatPerbaikan: 2100,
    teknisi: 'Ahmad',
    keterangan: 'Service rutin 2000 jam - ganti oli dan filter',
    tanggal: '2026-02-20'
  }
];

let reportData: ReportData[] = [
  {
    id: 'REP-001',
    tanggal: '20 Feb 2026',
    pelanggan: 'PT. Maju Jaya',
    unit: 'Genset 50kVA',
    nilai: 12500000,
    statusBayar: 'Lunas',
    sopir: 'Andi Pratama'
  },
  {
    id: 'REP-002',
    tanggal: '21 Feb 2026',
    pelanggan: 'CV. Bangun Pagi',
    unit: 'Genset 100kVA',
    nilai: 8500000,
    statusBayar: 'Lunas',
    sopir: 'Budi Santoso'
  },
  {
    id: 'REP-003',
    tanggal: '22 Feb 2026',
    pelanggan: 'Indo Karya Corp',
    unit: 'Genset 25kVA',
    nilai: 5000000,
    statusBayar: 'Pending',
    sopir: 'Herman'
  },
];

let poArchives: POArchive[] = [
  {
    id: 'PO-2026-001',
    date: '10 Feb 2026',
    client: 'PT. Maju Jaya',
    total: 12500000,
    status: 'Paid',
    linkedSJ: 'SJ-501',
    items: [{ name: 'Genset Perkins 50kVA (MSN-001)', qty: 1, price: 12500000 }],
    paymentHistory: [
      {
        id: 'PAY-001',
        amount: 6250000,
        date: '11 Feb 2026',
        validatedBy: 'Nurul',
        status: 'DP 50% - Diterima'
      },
      {
        id: 'PAY-002',
        amount: 6250000,
        date: '20 Feb 2026',
        validatedBy: 'Nurul',
        status: 'Pelunasan - Diterima'
      }
    ]
  },
  {
    id: 'PO-2026-005',
    date: '12 Feb 2026',
    client: 'CV. Bangun Pagi',
    total: 8000000,
    status: 'Partial',
    linkedSJ: 'SJ-505',
    items: [{ name: 'Genset Cummins 100kVA (MSN-099)', qty: 1, price: 8000000 }],
    paymentHistory: [
      {
        id: 'PAY-003',
        amount: 4000000,
        date: '13 Feb 2026',
        validatedBy: 'Nurul',
        status: 'DP 50% - Diterima'
      }
    ]
  },
  {
    id: 'PO-2026-010',
    date: '15 Feb 2026',
    client: 'Indo Karya Corp',
    total: 15000000,
    status: 'Pending',
    linkedSJ: '-',
    items: [{ name: 'Excavator PC200 (EXC-992)', qty: 1, price: 15000000 }],
    paymentHistory: []
  },
  {
    id: 'PO-2026-012',
    date: '20 Feb 2026',
    client: 'Sinar Baru TBK',
    total: 25000000,
    status: 'Cancelled',
    linkedSJ: '-',
    items: [{ name: 'Genset 250kVA (MSN-250)', qty: 1, price: 25000000 }],
    paymentHistory: []
  },
];

// ========== ENDPOINTS ==========

// Health Check
app.get("/api/health", (_req: Request, res: Response) => {
  const user: User = {
    id: "1",
    name: "John",
    email: "john@example.com",
  };
  res.json({ status: "ok", user });
});

// --- DASHBOARD ---
app.get("/api/dashboard", (req: Request, res: Response) => {
  const period = req.query.period || "7d";
  // In production, filter data by period
  const response: ApiResponse<DashboardData> = {
    success: true,
    data: mockDashboardData,
  };
  res.json(response);
});

// --- MACHINES / FLEET ---
app.get("/api/machines", (_req: Request, res: Response) => {
  const response: ApiResponse<Machine[]> = {
    success: true,
    data: machines,
  };
  res.json(response);
});

app.patch("/api/machines/:id", (req: Request, res: Response): void => {
  const { id } = req.params;
  const { status } = req.body;

  const machine = machines.find((m) => m.id === id);
  if (!machine) {
    res.status(404).json({
      success: false,
      error: "Machine not found",
    });
    return;
  }

  machine.status = status;
  const response: ApiResponse<Machine> = {
    success: true,
    data: machine,
    message: `Machine ${id} status updated to ${status}`,
  };
  res.json(response);
});

// --- RENTAL REQUESTS ---
app.get("/api/rental-requests", (_req: Request, res: Response) => {
  const response: ApiResponse<RentalRequest[]> = {
    success: true,
    data: rentalRequests,
  };
  res.json(response);
});

app.post("/api/rental-requests", (req: Request, res: Response) => {
  const { clientName, unitType, duration, location }: PermintaanData =
    req.body;

  const newRequest: RentalRequest = {
    id: `REQ-${Date.now()}`,
    pelanggan: clientName,
    lokasi: location,
    status: "Menunggu Validasi",
    machines: [
      {
        id: `M-${Date.now()}`,
        jenis: unitType,
        qty: 1,
        harga: 2500000,
        diskon: 0,
      },
    ],
  };

  rentalRequests.push(newRequest);

  const response: ApiResponse<RentalRequest> = {
    success: true,
    data: newRequest,
    message: "Rental request created successfully",
  };
  res.json(response);
});

app.patch("/api/rental-requests/:id/validate", (req: Request, res: Response): void => {
  const { id } = req.params;
  const request = rentalRequests.find((r) => r.id === id);

  if (!request) {
    res.status(404).json({
      success: false,
      error: "Request not found",
    });
    return;
  }

  request.status = "Divalidasi";
  const response: ApiResponse<RentalRequest> = {
    success: true,
    data: request,
    message: "Rental request validated",
  };
  res.json(response);
});

// --- PAYMENTS ---
app.get("/api/payments", (_req: Request, res: Response) => {
  const response: ApiResponse<PaymentData[]> = {
    success: true,
    data: payments,
  };
  res.json(response);
});

app.patch("/api/payments/:id", (req: Request, res: Response): void => {
  const { id } = req.params;
  const { status, rejectionReason } = req.body;

  const payment = payments.find((p) => p.id === id);
  if (!payment) {
    res.status(404).json({
      success: false,
      error: "Payment not found",
    });
    return;
  }

  payment.status = status;
  const response: ApiResponse<PaymentData> = {
    success: true,
    data: payment,
    message: `Payment ${id} marked as ${status}`,
  };
  res.json(response);
});

// --- DELIVERIES / CONFIRMATIONS ---
app.get("/api/deliveries", (_req: Request, res: Response) => {
  const response: ApiResponse<OrderData[]> = {
    success: true,
    data: deliveries,
  };
  res.json(response);
});

app.patch("/api/deliveries/:id/confirm", (req: Request, res: Response): void => {
  const { id } = req.params;
  const { units } = req.body;

  const delivery = deliveries.find((d) => d.id === id);
  if (!delivery) {
    res.status(404).json({
      success: false,
      error: "Delivery not found",
    });
    return;
  }

  delivery.status = "Disewa";
  delivery.unit = units;

  const response: ApiResponse<OrderData> = {
    success: true,
    data: delivery,
    message: `Delivery ${id} confirmed`,
  };
  res.json(response);
});

// --- ACTIVITY LOGS ---
app.get("/api/logs", (_req: Request, res: Response) => {
  const response: ApiResponse<ActivityLog[]> = {
    success: true,
    data: activityLogs,
  };
  res.json(response);
});

// --- PURCHASE ORDERS ---
app.get("/api/purchase-orders", (_req: Request, res: Response) => {
  const response: ApiResponse<PurchaseOrder[]> = {
    success: true,
    data: purchaseOrders,
  };
  res.json(response);
});

app.post("/api/purchase-orders/export", (req: Request, res: Response) => {
  const response: ApiResponse<{ exportId: string; url: string }> = {
    success: true,
    data: {
      exportId: `EXP-${Date.now()}`,
      url: "/downloads/laporan-bulanan.csv",
    },
    message: "Export initiated successfully",
  };
  res.json(response);
});

// Manager-specific endpoints
app.get("/api/delivery-tracks", (_req: Request, res: Response) => {
  const response: ApiResponse<DeliveryTrack[]> = {
    success: true,
    data: deliveryTracks,
  };
  res.json(response);
});

app.get("/api/dispatch-queue", (_req: Request, res: Response) => {
  const response: ApiResponse<DispatchQueue[]> = {
    success: true,
    data: dispatchQueue,
  };
  res.json(response);
});

app.post("/api/dispatch/:id/confirm", (req: Request, res: Response) => {
  const { id } = req.params;
  const dispatchData: DispatchData = req.body;

  // Update status and add to delivery tracks
  const newTrack: DeliveryTrack = {
    id: dispatchData.id,
    pelanggan: dispatchData.client,
    sopir: dispatchData.sopir,
    kontak: '0812-3456-7890', // Mock
    plat: dispatchData.plat,
    berangkatAt: new Date().toISOString(),
    status: 'OTW',
    items: dispatchData.units.join(', '),
    lastLocation: 'Gudang SAD',
    progress: 0,
    detailItems: dispatchData.units.map(unit => ({
      sn: unit.split(' ')[0],
      model: unit.split('(')[1]?.replace(')', '') || unit
    }))
  };

  deliveryTracks.push(newTrack);

  const response: ApiResponse<DeliveryTrack> = {
    success: true,
    data: newTrack,
    message: "Dispatch confirmed successfully",
  };
  res.json(response);
});

app.post("/api/maintenance", (req: Request, res: Response) => {
  const maintenanceData: Omit<MaintenanceLog, 'id' | 'tanggal'> = req.body;
  const newLog: MaintenanceLog = {
    ...maintenanceData,
    id: `MAINT-${Date.now()}`,
    tanggal: new Date().toISOString().split('T')[0]
  };

  maintenanceLogs.push(newLog);

  const response: ApiResponse<MaintenanceLog> = {
    success: true,
    data: newLog,
    message: "Maintenance log saved successfully",
  };
  res.json(response);
});

app.get("/api/reports", (_req: Request, res: Response) => {
  const response: ApiResponse<ReportData[]> = {
    success: true,
    data: reportData,
  };
  res.json(response);
});

app.post("/api/reports/export-pdf", (req: Request, res: Response) => {
  const response: ApiResponse<{ exportId: string; url: string }> = {
    success: true,
    data: {
      exportId: `PDF-${Date.now()}`,
      url: "/downloads/laporan-akhir-penyewaan.pdf",
    },
    message: "PDF export initiated successfully",
  };
  res.json(response);
});

app.post("/api/reports/export-excel", (req: Request, res: Response) => {
  const response: ApiResponse<{ exportId: string; url: string }> = {
    success: true,
    data: {
      exportId: `XLS-${Date.now()}`,
      url: "/downloads/laporan-akhir-penyewaan.xlsx",
    },
    message: "Excel export initiated successfully",
  };
  res.json(response);
});

app.get("/api/po-archive", (_req: Request, res: Response) => {
  const response: ApiResponse<POArchive[]> = {
    success: true,
    data: poArchives,
  };
  res.json(response);
});

app.post("/api/po-archive/:id/download-pdf", (req: Request, res: Response) => {
  const { id } = req.params;
  const response: ApiResponse<{ url: string }> = {
    success: true,
    data: {
      url: `/downloads/po-${id}.pdf`,
    },
    message: "PO PDF download initiated",
  };
  res.json(response);
});

app.post("/api/po-archive/:id/print-invoice", (req: Request, res: Response) => {
  const { id } = req.params;
  const response: ApiResponse<{ printId: string }> = {
    success: true,
    data: {
      printId: `PRINT-${Date.now()}`,
    },
    message: "Invoice print job queued",
  };
  res.json(response);
});

app.get("/api/po-archive/:id/timeline", (req: Request, res: Response): void => {
  const { id } = req.params;
  const po = poArchives.find(p => p.id === id);
  if (!po) {
    res.status(404).json({
      success: false,
      error: "PO not found",
    });
    return;
  }

  const timeline = [
    {
      date: po.date,
      event: "PO Created",
      detail: `Purchase Order ${po.id} created for ${po.client}`
    },
    ...po.paymentHistory.map(payment => ({
      date: payment.date,
      event: payment.status,
      detail: `Payment of Rp ${payment.amount.toLocaleString('id-ID')} validated by ${payment.validatedBy}`
    }))
  ];

  const response: ApiResponse<any[]> = {
    success: true,
    data: timeline,
  };
  res.json(response);
});

// ========== ERROR HANDLING ==========
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: `Route not found: ${req.path}`,
  });
});

app.listen(4000, () => {
  console.log("Backend running at http://localhost:4000");
  console.log("Available endpoints:");
  console.log("  GET  /api/health");
  console.log("  GET  /api/dashboard?period=7d");
  console.log("  GET  /api/machines");
  console.log("  PATCH /api/machines/:id");
  console.log("  GET  /api/rental-requests");
  console.log("  POST /api/rental-requests");
  console.log("  PATCH /api/rental-requests/:id/validate");
  console.log("  GET  /api/payments");
  console.log("  PATCH /api/payments/:id");
  console.log("  GET  /api/deliveries");
  console.log("  PATCH /api/deliveries/:id/confirm");
  console.log("  GET  /api/logs");
  console.log("  GET  /api/purchase-orders");
  console.log("  POST /api/purchase-orders/export");
  console.log("  GET  /api/delivery-tracks");
  console.log("  GET  /api/dispatch-queue");
  console.log("  POST /api/dispatch/:id/confirm");
  console.log("  POST /api/maintenance");
  console.log("  GET  /api/reports");
  console.log("  POST /api/reports/export-pdf");
  console.log("  POST /api/reports/export-excel");
  console.log("  GET  /api/po-archive");
  console.log("  POST /api/po-archive/:id/download-pdf");
  console.log("  POST /api/po-archive/:id/print-invoice");
  console.log("  GET  /api/po-archive/:id/timeline");
});
