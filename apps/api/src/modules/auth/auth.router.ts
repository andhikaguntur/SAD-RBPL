import { Router, RequestHandler } from "express";
import { AuthController } from "./auth.controller";

export const authRouter: Router = Router();
const controller = new AuthController();

authRouter.post("/register", controller.register.bind(controller) as RequestHandler);
authRouter.post("/login", controller.login.bind(controller) as RequestHandler);
