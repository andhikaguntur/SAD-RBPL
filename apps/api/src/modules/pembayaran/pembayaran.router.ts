import { Router, RequestHandler } from "express";
import { PembayaranController } from "./pembayaran.controller";

export const pembayaranRouter: Router = Router();
const controller = new PembayaranController();

pembayaranRouter.get("/", controller.getAll.bind(controller) as RequestHandler);
pembayaranRouter.get("/by-pelanggan/:name", controller.getByPelanggan.bind(controller) as RequestHandler);
pembayaranRouter.get("/by-user/:userId", controller.getByUserId.bind(controller) as RequestHandler);
pembayaranRouter.get("/permintaan/:id", controller.getByPermintaanId.bind(controller) as RequestHandler);
pembayaranRouter.get("/:id", controller.getById.bind(controller) as RequestHandler);
pembayaranRouter.patch("/:id/status", controller.updateStatus.bind(controller) as RequestHandler);
pembayaranRouter.patch("/:id/proof", controller.updateProof.bind(controller) as RequestHandler);
