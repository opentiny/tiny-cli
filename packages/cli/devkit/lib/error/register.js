"use strict";
/**
 * @desc 注册错误处理器
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __importDefault(require("./utils"));
/**
 * 注册错误处理器
 * @param {generatorFunction|Array} handle 错误处理器, 必须是 generator函数, 多个时可以传数组,
 * 进程报错时传入错误对象并依次调用,
 * 如果 catch 到错误并处理完请返回 true, 否则将继续往下执行其他处理器函数
 */
function register(handle) {
    if (Array.isArray(handle)) {
        handle.forEach((item) => {
            utils_1.default.register(item);
        });
    }
    else {
        utils_1.default.register(handle);
    }
}
exports.default = register;
