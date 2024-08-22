import { Router } from "express";
import authenticationRouter from "./auth.router";
import profileRouter from "./profile.router";
import clientRouter from "./client.router";
import paymentRouter from "./payment.router";

const router = Router();

router.use(authenticationRouter);
router.use(profileRouter);
router.use(clientRouter);
router.use(paymentRouter);

export default router;
