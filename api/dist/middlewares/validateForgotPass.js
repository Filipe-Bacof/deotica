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
const auth_repository_1 = __importDefault(require("../repositories/auth.repository"));
const verifyTokenForgotPass = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, senha, token } = req.body;
    if (!token)
        throw {
            status: 401,
            message: "O campo do Token não pode estar vazio",
        };
    if (!email)
        throw {
            status: 401,
            message: "O campo do e-mail não pode estar vazio.",
        };
    if (!senha)
        throw {
            status: 401,
            message: "O campo de senha não pode estar vazio",
        };
    const regex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
    if (!regex.test(senha))
        throw {
            status: 401,
            message: "A senha deve conter pelo menos 8 caracteres, incluindo pelo menos uma letra maiúscula ou minúscula e um número.",
        };
    try {
        const foundUser = yield auth_repository_1.default.getByEmail(email);
        if (!foundUser)
            throw {
                status: 400,
                message: "Ocorreu um erro ao tentar buscar o usuário, tente novamente.",
            };
        if (foundUser.resetSenhaToken !== token)
            throw {
                status: 400,
                message: "O token informado está incorreto",
            };
        if (Number(foundUser.resetSenhaExpiracao) < Date.now())
            throw {
                status: 400,
                message: "O token informado expirou, tente gerar novamente.",
            };
        next();
    }
    catch (error) {
        throw {
            status: 400,
            message: "Ocorreu um erro ao tentar buscar o usuário, tente novamente",
        };
    }
});
exports.default = verifyTokenForgotPass;
//# sourceMappingURL=validateForgotPass.js.map