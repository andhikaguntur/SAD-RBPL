import { PermintaanSewaType, StatusPermintaan } from "@domain/PermintaanSewa/PermintaanSewa.types"
import { PrismaClient } from "../../generated/prisma"

const prisma = new PrismaClient({
    accelerateUrl: process.env.DATABASE_URL
})

export class PermintaanRepository {
    async findById(id: string): Promise<PermintaanSewaType | null> {
        const data = await prisma.permintaanSewa.findUnique({
            where: { idPermintaan: id },
            include: { mesin: { include: { mesin: true } } }
        });
        if (!data) return null;

        return {
            idPermintaan: data.idPermintaan,
            pelanggan: data.pelanggan,
            durasi: data.durasi,
            lokasi: data.lokasi,
            status: data.status,
            tanggalFormat: data.tanggalFormat,
            mesin: data.mesin.map(m => ({
                idPermintaan: m.idPermintaan,
                idMesin: m.idMesin,
                qty: m.qty,
                harga: m.harga,
                diskon: m.diskon,
                mesin: m.mesin
            }))
        }
    }

    async save(data: PermintaanSewaType): Promise<PermintaanSewaType> {
        // Because updates to nested machines require atomic tx, we delete children and recreate
        const saved = await prisma.$transaction(async (tx) => {
            const id = data.idPermintaan || 'new';
            const existing = await tx.permintaanSewa.findUnique({ where: { idPermintaan: id } });

            let req;
            if (existing) {
                req = await tx.permintaanSewa.update({
                    where: { idPermintaan: id },
                    data: {
                        pelanggan: data.pelanggan !== undefined ? data.pelanggan : existing.pelanggan,
                        durasi: data.durasi !== undefined ? data.durasi : existing.durasi,
                        lokasi: data.lokasi !== undefined ? data.lokasi : existing.lokasi,
                        status: data.status !== undefined ? data.status : existing.status,
                        tanggalFormat: data.tanggalFormat !== undefined ? data.tanggalFormat : existing.tanggalFormat,
                    }
                });
            } else {
                req = await tx.permintaanSewa.create({
                    data: {
                        idPermintaan: data.idPermintaan,
                        pelanggan: data.pelanggan || "",
                        durasi: data.durasi || 1,
                        lokasi: data.lokasi || "Belum ditentukan",
                        status: data.status || "Menunggu",
                        tanggalFormat: data.tanggalFormat || "",
                    }
                });
            }

            if (data.mesin) {
                await tx.permintaanMesin.deleteMany({ where: { idPermintaan: req.idPermintaan } });
                await tx.permintaanMesin.createMany({
                    data: data.mesin.map(m => ({
                        idPermintaan: req.idPermintaan,
                        idMesin: m.idMesin,
                        qty: m.qty,
                        harga: m.harga,
                        diskon: m.diskon
                    }))
                });
            }

            return tx.permintaanSewa.findUnique({
                where: { idPermintaan: req.idPermintaan },
                include: { mesin: { include: { mesin: true } } }
            });
        });

        return this.findById(saved!.idPermintaan) as Promise<PermintaanSewaType>;
    }

    async findAll(): Promise<PermintaanSewaType[]> {
        const data = await prisma.permintaanSewa.findMany({
            include: { mesin: { include: { mesin: true } } }
        });
        
        return data.map(d => this.mapToType(d));
    }

    async findArchive(): Promise<PermintaanSewaType[]> {
        const data = await prisma.permintaanSewa.findMany({
            where: { status: { in: ['Lunas', 'Dikirim', 'Diterima', 'Selesai'] } },
            include: { mesin: { include: { mesin: true } } }
        });
        return data.map(d => this.mapToType(d));
    }

    async findDispatchQueue(): Promise<PermintaanSewaType[]> {
        const data = await prisma.permintaanSewa.findMany({
            where: { status: 'Lunas' },
            include: { mesin: { include: { mesin: true } } }
        });
        return data.map(d => this.mapToType(d));
    }

    private mapToType(d: any): PermintaanSewaType {
        return {
            idPermintaan: d.idPermintaan,
            pelanggan: d.pelanggan,
            durasi: d.durasi,
            lokasi: d.lokasi,
            status: d.status,
            tanggalFormat: d.tanggalFormat,
            mesin: d.mesin.map((m: any) => ({
                idPermintaan: m.idPermintaan,
                idMesin: m.idMesin,
                qty: m.qty,
                harga: m.harga,
                diskon: m.diskon,
                mesin: m.mesin
            }))
        };
    }
}