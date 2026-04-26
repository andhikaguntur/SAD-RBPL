import { PengirimanType } from "@sad-rbpl/domain/Pengiriman/Pengiriman.types";
import { PrismaClient } from "@prisma/client";
import { AuditLogRepository } from "../auditLog/auditLog.repository";

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL
});

export class PengirimanRepository {
  private auditLog = new AuditLogRepository();

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

  async create(input: { idPermintaan: string; sopir: string; status: string; tanggalKirim: string }): Promise<PengirimanType> {
    const d = await prisma.pengiriman.create({
      data: {
        idPermintaan: input.idPermintaan,
        sopir: input.sopir,
        status: input.status,
        tanggalKirim: input.tanggalKirim,
        buktiSuratJalan: ""
      },
      include: { permintaan: true }
    });

    // Update PermintaanSewa status to match pengiriman status (e.g., 'Dikirim')
    await prisma.permintaanSewa.update({
      where: { idPermintaan: input.idPermintaan },
      data: { status: input.status }
    });

    // Audit Log
    await this.auditLog.create({
      entitasTarget: 'Pengiriman',
      idTarget: d.id,
      aksi: 'CREATE',
      keterangan: `Pengiriman baru dibuat untuk order ${input.idPermintaan} (Sopir: ${input.sopir})`
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

  async updateStatus(id: string, status: string): Promise<PengirimanType> {
    const d = await prisma.pengiriman.update({
      where: { id },
      data: { status },
      include: { permintaan: true }
    });

    // Audit Log
    await this.auditLog.create({
      entitasTarget: 'Pengiriman',
      idTarget: d.id,
      aksi: 'UPDATE',
      keterangan: `Status pengiriman ${d.id} (Order: ${d.idPermintaan}) diubah menjadi ${status}`
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

  async findByPelanggan(pelanggan: string): Promise<PengirimanType[]> {
    const data = await prisma.pengiriman.findMany({
      where: { permintaan: { pelanggan } },
      include: { permintaan: true }
    });
    return data.map((d: any) => ({
      id: d.id,
      idPermintaan: d.idPermintaan,
      tanggalKirim: d.tanggalKirim,
      sopir: d.sopir,
      status: d.status,
      buktiSuratJalan: d.buktiSuratJalan,
      permintaan: d.permintaan
    }));
  }

  async findByUserId(userId: string): Promise<PengirimanType[]> {
    const data = await prisma.pengiriman.findMany({
      where: { permintaan: { userId } },
      include: { permintaan: true }
    });
    return data.map((d: any) => ({
      id: d.id,
      idPermintaan: d.idPermintaan,
      tanggalKirim: d.tanggalKirim,
      sopir: d.sopir,
      status: d.status,
      buktiSuratJalan: d.buktiSuratJalan,
      permintaan: d.permintaan
    }));
  }
}
