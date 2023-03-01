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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by hugo on 17/4/21.
 * 端口被占用时的错误处理
 */
const index_1 = __importDefault(require("../log/index"));
const index_2 = __importDefault(require("./locale/index"));
const chalk_1 = __importDefault(require("chalk"));
const index_3 = __importDefault(require("../intl/index"));
const os = __importStar(require("os"));
const log = index_1.default('core-error');
function handleSolution(port) {
    const isWin = os.type().match(/^Win/);
    const intl = new index_3.default(index_2.default);
    if (!isWin) {
        return chalk_1.default.yellow(intl.get('winPidTips', { port }));
    }
    return chalk_1.default.yellow(intl.get('macPidTips', { port }));
}
// 处理
async function default_1(e) {
    if (e.code !== 'EADDRINUSE') {
        return false;
    }
    const match = e.message.match(/listen EADDRINUSE(.*):(\d+)/);
    if (match && match[2]) {
        const port = match[2];
        const intl = new index_3.default(index_2.default);
        log.error(intl.get('helpTips', { port: chalk_1.default.green(port), solution: handleSolution(port) }));
        return true;
    }
    return false;
}
exports.default = default_1;
