import { Router } from "express";
import {
  paymentGETALL,
  paymentPOST,
  paymentPUT,
  paymentDELETE,
} from "../controllers/payment.controller";
import { validateHeaderToken } from "../middlewares/validateToken";
import { validateSchema } from "../middlewares/validateSchema";
import { newPaymentMethodSchema } from "../schemas/payment.schema";

const paymentRouter = Router();

paymentRouter.get("/payment", validateHeaderToken, paymentGETALL);

paymentRouter.post(
  "/payment",
  validateHeaderToken,
  validateSchema(newPaymentMethodSchema),
  paymentPOST
);

paymentRouter.put("/payment/:id", validateHeaderToken, paymentPUT);

paymentRouter.delete("/payment/:id", validateHeaderToken, paymentDELETE);

export default paymentRouter;
