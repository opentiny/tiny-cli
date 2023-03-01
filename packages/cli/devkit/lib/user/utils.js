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
exports.getUserFromGit = exports.getUserFromFile = void 0;
const index_1 = __importDefault(require("../home/index"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const path = __importStar(require("path"));
const index_2 = __importDefault(require("../log/index"));
const cross_spawn_1 = __importDefault(require("cross-spawn"));
const index_3 = require("../cli-config/index");
const log = index_2.default('core-user');
/**
 * 从配置文件中获取用户信息
 */
function getUserFromFile() {
    const userInfo = {
        name: '',
        email: '',
    };
    // 获取home下的aio.user.json
    const userFile = path.join(index_1.default.getHomePath(), index_3.FILE_USER);
    if (fs_extra_1.default.existsSync(userFile)) {
        const user = fs_extra_1.default.readJsonSync(userFile);
        userInfo.name = user.name;
        userInfo.email = user.email;
    }
    return userInfo;
}
exports.getUserFromFile = getUserFromFile;
/**
 * 从git的配置文件中获取用户信息
 */
function getUserFromGit() {
    const userInfo = {
        name: '',
        email: '',
    };
    const reg = /user\.name=([^\n]+)\nuser\.email=([^\n]+)/;
    try {
        const results = cross_spawn_1.default.sync('git', ['config', '--list']);
        if (results.stdout) {
            const match = results.stdout.toString().match(reg);
            if (match && match.length > 1) {
                userInfo.name = match[1];
                userInfo.email = match[2];
            }
            else {
                const msg = 'git config --list 没有git 信息,请检查git是否正确配置了用户名和email';
                log.debug(msg);
            }
        }
        else {
            const msg = '没有安装git';
            log.debug(msg);
        }
    }
    catch (ex) {
        log.debug('aio-user', ex);
        throw ex;
    }
    return userInfo;
}
exports.getUserFromGit = getUserFromGit;
