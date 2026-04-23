import { PengirimanType } from "@domain/Pengiriman/Pengiriman.types";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL
});

export class PengirimanRepository {
  async findAll(): Promise<PengirimanType[]> {
    const data = await prisma.pengiriman.findMany({
      include: { permintaan: true }
    });
    return data.map(d => ({
      id: d.id,
      idPermintaan: d.idPermintaan,
      tanggalKirim: d.tanggalKirim,
      sopir: d.sopir,
      status: d.status,
      buktiSuratJalan: d.buktiSuratJalan,
      permintaan: d.permintaan
    }));
  }

  async findById(id: string): Promise<PengirimanType | null> {
    const d = await prisma.pengiriman.findUnique({
      where: { id },
      include: { permintaan: true }
    });
    if (!d) return null;
    return {
      id: d.id,
      idPermintaan: d.idPermintaan,
      tanggalKirim: d.tanggalKirim,
      sopir: d.sopir,
      status: d.status,
      buktiSuratJalan: d.buktiSuratJalan,
      permintaan: d.permintaan
    };
  }

  async updateStatus(id: string, status: string): Promise<PengirimanType> {
    const d = await prisma.pengiriman.update({
      where: { id },
      data: { status },
      include: { permintaan: true }
    });
    return {
      id: d.id,
      idPermintaan: d.idPermintaan,
      tanggalKirim: d.tanggalKirim,
      sopir: d.sopir,
      status: d.status,
      buktiSuratJalan: d.buktiSuratJalan,
      permintaan: d.permintaan
    };
  }
}
