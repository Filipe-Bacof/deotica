import { Router } from "express";
import { profileGETALL, profilePOST } from "../controllers/profile.controller";
import { validateHeaderToken } from "../middlewares/validateToken";

const profileRouter = Router();

profileRouter.get("/profile", validateHeaderToken, profileGETALL);

profileRouter.post("/profile", validateHeaderToken, profilePOST);

export default profileRouter;
