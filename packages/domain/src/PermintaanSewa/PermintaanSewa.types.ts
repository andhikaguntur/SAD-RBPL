export type StatusPermintaan = "MENUNGGU" | "DIPROSES" | "DITOLAK";

export type PermintaanSewaType = {
    idPermintaan: string
    idMesin: string
    durasi: number
    lokasi: string
    status: StatusPermintaan
}