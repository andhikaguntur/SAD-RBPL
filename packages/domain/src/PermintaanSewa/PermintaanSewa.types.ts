export type StatusPermintaan = string;

export type PermintaanMesinType = {
  idPermintaan: string;
  idMesin: string;
  qty: number;
  harga: number;
  diskon: number;
  mesin?: any;
}

export type PermintaanSewaType = {
    idPermintaan: string
    userId?: string
    pelanggan: string
    lokasi: string
    durasi: number
    status: StatusPermintaan
    tanggalFormat: string
    mesin?: PermintaanMesinType[]
}