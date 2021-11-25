"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = void 0;
var mongoose_1 = require("mongoose");
var courseSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
});
exports.Course = (0, mongoose_1.model)('Course', courseSchema);
