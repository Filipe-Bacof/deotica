"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserIDbyToken = exports.generateToken = exports.decodeToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function decodeToken(tokenController) {
    const token = tokenController === null || tokenController === void 0 ? void 0 : tokenController.split("Bearer ").join("");
    let infoToken;
    jsonwebtoken_1.default.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err)
            throw { status: 400, message: `Invalid token ${token}` };
        else
            infoToken = decoded;
    });
    return infoToken;
}
exports.decodeToken = decodeToken;
function generateToken(userID) {
    return jsonwebtoken_1.default.sign({ userID }, process.env.JWT_KEY, {
        expiresIn: process.env.JWT_EXPIRATION,
    });
}
exports.generateToken = generateToken;
function getUserIDbyToken(authorization) {
    const checkToken = decodeToken(authorization);
    if (!checkToken) {
        throw {
            status: 404,
            message: `token not valid`,
        };
    }
    return checkToken;
}
exports.getUserIDbyToken = getUserIDbyToken;
//# sourceMappingURL=token.js.map