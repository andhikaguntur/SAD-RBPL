import { AuditLogType } from "@domain/AuditLog/AuditLog.types";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL
});

export class AuditLogRepository {
  async findAll(): Promise<AuditLogType[]> {
    const data = await prisma.auditLog.findMany({
      orderBy: { timestamp: "desc" }
    });
    return data.map(d => ({
      idLog: d.idLog,
      entitasTarget: d.entitasTarget,
      idTarget: d.idTarget,
      aksi: d.aksi,
      keterangan: d.keterangan,
      timestamp: d.timestamp
    }));
  }

  async create(data: Omit<AuditLogType, "idLog" | "timestamp">): Promise<AuditLogType> {
    const d = await prisma.auditLog.create({
      data: {
        entitasTarget: data.entitasTarget,
        idTarget: data.idTarget,
        aksi: data.aksi,
        keterangan: data.keterangan
      }
    });
    return {
      idLog: d.idLog,
      entitasTarget: d.entitasTarget,
      idTarget: d.idTarget,
      aksi: d.aksi,
      keterangan: d.keterangan,
      timestamp: d.timestamp
    };
  }
}
