import { Router } from "express";
import {
  saleGETALL,
  saleGETBYID,
  salePOST,
} from "../controllers/sale.controller";
import { validateHeaderToken } from "../middlewares/validateToken";
import { validateSchema } from "../middlewares/validateSchema";
import { newSaleSchema } from "../schemas/sale.schema";

const saleRouter = Router();

saleRouter.get("/sale", validateHeaderToken, saleGETALL);

saleRouter.get("/sale/:id", validateHeaderToken, saleGETBYID);

saleRouter.post(
  "/sale",
  validateHeaderToken,
  validateSchema(newSaleSchema),
  salePOST
);

export default saleRouter;
