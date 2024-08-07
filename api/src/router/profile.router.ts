import { Router } from "express";
import {
  profileGETALL,
  profilePOST,
  profilePUT,
} from "../controllers/profile.controller";
import { validateHeaderToken } from "../middlewares/validateToken";

const profileRouter = Router();

profileRouter.get("/profile", validateHeaderToken, profileGETALL);

profileRouter.post("/profile", validateHeaderToken, profilePOST);

profileRouter.put("/profile/:id", validateHeaderToken, profilePUT);

export default profileRouter;
