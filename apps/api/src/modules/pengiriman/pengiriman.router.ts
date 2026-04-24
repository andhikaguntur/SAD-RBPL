import { Router, RequestHandler } from "express";
import { PengirimanController } from "./pengiriman.controller";

export const pengirimanRouter: Router = Router();
const controller = new PengirimanController();

pengirimanRouter.get("/", controller.getAll.bind(controller) as RequestHandler);
pengirimanRouter.post("/", controller.create.bind(controller) as RequestHandler);
pengirimanRouter.get("/:id", controller.getById.bind(controller) as RequestHandler);
pengirimanRouter.get("/by-pelanggan/:name", controller.getByPelanggan.bind(controller) as RequestHandler);
pengirimanRouter.get("/by-user/:userId", controller.getByUserId.bind(controller) as RequestHandler);
pengirimanRouter.patch("/:id/status", controller.updateStatus.bind(controller) as RequestHandler);
