import { Request, Response } from "express";
import { PengirimanRepository } from "./pengiriman.repository";

export class PengirimanController {
  private repository = new PengirimanRepository();

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
      if (!data) return res.status(404).json({ success: false, message: "Pengiriman tidak ditemukan" });
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async updateStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const data = await this.repository.updateStatus(id, status);
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}
