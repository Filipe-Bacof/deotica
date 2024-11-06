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
exports.serviceOrderPUT = exports.serviceOrderPATCHSTATUS = exports.serviceOrderGETBYID = exports.serviceOrderGETINFO = exports.serviceOrderGETALL = void 0;
const serviceOrder_service_1 = __importDefault(require("../services/serviceOrder.service"));
function serviceOrderGETALL(_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield serviceOrder_service_1.default.getAll();
        res.status(200).send(result);
    });
}
exports.serviceOrderGETALL = serviceOrderGETALL;
function serviceOrderGETINFO(_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield serviceOrder_service_1.default.getInfo();
        res.status(200).send(result);
    });
}
exports.serviceOrderGETINFO = serviceOrderGETINFO;
function serviceOrderGETBYID(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const result = yield serviceOrder_service_1.default.getById(Number(id));
        res.status(200).send(result);
    });
}
exports.serviceOrderGETBYID = serviceOrderGETBYID;
function serviceOrderPATCHSTATUS(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const data = req.body;
        const result = yield serviceOrder_service_1.default.updateStatus(Number(id), data);
        res.status(200).send(result);
    });
}
exports.serviceOrderPATCHSTATUS = serviceOrderPATCHSTATUS;
function serviceOrderPUT(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const data = req.body;
        const result = yield serviceOrder_service_1.default.updateDataOS(Number(id), data);
        res.status(200).send(result);
    });
}
exports.serviceOrderPUT = serviceOrderPUT;
//# sourceMappingURL=serviceOrder.controller.js.map