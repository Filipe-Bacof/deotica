"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const emailEnv = process.env.MAIL_USERNAME;
const passEnv = process.env.MAIL_PASSWORD;
const transporter = nodemailer_1.default.createTransport({
    // host: "smtp.kinghost.net",
    host: 'smtp.gmail.com',
    // host: "kinghost.smtpkl.com.br",
    port: 465,
    secure: true,
    auth: {
        user: emailEnv,
        pass: passEnv,
    },
});
exports.default = transporter;
//# sourceMappingURL=mailer.js.map