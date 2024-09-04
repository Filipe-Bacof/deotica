import { Router } from "express";
import {
  serviceOrderGETALL,
  serviceOrderGETBYID,
  serviceOrderPATCHSTATUS,
} from "../controllers/serviceOrder.controller";
import { validateHeaderToken } from "../middlewares/validateToken";
import { validateSchema } from "../middlewares/validateSchema";
import { updateServiceOrderStatusSchema } from "../schemas/serviceOrder.schema";

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

serviceOrderRouter.patch(
  "/serviceOrder/:id",
  validateHeaderToken,
  validateSchema(updateServiceOrderStatusSchema),
  serviceOrderPATCHSTATUS
);

export default serviceOrderRouter;
