import { Router } from "express";
import {
  clientGETALL,
  clientGETBYCPF,
  clientGETBYID,
  clientPOST,
  clientPUT,
} from "../controllers/client.controller";
import { validateHeaderToken } from "../middlewares/validateToken";
import { validateSchema } from "../middlewares/validateSchema";
import { editClientSchema, newClientSchema } from "../schemas/client.schema";

const clientRouter = Router();

clientRouter.get("/client", validateHeaderToken, clientGETALL);

clientRouter.get("/client/cpf/:cpf", validateHeaderToken, clientGETBYCPF);

clientRouter.get("/client/id/:id", validateHeaderToken, clientGETBYID);

clientRouter.post(
  "/client",
  validateHeaderToken,
  validateSchema(newClientSchema),
  clientPOST
);

clientRouter.put(
  "/client/:id",
  validateHeaderToken,
  validateSchema(editClientSchema),
  clientPUT
);

export default clientRouter;
