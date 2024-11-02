import { Router } from "express";
import {
  serviceOrderGETALL,
  serviceOrderGETINFO,
  serviceOrderGETBYID,
  serviceOrderPATCHSTATUS,
  serviceOrderPUT,
} from "../controllers/serviceOrder.controller";
import { validateHeaderToken } from "../middlewares/validateToken";
import { validateSchema } from "../middlewares/validateSchema";
import {
  editServiceOrderSchema,
  updateServiceOrderStatusSchema,
} from "../schemas/serviceOrder.schema";

const serviceOrderRouter = Router();

serviceOrderRouter.get(
  "/serviceOrder",
  validateHeaderToken,
  serviceOrderGETALL
);

serviceOrderRouter.get(
  "/serviceOrderInfoStatus",
  validateHeaderToken,
  serviceOrderGETINFO
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

serviceOrderRouter.put(
  "/serviceOrder/:id",
  validateHeaderToken,
  validateSchema(editServiceOrderSchema),
  serviceOrderPUT
);

export default serviceOrderRouter;
