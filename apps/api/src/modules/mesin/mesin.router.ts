import { Router, RequestHandler } from "express";
import { MesinController } from "./mesin.controller";

export const mesinRouter: Router = Router();
const controller = new MesinController();

mesinRouter.get("/:id", controller.getById.bind(controller) as RequestHandler);
mesinRouter.post("/", controller.create.bind(controller) as RequestHandler);
mesinRouter.patch("/:id/status", controller.updateStatus.bind(controller) as RequestHandler);
