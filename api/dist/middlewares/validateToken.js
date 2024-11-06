"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateHeaderToken = exports.validateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function validateToken(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res
                .status(422)
                .send(error.details.map((detail) => detail.message));
        }
        next();
    };
}
exports.validateToken = validateToken;
function validateHeaderToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token)
        return res.status(401).send("Acesso negado!");
    try {
        const { JWT_KEY } = process.env;
        jsonwebtoken_1.default.verify(token, JWT_KEY);
        next();
    }
    catch (err) {
        res.status(400).json({ message: "Este token é inválido!" });
    }
}
exports.validateHeaderToken = validateHeaderToken;
//# sourceMappingURL=validateToken.js.map