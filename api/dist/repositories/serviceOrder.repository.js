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
        return database_1.prisma.ordemServico.create({
            data: data,
        });
    });
}
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        return database_1.prisma.ordemServico.findMany({
            orderBy: { updatedAt: "desc" },
            include: {
                cliente: {
                    select: {
                        id: true,
                        nome: true,
                        genero: true,
                    },
                },
                venda: {},
                criador: {
                    select: {
                        id: true,
                        nome: true,
                        email: true,
                    },
                },
            },
        });
    });
}
function getById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield database_1.prisma.ordemServico.findUnique({
            where: { id },
            include: {
                cliente: {
                    select: {
                        id: true,
                        nome: true,
                        genero: true,
                    },
                },
                venda: {},
                criador: {
                    select: {
                        id: true,
                        nome: true,
                        email: true,
                    },
                },
            },
        });
        return result;
    });
}
function getBySaleId(vendaId) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield database_1.prisma.ordemServico.findUnique({
            where: { vendaId },
            include: {
                cliente: {
                    select: {
                        id: true,
                        nome: true,
                        genero: true,
                    },
                },
                venda: {},
                criador: {
                    select: {
                        id: true,
                        nome: true,
                        email: true,
                    },
                },
            },
        });
        return result;
    });
}
function updateStatus(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield database_1.prisma.ordemServico.update({
            where: { id },
            data,
            include: {
                cliente: {
                    select: {
                        id: true,
                        nome: true,
                        genero: true,
                    },
                },
                venda: {},
                criador: {
                    select: {
                        id: true,
                        nome: true,
                        email: true,
                    },
                },
            },
        });
        return result;
    });
}
function updateDataOS(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield database_1.prisma.ordemServico.update({
            where: { id },
            data,
            include: {
                cliente: {
                    select: {
                        id: true,
                        nome: true,
                        genero: true,
                    },
                },
                venda: {},
                criador: {
                    select: {
                        id: true,
                        nome: true,
                        email: true,
                    },
                },
            },
        });
        return result;
    });
}
function countByStatus(concluido_1) {
    return __awaiter(this, arguments, void 0, function* (concluido, mesAtual = false) {
        const agora = new Date();
        const trintaDiasAtras = new Date();
        trintaDiasAtras.setDate(agora.getDate() - 30);
        return database_1.prisma.ordemServico.count({
            where: Object.assign({ concluido }, (mesAtual && {
                updatedAt: {
                    gte: trintaDiasAtras,
                },
            })),
        });
    });
}
const serviceOrderRepository = {
    insert,
    getAll,
    getById,
    getBySaleId,
    updateStatus,
    updateDataOS,
    countByStatus,
};
exports.default = serviceOrderRepository;
//# sourceMappingURL=serviceOrder.repository.js.map