"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
dotenv_1.default.config();
app_1.default.listen(process.env.API_PORT || 3001, () => {
    console.log(`🚀 Backend up on PORT: ${process.env.API_PORT}`);
});
//# sourceMappingURL=server.js.map