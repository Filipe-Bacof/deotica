"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payment_controller_1 = require("../controllers/payment.controller");
const validateToken_1 = require("../middlewares/validateToken");
const validateSchema_1 = require("../middlewares/validateSchema");
const payment_schema_1 = require("../schemas/payment.schema");
const paymentRouter = (0, express_1.Router)();
paymentRouter.get("/payment", validateToken_1.validateHeaderToken, payment_controller_1.paymentGETALL);
paymentRouter.get("/payment/:id", validateToken_1.validateHeaderToken, payment_controller_1.paymentGETBYID);
paymentRouter.post("/payment", validateToken_1.validateHeaderToken, (0, validateSchema_1.validateSchema)(payment_schema_1.newPaymentMethodSchema), payment_controller_1.paymentPOST);
paymentRouter.put("/payment/:id", validateToken_1.validateHeaderToken, (0, validateSchema_1.validateSchema)(payment_schema_1.newPaymentMethodSchema), // Como é o mesmo corpo de requisição informado nos dois não tem problemas utilizar o mesmo schema
payment_controller_1.paymentPUT);
paymentRouter.delete("/payment/:id", validateToken_1.validateHeaderToken, payment_controller_1.paymentDELETE);
exports.default = paymentRouter;
//# sourceMappingURL=payment.router.js.map