import { Request, Response } from "express";
import { AuditLogRepository } from "./auditLog.repository";

export class AuditLogController {
  private repository = new AuditLogRepository();

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
      const { entitasTarget, idTarget, aksi, keterangan } = req.body;
      const data = await this.repository.create({ entitasTarget, idTarget, aksi, keterangan });
      res.status(201).json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}
