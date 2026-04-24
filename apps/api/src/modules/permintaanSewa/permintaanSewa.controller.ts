import { Request, Response } from "express";
import { PermintaanRepository } from "./permintaanSewa.repository";
import { PermintaanService } from "./permintaanSewa.service";
import { PembayaranRepository } from "../pembayaran/pembayaran.repository";

export class PermintaanController {
    private repository = new PermintaanRepository();
    private service = new PermintaanService();

    async getAll(req: Request, res: Response) {
        try {
            const data = await this.repository.findAll();
            res.json({ success: true, data });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = await this.repository.findById(id as string);
            if (!data) return res.status(404).json({ success: false, message: "Permintaan tidak ditemukan" });
            res.json({ success: true, data });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const data = req.body;
            const saved = await this.repository.save(data);
            res.status(201).json({ success: true, data: saved });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    private pembayaranRepo = new PembayaranRepository();

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = req.body;
            data.idPermintaan = id as string;
            const saved = await this.repository.save(data);

            // Auto-create invoice when status changes to "Menunggu Pembayaran"
            if (data.status === 'Menunggu Pembayaran') {
                const existing = await this.pembayaranRepo.findByPermintaanId(id as string);
                if (existing.length === 0) {
                    // Calculate total from mesin items: (harga - diskon) * qty * durasi
                    const total = (saved.mesin || []).reduce(
                        (acc: number, m: any) => acc + (m.harga - m.diskon) * m.qty * (saved.durasi || 1),
                        0
                    );
                    const tanggal = new Date().toLocaleDateString('id-ID', {
                        day: '2-digit', month: 'long', year: 'numeric'
                    });
                    await this.pembayaranRepo.create({
                        idPermintaan: id as string,
                        total,
                        tanggal,
                        status: 'Belum Dibayar',
                        bukti: ''
                    });
                }
            }

            res.json({ success: true, data: saved });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async generatePenawaran(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const penawaran = await this.service.generatePenawaran(id as string);
            res.json({ success: true, data: penawaran });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    async getArchive(req: Request, res: Response) {
        try {
            const data = await this.repository.findArchive();
            res.json({ success: true, data });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async getDispatchQueue(req: Request, res: Response) {
        try {
            const data = await this.repository.findDispatchQueue();
            res.json({ success: true, data });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async getReports(req: Request, res: Response) {
        try {
            const data = await this.repository.findAll();
            const reports = data.map(req => ({
                id: req.idPermintaan,
                pelanggan: req.pelanggan,
                tanggal: req.tanggalFormat,
                unit: (req.mesin || []).map(m => m.mesin?.namaMesin).join(", "),
                nilai: (req.mesin || []).reduce((acc, m) => acc + (m.harga - m.diskon) * m.qty, 0),
                statusBayar: req.status === "Lunas" ? "Lunas" : "Pending",
                sopir: "N/A" // Placeholder as it's not in the main request type
            }));
            res.json({ success: true, data: reports });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async getByPelanggan(req: Request, res: Response) {
        try {
            const { name } = req.params;
            const data = await this.repository.findByPelanggan(decodeURIComponent(name as string));
            res.json({ success: true, data });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async getByUserId(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const data = await this.repository.findByUserId(userId as string);
            res.json({ success: true, data });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}
