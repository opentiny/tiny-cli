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
exports.latest = exports.has = exports.runInstall = exports.installDependencies = exports.unInstall = exports.install = exports.setCnpmrc = exports.getCnpmrc = void 0;
const cross_spawn_1 = __importDefault(require("cross-spawn"));
const dargs_1 = __importDefault(require("dargs"));
const lodash_1 = __importDefault(require("lodash"));
const axios_1 = __importDefault(require("axios"));
const fs = __importStar(require("fs"));
const os = __importStar(require("os"));
const path = __importStar(require("path"));
const index_1 = __importDefault(require("../log/index"));
const index_2 = __importDefault(require("../cache/index"));
const index_3 = __importStar(require("../report/index"));
let cacheConfig;
const log = index_1.default('core-npm');
// TIMEOUT 超时时间
const TIMEOUT = 5000;
const defaultRegistrys = {
    // npm.inhuawei.com 由SRE的陈博维护，打通绿区及黄区
    registry: 'http://npm.inhuawei.com/',
    '@cloud:registry': 'http://npm.inhuawei.com/',
};
/**
 * 根据不同的环境获取npm地址
 * @param name : 模块名称
 * @returns {string}
 */
function getRegistry(name) {
    const config = getCnpmrc();
    name = name || '';
    let scope;
    let registry = config['registry'] || defaultRegistrys['registry'];
    if (name[0] === '@') {
        scope = name.slice(0, name.indexOf('/'));
    }
    if (scope) {
        registry = config[`${scope}:registry`] || defaultRegistrys[`${scope}:registry`];
    }
    // 需要以 "/" 结尾
    if (registry && !registry.endsWith('/')) {
        registry = `${registry}/`;
    }
    return registry;
}
/**
 * 获取cache配置
 */
function getCacheDir() {
    const config = getCnpmrc() || {};
    return config.cache;
}
/**
 * 获取cnpmrc配置文件
 */
function getCnpmrc() {
    if (cacheConfig)
        return cacheConfig;
    let root = os.homedir();
    const config = {};
    const userConfig = path.join(root, '.cnpmrc');
    if (!fs.existsSync(userConfig))
        return {};
    const userConfigContent = fs.readFileSync(userConfig).toString();
    let configs = [];
    configs = userConfigContent.split('\n');
    configs.reduce((pre, next) => {
        if (typeof next === 'string') {
            const map = next.split('=');
            const key = map[0];
            let value = map[1];
            // hugo windows 如果用os.EOL写入的话，会多出\r，需要移除一下，主要是为了兼容windows下换行只有\n的情况
            if (value) {
                value = value.replace('\r', '');
            }
            if (value === 'true')
                value = true;
            if (value === 'false')
                value = false;
            pre[key] = value;
        }
        return pre;
    }, config);
    cacheConfig = config;
    return config;
}
exports.getCnpmrc = getCnpmrc;
/**
 * 将对象写入进npmrc文件
 * @param config npmrc配置文件的内容
 */
function setCnpmrc(config) {
    const base = getCnpmrc();
    const newConfig = Object.assign(Object.assign({}, base), config);
    const root = os.homedir();
    const userConfig = path.join(root, '.cnpmrc');
    // 写入新内容到文件
    const data = [];
    Object.keys(newConfig).forEach((item) => {
        data.push(`${item}=${newConfig[item]}`);
    });
    fs.writeFileSync(userConfig, data.join(os.EOL));
}
exports.setCnpmrc = setCnpmrc;
/**
     * 安装 npm 包
     * @param pkg {string|array} 需要安装的包或包列表, 需要带版本号直接在包名后面 @ 版本号即可
            // pkgs: [
            //   { name: 'foo', version: '~1.0.0' },
            // ],
     * @param options
     */
async function install(pkg, options) {
    const installer = 'aio-install';
    await runInstall(installer, pkg, options);
}
exports.install = install;
/**
 * 移除npm包
 */
async function unInstall(pkg, options) {
    const installer = 'aio-uninstall';
    await runInstall(installer, pkg, options);
}
exports.unInstall = unInstall;
/**
 * 安装package.json 中的依赖
 */
