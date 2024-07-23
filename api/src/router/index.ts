import { Router } from "express";
import authenticationRouter from "./auth.router";
import profileRouter from "./profile.router";

const router = Router();

router.use(authenticationRouter);
router.use(profileRouter);

export default router;
