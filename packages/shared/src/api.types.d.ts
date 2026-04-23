export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
}
export interface DashboardKPI {
    revenue: string;
    revenueTrend: string;
    activeUnits: string;
    activeTrend: string;
    waitingValidation: string;
    readyToShip: string;
}
export interface DashboardData {
    kpi: DashboardKPI;
    fleet: FleetData[];
    transactions: Transaction[];
    revenueChart: RevenueData[];
}
export interface FleetData {
    label: string;
    value: number;
    color: string;
    count: string;
}
export interface Transaction {
    id: string;
    name: string;
    val: string;
    status: string;
    color: string;
}
export interface RevenueData {
    month: string;
    total: number;
}
export interface Machine {
    id: string;
    model: string;
    cap: string;
    status: string;
    location: string;
    lastService: string;
    customer: string | null;
}
export interface RentalRequest {
    id: string;
    pelanggan: string;
    lokasi: string;
    status: 'Menunggu Validasi' | 'Divalidasi' | string;
    machines: MachineItem[];
}
export interface MachineItem {
    id: string;
    jenis: string;
    qty: number;
    harga: number;
    diskon: number;
}
export interface PaymentData {
    id: string;
    pelanggan: string;
    total: number;
    tanggal: string;
    status: 'Menunggu Validasi' | 'Lunas' | 'Ditolak';
    bukti: string;
}
export interface OrderData {
    id: string;
    pelanggan: string;
    tanggalKirim: string;
    sopir: string;
    status: 'Dikirim' | 'Disewa';
    unit: MachineUnit[];
    buktiSuratJalan: string;
}
export interface MachineUnit {
    id: string;
    jenis: string;
    isChecked?: boolean;
}
export interface ActivityLog {
    id: string;
    timestamp: string;
    admin: string;
    action: string;
    target: string;
    type: 'finance' | 'logistic' | 'pricing' | 'system';
    detail: Record<string, any>;
}
export interface PurchaseOrder {
    id: string;
    date: string;
    client: string;
    address: string;
    total: number;
    status: 'Selesai' | 'Dibatalkan';
    items: POItem[];
}
export interface POItem {
    name: string;
    qty: number;
    price: number;
}
export interface PermintaanData {
    clientName: string;
    unitType: string;
    duration: number;
    location: string;
}
export interface DeliveryTrack {
    id: string;
    pelanggan: string;
    sopir: string;
    kontak: string;
    plat: string;
    berangkatAt: string;
    status: 'OTW' | 'DISEWA';
    items: string;
    lastLocation: string;
    progress: number;
    detailItems: {
        sn: string;
        model: string;
    }[];
}
export interface DispatchQueue {
    id: string;
    client: string;
    time: string;
    units: string[];
    status: 'Priority' | 'Normal';
}
export interface DispatchData {
    id: string;
    client: string;
    units: string[];
    sopir: string;
    plat: string;
    jamBerangkat: string;
    buktiFoto: string;
}
export interface MaintenanceLog {
    id: string;
    unitId: string;
    kategori: string;
    hmSaatPerbaikan: number;
    teknisi: string;
    keterangan: string;
    tanggal: string;
}
export interface ReportData {
    id: string;
    tanggal: string;
    pelanggan: string;
    unit: string;
    nilai: number;
    statusBayar: string;
    sopir: string;
}
export interface POArchive {
    id: string;
    date: string;
    client: string;
    total: number;
    status: 'Paid' | 'Partial' | 'Pending' | 'Cancelled';
    linkedSJ: string;
    items: POItem[];
    paymentHistory: PaymentHistory[];
}
export interface PaymentHistory {
    id: string;
    amount: number;
    date: string;
    validatedBy: string;
    status: string;
}
//# sourceMappingURL=api.types.d.ts.map