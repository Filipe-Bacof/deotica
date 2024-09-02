import { Router } from "express";
import {
  serviceOrderGETALL,
  serviceOrderGETBYID,
} from "../controllers/serviceOrder.controller";
import { validateHeaderToken } from "../middlewares/validateToken";

const serviceOrderRouter = Router();

serviceOrderRouter.get(
  "/serviceOrder",
  validateHeaderToken,
  serviceOrderGETALL
);

serviceOrderRouter.get(
  "/serviceOrder/:id",
  validateHeaderToken,
  serviceOrderGETBYID
);

export default serviceOrderRouter;
