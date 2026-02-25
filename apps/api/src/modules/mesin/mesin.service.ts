import { Mesin } from "@domain/mesin/Mesin"
import { StatusMesin } from "@domain/mesin/mesin.types";
import { MesinRepository } from "./mesin.repository";

export class MesinService {
  constructor(private readonly mesinRepository = new MesinRepository()) {}

  async ubahStatusMesin(idMesin: string, statusBaru: StatusMesin) {
    const data = await this.mesinRepository.findById(idMesin);
    if (!data) throw new Error("Mesin tidak ditemukan");

    const mesin = new Mesin(data);
    mesin.ubahStatus(statusBaru);

    const updated = await this.mesinRepository.updateStatus(idMesin, mesin.getStatus());
    return updated;
  }
}