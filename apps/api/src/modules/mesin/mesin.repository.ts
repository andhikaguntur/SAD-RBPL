import { mesinType, StatusMesin } from "@domain/mesin/mesin.types";

//  ganti ini pakai db beneran, prisma aje keknya
const mesinTable = new Map<string, mesinType>();

export class MesinRepository {
  async findById(idMesin: string): Promise<mesinType | null> {
    return mesinTable.get(idMesin) ?? null;
  }

  async updateStatus(idMesin: string, status: StatusMesin): Promise<mesinType> {
    const data = mesinTable.get(idMesin);
    if (!data) throw new Error("Mesin tidak ditemukan");

    const updated: mesinType = { ...data, status };
    mesinTable.set(idMesin, updated);
    return updated;
  }
}