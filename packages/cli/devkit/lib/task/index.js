"use strict";
/**
 * @desc: 汇集系统操作基本方法
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const has_1 = __importDefault(require("./has"));
const run_1 = __importDefault(require("./run"));
const run_function_1 = __importDefault(require("./run-function"));
exports.default = {
    run: run_1.default,
    runFunction: run_function_1.default,
    has: has_1.default,
};
