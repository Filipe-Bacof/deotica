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
const serviceOrder_repository_1 = __importDefault(require("../repositories/serviceOrder.repository"));
function insert(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield serviceOrder_repository_1.default.insert(data);
        return result;
    });
}
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield serviceOrder_repository_1.default.getAll();
        return result;
    });
}
function getInfo() {
    return __awaiter(this, void 0, void 0, function* () {
        const finalizado = yield serviceOrder_repository_1.default.countByStatus("finalizado", true);
        const pendente = yield serviceOrder_repository_1.default.countByStatus("pendente");
        const retirada = yield serviceOrder_repository_1.default.countByStatus("retirada");
        return {
            finalizado,
            pendente,
            retirada,
        };
    });
}
function getById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield serviceOrder_repository_1.default.getById(id);
        return result;
    });
}
function getBySaleId(vendaId) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield serviceOrder_repository_1.default.getBySaleId(vendaId);
        return result;
    });
}
function updateStatus(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield serviceOrder_repository_1.default.updateStatus(id, data);
        return result;
    });
}
function updateDataOS(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield serviceOrder_repository_1.default.updateDataOS(id, data);
        return result;
    });
}
const serviceOrderService = {
    insert,
    getAll,
    getInfo,
    getById,
    getBySaleId,
    updateStatus,
    updateDataOS,
};
exports.default = serviceOrderService;
//# sourceMappingURL=serviceOrder.service.js.map