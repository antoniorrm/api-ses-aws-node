import { Router } from "express";
import EmailController from "./controllers/EmailController";

const routes = Router();

routes.post("/email", EmailController.sendEmailAws);
routes.post("/email/template", EmailController.sendEmailAws);

export default routes;
