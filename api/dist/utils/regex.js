"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cepRegex = exports.cpfRegex = exports.nomeRegex = void 0;
// Garante que o nome tenha pelo menos um nome e um sobrenome
const nomeRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)+$/;
exports.nomeRegex = nomeRegex;
// Apenas 11 números para CPF
const cpfRegex = /^[0-9]{11}$/;
exports.cpfRegex = cpfRegex;
// Apenas 8 números para CEP
const cepRegex = /^[0-9]{8}$/;
exports.cepRegex = cepRegex;
//# sourceMappingURL=regex.js.map