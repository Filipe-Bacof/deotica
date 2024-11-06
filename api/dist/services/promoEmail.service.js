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
const mailer_1 = __importDefault(require("../modules/mailer"));
const client_repository_1 = __importDefault(require("../repositories/client.repository"));
const promoEmail_repository_1 = __importDefault(require("../repositories/promoEmail.repository"));
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield promoEmail_repository_1.default.getAllActive();
        return result;
    });
}
function getOneByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield promoEmail_repository_1.default.getOneByEmail(email);
        if (!result) {
            throw {
                status: 404,
                message: "Esse e-mail não foi encontrado.",
            };
        }
        return result;
    });
}
function insert(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const isAlreadyInserted = yield promoEmail_repository_1.default.getOneByEmail(data.email);
        if (isAlreadyInserted) {
            if (isAlreadyInserted.ativo) {
                throw {
                    status: 422,
                    message: "Esse e-mail já foi inserido.",
                };
                // biome-ignore lint/style/noUselessElse: <explanation>
            }
            else {
                const updated = yield promoEmail_repository_1.default.updateStatus(isAlreadyInserted.id, true);
                return updated;
            }
            // biome-ignore lint/style/noUselessElse: <explanation>
        }
        else {
            const result = yield promoEmail_repository_1.default.insert(data);
            return result;
        }
    });
}
function desactivate(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield promoEmail_repository_1.default.getOneByEmail(email);
        if (!result) {
            throw {
                status: 404,
                message: "Esse e-mail não foi encontrado.",
            };
        }
        const updated = yield promoEmail_repository_1.default.updateStatus(result.id, false);
        return updated;
    });
}
function isClient(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const [isClient, isOnPromotionalEmails] = yield Promise.all([
            client_repository_1.default.getOneByEmail(email),
            promoEmail_repository_1.default.getOneByEmail(email),
        ]);
        const getMessage = () => {
            if (isClient && isOnPromotionalEmails) {
                return isOnPromotionalEmails.ativo
                    ? "Esse e-mail está cadastrado como cliente e também para receber e-mails promocionais."
                    : "Esse e-mail está cadastrado como cliente, mas não deve receber e-mails promocionais, pois está com status inativo.";
            }
            if (isClient) {
                return "Esse e-mail está cadastrado como cliente, mas não está cadastrado para receber e-mails promocionais.";
            }
            if (isOnPromotionalEmails) {
                return isOnPromotionalEmails.ativo
                    ? "Esse e-mail não está cadastrado como cliente, mas está cadastrado para receber e-mails promocionais."
                    : "Esse e-mail não está cadastrado como cliente e não deve receber e-mails promocionais, pois está com status inativo.";
            }
            return "Esse e-mail não está cadastrado como cliente e também não está cadastrado para receber e-mails promocionais.";
        };
        return Object.assign(Object.assign(Object.assign({ message: getMessage() }, (isClient && { cliente: isClient })), (isOnPromotionalEmails && { emailsPromocionais: isOnPromotionalEmails })), { tables: {
                clientTable: !!isClient,
                promoEmailTable: !!isOnPromotionalEmails,
            } });
    });
}
function sendSimpleMessageToEmailList(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const results = yield Promise.all(data.emails.map((email) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield mailer_1.default.sendMail({
                    from: process.env.MAIL_USERNAME,
                    to: email,
                    subject: "Mensagem de Deotica",
                    text: data.message,
                });
                return { email, status: true };
            }
            catch (error) {
                console.error(`Erro ao enviar para ${email}:`, error);
                return { email, status: false };
            }
        })));
        return results;
    });
}
const promoEmailService = {
    getAll,
    getOneByEmail,
    insert,
    desactivate,
    isClient,
    sendSimpleMessageToEmailList,
};
exports.default = promoEmailService;
//# sourceMappingURL=promoEmail.service.js.map