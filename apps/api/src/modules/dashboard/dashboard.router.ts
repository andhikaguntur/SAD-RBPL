import { Router, RequestHandler } from "express";
import { DashboardController } from "./dashboard.controller";
import { SeedController } from "./seed.controller";

export const dashboardRouter: Router = Router();
const controller = new DashboardController();
const seedController = new SeedController();

dashboardRouter.get("/stats", controller.getStats.bind(controller) as RequestHandler);
dashboardRouter.get("/user/:pelanggan", controller.getUserStats.bind(controller) as RequestHandler);
dashboardRouter.post("/seed", seedController.run.bind(seedController) as RequestHandler);
