"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const validateForgotPass_1 = __importDefault(require("../middlewares/validateForgotPass"));
const validateToken_1 = require("../middlewares/validateToken");
const validateSchema_1 = require("../middlewares/validateSchema");
const auth_schema_1 = require("../schemas/auth.schema");
const authRouter = (0, express_1.Router)();
authRouter.post("/signup", (0, validateSchema_1.validateSchema)(auth_schema_1.authRegisterSchema), validateToken_1.validateHeaderToken, auth_controller_1.signUp);
authRouter.post("/signin", auth_controller_1.signIn);
authRouter.post("/forgot", auth_controller_1.forgot);
authRouter.post("/newpass", validateForgotPass_1.default, auth_controller_1.newPass);
authRouter.get("/user/:id", validateToken_1.validateHeaderToken, auth_controller_1.getUserData);
exports.default = authRouter;
//# sourceMappingURL=auth.router.js.map