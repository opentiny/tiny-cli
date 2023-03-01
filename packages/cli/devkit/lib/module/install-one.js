"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../cache/index"));
const index_2 = __importDefault(require("../home/index"));
const index_3 = __importDefault(require("../intl/index"));
const index_4 = __importDefault(require("../log/index"));
const index_5 = __importDefault(require("../npm/index"));
const index_6 = __importDefault(require("./locale/index"));
const utils_1 = __importDefault(require("./utils"));
const index_7 = require("../cli-config/index");
const log = index_4.default('core-module');
/**
 *
 * @param name 模块名称，可能的格式{modulename}@{version} or {modulename}
 * @param options
 */
async function installOne(name, options) {
    const prefix = utils_1.default.prefix();
    const homeCwd = index_2.default.getHomePath();
    const scope = index_7.getScope();
    let version = 'latest';
    const intl = new index_3.default(index_6.default);
    let pureName = '';
    options = Object.assign({ type: 'install' }, options);
    // 匹配套件名称，其中需要判断前缀是否是自定义的
    let match = name.match(new RegExp(`^(@${scope}/)?([A-Za-z0-9_-]*)-(toolkit|plugin)-`));
    if (!match && scope != index_7.DEFAULT_SCOPE) {
        match = name.match(new RegExp(`^(@${index_7.DEFAULT_SCOPE}/)?([A-Za-z0-9_-]*)-(toolkit|plugin)-`));
    }
    // 判断逻辑：前缀存在 且 前缀为自定义设置的 或者前缀是aio
    if (!(match && match[2] && (match[2] === prefix || match[2] === index_7.DEFAULT_BIN))) {
        log.error(intl.get('importPkgError'));
        return;
    }
    // 判断是否带了 @版本号
    if (!new RegExp(`^(@${scope}/)?.+@.+$`).test(name)) {
        // 没带版本号
        pureName = name;
        // TODO option值哪里来
        if (options.lastPkg && options.lastPkg.version) {
            version = options.lastPkg.version;
        }
        name += `@${version}`;
    }
    else {
        const nameArr = name.split('@');
        version = nameArr.pop() || 'latest';
        pureName = nameArr.join('@');
    }
    // 开始安装
    log.debug(`开始安装 ${name}`);
    utils_1.default.addModuleToDependencies(homeCwd, pureName, version);
    try {
        await index_5.default.installDependencies({
            cwd: homeCwd,
        });
    }
    catch (e) {
        utils_1.default.removeModuleToDependencies(homeCwd, pureName);
        log.error(intl.get('installError', { name: pureName }));
        log.error(e);
        process.exit(1);
    }
    // 设置缓存, 1天内不再检查
    index_1.default.set(`${utils_1.default.UPDATE_CHECK_PRE}${pureName}`, true, {
        expires: utils_1.default.NO_TIP_PERIOD,
    });
    // 提示安装成功
    if (options.type === 'install') {
        log.success(intl.get('installSuccess', { name: pureName }));
        return;
    }
    log.success(intl.get('updateSuccess', { name: pureName }));
    // 打印更新日志
    if (!options.lastPkg) {
        options.lastPkg = await index_5.default.latest(pureName);
    }
    if (!options.lastPkg) {
        return;
    }
    utils_1.default.updateLog(pureName, {
        localPkg: options.localPkg,
        lastPkg: options.lastPkg,
        level: 'success',
    });
}
exports.default = installOne;
