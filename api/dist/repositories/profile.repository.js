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
        return database_1.prisma.perfilUsuario.create({
            data: {
                nome: data.nome,
                permissoes: data.permissoes,
            },
        });
    });
}
function edit(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(data);
        return database_1.prisma.perfilUsuario.update({
            where: { id },
            data: {
                nome: data.nome,
                permissoes: data.permissoes,
            },
        });
    });
}
function getAll(populateUser) {
    return __awaiter(this, void 0, void 0, function* () {
        return database_1.prisma.perfilUsuario.findMany({
            include: { usuarios: populateUser },
            orderBy: { createdAt: "desc" },
        });
    });
}
function getOne(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield database_1.prisma.perfilUsuario.findUnique({
            where: { id },
        });
        return result;
    });
}
const profileRepository = {
    insert,
    edit,
    getAll,
    getOne,
};
exports.default = profileRepository;
//# sourceMappingURL=profile.repository.js.map