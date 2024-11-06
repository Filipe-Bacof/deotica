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
exports.paymentDELETE = exports.paymentPUT = exports.paymentPOST = exports.paymentGETBYID = exports.paymentGETALL = void 0;
const payment_service_1 = __importDefault(require("../services/payment.service"));
const token_1 = require("../utils/token");
function paymentGETALL(_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield payment_service_1.default.getAll();
        res.status(200).send(result);
    });
}
exports.paymentGETALL = paymentGETALL;
function paymentGETBYID(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const result = yield payment_service_1.default.getOne(Number(id));
        res.status(200).send(result);
    });
}
exports.paymentGETBYID = paymentGETBYID;
function paymentPOST(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = req.body;
        const { authorization } = req.headers;
        const { userID } = (0, token_1.getUserIDbyToken)(authorization);
        const result = yield payment_service_1.default.insert(Object.assign(Object.assign({}, data), { createdBy: userID }));
        res.status(200).send(result);
    });
}
exports.paymentPOST = paymentPOST;
function paymentPUT(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const data = req.body;
        const result = yield payment_service_1.default.edit(Number(id), data);
        res.status(200).send(result);
    });
}
exports.paymentPUT = paymentPUT;
function paymentDELETE(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const result = yield payment_service_1.default.deletePayment(Number(id));
        res.status(200).send(result);
    });
}
exports.paymentDELETE = paymentDELETE;
//# sourceMappingURL=payment.controller.js.map