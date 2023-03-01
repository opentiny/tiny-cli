"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (fn) => {
    if (!fn) {
        return;
    }
    return fn.default || fn;
};
