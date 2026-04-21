import { Router, RequestHandler } from "express";
import { PermintaanController } from "./permintaanSewa.controller";

export const permintaanRouter: Router = Router();
const controller = new PermintaanController();

permintaanRouter.get("/", controller.getAll.bind(controller) as RequestHandler);
permintaanRouter.get("/:id", controller.getById.bind(controller) as RequestHandler);
permintaanRouter.post("/", controller.create.bind(controller) as RequestHandler);
permintaanRouter.post("/:id/penawaran", controller.generatePenawaran.bind(controller) as RequestHandler);
