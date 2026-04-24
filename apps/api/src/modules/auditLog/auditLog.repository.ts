import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL
});

export interface AuditLogType {
  idLog: string;
  userId?: string | null;
  entitasTarget: string;
  idTarget: string;
  aksi: string;
  keterangan: string;
  timestamp: Date;
  user?: { name: string } | null;
}

export class AuditLogRepository {
  async findAll(): Promise<AuditLogType[]> {
    return await prisma.auditLog.findMany({
      include: { user: { select: { name: true } } },
      orderBy: { timestamp: 'desc' }
    }) as any;
  }

  async create(input: { userId?: string; entitasTarget: string; idTarget: string; aksi: string; keterangan: string }): Promise<AuditLogType> {
    return await prisma.auditLog.create({
      data: {
        userId: input.userId || null,
        entitasTarget: input.entitasTarget,
        idTarget: input.idTarget,
        aksi: input.aksi,
        keterangan: input.keterangan
      }
    }) as any;
  }
}
