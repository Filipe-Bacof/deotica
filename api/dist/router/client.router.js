"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_controller_1 = require("../controllers/client.controller");
const validateToken_1 = require("../middlewares/validateToken");
const validateSchema_1 = require("../middlewares/validateSchema");
const client_schema_1 = require("../schemas/client.schema");
const clientRouter = (0, express_1.Router)();
clientRouter.get("/client", validateToken_1.validateHeaderToken, client_controller_1.clientGETALL);
clientRouter.get("/client/cpf/:cpf", validateToken_1.validateHeaderToken, client_controller_1.clientGETBYCPF);
clientRouter.get("/client/id/:id", validateToken_1.validateHeaderToken, client_controller_1.clientGETBYID);
clientRouter.post("/client", validateToken_1.validateHeaderToken, (0, validateSchema_1.validateSchema)(client_schema_1.newClientSchema), client_controller_1.clientPOST);
clientRouter.put("/client/:id", validateToken_1.validateHeaderToken, (0, validateSchema_1.validateSchema)(client_schema_1.editClientSchema), client_controller_1.clientPUT);
exports.default = clientRouter;
//# sourceMappingURL=client.router.js.map