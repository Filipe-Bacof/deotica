import { Router } from "express";
import {
  profileGETALL,
  profilePOST,
  profilePUT,
} from "../controllers/profile.controller";
import { validateHeaderToken } from "../middlewares/validateToken";
import { validateSchema } from "../middlewares/validateSchema";
import { editProfileSchema, newProfileSchema } from "../schemas/profile.schema";

const profileRouter = Router();

profileRouter.get("/profile", validateHeaderToken, profileGETALL);

profileRouter.post(
  "/profile",
  validateHeaderToken,
  validateSchema(newProfileSchema),
  profilePOST
);

profileRouter.put(
  "/profile/:id",
  validateHeaderToken,
  validateSchema(editProfileSchema),
  profilePUT
);

export default profileRouter;
