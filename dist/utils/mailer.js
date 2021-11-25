"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer_1 = __importDefault(require("nodemailer"));
var transport = nodemailer_1.default.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: '62cefeff84c93a',
        pass: 'a890cd7d12f5d4',
    },
});
var mailer = function (to, subject, text, html) {
    return transport.sendMail({
        from: process.env.MAIL_FROM,
        to: to,
        subject: subject,
        text: text,
        html: html,
    });
};
exports.default = mailer;
