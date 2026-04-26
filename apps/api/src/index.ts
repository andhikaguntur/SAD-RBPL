import "dotenv/config";
import express from "express";
import cors from "cors";
import { permintaanRouter } from "./modules/permintaanSewa/permintaanSewa.router";
import { mesinRouter } from "./modules/mesin/mesin.router";
import { pembayaranRouter } from "./modules/pembayaran/pembayaran.router";
import { pengirimanRouter } from "./modules/pengiriman/pengiriman.router";
import { auditLogRouter } from "./modules/auditLog/auditLog.router";
import { dashboardRouter } from "./modules/dashboard/dashboard.router";
import { authRouter } from "./modules/auth/auth.router";
import { PermintaanController } from "./modules/permintaanSewa/permintaanSewa.controller";
import { AuditLogController } from "./modules/auditLog/auditLog.controller";
import { PengirimanController } from "./modules/pengiriman/pengiriman.controller";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/permintaan-sewa", permintaanRouter);
app.use("/api/mesin", mesinRouter);
app.use("/api/pembayaran", pembayaranRouter);
app.use("/api/pengiriman", pengirimanRouter);
app.use("/api/audit-log", auditLogRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/auth", authRouter);

// Sugar routes for Web Manager compatibility
const permintaanController = new PermintaanController();
const auditLogController = new AuditLogController();
const pengirimanController = new PengirimanController();

app.get("/api/po-archive", permintaanController.getArchive.bind(permintaanController) as any);
app.get("/api/dispatch-queue", permintaanController.getDispatchQueue.bind(permintaanController) as any);
app.get("/api/logs", auditLogController.getAll.bind(auditLogController) as any);
app.get("/api/reports", permintaanController.getReports.bind(permintaanController) as any);
app.get("/api/delivery-tracks", pengirimanController.getDeliveryTracks.bind(pengirimanController) as any);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
// Trigger restart
