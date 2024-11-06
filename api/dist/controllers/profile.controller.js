"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profilePUT = exports.profilePOST = exports.profileGETALL = void 0;
const profile_service_1 = __importDefault(require("../services/profile.service"));
function profileGETALL(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { populate } = req.query;
        const populateUser = populate ? true : false;
        const result = yield profile_service_1.default.getAll(populateUser);
        res.status(200).send(result);
    });
}
exports.profileGETALL = profileGETALL;
function profilePOST(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = req.body;
        const result = yield profile_service_1.default.insert(data);
        res.status(200).send(result);
    });
}
exports.profilePOST = profilePOST;
function profilePUT(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const data = req.body;
        const result = yield profile_service_1.default.edit(Number(id), data);
        res.status(200).send(result);
    });
}
exports.profilePUT = profilePUT;
//# sourceMappingURL=profile.controller.js.map