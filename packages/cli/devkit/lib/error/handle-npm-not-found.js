"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../intl/index"));
const index_2 = __importDefault(require("../log/index"));
const index_3 = __importDefault(require("./locale/index"));
const log = index_2.default('core-error');
/**
 * 未找到npm包或安装 npm 包时出现其他错误时,进行提示
 */
async function default_1(e) {
    const errMsg = e ? e.toString() : '';
    const intl = new index_1.default(index_3.default);
    const regx = /install\s(.+)\serror/;
    const match = errMsg.match(regx);
    if (match) {
        log.debug('npm-not-found 捕获');
        log.error(intl.get('npmNotFound', { module: match[1] }));
        return true;
    }
    return false;
}
exports.default = default_1;
