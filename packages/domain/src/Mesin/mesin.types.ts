export type StatusMesin = "Tersedia" | "Disewa" | "Perbaikan" | "Dipesan" | "Sedang Dikirim";

export interface mesinType {
    idMesin: string; // misal "MSN-501"
    namaMesin: string;
    kapasitas: string;
    status: StatusMesin;
    lokasi: string;
    lastService?: Date | null;
    pelanggan?: string | null;
}