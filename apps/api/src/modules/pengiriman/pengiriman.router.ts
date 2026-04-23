import { Router, RequestHandler } from "express";
import { PengirimanController } from "./pengiriman.controller";

export const pengirimanRouter: Router = Router();
const controller = new PengirimanController();

pengirimanRouter.get("/", controller.getAll.bind(controller) as RequestHandler);
pengirimanRouter.get("/:id", controller.getById.bind(controller) as RequestHandler);
pengirimanRouter.patch("/:id/status", controller.updateStatus.bind(controller) as RequestHandler);
