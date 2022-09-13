"use strict";
/**
 * @desc 错误处理,先会调用之前注册过的错误处理,最后执行默认的处理
 */
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __importDefault(require("./utils"));
const index_1 = __importDefault(require("../log/index"));
const index_2 = __importStar(require("../report/index"));
const handle_npm_not_found_1 = __importDefault(require("./handle-npm-not-found"));
const handle_module_not_found_1 = __importDefault(require("./handle-module-not-found"));
const handle_enoent_1 = __importDefault(require("./handle-enoent"));
const handle_default_1 = __importDefault(require("./handle-default"));
const log = index_1.default('core-logs');
const innerList = [handle_npm_not_found_1.default, handle_module_not_found_1.default, handle_enoent_1.default, handle_default_1.default];
/**
 * 错误处理器
 * @param {error} e 错误对象
 */
async function handle(e) {
    log.debug('error code = %s', e.code);
    log.debug(e.stack || e);
    const handList = utils_1.default.getHandleList().concat(innerList);
    // 发送错误日志
    index_2.default.error(e.code || index_2.ErrorType.CLI_CORE, e.stack || e);
    for (let i = 0; i < handList.length; i += 1) {
        const res = await handList[i](e);
        if (res === true) {
            // 说明错误已被处理, 可以直接返回了
            return;
        }
    }
}
exports.default = handle;
