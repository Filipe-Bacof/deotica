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
const product_repository_1 = __importDefault(require("../repositories/product.repository"));
const salesProducts_repository_1 = __importDefault(require("../repositories/salesProducts.repository"));
const validations_1 = require("../utils/validations");
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield product_repository_1.default.getAll();
        return result;
    });
}
function getById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!id) {
            throw {
                status: 401,
                message: "É preciso informar o ID para atualizar.",
            };
        }
        if (!(0, validations_1.isUUID)(id)) {
            throw {
                status: 422,
                message: "Este ID não é válido!",
            };
        }
        const result = yield product_repository_1.default.getById(id);
        return result;
    });
}
function insert(data, userID) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield product_repository_1.default.insert(Object.assign(Object.assign({}, data), { createdBy: userID }));
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
        if (!(0, validations_1.isUUID)(id)) {
            throw {
                status: 422,
                message: "Este ID não é válido!",
            };
        }
        const result = yield product_repository_1.default.edit(id, data);
        return result;
    });
}
function removeQuantityFromStock(id, quantidade) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!id) {
            throw {
                status: 401,
                message: "É preciso informar o ID para atualizar.",
            };
        }
        if (!(0, validations_1.isUUID)(id)) {
            throw {
                status: 422,
                message: "Este ID não é válido!",
            };
        }
        const product = yield product_repository_1.default.getById(id);
        let newQuantity;
        if (product.quantidade < quantidade) {
            newQuantity = 0;
            // Dessa forma não crasha o backend ao tentar decrementar quantidade maior do que tem em estoque, mas é um erro que precisa ser melhor tratado dependendo da regra de negócio, irei alinhar isso com a proprietária.
            // throw {
            //   status: 409,
            //   message:
            //     "Você está tentando deletar mais itens do que a quantidade disponível em estoque",
            // };
        }
        else {
            newQuantity = product.quantidade - quantidade;
        }
        const result = yield product_repository_1.default.updateQuantity(id, newQuantity);
        return result;
    });
}
function addQuantityFromStock(id, quantidade) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!id) {
            throw {
                status: 401,
                message: "É preciso informar o ID para atualizar.",
            };
        }
        if (!(0, validations_1.isUUID)(id)) {
            throw {
                status: 422,
                message: "Este ID não é válido!",
            };
        }
        const product = yield product_repository_1.default.getById(id);
        const newQuantity = product.quantidade + quantidade;
        const result = yield product_repository_1.default.updateQuantity(id, newQuantity);
        return result;
    });
}
function updateQuantity(id, quantidade) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!id) {
            throw {
                status: 401,
                message: "É preciso informar o ID para atualizar.",
            };
        }
        if (!(0, validations_1.isUUID)(id)) {
            throw {
                status: 422,
                message: "Este ID não é válido!",
            };
        }
        const result = yield product_repository_1.default.updateQuantity(id, quantidade);
        return result;
    });
}
function deleteProduct(id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!id) {
            throw {
                status: 401,
                message: "É preciso informar o ID para deletar.",
            };
        }
        if (!(0, validations_1.isUUID)(id)) {
            throw {
                status: 422,
                message: "Este ID não é válido!",
            };
        }
        const product = yield product_repository_1.default.getById(id);
        if (!product) {
            throw {
                status: 404,
                message: "Esse produto não foi encontrado",
            };
        }
        const sales = yield salesProducts_repository_1.default.countAllByProductId(id);
        if (sales !== 0) {
            throw {
                status: 409,
                message: sales === 1
                    ? "Não é possível deletar esse produto, pois foi efetuada 1 venda com ele."
                    : "Não é possível deletar esse produto, pois foram efetuadas ${sales} vendas com ele.",
            };
        }
        const result = yield product_repository_1.default.deleteProduct(id);
        return result;
    });
}
const productService = {
    getAll,
    getById,
    insert,
    edit,
    removeQuantityFromStock,
    addQuantityFromStock,
    updateQuantity,
    deleteProduct,
};
exports.default = productService;
//# sourceMappingURL=product.service.js.map