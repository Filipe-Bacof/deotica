import { Router } from "express";
import {
  promoEmailGETALL,
  promoEmailPOST,
} from "../controllers/promoEmail.controller";
import { validateHeaderToken } from "../middlewares/validateToken";
import { validateSchema } from "../middlewares/validateSchema";
import { promoEmailSchema } from "../schemas/promoEmail.schema";

const promoEmailRouter = Router();

// Qualquer um pode chamar o endpoint para criar um registro no banco
// Mas só usuários autenticados podem ver a lista

promoEmailRouter.get("/promoEmail", validateHeaderToken, promoEmailGETALL);

promoEmailRouter.post(
  "/promoEmail",
  validateSchema(promoEmailSchema),
  promoEmailPOST
);

export default promoEmailRouter;