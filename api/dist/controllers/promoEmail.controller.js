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
exports.promoEmailSendSimpleMessage = exports.promoEmailIsClient = exports.promoEmailPATCH = exports.promoEmailPOST = exports.promoEmailGETALL = void 0;
const promoEmail_service_1 = __importDefault(require("../services/promoEmail.service"));
function promoEmailGETALL(_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield promoEmail_service_1.default.getAll();
        res.status(200).send(result);
    });
}
exports.promoEmailGETALL = promoEmailGETALL;
function promoEmailPOST(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = req.body;
        const result = yield promoEmail_service_1.default.insert(data);
        res.status(200).send(result);
    });
}
exports.promoEmailPOST = promoEmailPOST;
function promoEmailPATCH(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = req.body;
        const result = yield promoEmail_service_1.default.desactivate(data.email);
        res.status(200).send(result);
    });
}
exports.promoEmailPATCH = promoEmailPATCH;
function promoEmailIsClient(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = req.body;
        const result = yield promoEmail_service_1.default.isClient(data.email);
        res.status(200).send(result);
    });
}
exports.promoEmailIsClient = promoEmailIsClient;
function promoEmailSendSimpleMessage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = req.body;
        const result = yield promoEmail_service_1.default.sendSimpleMessageToEmailList(data);
        res.status(200).send(result);
    });
}
exports.promoEmailSendSimpleMessage = promoEmailSendSimpleMessage;
//# sourceMappingURL=promoEmail.controller.js.map