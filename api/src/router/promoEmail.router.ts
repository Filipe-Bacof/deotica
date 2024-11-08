import { Router } from "express";
import {
  promoEmailGETALL,
  promoEmailPOST,
  promoEmailPATCH,
  promoEmailIsClient,
  promoEmailSendSimpleMessage,
} from "../controllers/promoEmail.controller";
import { validateHeaderToken } from "../middlewares/validateToken";
import { validateSchema } from "../middlewares/validateSchema";
import {
  isClientSchema,
  promoEmailDesactivateSchema,
  promoEmailSchema,
  promoEmailSendSimpleMessageSchema,
} from "../schemas/promoEmail.schema";

const promoEmailRouter = Router();

// Qualquer um pode chamar o endpoint para criar um registro no banco
// Mas só usuários autenticados podem ver a lista

promoEmailRouter.get("/promoEmail", validateHeaderToken, promoEmailGETALL);

promoEmailRouter.post(
  "/promoEmail",
  validateSchema(promoEmailSchema),
  promoEmailPOST
);

promoEmailRouter.patch(
  "/promoEmail",
  validateSchema(promoEmailDesactivateSchema),
  promoEmailPATCH
);

promoEmailRouter.post(
  "/promoEmail/isClient",
  validateHeaderToken,
  validateSchema(isClientSchema),
  promoEmailIsClient
);

promoEmailRouter.post(
  "/promoEmail/sendSimpleMessage",
  validateHeaderToken,
  validateSchema(promoEmailSendSimpleMessageSchema),
  promoEmailSendSimpleMessage
);

export default promoEmailRouter;
