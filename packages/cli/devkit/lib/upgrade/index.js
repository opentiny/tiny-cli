"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../cache/index"));
const index_2 = __importDefault(require("../intl/index"));
const index_3 = __importDefault(require("../log/index"));
const index_4 = __importDefault(require("../npm/index"));
const index_5 = __importDefault(require("../cli-config/index"));
const chalk_1 = __importDefault(require("chalk"));
const node_emoji_1 = __importDefault(require("node-emoji"));
const semver_1 = __importDefault(require("semver"));
const index_6 = __importDefault(require("./locale/index"));
const log = index_3.default('core-upgrade');
const TIP_CACHE_KEY = '__versionTip';
/**
 * 升级提示，若发布新版本，会定时提醒是否需要更新
 * @param data object { "name" : 包名, "version" : 当前版本}
 */
async function updateTip(data) {
    let needFocusUpdate = false;
    if (index_1.default.get(TIP_CACHE_KEY)) {
        return needFocusUpdate;
    }
    const latest = await index_4.default.latest(data.name);
    // 缓存设置为24小时，过24小时才重新提示升级 cli
    index_1.default.set(TIP_CACHE_KEY, true, {
        expires: 86400000,
    });
    // latest 没有值，可能没有网络
    if (!latest) {
        return needFocusUpdate;
    }
    log.debug('%s current-version: %s, latest-version: %s', data.name, data.version, latest.version);
    // 当前版本是最新
    if (!semver_1.default.lt(data.version, latest.version)) {
        return needFocusUpdate;
    }
    // 当更新了Y位的话，启动自动升级机制
    needFocusUpdate = semver_1.default.diff(data.version, latest.version) === 'minor';
    log.debug('needFocusUpdate =>', needFocusUpdate);
    // 当当前版本的y位有变化，强制更新cli
    const installer = index_5.default.getBinName() || 'npm';
    const intl = new index_2.default(index_6.default);
    console.log('\n');
    log.warn(`******************** ${node_emoji_1.default.get('warning')} ${node_emoji_1.default.get('warning')}   ${intl.get('updateTips')}  ${node_emoji_1.default.get('warning')} ${node_emoji_1.default.get('warning')} **********************`);
    log.warn(intl.get('recommendedVersion', {
        latest: chalk_1.default.green.bold(latest.version),
        localVersion: data.version,
    }));
    // 区分一下自动升级与手动升级的文案
    if (needFocusUpdate) {
        log.warn(intl.get('updatingCommand', {
            icon: node_emoji_1.default.get('point_right'),
            command: chalk_1.default.bgRed.bold(` ${installer} i ${data.name} @opentiny/cli-install -g `),
        }));
    }
    else {
        log.warn(intl.get('updateCommand', {
            icon: node_emoji_1.default.get('point_right'),
            command: chalk_1.default.bgRed.bold(` ${installer} i ${data.name} @opentiny/cli-install -g`),
        }));
    }
    // linux & mac 下才提示
    if (process.platform.indexOf('win') !== 0) {
        log.warn(`${intl.get('ifUpdateError')} ${chalk_1.default.red.bold(`sudo ${installer} install -g ${data.name} @opentiny/cli-install`)}`);
    }
    log.warn(`******************************${node_emoji_1.default.get('point_up_2')} ${node_emoji_1.default.get('point_up_2')} ******************************`);
    console.log('\n');
    if (needFocusUpdate) {
        // 执行 npm install -g @opentiny/cli 和  @opentiny/cli-install更新本地系统
        const depen = [`${data.name}`, '@opentiny/cli-install'];
        await index_4.default.install(depen, {
            // global安装
            g: true,
        });
        log.success('当前cli工具已更新至最新版本');
        // cli工具更新完成，终止进程
        process.exit(1);
    }
    return needFocusUpdate;
}
exports.default = updateTip;
