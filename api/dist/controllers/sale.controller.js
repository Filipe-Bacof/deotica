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
exports.salePOST = exports.saleGETBYID = exports.saleGETALL = void 0;
const sale_service_1 = __importDefault(require("../services/sale.service"));
const token_1 = require("../utils/token");
function saleGETALL(_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield sale_service_1.default.getAll();
        res.status(200).send(result);
    });
}
exports.saleGETALL = saleGETALL;
function saleGETBYID(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const result = yield sale_service_1.default.getById(id);
        res.status(200).send(result);
    });
}
exports.saleGETBYID = saleGETBYID;
function salePOST(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = req.body;
        const { authorization } = req.headers;
        const { userID } = (0, token_1.getUserIDbyToken)(authorization);
        const result = yield sale_service_1.default.insert(data, userID);
        res.status(200).send(result);
    });
}
exports.salePOST = salePOST;
//# sourceMappingURL=sale.controller.js.map