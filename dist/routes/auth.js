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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var crypto_1 = __importDefault(require("crypto"));
var express_validator_1 = require("express-validator");
var user_1 = require("../models/user");
var auth_1 = __importDefault(require("../middlewares/auth"));
var register_1 = __importDefault(require("../mail/register"));
var reset_1 = __importDefault(require("../mail/reset"));
var validators_1 = __importDefault(require("../validators"));
var router = (0, express_1.Router)();
router.get('/', function (req, res) {
    res.render('auth/auth', {
        messageLogin: req.flash('messageLogin'),
        messageRegister: req.flash('messageRegister'),
    });
});
router.post('/login', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, condidate, isSame;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, user_1.User.findOne({ email: email }).select('+password')];
            case 1:
                condidate = _b.sent();
                console.log('condidate', condidate);
                if (!!condidate) return [3 /*break*/, 2];
                req.flash('messageLogin', 'No user');
                res.redirect('/auth#login');
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, bcryptjs_1.default.compare(password, condidate.password)];
            case 3:
                isSame = _b.sent();
                if (isSame) {
                    //@ts-ignore
                    req.session.user = condidate;
                    req.session.save(function (error) {
                        if (error) {
                            return console.log(error);
                        }
                    });
                    res.redirect('/');
                }
                else {
                    req.flash('messageLogin', 'Wrong password');
                    res.redirect('/auth#login');
                }
                _b.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); });
router.get('/logout', auth_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        req.session.destroy(function () {
            res.redirect('/');
        });
        return [2 /*return*/];
    });
}); });
router.post('/register', validators_1.default.userRegisterValidator, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, _a, email, name, rpassword, user, _b;
    var _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    req.flash('messageRegister', errors.array()[0].msg);
                    return [2 /*return*/, res.redirect('/auth#register')];
                }
                _a = req.body, email = _a.email, name = _a.name, rpassword = _a.rpassword;
                _b = user_1.User.bind;
                _c = {
                    name: name,
                    email: email
                };
                return [4 /*yield*/, bcryptjs_1.default.hash(rpassword, 10)];
            case 1:
                user = new (_b.apply(user_1.User, [void 0, (_c.password = _d.sent(),
                        _c.cart = [],
                        _c)]))();
                return [4 /*yield*/, user.save()];
            case 2:
                _d.sent();
                res.redirect('/auth#login');
                return [4 /*yield*/, (0, register_1.default)(email)];
            case 3:
                _d.sent();
                return [2 /*return*/];
        }
    });
}); });
router.get('/reset', function (_, res) {
    res.render('auth/reset');
});
router.get('/reset/:token', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, condidate, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                token = req.params.token;
                return [4 /*yield*/, user_1.User.findOne({ token: token, tokenDate: { $gt: Date.now() } })];
            case 1:
                condidate = _a.sent();
                if (!condidate) {
                    return [2 /*return*/, res.redirect('/auth#login')];
                }
                res.render('auth/password', {
                    messageResetPassword: req.flash('messageResetPassword'),
                    userId: condidate._id,
                    token: token,
                });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.log(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post('/reset', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, condidate_1, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                email = req.body.email;
                return [4 /*yield*/, user_1.User.findOne({ email: email })];
            case 1:
                condidate_1 = _a.sent();
                if (!condidate_1) {
                    req.flash('messageLogin', 'User does not exist');
                    res.redirect('/auth/reset');
                }
                else {
                    crypto_1.default.randomBytes(10, function (err, buf) { return __awaiter(void 0, void 0, void 0, function () {
                        var token;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (err) {
                                        throw err;
                                    }
                                    token = buf.toString('hex');
                                    condidate_1.token = token;
                                    condidate_1.tokenDate = Date.now() + 1000 * 60 * 60;
                                    return [4 /*yield*/, condidate_1.save()];
                                case 1:
                                    _a.sent();
                                    req.flash('messageLogin', 'Check pls your email');
                                    res.redirect('/auth#login');
                                    return [4 /*yield*/, (0, reset_1.default)(condidate_1.email, token)];
                                case 2:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                }
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.log(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post('/password', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, password, rpassword, token, condidate, _b, error_3;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 6, , 7]);
                _a = req.body, id = _a.id, password = _a.password, rpassword = _a.rpassword, token = _a.token;
                if (password !== rpassword) {
                    req.flash('messageResetPassword', 'Passwords are not the same');
                    return [2 /*return*/, res.redirect("/auth/reset/".concat(token))];
                }
                return [4 /*yield*/, user_1.User.findOne({
                        _id: id,
                        token: token,
                        tokenDate: { $gt: Date.now() },
                    })];
            case 1:
                condidate = _c.sent();
                if (!!condidate) return [3 /*break*/, 2];
                req.flash('messageLogin', 'Session was expared');
                res.redirect('/auth/reset');
                return [3 /*break*/, 5];
            case 2:
                condidate.token = undefined;
                condidate.tokenDate = undefined;
                _b = condidate;
                return [4 /*yield*/, bcryptjs_1.default.hash(password, 10)];
            case 3:
                _b.password = _c.sent();
                return [4 /*yield*/, condidate.save()];
            case 4:
                _c.sent();
                req.flash('messageLogin', 'Enter using new password');
                res.redirect('/auth#login');
                _c.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                error_3 = _c.sent();
                console.log(error_3);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
