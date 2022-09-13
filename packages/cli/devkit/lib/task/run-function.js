"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const index_1 = __importStar(require("../report/index"));
/**
 * 执行某个函数
 *  如果是 generator 类型,则使用 yield执行, 并在其后执行 next(0\)
 *  否则普通调用, 并传入 next 函数
 * @param options {object}
 * @param options.method {function} 函数体
 * @param options.args {array} 参数
 * @param options.next {function} 下一步执行方法
 * @return {mix} 函数体内的返回值
 */
async function runFunction(options) {
    const noop = () => { };
    const method = options.method;
    const args = options.args || [];
    const next = options.next || noop;
    if (utils_1.isGeneratorFunction(method) || utils_1.isGenerator(method)) {
        let res;
        try {
            res = await method.apply(null, args);
        }
        catch (e) {
            index_1.default.error(index_1.ErrorType.CLI_CORE, e.stack || e);
            throw e;
        }
        next();
        return res;
    }
    let res;
    try {
        res = method.apply(null, args.concat(next));
    }
    catch (e) {
        index_1.default.error(index_1.ErrorType.CLI_CORE, e.stack || e);
        throw e;
    }
    // return 为 promise 对象的情况
    if (res && typeof res.then === 'function') {
        let res2;
        try {
            res2 = await res;
        }
        catch (e) {
            index_1.default.error(index_1.ErrorType.CLI_CORE, e.stack || e);
            throw e;
        }
        next();
        return res2;
    }
    else {
        next();
    }
    return res;
}
exports.default = runFunction;
