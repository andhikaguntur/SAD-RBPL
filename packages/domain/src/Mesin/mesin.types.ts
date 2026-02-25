export type StatusMesin = "Tersedia" | "Dipesan" | "Sedang Dikirim" | "Disewa";

export interface mesinType {
    idMesin : number;
    namaMesin : string;
    status : StatusMesin; 
}