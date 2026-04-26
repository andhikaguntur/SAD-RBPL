import { PembayaranType } from "@domain/Pembayaran/Pembayaran.types";
import { PrismaClient } from "@prisma/client";
import { AuditLogRepository } from "../auditLog/auditLog.repository";

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL
});

export type CreatePembayaranInput = {
  idPermintaan: string;
  total: number;
  tanggal: string;
  status: string;
  bukti?: string;
};

export class PembayaranRepository {
  private auditLog = new AuditLogRepository();

  async create(input: CreatePembayaranInput): Promise<PembayaranType> {
    const d = await prisma.pembayaran.create({
      data: {
        idPermintaan: input.idPermintaan,
        total: input.total,
        tanggal: input.tanggal,
        status: input.status,
        bukti: input.bukti || ''
      },
      include: { permintaan: true }
    });
    return {
      id: d.id,
      idPermintaan: d.idPermintaan,
      total: d.total,
      tanggal: d.tanggal,
      status: d.status,
      bukti: d.bukti,
      permintaan: d.permintaan
    };
  }

  async findAll(): Promise<PembayaranType[]> {
    const data = await prisma.pembayaran.findMany({
      include: { permintaan: true }
    });
    return data.map(d => ({
      id: d.id,
      idPermintaan: d.idPermintaan,
      total: d.total,
      tanggal: d.tanggal,
      status: d.status,
      bukti: d.bukti,
      permintaan: d.permintaan
    }));
  }

  async findById(id: string): Promise<PembayaranType | null> {
    const d = await prisma.pembayaran.findUnique({
      where: { id },
      include: { permintaan: true }
    });
    if (!d) return null;
    return {
      id: d.id,
      idPermintaan: d.idPermintaan,
      total: d.total,
      tanggal: d.tanggal,
      status: d.status,
      bukti: d.bukti,
      permintaan: d.permintaan
    };
  }

  async findByPermintaanId(idPermintaan: string): Promise<PembayaranType[]> {
    const data = await prisma.pembayaran.findMany({
      where: { idPermintaan },
      include: { permintaan: true }
    });
    return data.map(d => ({
      id: d.id,
      idPermintaan: d.idPermintaan,
      total: d.total,
      tanggal: d.tanggal,
      status: d.status,
      bukti: d.bukti,
      permintaan: d.permintaan
    }));
  }

  async updateProof(id: string, bukti: string): Promise<PembayaranType> {
    return await prisma.$transaction(async (tx) => {
      const pembayaran = await tx.pembayaran.update({
        where: { id },
        data: { bukti, status: 'Menunggu Validasi' },
        include: { permintaan: true }
      });

      // Update PermintaanSewa status as well so Admin can see it in "Permintaan Baru"
      await tx.permintaanSewa.update({
        where: { idPermintaan: pembayaran.idPermintaan },
        data: { status: 'Menunggu Validasi' }
      });

      // Audit Log
      await this.auditLog.create({
        entitasTarget: 'Pembayaran',
        idTarget: pembayaran.id,
        aksi: 'UPDATE_PROOF',
        keterangan: `Bukti pembayaran diunggah untuk invoice ${pembayaran.id} (Order: ${pembayaran.idPermintaan})`
      });

      return pembayaran;
    }) as any;
  }

  async updateStatus(id: string, status: string): Promise<PembayaranType> {
    const d = await prisma.pembayaran.update({
      where: { id },
      data: { status },
      include: { permintaan: true }
    });
    return {
      id: d.id,
      idPermintaan: d.idPermintaan,
      total: d.total,
      tanggal: d.tanggal,
      status: d.status,
      bukti: d.bukti,
      permintaan: d.permintaan
    };
  }

  async findByPelanggan(pelanggan: string): Promise<PembayaranType[]> {
    const data = await prisma.pembayaran.findMany({
      where: { permintaan: { pelanggan } },
      include: { permintaan: true },
      orderBy: { tanggal: 'desc' }
    });
    return data.map(d => ({
      id: d.id,
      idPermintaan: d.idPermintaan,
      total: d.total,
      tanggal: d.tanggal,
      status: d.status,
      bukti: d.bukti,
      permintaan: d.permintaan
    }));
  }

  async findByUserId(userId: string): Promise<PembayaranType[]> {
    const data = await prisma.pembayaran.findMany({
      where: { permintaan: { userId } },
      include: { permintaan: true },
      orderBy: { tanggal: 'desc' }
    });
    return data.map(d => ({
      id: d.id,
      idPermintaan: d.idPermintaan,
      total: d.total,
      tanggal: d.tanggal,
      status: d.status,
      bukti: d.bukti,
      permintaan: d.permintaan
    }));
  }

  async updateStatusWithSync(id: string, status: 'Lunas' | 'Ditolak') {
    return await prisma.$transaction(async (tx) => {

      const pembayaran = await tx.pembayaran.update({
        where: { id },
        data: { status }
      });

      if (status === 'Lunas') {
        await tx.permintaanSewa.update({
          where: { idPermintaan: pembayaran.idPermintaan },
          data: { status: 'Lunas' }
        });
      }

      // Audit Log
      await this.auditLog.create({
        entitasTarget: 'Pembayaran',
        idTarget: pembayaran.id,
        aksi: 'UPDATE_STATUS',
        keterangan: `Pembayaran ${pembayaran.id} dikonfirmasi: ${status}`
      });

      return pembayaran;
    });
  }
}
