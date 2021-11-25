"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var calculateOrderPrice = function (order) {
    return order.reduce(function (acc, _a) {
        var _b = _a.courseId.price, price = _b === void 0 ? 0 : _b, count = _a.count;
        return acc + price * count;
    }, 0);
};
exports.default = calculateOrderPrice;
