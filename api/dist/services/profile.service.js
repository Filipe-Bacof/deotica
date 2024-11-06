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
const profile_repository_1 = __importDefault(require("../repositories/profile.repository"));
const permissions_1 = require("../utils/permissions");
function validatePermissions(permissions) {
    if (permissions.some((permission) => !(0, permissions_1.isPermission)(permission))) {
        throw {
            status: 401,
            message: "As permissões especificadas não existem.",
        };
    }
}
function getAll(populateUser) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield profile_repository_1.default.getAll(populateUser);
        return result;
    });
}
function insert(data) {
    return __awaiter(this, void 0, void 0, function* () {
        validatePermissions(data.permissoes);
        const result = yield profile_repository_1.default.insert(data);
        return result;
    });
}
function edit(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!data.nome && !data.permissoes) {
            throw {
                status: 401,
                message: "Informe pelo menos um dos itens para ser atualizado.",
            };
        }
        data.permissoes && validatePermissions(data.permissoes);
        if (!id) {
            throw {
                status: 401,
                message: "É preciso informar o ID para atualizar.",
            };
        }
        const result = yield profile_repository_1.default.edit(id, data);
        return result;
    });
}
const profileService = { getAll, insert, edit };
exports.default = profileService;
//# sourceMappingURL=profile.service.js.map