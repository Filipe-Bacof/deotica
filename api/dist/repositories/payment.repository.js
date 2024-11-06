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
        return database_1.prisma.formasDePagamento.create({
            data: data,
        });
    });
}
function edit(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(data);
        return database_1.prisma.formasDePagamento.update({
            where: { id },
            data: Object.assign({}, data),
        });
    });
}
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        return database_1.prisma.formasDePagamento.findMany({ orderBy: { createdAt: "desc" } });
    });
}
function getOne(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return database_1.prisma.formasDePagamento.findUnique({ where: { id } });
    });
}
function deletePayment(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return database_1.prisma.formasDePagamento.delete({ where: { id } });
    });
}
const clientRepository = {
    insert,
    edit,
    getAll,
    getOne,
    deletePayment,
};
exports.default = clientRepository;
//# sourceMappingURL=payment.repository.js.map