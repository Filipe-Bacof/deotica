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
        return database_1.prisma.clientes.create({
            data: data,
        });
    });
}
function edit(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(data);
        return database_1.prisma.clientes.update({
            where: { id },
            data: Object.assign({}, data),
        });
    });
}
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        const clientes = yield database_1.prisma.clientes.findMany({
            orderBy: { updatedAt: "desc" },
            include: {
                criador: {
                    select: {
                        id: true,
                        nome: true,
                        email: true,
                    },
                },
            },
        });
        return clientes;
    });
}
function getByCpf(cpf) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield database_1.prisma.clientes.findUnique({
            where: { cpf },
            include: {
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
function getById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield database_1.prisma.clientes.findUnique({
            where: { id },
            include: {
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
function getOneByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield database_1.prisma.clientes.findFirst({
            where: { email },
            include: {
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
const clientRepository = {
    insert,
    edit,
    getAll,
    getByCpf,
    getById,
    getOneByEmail,
};
exports.default = clientRepository;
//# sourceMappingURL=client.repository.js.map