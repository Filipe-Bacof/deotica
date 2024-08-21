import { Router } from "express";
import authenticationRouter from "./auth.router";
import profileRouter from "./profile.router";
import clientRouter from "./client.router";

const router = Router();

router.use(authenticationRouter);
router.use(profileRouter);
router.use(clientRouter);

export default router;
