"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sale_controller_1 = require("../controllers/sale.controller");
const validateToken_1 = require("../middlewares/validateToken");
const validateSchema_1 = require("../middlewares/validateSchema");
const sale_schema_1 = require("../schemas/sale.schema");
const saleRouter = (0, express_1.Router)();
saleRouter.get("/sale", validateToken_1.validateHeaderToken, sale_controller_1.saleGETALL);
saleRouter.get("/sale/:id", validateToken_1.validateHeaderToken, sale_controller_1.saleGETBYID);
saleRouter.post("/sale", validateToken_1.validateHeaderToken, (0, validateSchema_1.validateSchema)(sale_schema_1.newSaleSchema), sale_controller_1.salePOST);
exports.default = saleRouter;
//# sourceMappingURL=sale.router.js.map