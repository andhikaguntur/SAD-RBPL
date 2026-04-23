import { Request, Response } from "express";
import { PermintaanRepository } from "./permintaanSewa.repository";
import { PermintaanService } from "./permintaanSewa.service";

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
            const data = await this.repository.findById(id);
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

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = req.body;
            data.idPermintaan = id;
            const saved = await this.repository.save(data);
            res.json({ success: true, data: saved });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async generatePenawaran(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const penawaran = await this.service.generatePenawaran(id);
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
                unit: req.mesin.map(m => m.mesin?.namaMesin).join(", "),
                nilai: req.mesin.reduce((acc, m) => acc + (m.harga - m.diskon) * m.qty, 0),
                statusBayar: req.status === "Lunas" ? "Lunas" : "Pending",
                sopir: "N/A" // Placeholder as it's not in the main request type
            }));
            res.json({ success: true, data: reports });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}
