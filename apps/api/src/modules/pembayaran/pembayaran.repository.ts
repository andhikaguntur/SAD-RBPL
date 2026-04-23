import { PembayaranType } from "@domain/Pembayaran/Pembayaran.types";
import { PrismaClient } from "../../generated/prisma";

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
    const d = await prisma.pembayaran.update({
      where: { id },
      data: { bukti, status: 'Menunggu Validasi' },
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
}
