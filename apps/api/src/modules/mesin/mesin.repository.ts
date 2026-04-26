import { mesinType, StatusMesin } from "@sad-rbpl/domain/Mesin/mesin.types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL
});

export class MesinRepository {
  async findById(idMesin: string): Promise<mesinType | null> {
    const data = await prisma.mesin.findUnique({
      where: { idMesin }
    });

    if (!data) return null;
    return {
      idMesin: data.idMesin,
      namaMesin: data.namaMesin,
      kapasitas: data.kapasitas,
      status: data.status as StatusMesin,
      lokasi: data.lokasi,
      lastService: data.lastService,
      pelanggan: data.pelanggan
    };
  }

  async updateStatus(idMesin: string, status: StatusMesin): Promise<mesinType> {
    const data = await prisma.mesin.update({
      where: { idMesin },
      data: { status }
    });

    return {
      idMesin: data.idMesin,
      namaMesin: data.namaMesin,
      kapasitas: data.kapasitas,
      status: data.status as StatusMesin,
      lokasi: data.lokasi,
      lastService: data.lastService,
      pelanggan: data.pelanggan
    };
  }

  async save(data: mesinType): Promise<mesinType> {
    const saved = await prisma.mesin.upsert({
      where: { idMesin: data.idMesin },
      update: {
        namaMesin: data.namaMesin,
        kapasitas: data.kapasitas,
        status: data.status,
        lokasi: data.lokasi,
        lastService: data.lastService,
        pelanggan: data.pelanggan
      },
      create: {
        idMesin: data.idMesin,
        namaMesin: data.namaMesin,
        kapasitas: data.kapasitas,
        status: data.status,
        lokasi: data.lokasi,
        lastService: data.lastService,
        pelanggan: data.pelanggan
      }
    })
    return {
      idMesin: saved.idMesin,
      namaMesin: saved.namaMesin,
      kapasitas: saved.kapasitas,
      status: saved.status as StatusMesin,
      lokasi: saved.lokasi,
      lastService: saved.lastService,
      pelanggan: saved.pelanggan
    }
  }

  async findAll(): Promise<mesinType[]> {
    const data = await prisma.mesin.findMany();
    return data.map((m: any) => ({
      idMesin: m.idMesin,
      namaMesin: m.namaMesin,
      kapasitas: m.kapasitas,
      status: m.status as StatusMesin,
      lokasi: m.lokasi,
      lastService: m.lastService,
      pelanggan: m.pelanggan
    }));
  }
}
