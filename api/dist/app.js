"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./router"));
const handleError_1 = require("./middlewares/handleError");
const http_1 = __importDefault(require("http"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const allowedOrigins = ["http://localhost:5173"];
app.use(body_parser_1.default.json({ limit: "5mb" }));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(router_1.default);
app.use(handleError_1.handleError);
exports.default = server;
//# sourceMappingURL=app.js.map