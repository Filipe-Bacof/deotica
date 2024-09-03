import { Router } from "express";
import {
  productGETALL,
  productGETBYID,
  productPOST,
  productPUT,
  productPATCHMINUS,
  productPATCHPLUS,
  productPATCHVALUE,
  productDELETE,
} from "../controllers/product.controller";
import { validateHeaderToken } from "../middlewares/validateToken";
import { validateSchema } from "../middlewares/validateSchema";
import {
  editProductSchema,
  newProductSchema,
  updateQuantityProductSchema,
} from "../schemas/product.schema";

const productRouter = Router();

productRouter.get("/product", validateHeaderToken, productGETALL);

productRouter.get("/product/:id", validateHeaderToken, productGETBYID);

productRouter.post(
  "/product",
  validateHeaderToken,
  validateSchema(newProductSchema),
  productPOST
);

productRouter.put(
  "/product/:id",
  validateHeaderToken,
  validateSchema(editProductSchema),
  productPUT
);

productRouter.patch(
  "/product/minus/:id",
  validateHeaderToken,
  validateSchema(updateQuantityProductSchema),
  productPATCHMINUS
);

productRouter.patch(
  "/product/plus/:id",
  validateHeaderToken,
  validateSchema(updateQuantityProductSchema),
  productPATCHPLUS
);

productRouter.patch(
  "/product/count/:id",
  validateHeaderToken,
  validateSchema(updateQuantityProductSchema),
  productPATCHVALUE
);

productRouter.delete("/product/:id", validateHeaderToken, productDELETE);

export default productRouter;
