import { PermintaanSewaType, StatusPermintaan } from "@domain/PermintaanSewa/PermintaanSewa.types"
import { PrismaClient } from "../../generated/prisma"

const prisma = new PrismaClient({})

export class PermintaanRepository {

    async findById(id: string): Promise<PermintaanSewaType | null> {
        const data = await prisma.permintaanSewa.findUnique({
            where: { idPermintaan: id }
        })
        if (!data) return null;

        return {
            idPermintaan: data.idPermintaan,
            idMesin: String(data.idMesin), // Cast back to string as domain type expects string currently
            durasi: data.durasi,
            lokasi: data.lokasi,
            status: data.status as StatusPermintaan
        }
    }

    async save(data: PermintaanSewaType): Promise<PermintaanSewaType> {
        const saved = await prisma.permintaanSewa.upsert({
            where: { idPermintaan: data.idPermintaan },
            update: {
                idMesin: Number(data.idMesin),
                durasi: data.durasi,
                lokasi: data.lokasi,
                status: data.status
            },
            create: {
                idPermintaan: data.idPermintaan,
                idMesin: Number(data.idMesin),
                durasi: data.durasi,
                lokasi: data.lokasi,
                status: data.status
            }
        })
        return {
            idPermintaan: saved.idPermintaan,
            idMesin: String(saved.idMesin),
            durasi: saved.durasi,
            lokasi: saved.lokasi,
            status: saved.status as StatusPermintaan
        }
    }

    async findAll(): Promise<PermintaanSewaType[]> {
        const data = await prisma.permintaanSewa.findMany()
        return data.map(d => ({
            idPermintaan: d.idPermintaan,
            idMesin: String(d.idMesin),
            durasi: d.durasi,
            lokasi: d.lokasi,
            status: d.status as StatusPermintaan
        }))
    }
}