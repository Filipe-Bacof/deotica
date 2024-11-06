"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const promoEmail_controller_1 = require("../controllers/promoEmail.controller");
const validateToken_1 = require("../middlewares/validateToken");
const validateSchema_1 = require("../middlewares/validateSchema");
const promoEmail_schema_1 = require("../schemas/promoEmail.schema");
const promoEmailRouter = (0, express_1.Router)();
// Qualquer um pode chamar o endpoint para criar um registro no banco
// Mas só usuários autenticados podem ver a lista
promoEmailRouter.get("/promoEmail", validateToken_1.validateHeaderToken, promoEmail_controller_1.promoEmailGETALL);
promoEmailRouter.post("/promoEmail", (0, validateSchema_1.validateSchema)(promoEmail_schema_1.promoEmailSchema), promoEmail_controller_1.promoEmailPOST);
promoEmailRouter.patch("/promoEmail", (0, validateSchema_1.validateSchema)(promoEmail_schema_1.promoEmailDesactivateSchema), promoEmail_controller_1.promoEmailPATCH);
promoEmailRouter.post("/promoEmail/isClient", validateToken_1.validateHeaderToken, (0, validateSchema_1.validateSchema)(promoEmail_schema_1.isClientSchema), promoEmail_controller_1.promoEmailIsClient);
promoEmailRouter.post("/promoEmail/sendSimpleMessage", validateToken_1.validateHeaderToken, (0, validateSchema_1.validateSchema)(promoEmail_schema_1.promoEmailSendSimpleMessageSchema), promoEmail_controller_1.promoEmailSendSimpleMessage);
exports.default = promoEmailRouter;
//# sourceMappingURL=promoEmail.router.js.map