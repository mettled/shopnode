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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_validator_1 = require("express-validator");
var user_1 = require("../models/user");
var courseCreateValidator = [
    (0, express_validator_1.body)('name').isLength({ min: 3 }).withMessage('Name need to be more than 3 symbols').trim(),
    (0, express_validator_1.body)('price').isNumeric().withMessage('Price contains not only numbers'),
    (0, express_validator_1.body)('img', 'Enter correct image link').isURL(),
];
var userRegisterValidator = [
    (0, express_validator_1.body)('name').isLength({ min: 3 }).withMessage('Name must have at least symbols').trim(),
    (0, express_validator_1.body)('email')
        .isEmail()
        .withMessage('Enter email')
        .custom(function (value, _a) {
        var req = _a.req;
        return __awaiter(void 0, void 0, void 0, function () {
            var email, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        email = req.body.email;
                        return [4 /*yield*/, user_1.User.findOne({ email: email }).lean()];
                    case 1:
                        user = _b.sent();
                        if (user && value === user.email) {
                            throw new Error('Email already registered');
                        }
                        return [2 /*return*/, true];
                }
            });
        });
    }),
    (0, express_validator_1.body)('password')
        .isStrongPassword({
        minLength: 3,
        minLowercase: 0,
        minUppercase: 0,
        minNumbers: 1,
        minSymbols: 0,
        returnScore: false,
        pointsPerUnique: 0,
        pointsPerRepeat: 0,
        pointsForContainingLower: 0,
        pointsForContainingUpper: 0,
        pointsForContainingNumber: 0,
        pointsForContainingSymbol: 0,
    })
        .withMessage('Password must be greater than 3 and contain at least one number'),
    (0, express_validator_1.body)('password')
        .isStrongPassword({
        minNumbers: 1,
    })
        .withMessage('Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number'),
    (0, express_validator_1.body)('rpassword')
        .isStrongPassword({ minLength: 3 })
        .withMessage('Password must have at least 1 number, and min length 8 symbols')
        .custom(function (value, _a) {
        var req = _a.req;
        var password = req.body.password;
        if (value !== password) {
            throw new Error('Passwords need to be equal');
        }
        return true;
    }),
];
exports.default = {
    courseCreateValidator: courseCreateValidator,
    userRegisterValidator: userRegisterValidator,
};
