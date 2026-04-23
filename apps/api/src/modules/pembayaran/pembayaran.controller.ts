import { Request, Response } from "express";
import { PembayaranRepository } from "./pembayaran.repository";

export class PembayaranController {
  private repository = new PembayaranRepository();

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
      if (!data) return res.status(404).json({ success: false, message: "Pembayaran tidak ditemukan" });
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getByPermintaanId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = await this.repository.findByPermintaanId(id);
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async updateProof(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { bukti } = req.body;
      const data = await this.repository.updateProof(id, bukti);
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async updateStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const data = await this.repository.updateStatusWithSync(id, status);
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getByPelanggan(req: Request, res: Response) {
    try {
      const { name } = req.params;
      const data = await this.repository.findByPelanggan(decodeURIComponent(name));
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}
