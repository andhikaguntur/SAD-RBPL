import { Request, Response } from "express";
import { AuthRepository } from "./auth.repository";

export class AuthController {
  private repository = new AuthRepository();

  async register(req: Request, res: Response) {
    try {
      const { name, email, phone, password } = req.body;
      const existing = await this.repository.findByEmail(email);
      if (existing) {
        return res.status(400).json({ success: false, message: "Email sudah terdaftar" });
      }

      const user = await this.repository.create({
        name,
        email,
        phone,
        password, // Simple for now, should be hashed in production
        role: "user"
      });

      res.status(201).json({ 
        success: true, 
        data: { id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role } 
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await this.repository.findByEmail(email);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ success: false, message: "Email atau password salah" });
      }

      res.json({ 
        success: true, 
        data: { id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role } 
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}
