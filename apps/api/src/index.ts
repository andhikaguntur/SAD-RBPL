import express from "express";
import cors from "cors";
import { permintaanRouter } from "./modules/permintaanSewa/permintaanSewa.router";
import { mesinRouter } from "./modules/mesin/mesin.router";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/permintaan-sewa", permintaanRouter);
app.use("/api/mesin", mesinRouter);

app.listen(4000, () => {
  console.log("Backend running at http://localhost:4000");
});
