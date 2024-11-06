"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profile_controller_1 = require("../controllers/profile.controller");
const validateToken_1 = require("../middlewares/validateToken");
const validateSchema_1 = require("../middlewares/validateSchema");
const profile_schema_1 = require("../schemas/profile.schema");
const profileRouter = (0, express_1.Router)();
profileRouter.get("/profile", validateToken_1.validateHeaderToken, profile_controller_1.profileGETALL);
profileRouter.post("/profile", validateToken_1.validateHeaderToken, (0, validateSchema_1.validateSchema)(profile_schema_1.newProfileSchema), profile_controller_1.profilePOST);
profileRouter.put("/profile/:id", validateToken_1.validateHeaderToken, (0, validateSchema_1.validateSchema)(profile_schema_1.editProfileSchema), profile_controller_1.profilePUT);
exports.default = profileRouter;
//# sourceMappingURL=profile.router.js.map