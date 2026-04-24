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

  async create(req: Request, res: Response) {
    try {
      const { idPermintaan, sopir, status, tanggalKirim } = req.body;
      const data = await this.repository.create({
        idPermintaan,
        sopir,
        status,
        tanggalKirim: tanggalKirim || new Date().toISOString()
      });
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = await this.repository.findById(id as string);
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
      const data = await this.repository.updateStatus(id as string, status);
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getDeliveryTracks(req: Request, res: Response) {
    try {
      const data = await this.repository.findAll();
      const tracks = data.map(d => ({
        id: d.id,
        pelanggan: d.permintaan?.pelanggan || "N/A",
        sopir: d.sopir,
        kontak: "N/A",
        plat: "N/A",
        berangkatAt: d.tanggalKirim,
        status: d.status === "Dikirim" ? "OTW" : "DISEWA",
        items: d.idPermintaan,
        lastLocation: d.status === "Dikirim" ? "On Road" : "At Destination",
        progress: d.status === "Dikirim" ? 50 : 100,
        detailItems: []
      }));
      res.json({ success: true, data: tracks });
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
