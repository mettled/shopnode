"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mailer_1 = __importDefault(require("../utils/mailer"));
exports.default = (function (email, token) {
    return (0, mailer_1.default)(email, 'Reset password', '', "\n  <h1>Hi my friend</h1>\n  <p>For reset password clink on link bellow</p>\n  <p><a href=".concat(process.env.BASE_URL, "/auth/reset/").concat(token, " target=_blank> Click for reset</a></p>\n  <hr />\n  <a href=\"").concat(process.env.BASE_URL, "\">\u041C\u0430\u0433\u0430\u0437\u0438\u043D \u043A\u0443\u0440\u0441\u043E\u0432</a>\n"));
});
