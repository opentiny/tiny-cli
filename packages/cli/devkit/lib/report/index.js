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
exports.sendReportForError = exports.ErrorType = exports.sendReportForModule = exports.sendReportEntry = exports.send = exports.baseData = void 0;
/**
 * @desc 信息上报
 */
const axios_1 = __importDefault(require("axios"));
const index_1 = __importDefault(require("../log/index"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const utils_1 = require("./utils");
const index_2 = __importDefault(require("../git/index"));
const index_3 = __importDefault(require("../cli-config/index"));
const cwd = process.cwd();
const log = index_1.default('core-report');
const TIMEOUT = 300;
// 在客户端中不好加密，先硬编码
const APITOKEN = '14ZOEzkrW5*s837!tA7AytKJDC5SSI9JdM!0Mb59@gOAK2';
let host = 'https://tinycommon.cloudbu.huawei.com';
if (process.env.NODE_ENV === 'local') {
    host = 'http://tinyops.dev.huawei.com:7001';
}
/**
 * 核心入口命令发送，用于统计谁做了什么操作
 */
function baseData() {
    let branch = null;
    let repository = null;
    try {
        if (fs.existsSync(path.join(cwd, '.git'))) {
            branch = index_2.default.branch(cwd);
            repository = index_2.default.repository(cwd);
        }
    }
    catch (e) {
        console.error(e);
    }
    const info = utils_1.getProjectEnv();
    const command = utils_1.getCommand();
    return {
        userEmail: info.user.email,
        userName: info.user.name,
        cliName: info.cliName,
        cliVersion: info.cliVersion,
        system: info.system,
        npm: info.npmVersion,
        node: info.nodeVersion,
        git: repository,
        branch: branch,
        command,
        cwd,
    };
}
exports.baseData = baseData;
/**
* 上报日志
* @param {object} data
*/
function send(type, data) {
    const url = `${host}/tinystage/api/${type}`;
    log.debug('send log for api = %s', url);
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
    process.env['NODE_NO_WARNINGS'] = '1';
    axios_1.default({
        method: 'GET',
        url,
        data,
        headers: {
            'access-token': APITOKEN
        },
        timeout: 2000,
    }).then(function () {
        log.debug('send log success');
    }).catch(function (error) {
        log.debug('send log error');
        log.debug(error);
    });
}
exports.send = send;
function sendReportEntry() {
    const data = baseData();
    log.debug('sendReportEntry最终发送的数据 = %o', data);
    // 能获取到用户信息的话，才注入进去
    if (data.userEmail) {
        send('report-log', data);
    }
}
exports.sendReportEntry = sendReportEntry;
/**
 * 根据模块名称发送日志
 * 非入口命令发送，主要是任务流中tasks 里面的command 任务
 */
function sendReportForModule(name) {
    const moduleVersion = utils_1.getModuleVersion(name);
    const moduleEntry = index_3.default.getModuleEntry();
    const data = Object.assign(Object.assign({}, baseData()), { moduleName: name, moduleVersion });
    // 判断如果名称一致的话，则不显示入口
    // moduleEntry 主要是标明当前命令是执行哪个命令运行起来的
    if (moduleEntry) {
        data.moduleEntry = moduleEntry;
    }
    log.debug('sendReportForModule最终发送的数据 = %o', data);
    if (data.userEmail) {
        send('report-log', data);
    }
}
exports.sendReportForModule = sendReportForModule;
var ErrorType;
(function (ErrorType) {
    ErrorType["MODULE_NOT_FOUND"] = "module-not-found";
    ErrorType["CLI_CORE"] = "cli-core";
    ErrorType["CONFIG_ERROR"] = "config-error";
    ErrorType["TASK_ERROR"] = "task-error";
})(ErrorType = exports.ErrorType || (exports.ErrorType = {}));
/**
 * 发生错误时，上报日志
 */
function sendReportForError(errType, errDetail) {
    const data = Object.assign(Object.assign({}, baseData()), { errType,
        errDetail });
    log.debug('sendReportForError最终发送的数据 = %o', data);
    if (data.userEmail) {
        send('error-log', data);
    }
}
exports.sendReportForError = sendReportForError;
exports.default = {
    ErrorType,
    /**
     * 用户执行命令时发送记录
     */
    entry: function () {
        // 构建环境就不发送了
        if (process.env.res_domain)
            return;
        setTimeout(function () {
            sendReportEntry();
        }, TIMEOUT);
    },
    /**
     * 由aio工具触发的命令时记录
     * @param name aio模块名称
     */
    module: function (name) {
        // 构建环境就不发送了
        if (process.env.res_domain)
            return;
        setTimeout(function () {
            sendReportForModule(name);
        }, TIMEOUT);
    },
    /**
     * 运行异常时发送日志
     * @param errType 错误类型
     * @param errDetail 错误详情
     */
    error: function (errType, errDetail) {
        // 构建环境就不发送了
        if (process.env.res_domain)
            return;
        setTimeout(function () {
            sendReportForError(errType, errDetail);
        }, TIMEOUT);
    },
};
