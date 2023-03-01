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
exports.getModuleVersion = exports.getCommand = exports.getProjectInfo = exports.getProjectEnv = exports.cacheEnvGetter = void 0;
const os = __importStar(require("os"));
const cp = __importStar(require("child_process"));
const index_1 = __importDefault(require("../home/index"));
const index_2 = __importDefault(require("../user/index"));
const path = __importStar(require("path"));
const index_3 = __importDefault(require("../git/index"));
const index_4 = require("../cli-config/index");
const index_5 = __importDefault(require("../fs/index"));
const index_6 = __importDefault(require("../cache/index"));
const yargs_1 = __importDefault(require("yargs"));
const argv = yargs_1.default.help(false).argv;
const execSync = cp.execSync;
/**
 * 环境变量获取
 */
exports.cacheEnvGetter = {
    nodeVersion() {
        return execSync('node -v')
            .toString()
            .replace(/[\nv]|\r/g, '');
    },
    user() {
        return index_2.default.get();
    },
    cliName() {
        return index_4.getBinName();
    },
    npmVersion() {
        try {
            return execSync('npm -v').toString().replace('\n', '');
        }
        catch (e) {
            return null;
        }
    },
    system() {
        return `${os.platform()} ${os.release()}`;
    },
};
/**
 * 获取项目的环境信息
 * @param force 为true时 则获取实时信息，否则读取缓存
 * 对 npm, node 版本等重新获取,一般在报错的时候才传入 true
 * @returns {*}
 */
function getProjectEnv(force) {
    let cacheEnv = index_6.default.get('envCache');
    if (!cacheEnv || force) {
        cacheEnv = {};
        const cacheEnvKeys = Object.keys(exports.cacheEnvGetter);
        cacheEnvKeys.forEach((item) => {
            cacheEnv[item] = exports.cacheEnvGetter[item]();
        });
        // 缓存12小时
        index_6.default.set('envCache', cacheEnv, { expires: 60 * 60 * 24 });
    }
    // 版本信息直接获取就行，不用缓存，因为可能更新会比较快
    cacheEnv['cliVersion'] = process.env[index_4.PROCESS_ENV_CLI_VERSION];
    return cacheEnv;
}
exports.getProjectEnv = getProjectEnv;
/**
 * 获取项目相关环境
 * @param cwd 项目路径
 * @returns {object} 返回项目相关的信息
            branch 当前项目分支
        pkg 当前package.json 内容
        configFile 当前 aio.config.js 内容
        repository 项目仓库url
 */
function getProjectInfo(cwd) {
    const branch = index_3.default.branch(cwd);
    const configPath = path.join(cwd, index_4.PROCESS_ENV_CONFIG_FILE);
    const pkg = index_5.default.readPackage(cwd);
    const repository = index_3.default.repository(cwd);
    let configFile;
    // 判断aio.config.js是否存在
    if (index_5.default.existsSync(configPath)) {
        delete require.cache[configPath];
        try {
            configFile = require(configPath);
        }
        catch (e) {
            configFile = null;
        }
    }
    return {
        branch,
        pkg,
        configFile,
        repository,
    };
}
exports.getProjectInfo = getProjectInfo;
/**
 * 获取当前执行的命令,移除用户路径
 */
function getCommand() {
    const argvClone = Object.assign({}, argv);
    const cmd = [index_4.getBinName()].concat(argv._);
    delete argvClone._;
    delete argvClone.$0;
    Object.keys(argvClone).forEach((item) => {
        cmd.push(`--${item}`);
        if (argvClone[item] !== true) {
            cmd.push(argvClone[item]);
        }
    });
    return cmd.join(' ');
}
exports.getCommand = getCommand;
/**
 * 获取模块的类型和版本
 * @param mod 模块名称
 */
function getModuleVersion(mod) {
    const modPkgPath = path.join(index_1.default.getModulesPath(), mod, 'package.json');
    const pkg = index_5.default.existsSync(modPkgPath) ? index_5.default.readJsonSync(modPkgPath, { throws: false }) : { version: null };
    return pkg.version;
}
exports.getModuleVersion = getModuleVersion;
