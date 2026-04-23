import { PrismaClient } from "../../generated/prisma";

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
      // Ready to ship (status Dikirim in Pengiriman)
      prisma.pengiriman.count({
        where: { status: 'Dikirim' }
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
        pelanggan: t.pelanggan || 'User',
        nominal: t.mesin.reduce((acc, m) => acc + (m.harga - m.diskon) * m.qty, 0),
        status: t.status,
        pembayaran: t.pembayaran[0] || null,
        pengiriman: t.pengiriman[0] || null
      }))
    };
  }
}
