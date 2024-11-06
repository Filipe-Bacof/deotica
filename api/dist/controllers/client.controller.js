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
exports.clientPUT = exports.clientPOST = exports.clientGETBYID = exports.clientGETBYCPF = exports.clientGETALL = void 0;
const client_service_1 = __importDefault(require("../services/client.service"));
const token_1 = require("../utils/token");
function clientGETALL(_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield client_service_1.default.getAll();
        res.status(200).send(result);
    });
}
exports.clientGETALL = clientGETALL;
function clientGETBYCPF(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { cpf } = req.params;
        const result = yield client_service_1.default.getByCpf(cpf);
        res.status(200).send(result);
    });
}
exports.clientGETBYCPF = clientGETBYCPF;
function clientGETBYID(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const result = yield client_service_1.default.getById(id);
        res.status(200).send(result);
    });
}
exports.clientGETBYID = clientGETBYID;
function clientPOST(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = req.body;
        const { authorization } = req.headers;
        const { userID } = (0, token_1.getUserIDbyToken)(authorization);
        const result = yield client_service_1.default.insert(data, userID);
        res.status(200).send(result);
    });
}
exports.clientPOST = clientPOST;
function clientPUT(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const data = req.body;
        const result = yield client_service_1.default.edit(id, data);
        res.status(200).send(result);
    });
}
exports.clientPUT = clientPUT;
//# sourceMappingURL=client.controller.js.map