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
const payment_repository_1 = __importDefault(require("../repositories/payment.repository"));
const sale_repository_1 = __importDefault(require("../repositories/sale.repository"));
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield payment_repository_1.default.getAll();
        return result;
    });
}
function getOne(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield payment_repository_1.default.getOne(id);
        if (!result) {
            throw {
                status: 404,
                message: "Essa forma de pagamento não foi encontrada.",
            };
        }
        return result;
    });
}
function insert(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield payment_repository_1.default.insert(data);
        return result;
    });
}
function edit(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!id) {
            throw {
                status: 401,
                message: "É preciso informar o ID para atualizar.",
            };
        }
        const result = yield payment_repository_1.default.edit(id, data);
        return result;
    });
}
function deletePayment(id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!id) {
            throw {
                status: 401,
                message: "É preciso informar o ID para atualizar.",
            };
        }
        const sales = yield sale_repository_1.default.countSalesByPaymentMethod(id);
        if (sales !== 0) {
            throw {
                status: 409,
                message: sales === 1
                    ? "Não é possível deletar essa forma de pagamento, pois foi efetuada 1 venda nessa forma de pagamento."
                    : `Não é possível deletar essa forma de pagamento, pois foram efetuadas ${sales} vendas nessa forma de pagamento.`,
            };
        }
        const result = yield payment_repository_1.default.deletePayment(id);
        return result;
    });
}
const paymentService = { getAll, getOne, insert, edit, deletePayment };
exports.default = paymentService;
//# sourceMappingURL=payment.service.js.map