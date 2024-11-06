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
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const auth_repository_1 = __importDefault(require("../repositories/auth.repository"));
const token_1 = require("../utils/token");
const mailer_1 = __importDefault(require("../modules/mailer"));
const generateTemplates_1 = require("../utils/generateTemplates");
const profile_repository_1 = __importDefault(require("../repositories/profile.repository"));
const validations_1 = require("../utils/validations");
function signUp(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const dataUsuario = {
            nome: data.nome,
            email: data.email,
            senha: data.senha,
            perfilId: data.perfilId,
        };
        const checkEmailIsValid = yield auth_repository_1.default.getByEmail(data.email);
        console.log(data);
        if (checkEmailIsValid) {
            throw {
                status: 409,
                message: "Email já foi cadastrado.",
            };
        }
        const checkRoleIsValid = yield profile_repository_1.default.getOne(data.perfilId);
        if (!checkRoleIsValid) {
            throw {
                status: 404,
                message: "Este perfil de usuário não existe.",
            };
        }
        const result = yield auth_repository_1.default.insert(Object.assign(Object.assign({}, dataUsuario), { senha: bcrypt_1.default.hashSync(data.senha, 10) }));
        mailer_1.default.sendMail({
            to: data.email,
            from: `'Deotica' <${process.env.MAIL_USERNAME}>`,
            subject: "Deotica - Boas Vindas",
            html: (0, generateTemplates_1.templatePrimeiroLogin)(dataUsuario),
        }, (err, res) => {
            if (err) {
                console.log(err);
                throw {
                    status: 400,
                    message: `Não foi enviado o email de boas vindas. ${err}`,
                };
            }
            if (res) {
                console.log(res);
            }
        });
        console.log(result);
    });
}
function signIn(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const checkEmailIsValid = yield auth_repository_1.default.getByEmail(data.email);
        if (!checkEmailIsValid) {
            throw {
                status: 400,
                message: "Ocorreu um erro na autenticação.",
            };
        }
        if (!bcrypt_1.default.compareSync(data.senha, checkEmailIsValid.senha)) {
            throw {
                status: 400,
                message: "Ocorreu um erro na autenticação.",
            };
        }
        console.log(checkEmailIsValid);
        const token = (0, token_1.generateToken)(checkEmailIsValid.id);
        return { token: token };
    });
}
function forgot(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const foundUser = yield auth_repository_1.default.getByEmail(email);
            if (!foundUser) {
                throw {
                    status: 400,
                    message: "Ocorreu um erro, tente novamente.",
                };
            }
            const token = crypto_1.default.randomBytes(6).toString("hex");
            const now = new Date();
            const validade = `${now.setHours(now.getHours() + 1)}`;
            const result = yield auth_repository_1.default.updateTokenForgotPassword(email, token, validade);
            if (!result) {
                throw {
                    status: 400,
                    message: "Ocorreu um erro, tente novamente.",
                };
            }
            const resutMail = mailer_1.default.sendMail({
                to: email,
                from: `'Deotica' <${process.env.MAIL_USERNAME}>`,
                subject: "Deotica - Token para resetar a senha",
                html: (0, generateTemplates_1.templateEsqueciMinhaSenha)(token),
            }, (err, res) => {
                if (err) {
                    console.log(err);
                    throw {
                        status: 400,
                        message: "Ocorreu um erro, tente novamente.",
                    };
                }
                if (res) {
                    console.log(res);
                }
            });
            return resutMail;
        }
        catch (error) {
            console.log(error);
            throw {
                status: 400,
                message: "Ocorreu um erro, tente novamente.",
            };
        }
    });
}
function newPass(email, senha) {
    return __awaiter(this, void 0, void 0, function* () {
        const foundUser = yield auth_repository_1.default.getByEmail(email);
        if (!foundUser) {
            throw {
                status: 400,
                message: "Ocorreu um erro, tente novamente.",
            };
        }
        const saltRounds = 10;
        const passwordHash = yield bcrypt_1.default.hash(senha, saltRounds);
        const result = yield auth_repository_1.default.updatePassword(email, passwordHash);
        return result;
    });
}
function getUserData(id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(0, validations_1.isUUID)(id)) {
            throw {
                status: 422,
                message: "Este ID não é válido!",
            };
        }
        const foundUser = yield auth_repository_1.default.getOneUser(id);
        if (!foundUser) {
            throw {
                status: 404,
                message: "Usuário não cadastrado!",
            };
        }
        return foundUser;
    });
}
function getUserDataByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const foundUser = yield auth_repository_1.default.getByEmail(email);
        if (!foundUser) {
            throw {
                status: 404,
                message: "Usuário não cadastrado!",
            };
        }
        return foundUser;
    });
}
const authService = {
    signUp,
    signIn,
    forgot,
    newPass,
    getUserData,
    getUserDataByEmail,
};
exports.default = authService;
//# sourceMappingURL=auth.service.js.map