import { Request, Response } from "express";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL
});

export class SeedController {
  async run(req: Request, res: Response) {
    try {
      console.log('Cleaning up database...');
      await prisma.auditLog.deleteMany();
      await prisma.pengiriman.deleteMany();
      await prisma.pembayaran.deleteMany();
      await prisma.permintaanMesin.deleteMany();
      await prisma.permintaanSewa.deleteMany();
      await prisma.mesin.deleteMany();

      console.log('Seeding machines...');
      const m1 = await prisma.mesin.create({ data: { idMesin: 'MSN-001', namaMesin: 'Genset 50kVA', kapasitas: '50kVA', status: 'Tersedia' } });
      const m2 = await prisma.mesin.create({ data: { idMesin: 'MSN-002', namaMesin: 'Genset 50kVA', kapasitas: '50kVA', status: 'Disewa' } });
      const m3 = await prisma.mesin.create({ data: { idMesin: 'MSN-003', namaMesin: 'Genset 100kVA', kapasitas: '100kVA', status: 'Tersedia' } });
      const m4 = await prisma.mesin.create({ data: { idMesin: 'MSN-004', namaMesin: 'Genset 100kVA', kapasitas: '100kVA', status: 'Disewa' } });
      const m5 = await prisma.mesin.create({ data: { idMesin: 'MSN-005', namaMesin: 'Excavator PC200', kapasitas: '20 Ton', status: 'Tersedia' } });

      console.log('Seeding rental requests...');
      const req1 = await prisma.permintaanSewa.create({
        data: {
          idPermintaan: 'REQ-2026-001',
          pelanggan: 'PT. Maju Jaya',
          lokasi: 'Sleman, DIY',
          durasi: 7,
          status: 'Menunggu',
          tanggalFormat: '20 Feb 2026'
        }
      });
      await prisma.permintaanMesin.create({ data: { idPermintaan: req1.idPermintaan, idMesin: m1.idMesin, qty: 1, harga: 1500000, diskon: 0 } });

      const req2 = await prisma.permintaanSewa.create({
        data: {
          idPermintaan: 'REQ-2026-002',
          pelanggan: 'CV. Bangun Pagi',
          lokasi: 'Godean, DIY',
          durasi: 3,
          status: 'Divalidasi',
          tanggalFormat: '21 Feb 2026'
        }
      });
      await prisma.permintaanMesin.create({ data: { idPermintaan: req2.idPermintaan, idMesin: m3.idMesin, qty: 2, harga: 2500000, diskon: 100000 } });
      
      await prisma.pembayaran.create({
        data: {
          id: 'INV-2026-001',
          idPermintaan: req2.idPermintaan,
          total: 4800000,
          tanggal: '22 Feb 2026',
          status: 'Menunggu Validasi',
          bukti: 'https://placehold.co/600x800?text=Bukti+Bayar+REQ-002'
        }
      });

      const req3 = await prisma.permintaanSewa.create({
        data: {
          idPermintaan: 'REQ-2026-003',
          pelanggan: 'Indo Karya',
          lokasi: 'Kulon Progo, DIY',
          durasi: 14,
          status: 'Divalidasi',
          tanggalFormat: '18 Feb 2026'
        }
      });
      await prisma.permintaanMesin.create({ data: { idPermintaan: req3.idPermintaan, idMesin: m5.idMesin, qty: 1, harga: 5000000, diskon: 0 } });
      
      await prisma.pembayaran.create({
        data: {
          id: 'INV-2026-002',
          idPermintaan: req3.idPermintaan,
          total: 5000000,
          tanggal: '19 Feb 2026',
          status: 'Lunas',
          bukti: 'https://placehold.co/600x800?text=Lunas+REQ-003'
        }
      });

      await prisma.pengiriman.create({
        data: {
          id: 'SHIP-2026-001',
          idPermintaan: req3.idPermintaan,
          tanggalKirim: '20 Feb 2026',
          sopir: 'Andi Supriadi',
          status: 'Dikirim',
          buktiSuratJalan: 'https://placehold.co/800x600?text=Surat+Jalan+SHIP-001'
        }
      });

      res.json({ success: true, message: 'Database seeded successfully' });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ success: false, message: error.message });
    }
  }
}
