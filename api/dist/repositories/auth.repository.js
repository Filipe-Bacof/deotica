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
        const result = yield database_1.prisma.usuarios.create({ data });
        return result;
    });
}
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield database_1.prisma.usuarios.findMany({
            orderBy: { createdAt: "desc" },
        });
        return result;
    });
}
function getByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield database_1.prisma.usuarios.findUnique({
            where: {
                email,
            },
            include: { perfilUsuario: {} },
        });
        return result;
    });
}
function getOneUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield database_1.prisma.usuarios.findUnique({
            where: { id },
            include: { perfilUsuario: {} },
        });
        return result;
    });
}
function updateTokenForgotPassword(email, token, validade) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield database_1.prisma.usuarios.update({
            where: { email },
            data: { resetSenhaToken: token, resetSenhaExpiracao: validade },
        });
        return result;
    });
}
function updatePassword(email, newPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield database_1.prisma.usuarios.update({
            where: {
                email,
            },
            data: {
                senha: newPassword,
            },
        });
        return result;
    });
}
const authRepository = {
    insert,
    getAll,
    getByEmail,
    getOneUser,
    updateTokenForgotPassword,
    updatePassword,
};
exports.default = authRepository;
//# sourceMappingURL=auth.repository.js.map