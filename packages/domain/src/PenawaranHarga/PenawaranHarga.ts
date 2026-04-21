import { PermintaanSewa } from "../PermintaanSewa/PermintaanSewa"
import { PenawaranHargaType } from "./PenawaranHarga.types"

export class PenawaranHarga {

    constructor(public props: PenawaranHargaType) { }

    static generateHarga(permintaan: PermintaanSewa) {

        const hargaPerHari = 1000000

        const totalHarga =
            permintaan.getDurasi() * hargaPerHari

        return new PenawaranHarga({
            idPenawaran: crypto.randomUUID(),
            totalHarga,
            status: "MENUNGGU"
        })
    }

    validasi(adminId: string) {
        this.props.status = "DISETUJUI"
    }

}