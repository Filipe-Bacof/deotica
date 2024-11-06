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
        return database_1.prisma.produtos.create({
            data: data,
        });
    });
}
function edit(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(data);
        return database_1.prisma.produtos.update({
            where: { id },
            data: Object.assign({}, data),
        });
    });
}
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        return database_1.prisma.produtos.findMany({
            orderBy: { createdAt: "desc" },
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
    });
}
function getById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield database_1.prisma.produtos.findUnique({
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
function updateQuantity(id, quantidade) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield database_1.prisma.produtos.update({
            where: { id },
            data: { quantidade },
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
function deleteProduct(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield database_1.prisma.produtos.delete({
            where: { id },
        });
        return result;
    });
}
const productRepository = {
    getAll,
    getById,
    insert,
    edit,
    updateQuantity,
    deleteProduct,
};
exports.default = productRepository;
//# sourceMappingURL=product.repository.js.map