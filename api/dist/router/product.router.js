"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("../controllers/product.controller");
const validateToken_1 = require("../middlewares/validateToken");
const validateSchema_1 = require("../middlewares/validateSchema");
const product_schema_1 = require("../schemas/product.schema");
const productRouter = (0, express_1.Router)();
productRouter.get("/product", validateToken_1.validateHeaderToken, product_controller_1.productGETALL);
productRouter.get("/product/:id", validateToken_1.validateHeaderToken, product_controller_1.productGETBYID);
productRouter.post("/product", validateToken_1.validateHeaderToken, (0, validateSchema_1.validateSchema)(product_schema_1.newProductSchema), product_controller_1.productPOST);
productRouter.put("/product/:id", validateToken_1.validateHeaderToken, (0, validateSchema_1.validateSchema)(product_schema_1.editProductSchema), product_controller_1.productPUT);
productRouter.patch("/product/minus/:id", validateToken_1.validateHeaderToken, (0, validateSchema_1.validateSchema)(product_schema_1.updateQuantityProductSchema), product_controller_1.productPATCHMINUS);
productRouter.patch("/product/plus/:id", validateToken_1.validateHeaderToken, (0, validateSchema_1.validateSchema)(product_schema_1.updateQuantityProductSchema), product_controller_1.productPATCHPLUS);
productRouter.patch("/product/count/:id", validateToken_1.validateHeaderToken, (0, validateSchema_1.validateSchema)(product_schema_1.updateQuantityProductSchema), product_controller_1.productPATCHVALUE);
productRouter.delete("/product/:id", validateToken_1.validateHeaderToken, product_controller_1.productDELETE);
exports.default = productRouter;
//# sourceMappingURL=product.router.js.map