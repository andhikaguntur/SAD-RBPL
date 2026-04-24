import { Request, Response } from "express";
import { DashboardRepository } from "./dashboard.repository";

export class DashboardController {
  private repository = new DashboardRepository();

  async getStats(req: Request, res: Response) {
    try {
      const data = await this.repository.getStats();
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getUserStats(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = await this.repository.getUserStats(id as string);
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}
