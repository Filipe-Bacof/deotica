"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_router_1 = __importDefault(require("./auth.router"));
const profile_router_1 = __importDefault(require("./profile.router"));
const client_router_1 = __importDefault(require("./client.router"));
const payment_router_1 = __importDefault(require("./payment.router"));
const promoEmail_router_1 = __importDefault(require("./promoEmail.router"));
const product_router_1 = __importDefault(require("./product.router"));
const sale_router_1 = __importDefault(require("./sale.router"));
const serviceOrder_router_1 = __importDefault(require("./serviceOrder.router"));
const router = (0, express_1.Router)();
router.get("/", (_req, res) => {
    return res.send("API Funcionando! 👍");
});
router.get("/ping", (_req, res) => {
    return res.send("pong 🏓");
});
router.use(auth_router_1.default);
router.use(profile_router_1.default);
router.use(client_router_1.default);
router.use(payment_router_1.default);
router.use(promoEmail_router_1.default);
router.use(product_router_1.default);
router.use(sale_router_1.default);
router.use(serviceOrder_router_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map