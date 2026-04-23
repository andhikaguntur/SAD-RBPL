import { Request, Response } from "express";
import { MesinRepository } from "./mesin.repository";
import { MesinService } from "./mesin.service";

export class MesinController {
    private repository = new MesinRepository();
    private service = new MesinService();

    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = await this.repository.findById(id as string);
            if (!data) return res.status(404).json({ success: false, message: "Mesin tidak ditemukan" });
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

    async updateStatus(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const updated = await this.service.ubahStatusMesin(id as string, status);
            res.json({ success: true, data: updated });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const data = await this.repository.findAll();
            res.json({ success: true, data });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}
