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
var express_validator_1 = require("express-validator");
var validators_1 = __importDefault(require("../validators"));
var course_1 = require("../models/course");
var auth_1 = __importDefault(require("../middlewares/auth"));
var router = (0, express_1.Router)();
function isOwner(course, req) {
    return course.userId.toString() === req.user._id.toString();
}
router.get('/add', auth_1.default, function (_, res) {
    try {
        res.render('add');
    }
    catch (error) {
        console.log(error);
    }
});
router.post('/add', auth_1.default, validators_1.default.courseCreateValidator, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, content, id, course, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    req.flash('courseMessage', errors.array()[0].msg);
                    return [2 /*return*/, res.render('add', {
                            courseMessage: req.flash('courseMessage'),
                            name: req.body.name,
                            price: req.body.price,
                            img: req.body.img,
                        })];
                }
                content = req.body ? req.body : undefined;
                id = req.user.id;
                if (!content) {
                    return [2 /*return*/, res.sendStatus(204).redirect('/courses')];
                }
                course = new course_1.Course({
                    name: content.name,
                    price: content.price,
                    img: content.img,
                    userId: id,
                });
                return [4 /*yield*/, course.save()];
            case 1:
                _a.sent();
                res.redirect('/courses');
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.log(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get('/edit/:id', auth_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, course, isOwnerUser, _id, name_1, price, img, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id ? req.params.id : undefined;
                if (!id) {
                    return [2 /*return*/, res.sendStatus(204).render('courses')];
                }
                return [4 /*yield*/, course_1.Course.findOne({ _id: id }).lean()];
            case 1:
                course = _a.sent();
                isOwnerUser = isOwner(course, req);
                if (!isOwnerUser) {
                    return [2 /*return*/, res.redirect('/courses')];
                }
                if (!course) {
                    return [2 /*return*/, res.sendStatus(204).render('courses')];
                }
                _id = course._id, name_1 = course.name, price = course.price, img = course.img;
                res.render('course-edit', {
                    id: _id,
                    name: name_1,
                    price: price,
                    img: img,
                });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.log(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post('/edit', auth_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var content, id, name_2, price, img, course, isOwnerUser, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                content = req.body ? req.body : undefined;
                if (!content) {
                    return [2 /*return*/, res.sendStatus(204).render('courses')];
                }
                id = content.id, name_2 = content.name, price = content.price, img = content.img;
                return [4 /*yield*/, course_1.Course.findById(id)];
            case 1:
                course = _a.sent();
                isOwnerUser = isOwner(course, req);
                if (!isOwnerUser) {
                    return [2 /*return*/, res.redirect('/courses')];
                }
                return [4 /*yield*/, course_1.Course.findByIdAndUpdate(id, {
                        name: name_2,
                        price: price,
                        img: img,
                    })];
            case 2:
                _a.sent();
                res.redirect('/courses');
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                console.log(error_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.post('/delete', auth_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.body.id;
                if (!id) {
                    return [2 /*return*/, res.sendStatus(204).render('courses')];
                }
                return [4 /*yield*/, course_1.Course.findOneAndDelete({
                        _id: id,
                    })];
            case 1:
                _a.sent();
                res.redirect('/courses');
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                console.log(error_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, course, name_3, price, img, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id ? req.params.id : undefined;
                if (!id) {
                    return [2 /*return*/, res.sendStatus(204).render('courses')];
                }
                return [4 /*yield*/, course_1.Course.findOne({ _id: id }).lean()];
            case 1:
                course = _a.sent();
                if (!course) {
                    return [2 /*return*/, res.sendStatus(204).render('courses')];
                }
                name_3 = course.name, price = course.price, img = course.img;
                res.render('course', {
                    name: name_3,
                    price: price,
                    img: img,
                });
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                console.log(error_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
