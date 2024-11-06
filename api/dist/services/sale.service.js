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
const sale_repository_1 = __importDefault(require("../repositories/sale.repository"));
const validations_1 = require("../utils/validations");
const salesProducts_service_1 = __importDefault(require("./salesProducts.service"));
const product_service_1 = __importDefault(require("./product.service"));
const serviceOrder_service_1 = __importDefault(require("./serviceOrder.service"));
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield sale_repository_1.default.getAll();
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
        const result = yield sale_repository_1.default.getById(id);
        if (!result) {
            throw {
                status: 404,
                message: "Essa venda não foi encontrada",
            };
        }
        return result;
    });
}
function insert(data, userID) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const venda = yield sale_repository_1.default.insert(Object.assign(Object.assign({}, data.venda), { createdBy: userID }));
            const produtos = yield Promise.all(data.produtos.map((product) => salesProducts_service_1.default.insert({
                vendaId: venda.id,
                produtoId: product.id,
                preco: product.preco,
                quantidade: product.quantidade,
            })));
            console.log("✅ Produtos de cada venda informados com sucesso!");
            console.log(produtos);
            const atualizados = [];
            const errosAtualizar = [];
            const quantidades = yield Promise.all(data.produtos.map((product) => product_service_1.default
                .removeQuantityFromStock(product.id, product.quantidade)
                .then((atualizar) => {
                atualizados.push(atualizar);
            })
                .catch((error) => {
                console.error(`Erro ao remover quantidade do produto com id ${product.id}`);
                console.error(error);
                errosAtualizar.push(error);
            })));
            console.log("✅ Quantidades de cada produto decrementadas com sucesso!");
            console.log(quantidades);
            let ordemServico = null;
            if (data.ordemServico) {
                try {
                    const ordemDeServico = yield serviceOrder_service_1.default.insert(Object.assign(Object.assign({}, data.ordemServico), { vendaId: venda.id, clienteId: venda.clienteId, createdBy: userID }));
                    console.log("✅ Ordem de serviço criada com sucesso!");
                    console.log(ordemDeServico);
                    ordemServico = ordemDeServico;
                }
                catch (error) {
                    console.log(error);
                    ordemServico = error;
                }
            }
            return Object.assign(Object.assign({ venda,
                produtos }, (ordemServico && { ordemServico })), { atualizarQuantidades: {
                    atualizados,
                    erros: errosAtualizar.length > 0 ? errosAtualizar : null,
                } });
        }
        catch (error) {
            console.error("Erro inesperado:", error);
            throw {
                status: 400,
                message: "Erro inesperado!",
            };
        }
    });
}
const saleService = {
    getAll,
    getById,
    insert,
};
exports.default = saleService;
//# sourceMappingURL=sale.service.js.map