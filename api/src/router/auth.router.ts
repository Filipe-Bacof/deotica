import { Router } from "express";
import {
  signIn,
  signUp,
  forgot,
  newPass,
  getUserData,
} from "../controllers/auth.controller";
import verifyTokenForgotPass from "../middlewares/validateForgotPass";
import { validateHeaderToken } from "../middlewares/validateToken";
import { validateSchema } from "../middlewares/validateSchema";
import { authRegisterSchema } from "../schemas/auth.schema";

const authRouter = Router();
authRouter.post(
  "/signup",
  validateSchema(authRegisterSchema),
  validateHeaderToken,
  signUp
);

authRouter.post("/signin", signIn);

authRouter.post("/forgot", forgot);

authRouter.post("/newpass", verifyTokenForgotPass, newPass);

authRouter.get("/user/:id", validateHeaderToken, getUserData);

export default authRouter;
