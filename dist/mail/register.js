"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mailer_1 = __importDefault(require("../utils/mailer"));
exports.default = (function (email) {
    return (0, mailer_1.default)(email, 'Account is registered', '', "\n  <h1> Welcome to our store </h1>\n  <p>You have successfully created an account - ".concat(email, "</p>\n  <hr />\n  <a href=\"").concat(process.env.BASE_URL, "\">Shop courses</a>\n"));
});
