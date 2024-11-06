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
exports.getUserData = exports.newPass = exports.forgot = exports.signIn = exports.signUp = void 0;
const auth_service_1 = __importDefault(require("../services/auth.service"));
function signUp(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = req.body;
        const result = yield auth_service_1.default.signUp(data);
        res.status(200).json({
            message: "Usuário criado com sucesso",
            data: result,
        });
    });
}
exports.signUp = signUp;
function signIn(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = req.body;
        const result = yield auth_service_1.default.signIn(data);
        const user = yield auth_service_1.default.getUserDataByEmail(data.email);
        res
            .status(200)
            .cookie("token", result.token, { httpOnly: true })
            .json({
            message: "Usuário logado com sucesso",
            user: {
                id: user.id,
                nome: user.nome,
                email: user.email,
                perfil: user.perfilUsuario,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            },
            token: result.token,
        });
    });
}
exports.signIn = signIn;
function forgot(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email } = req.body;
        console.log(email);
        const result = yield auth_service_1.default.forgot(email);
        res.status(200).send({ result });
    });
}
exports.forgot = forgot;
function newPass(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, senha } = req.body;
        yield auth_service_1.default.newPass(email, senha);
        res.status(200).send("Senha atualizada.");
    });
}
exports.newPass = newPass;
function getUserData(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const infoUser = yield auth_service_1.default.getUserData(id);
        res.status(200).send(infoUser);
    });
}
exports.getUserData = getUserData;
//# sourceMappingURL=auth.controller.js.map