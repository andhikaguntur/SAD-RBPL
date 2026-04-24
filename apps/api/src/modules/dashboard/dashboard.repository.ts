import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL
});

export class DashboardRepository {
  async getStats() {
    const [
      revenue,
      rentedUnits,
      pendingRequests,
      readyToShip,
      recentTransactions,
      machines
    ] = await Promise.all([
      // Total Revenue (Lunas)
      prisma.pembayaran.aggregate({
        where: { status: 'Lunas' },
        _sum: { total: true }
      }),
      // Units rented
      prisma.mesin.count({
        where: { status: 'Disewa' }
      }),
      // Pending requests
      prisma.permintaanSewa.count({
        where: { status: { in: ['Menunggu', 'Menunggu Validasi'] } }
      }),
      // Ready to ship (status Lunas but not yet processed for dispatch)
      prisma.permintaanSewa.count({
        where: { status: 'Lunas' }
      }),
      // Recent transactions
      prisma.permintaanSewa.findMany({
        take: 5,
        orderBy: { idPermintaan: 'desc' },
        include: { mesin: { include: { mesin: true } }, pembayaran: true, pengiriman: true }
      }),
      // For Fleet Utilization
      prisma.mesin.findMany()
    ]);

    // Calculate Fleet Utilization
    const fleet: Record<string, { total: number, rented: number }> = {};
    machines.forEach(m => {
      const category = m.namaMesin || 'Lainnya';
      if (!fleet[category]) fleet[category] = { total: 0, rented: 0 };
      fleet[category].total++;
      if (m.status === 'Disewa') fleet[category].rented++;
    });

    const fleetUtilization = Object.keys(fleet).map(cat => ({
      label: cat,
      count: `${fleet[cat].rented}/${fleet[cat].total}`,
      value: (fleet[cat].rented / fleet[cat].total) * 100,
      color: fleet[cat].total > 0 ? 'blue' : 'gray'
    }));

    return {
      revenue: revenue._sum.total || 0,
      rentedUnits,
      pendingRequests,
      readyToShip,
      fleetUtilization,
      recentTransactions: recentTransactions.map(t => ({
        id: t.idPermintaan,
        customer: t.pelanggan || 'User',
        amount: t.mesin.reduce((acc, m) => acc + (m.harga - m.diskon) * m.qty, 0),
        status: t.status,
        lokasi: t.lokasi,
        durasi: t.durasi,
        mesin: t.mesin.map(m => ({
          nama: m.mesin?.namaMesin || 'Mesin',
          qty: m.qty,
          harga: m.harga,
          diskon: m.diskon
        })),
        pembayaran: t.pembayaran[0] || null,
        pengiriman: t.pengiriman[0] || null
      }))
    };
  }

  async getUserStats(userId: string) {
    const [
      activeRentals,
      pendingQuotes,
      unpaidInvoices,
      totalSpent,
      recentActivities
    ] = await Promise.all([
      // Active rentals (status 'Dikirim', 'Disewa', 'Diterima')
      prisma.permintaanSewa.count({
        where: { userId, status: { in: ['Dikirim', 'Disewa', 'Diterima'] } }
      }),
      // Pending quotes (status 'Menunggu', 'Menunggu Validasi', 'Divalidasi', 'Menunggu Pembayaran')
      prisma.permintaanSewa.count({
        where: { userId, status: { in: ['Menunggu', 'Menunggu Validasi', 'Divalidasi', 'Menunggu Pembayaran'] } }
      }),
      // Unpaid invoices (where payment status exists and is not 'Lunas')
      prisma.pembayaran.count({
        where: { permintaan: { userId }, NOT: { status: 'Lunas' } }
      }),
      // Total spent (sum of all 'Lunas' payments)
      prisma.pembayaran.aggregate({
        where: { permintaan: { userId }, status: 'Lunas' },
        _sum: { total: true }
      }),
      // Recent activities (last 5 requests)
      prisma.permintaanSewa.findMany({
        where: { userId },
        take: 5,
        orderBy: { idPermintaan: 'desc' },
        include: { pengiriman: true, pembayaran: true }
      })
    ]);

    return {
      activeRentals,
      pendingQuotes,
      unpaidInvoices,
      totalSpent: totalSpent._sum.total || 0,
      recentActivities: recentActivities.map(a => ({
        id: a.idPermintaan,
        status: a.status,
        date: a.tanggalFormat,
        location: a.lokasi,
        pembayaran: a.pembayaran[0] || null,
        pengiriman: a.pengiriman[0] || null
      }))
    };
  }
}
