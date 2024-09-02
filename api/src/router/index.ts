import { Router } from "express";
import authenticationRouter from "./auth.router";
import profileRouter from "./profile.router";
import clientRouter from "./client.router";
import paymentRouter from "./payment.router";
import promoEmailRouter from "./promoEmail.router";
import productRouter from "./product.router";
import saleRouter from "./sale.router";
import serviceOrderRouter from "./serviceOrder.router";

const router = Router();

router.use(authenticationRouter);
router.use(profileRouter);
router.use(clientRouter);
router.use(paymentRouter);
router.use(promoEmailRouter);
router.use(productRouter);
router.use(saleRouter);
router.use(serviceOrderRouter);

export default router;
