import "dotenv/config";
import express from "express";
import cors from "cors";
import { permintaanRouter } from "./modules/permintaanSewa/permintaanSewa.router";
import { mesinRouter } from "./modules/mesin/mesin.router";
import { pembayaranRouter } from "./modules/pembayaran/pembayaran.router";
import { pengirimanRouter } from "./modules/pengiriman/pengiriman.router";
import { auditLogRouter } from "./modules/auditLog/auditLog.router";
import { dashboardRouter } from "./modules/dashboard/dashboard.router";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/permintaan-sewa", permintaanRouter);
app.use("/api/mesin", mesinRouter);
app.use("/api/pembayaran", pembayaranRouter);
app.use("/api/pengiriman", pengirimanRouter);
app.use("/api/audit-log", auditLogRouter);
app.use("/api/dashboard", dashboardRouter);

app.listen(4000, () => {
  console.log("Backend running at http://localhost:4000");
});
