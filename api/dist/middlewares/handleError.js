"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
function handleError(error, // Definir um tipo mais específico para o objeto 'error' é recomendado, caso esteja disponível.
req, res, next) {
    console.log(error);
    if (error && error.status) {
        return res.status(error.status).send(error.message);
    }
    else {
        res.status(500).send(error);
    }
}
exports.handleError = handleError;
//# sourceMappingURL=handleError.js.map