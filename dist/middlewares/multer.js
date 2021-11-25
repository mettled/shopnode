"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var multer_1 = __importDefault(require("multer"));
var crypto_1 = __importDefault(require("crypto"));
var storage = multer_1.default.diskStorage({
    destination: function (_, __, cb) {
        cb(null, 'images');
    },
    filename: function (req, file, cb) {
        var _a = file.originalname.split('.'), ext = _a[1];
        var uniquePreffix = crypto_1.default.createHash('MD5').update(req.body.email).digest('hex');
        cb(null, uniquePreffix + '.' + ext);
    },
});
var allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];
function fileFilter(_, file, cb) {
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
}
exports.default = (0, multer_1.default)({ storage: storage, fileFilter: fileFilter });