async function installDependencies(options) {
    const installer = 'aio-install';
    await runInstall(installer, [], options);
}
exports.installDependencies = installDependencies;
/**
 * 安装 npm 包
 * @param installer {string} 安装工具路径
 * @param paths {string|array} 需要安装的包或包列表,需要带版本号直接在包名后面 @ 版本号即可, 留空安装当前目录下的 package.json 依赖
 * @param options
 */
async function runInstall(installer, paths, options) {
    const cwd = process.cwd();
    const cacheDir = getCacheDir();
    // npm默认值
    const option = lodash_1.default.defaults(options || {}, {
        stdio: 'inherit',
        registry: getRegistry(),
        cwd,
        china: true,
    });
    // 支持cnpmrc设置缓存目录
    if (cacheDir) {
        option.cacheDir = cacheDir;
    }
    // 如果指定强制不生成 package-lock.json 文件，则使用: --no-package-lock / 或者代码调用中传 package-lock: false
    if (option['package-lock'] === undefined && !option['no-package-lock']) {
        option['dependencies-tree'] = path.join(cwd, 'package-lock.json');
        option['save-dependencies-tree'] = true;
    }
    const cacheInstaller = index_2.default.get('installer');
    if (cacheInstaller && cacheInstaller === 'npm') {
        installer = 'npm';
        paths = ['i'].concat(paths);
        delete option.registry;
        delete option.china;
        const cnpmrc = path.join(os.homedir(), '.cnpmrc');
        // 指定npm的配置文件是cnpmrc
        if (fs.existsSync(cnpmrc)) {
            option.userconfig = cnpmrc;
        }
    }
    log.debug('installer = %s', installer);
    // 将pkg进行扁平化
    if (!Array.isArray(paths) && paths) {
        paths = paths.split(' ') || [];
    }
    const args = paths.concat(dargs_1.default(option, {
        aliases: {
            S: '-save',
            D: '-save-dev',
            O: '-save-optional',
            E: '-save-exact',
        },
    }));
    log.debug('args = %o', args);
    log.debug('options = %o', option);
    return new Promise((resolve, reject) => {
        cross_spawn_1.default(installer, args, option)
            .on('error', (e) => {
            reject(e);
        })
            .on('exit', (err) => {
            if (err) {
                reject(new Error(`安装 ${paths} 失败！为了保证项目稳定性，请删除本地失败的node_modules后再重试。可执行命令: rm -rf node_modules`));
            }
            else {
                resolve(true);
            }
        });
    });
}
exports.runInstall = runInstall;
/**
 * 是否存在模块
 * @param name
 */
async function has(name, options) {
    const registry = getRegistry(name);
    options = Object.assign({ registry }, options);
    const url = `${options.registry}${encodeURIComponent(name)}/latest`;
    log.debug('check module has =%s', url);
    try {
        const res = await axios_1.default.head(url, { timeout: TIMEOUT });
        return !/4\d\d/.test(res.status);
    }
    catch (e) {
        const errMsg = `get ${url} has error: ${e.toString()}`;
        log.error(errMsg);
        index_3.default.error(index_3.ErrorType.MODULE_NOT_FOUND, errMsg);
        return false;
    }
}
exports.has = has;
/**
 * 获取最新私有npm的包信息
 */
async function latest(name, options) {
    const registry = getRegistry(name);
    options = Object.assign({ registry, version: 'latest' }, options);
    const url = `${options.registry}${encodeURIComponent(name)}/${options.version}`;
    let data = null;
    try {
        log.debug(`get ${name} url = %s`, url);
        // 5秒到期
        const res = await axios_1.default.get(url, { timeout: TIMEOUT });
        data = res.data;
        if (!data) {
            data = null;
        }
    }
    catch (e) {
        const errMsg = `get ${url} has error: ${e.toString()}`;
        log.error(errMsg);
        index_3.default.error(index_3.ErrorType.MODULE_NOT_FOUND, errMsg);
        // 返回数据出错
        data = null;
    }
    return data;
}
exports.latest = latest;
exports.default = {
    install,
    installDependencies,
    latest,
    has,
    getCnpmrc,
    setCnpmrc,
    runInstall,
};
