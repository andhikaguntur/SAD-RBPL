import { mesinType, StatusMesin } from "@domain/mesin/mesin.types";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient({});

export class MesinRepository {
  async findById(idMesin: string): Promise<mesinType | null> {
    const data = await prisma.mesin.findUnique({
      where: { idMesin: Number(idMesin) }
    });

    if (!data) return null;
    return {
      idMesin: data.idMesin,
      namaMesin: data.namaMesin,
      status: data.status as StatusMesin
    };
  }

  async updateStatus(idMesin: string, status: StatusMesin): Promise<mesinType> {
    const data = await prisma.mesin.update({
      where: { idMesin: Number(idMesin) },
      data: { status }
    });

    return {
      idMesin: data.idMesin,
      namaMesin: data.namaMesin,
      status: data.status as StatusMesin
    };
  }

  async save(data: mesinType): Promise<mesinType> {
    const saved = await prisma.mesin.upsert({
      where: { idMesin: Number(data.idMesin) },
      update: {
        namaMesin: data.namaMesin,
        status: data.status
      },
      create: {
        namaMesin: data.namaMesin,
        status: data.status
      }
    })
    return {
      idMesin: saved.idMesin,
      namaMesin: saved.namaMesin,
      status: saved.status as StatusMesin
    }
  }
}