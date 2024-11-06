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
        return database_1.prisma.emailsPromocionais.create({
            data: data,
        });
    });
}
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        return database_1.prisma.emailsPromocionais.findMany({ orderBy: { createdAt: "desc" } });
    });
}
function getAllActive() {
    return __awaiter(this, void 0, void 0, function* () {
        return database_1.prisma.emailsPromocionais.findMany({
            where: { ativo: { equals: true } },
            orderBy: { createdAt: "desc" },
        });
    });
}
function getAllInactive() {
    return __awaiter(this, void 0, void 0, function* () {
        return database_1.prisma.emailsPromocionais.findMany({
            where: { ativo: { equals: false } },
            orderBy: { createdAt: "desc" },
        });
    });
}
function getOneById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield database_1.prisma.emailsPromocionais.findUnique({
            where: { id },
        });
        return result;
    });
}
function getOneByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield database_1.prisma.emailsPromocionais.findUnique({
            where: { email },
        });
        return result;
    });
}
function updateStatus(id, status) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield database_1.prisma.emailsPromocionais.update({
            where: { id },
            data: { ativo: status },
        });
        return result;
    });
}
const profileRepository = {
    insert,
    getAll,
    getAllActive,
    getAllInactive,
    getOneById,
    getOneByEmail,
    updateStatus,
};
exports.default = profileRepository;
//# sourceMappingURL=promoEmail.repository.js.map