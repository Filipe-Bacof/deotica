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
exports.isUserAuthorizedToDoThisAction = exports.isPermission = void 0;
const Permissions_1 = require("../enum/Permissions");
const auth_repository_1 = __importDefault(require("../repositories/auth.repository"));
const validations_1 = require("./validations");
function isPermission(permission) {
    return Object.values(Permissions_1.Permission).includes(permission);
}
exports.isPermission = isPermission;
function isUserAuthorizedToDoThisAction(permission, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(0, validations_1.isUUID)(userId)) {
            throw {
                status: 422,
                message: `O ID de usuário não é válido!`,
            };
        }
        const user = yield auth_repository_1.default.getOneUser(userId);
        if (user.perfilUsuario.permissoes.includes("ADMIN")) {
            return true;
        }
        return user.perfilUsuario.permissoes.includes(permission);
    });
}
exports.isUserAuthorizedToDoThisAction = isUserAuthorizedToDoThisAction;
//# sourceMappingURL=permissions.js.map