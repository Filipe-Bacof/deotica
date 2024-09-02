import { Router } from "express";
import {
  productGETALL,
  productGETBYID,
  productPOST,
  productPUT,
  productPATCHMINUS,
  productPATCHVALUE,
  productDELETE,
} from "../controllers/product.controller";
import { validateHeaderToken } from "../middlewares/validateToken";
import { validateSchema } from "../middlewares/validateSchema";
import { newProductSchema } from "../schemas/product.schema";

const productRouter = Router();

productRouter.get("/product", validateHeaderToken, productGETALL);

productRouter.get("/product/:id", validateHeaderToken, productGETBYID);

productRouter.post(
  "/product",
  validateHeaderToken,
  validateSchema(newProductSchema),
  productPOST
);

productRouter.put("/product/:id", validateHeaderToken, productPUT);

productRouter.patch(
  "/product/minus/:id",
  validateHeaderToken,
  productPATCHMINUS
);

productRouter.patch(
  "/product/count/:id",
  validateHeaderToken,
  productPATCHVALUE
);

productRouter.delete("/product/:id", validateHeaderToken, productDELETE);

export default productRouter;
