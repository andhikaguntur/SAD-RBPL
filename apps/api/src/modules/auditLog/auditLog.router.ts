import { Router, RequestHandler } from "express";
import { AuditLogController } from "./auditLog.controller";

export const auditLogRouter: Router = Router();
const controller = new AuditLogController();

auditLogRouter.get("/", controller.getAll.bind(controller) as RequestHandler);
auditLogRouter.post("/", controller.create.bind(controller) as RequestHandler);
