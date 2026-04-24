import { PermintaanSewaType, StatusPermintaan } from "@domain/PermintaanSewa/PermintaanSewa.types"
import { PrismaClient } from "@prisma/client"
import { AuditLogRepository } from "../auditLog/auditLog.repository"

const prisma = new PrismaClient({
    accelerateUrl: process.env.DATABASE_URL
})

export class PermintaanRepository {
    private auditLog = new AuditLogRepository();

    async findById(id: string): Promise<PermintaanSewaType | null> {
        const data = await prisma.permintaanSewa.findUnique({
            where: { idPermintaan: id },
            include: { mesin: { include: { mesin: true } } }
        });
        if (!data) return null;

        return {
            idPermintaan: data.idPermintaan,
            userId: data.userId || undefined,
            pelanggan: data.pelanggan,
            durasi: data.durasi,
            lokasi: data.lokasi,
            status: data.status,
            tanggalFormat: data.tanggalFormat,
            mesin: data.mesin.map((m: any) => ({
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
        const saved = await prisma.$transaction(async (tx: any) => {
            const id = data.idPermintaan || 'new';
            const existing = await tx.permintaanSewa.findUnique({ where: { idPermintaan: id } });

            let req;
            if (existing) {
                req = await tx.permintaanSewa.update({
                    where: { idPermintaan: id },
                    data: {
                        userId: data.userId || existing.userId || null,
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
                        userId: data.userId || null,
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

        // Add Audit Log
        const isNew = data.idPermintaan === undefined || data.idPermintaan === 'new';
        await this.auditLog.create({
            entitasTarget: 'PermintaanSewa',
            idTarget: saved!.idPermintaan,
            aksi: isNew ? 'CREATE' : 'UPDATE',
            keterangan: isNew ? `Permintaan sewa baru dibuat untuk ${saved?.pelanggan}` : `Status permintaan ${saved?.idPermintaan} diubah menjadi ${saved?.status}`
        });

        return this.findById(saved!.idPermintaan) as Promise<PermintaanSewaType>;
    }

    async findAll(): Promise<PermintaanSewaType[]> {
        const data = await prisma.permintaanSewa.findMany({
            include: { mesin: { include: { mesin: true } } }
        });

        return data.map((d: any) => this.mapToType(d));
    }

    async findArchive(): Promise<PermintaanSewaType[]> {
        const data = await prisma.permintaanSewa.findMany({
            where: { status: { in: ['Lunas', 'Dikirim', 'Diterima', 'Selesai'] } },
            include: { mesin: { include: { mesin: true } } }
        });
        return data.map((d: any) => this.mapToType(d));
    }

    async findDispatchQueue(): Promise<PermintaanSewaType[]> {
        const data = await prisma.permintaanSewa.findMany({
            where: { status: 'Lunas' },
            include: { mesin: { include: { mesin: true } } }
        });
        return data.map((d: any) => this.mapToType(d));
    }

    async findByUserId(userId: string): Promise<PermintaanSewaType[]> {
        const data = await prisma.permintaanSewa.findMany({
            where: { userId },
            include: { mesin: { include: { mesin: true } } }
        });
        return data.map((d: any) => this.mapToType(d));
    }

    async findByPelanggan(pelanggan: string): Promise<PermintaanSewaType[]> {
        const data = await prisma.permintaanSewa.findMany({
            where: { pelanggan },
            include: { mesin: { include: { mesin: true } } }
        });
        return data.map((d: any) => this.mapToType(d));
    }

    private mapToType(d: any): PermintaanSewaType {
        return {
            idPermintaan: d.idPermintaan,
            userId: d.userId,
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
