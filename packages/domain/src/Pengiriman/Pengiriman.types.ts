export type PengirimanType = {
    idPengiriman: number
    tanggalKirim: string
    status: "DIKIRIM" | "DIKEMBALIKAN"
    sopir: string
}