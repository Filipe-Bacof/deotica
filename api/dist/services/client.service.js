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
const client_repository_1 = __importDefault(require("../repositories/client.repository"));
const permissions_1 = require("../utils/permissions");
const validations_1 = require("../utils/validations");
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield client_repository_1.default.getAll();
        return result;
    });
}
function getByCpf(cpf) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield client_repository_1.default.getByCpf(cpf);
        if (!result) {
            throw {
                status: 404,
                message: "Cliente não encontrado",
            };
        }
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
        const result = yield client_repository_1.default.getById(id);
        if (!result) {
            throw {
                status: 404,
                message: "Cliente não encontrado",
            };
        }
        return result;
    });
}
function insert(data, userID) {
    return __awaiter(this, void 0, void 0, function* () {
        const isClientAlreadyRegistered = yield client_repository_1.default.getByCpf(data.cpf);
        if (isClientAlreadyRegistered) {
            throw {
                status: 409,
                message: "Já existe um cliente cadastrado com este CPF",
            };
        }
        if (!(0, permissions_1.isUserAuthorizedToDoThisAction)("CADASTRO_CLIENTE", userID)) {
            throw {
                status: 403,
                message: "Você não tem autorização para cadastrar clientes",
            };
        }
        const result = yield client_repository_1.default.insert(Object.assign(Object.assign({}, data), { createdBy: userID }));
        return result;
    });
}
function edit(id, data) {
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
        const result = yield client_repository_1.default.edit(id, data);
        return result;
    });
}
const clientService = { getAll, getByCpf, getById, insert, edit };
exports.default = clientService;
//# sourceMappingURL=client.service.js.map