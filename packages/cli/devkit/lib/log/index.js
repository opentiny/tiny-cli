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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const path = __importStar(require("path"));
const winston_1 = require("winston");
const index_1 = __importDefault(require("../home/index"));
const process = __importStar(require("process"));
const { combine, timestamp, colorize } = winston_1.format;
/**
 * 格式化额外信息
 * @param {*} meta
 * @returns
 */
const formatMeta = (meta) => {
    // You can format the splat yourself
    const splat = meta[Symbol.for('splat')];
    let msg = '';
    if (splat && splat.length) {
        try {
            msg = splat.length === 1 ? JSON.stringify(splat[0]) : JSON.stringify(splat);
        }
        catch (e) {
            console.error(e);
        }
    }
    return msg;
};
const formatMessage = winston_1.format.printf((info) => {
    const { level, message, label, timestamp, stack } = info, metadata = __rest(info, ["level", "message", "label", "timestamp", "stack"]);
    let output = message;
    // @ts-ignore
    if (message instanceof Error) {
        output = message.stack || message;
    }
    else if (typeof message === 'object') {
        output = JSON.stringify(message);
    }
    if (stack) {
        output += '\n' + stack;
    }
    return `${timestamp} [${label}]: ${output} ${formatMeta(metadata)}`;
});
// 单例化logger对象，各文件间共享
let _logger;
function loggerSingleton() {
    if (_logger) {
        return _logger;
    }
    else {
        // 定义一个全局变量用于改变log存放位置，也方便测试使用。
        const homePath = process.env.AIO_LOG_PATH || path.join(index_1.default.getHomePath(), 'log');
        _logger = winston_1.createLogger({
            level: 'verbose',
            format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), formatMessage),
            transports: [
                // console输出加个颜色
                new winston_1.transports.Console({
                    format: combine(colorize({ all: true, colors: { info: 'magenta', verbose: 'green' } })),
                }),
                // warn/error level的打印到文件
                new winston_1.transports.File({
                    filename: path.join(homePath, `${new Date().toISOString().split('T')[0]}.log`),
                    level: 'warn',
                }),
            ],
        });
        return _logger;
    }
}
/**
 * 基于winston输出日志
 * @param label: 标签，一般用于定位该日志是哪个模块输出的
 */
exports.default = (label) => {
    return (function () {
        const methodLevels = ['error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly'];
        const wLogger = {};
        methodLevels.forEach((level) => {
            wLogger[level] = function () {
                const args = [...arguments];
                const message = args.length === 1 ? args[0] : args;
                // debug模式下继续使用debug包在命令行输出
                if (level === 'debug') {
                    return debug_1.default(label).apply(null, args);
                }
                loggerSingleton().log({
                    level,
                    label,
                    message,
                });
            };
        });
        // 兼容原有success方法输出
        wLogger.success = wLogger.verbose;
        return wLogger;
    })();
};
