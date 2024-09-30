import { Router } from "express";
import {
  paymentGETALL,
  paymentGETBYID,
  paymentPOST,
  paymentPUT,
  paymentDELETE,
} from "../controllers/payment.controller";
import { validateHeaderToken } from "../middlewares/validateToken";
import { validateSchema } from "../middlewares/validateSchema";
import { newPaymentMethodSchema } from "../schemas/payment.schema";

const paymentRouter = Router();

paymentRouter.get("/payment", validateHeaderToken, paymentGETALL);

paymentRouter.get("/payment/:id", validateHeaderToken, paymentGETBYID);

paymentRouter.post(
  "/payment",
  validateHeaderToken,
  validateSchema(newPaymentMethodSchema),
  paymentPOST
);

paymentRouter.put(
  "/payment/:id",
  validateHeaderToken,
  validateSchema(newPaymentMethodSchema), // Como é o mesmo corpo de requisição informado nos dois não tem problemas utilizar o mesmo schema
  paymentPUT
);

paymentRouter.delete("/payment/:id", validateHeaderToken, paymentDELETE);

export default paymentRouter;
