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
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
function insert(data) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(data);
        return database_1.prisma.vendas.create({
            data: data,
        });
    });
}
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        return database_1.prisma.vendas.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                criador: {
                    select: {
                        id: true,
                        nome: true,
                        email: true,
                    },
                },
                ordemServico: {
                    include: {
                        criador: {
                            select: {
                                id: true,
                                nome: true,
                                email: true,
                            },
                        },
                    },
                },
                formaDePagamento: {
                    select: {
                        id: true,
                        descricao: true,
                    },
                },
                cliente: {
                    select: {
                        id: true,
                        nome: true,
                        genero: true,
                    },
                },
                vendasProdutos: {
                    include: {
                        produto: {
                            select: {
                                id: true,
                                nome: true,
                                quantidade: true,
                                preco: true,
                                status: true,
                                genero: true,
                            },
                        },
                    },
                },
            },
        });
    });
}
function getById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield database_1.prisma.vendas.findUnique({
            where: { id },
            include: {
                criador: {
                    select: {
                        id: true,
                        nome: true,
                        email: true,
                    },
                },
                ordemServico: {
                    include: {
                        criador: {
                            select: {
                                id: true,
                                nome: true,
                                email: true,
                            },
                        },
                    },
                },
                formaDePagamento: {
                    select: {
                        id: true,
                        descricao: true,
                    },
                },
                cliente: {
                    select: {
                        id: true,
                        nome: true,
                        genero: true,
                    },
                },
                vendasProdutos: {
                    include: {
                        produto: {
                            select: {
                                id: true,
                                nome: true,
                                quantidade: true,
                                preco: true,
                                status: true,
                                genero: true,
                            },
                        },
                    },
                },
            },
        });
        return result;
    });
}
function getByPaymentMethod(formaDePagamentoId) {
    return __awaiter(this, void 0, void 0, function* () {
        return database_1.prisma.vendas.findMany({
            where: { formaDePagamentoId },
            orderBy: { createdAt: "desc" },
            include: {
                criador: {
                    select: {
                        id: true,
                        nome: true,
                        email: true,
                    },
                },
                ordemServico: {
                    include: {
                        criador: {
                            select: {
                                id: true,
                                nome: true,
                                email: true,
                            },
                        },
                    },
                },
                formaDePagamento: {
                    select: {
                        id: true,
                        descricao: true,
                    },
                },
                cliente: {
                    select: {
                        id: true,
                        nome: true,
                        genero: true,
                    },
                },
                vendasProdutos: {
                    include: {
                        produto: {
                            select: {
                                id: true,
                                nome: true,
                                quantidade: true,
                                preco: true,
                                status: true,
                                genero: true,
                            },
                        },
                    },
                },
            },
        });
    });
}
function countSalesByPaymentMethod(formaDePagamentoId) {
    return __awaiter(this, void 0, void 0, function* () {
        return database_1.prisma.vendas.count({
            where: { formaDePagamentoId },
        });
    });
}
const saleRepository = {
    insert,
    getAll,
    getById,
    getByPaymentMethod,
    countSalesByPaymentMethod,
};
exports.default = saleRepository;
//# sourceMappingURL=sale.repository.js.map