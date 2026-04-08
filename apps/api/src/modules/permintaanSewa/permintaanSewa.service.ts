import { PermintaanRepository } from "./permintaanSewa.repository"
import { PermintaanSewa } from "@domain/PermintaanSewa/PermintaanSewa"
import { PenawaranHarga } from "@domain/PenawaranHarga/PenawaranHarga"

export class PermintaanService {

    constructor(
        private permintaanRepo = new PermintaanRepository()
    ) { }

    async generatePenawaran(idPermintaan: string) {

        const data = await this.permintaanRepo.findById(idPermintaan)

        if (!data) {
            throw new Error("Permintaan tidak ditemukan")
        }

        const permintaan = new PermintaanSewa(data)

        const penawaran =
            PenawaranHarga.generateHarga(permintaan)

        return penawaran
    }

}