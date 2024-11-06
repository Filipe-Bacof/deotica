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
exports.productDELETE = exports.productPATCHVALUE = exports.productPATCHPLUS = exports.productPATCHMINUS = exports.productPUT = exports.productPOST = exports.productGETBYID = exports.productGETALL = void 0;
const product_service_1 = __importDefault(require("../services/product.service"));
const token_1 = require("../utils/token");
function productGETALL(_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield product_service_1.default.getAll();
        res.status(200).send(result);
    });
}
exports.productGETALL = productGETALL;
function productGETBYID(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const result = yield product_service_1.default.getById(id);
        res.status(200).send(result);
    });
}
exports.productGETBYID = productGETBYID;
function productPOST(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = req.body;
        const { authorization } = req.headers;
        const { userID } = (0, token_1.getUserIDbyToken)(authorization);
        const result = yield product_service_1.default.insert(data, userID);
        res.status(200).send(result);
    });
}
exports.productPOST = productPOST;
function productPUT(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const data = req.body;
        const result = yield product_service_1.default.edit(id, data);
        res.status(200).send(result);
    });
}
exports.productPUT = productPUT;
function productPATCHMINUS(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const data = req.body;
        // Aqui é informado a quantidade para remover do banco!
        const result = yield product_service_1.default.removeQuantityFromStock(id, data.quantidade);
        res.status(200).send(result);
    });
}
exports.productPATCHMINUS = productPATCHMINUS;
function productPATCHPLUS(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const data = req.body;
        // Aqui é informado a quantidade para adcionar no banco!
        const result = yield product_service_1.default.addQuantityFromStock(id, data.quantidade);
        res.status(200).send(result);
    });
}
exports.productPATCHPLUS = productPATCHPLUS;
function productPATCHVALUE(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const data = req.body;
        // Aqui é informado a nova quantidade para alterar no banco!
        const result = yield product_service_1.default.updateQuantity(id, data.quantidade);
        res.status(200).send(result);
    });
}
exports.productPATCHVALUE = productPATCHVALUE;
function productDELETE(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const result = yield product_service_1.default.deleteProduct(id);
        res.status(200).send(result);
    });
}
exports.productDELETE = productDELETE;
//# sourceMappingURL=product.controller.js.map