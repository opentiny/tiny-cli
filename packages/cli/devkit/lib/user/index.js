"use strict";
/**
 * @desc 根据用户当前 git 信息去获取用户相关信息
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
exports.set = exports.get = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path = __importStar(require("path"));
const utils = __importStar(require("./utils"));
const index_1 = __importDefault(require("../home/index"));
const index_2 = require("../cli-config/index");
/**
 * 获取当前电脑用户
 */
function get() {
    let userInfo = utils.getUserFromFile();
    if (!userInfo.email) {
        userInfo = utils.getUserFromGit();
        // 获取之后再写入进去
        if (userInfo.name && userInfo.email) {
            const userFile = path.join(index_1.default.getHomePath(), index_2.FILE_USER);
            fs_extra_1.default.outputJsonSync(userFile, userInfo, { spaces: 2 });
        }
    }
    return userInfo;
}
exports.get = get;
/**
 * 写入user缓存
 * @param data 需要写入用户信息字段的数据
 */
function set(data) {
    // 获取home下的aio.user.json
    const userFile = path.join(index_1.default.getHomePath(), index_2.FILE_USER);
    if (fs_extra_1.default.existsSync(userFile)) {
        const user = fs_extra_1.default.readJsonSync(userFile);
        const userInfo = Object.assign(user, data);
        fs_extra_1.default.outputJsonSync(userFile, userInfo, { spaces: 2 });
    }
}
exports.set = set;
exports.default = {
    get,
    set,
};
