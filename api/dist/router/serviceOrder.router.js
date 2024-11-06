"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const serviceOrder_controller_1 = require("../controllers/serviceOrder.controller");
const validateToken_1 = require("../middlewares/validateToken");
const validateSchema_1 = require("../middlewares/validateSchema");
const serviceOrder_schema_1 = require("../schemas/serviceOrder.schema");
const serviceOrderRouter = (0, express_1.Router)();
serviceOrderRouter.get("/serviceOrder", validateToken_1.validateHeaderToken, serviceOrder_controller_1.serviceOrderGETALL);
serviceOrderRouter.get("/serviceOrderInfoStatus", validateToken_1.validateHeaderToken, serviceOrder_controller_1.serviceOrderGETINFO);
serviceOrderRouter.get("/serviceOrder/:id", validateToken_1.validateHeaderToken, serviceOrder_controller_1.serviceOrderGETBYID);
serviceOrderRouter.patch("/serviceOrder/:id", validateToken_1.validateHeaderToken, (0, validateSchema_1.validateSchema)(serviceOrder_schema_1.updateServiceOrderStatusSchema), serviceOrder_controller_1.serviceOrderPATCHSTATUS);
serviceOrderRouter.put("/serviceOrder/:id", validateToken_1.validateHeaderToken, (0, validateSchema_1.validateSchema)(serviceOrder_schema_1.editServiceOrderSchema), serviceOrder_controller_1.serviceOrderPUT);
exports.default = serviceOrderRouter;
//# sourceMappingURL=serviceOrder.router.js.map