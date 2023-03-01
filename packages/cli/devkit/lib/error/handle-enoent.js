"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by hugo on 16/11/16.
 */
const lodash_1 = __importDefault(require("lodash"));
const index_1 = __importDefault(require("../log/index"));
const index_2 = __importDefault(require("../intl/index"));
const index_3 = __importDefault(require("./locale/index"));
const log = index_1.default('core-error');
async function default_1(e) {
    if (e.code !== 'ENOENT') {
        return false;
    }
    // 目前可能的值有spawn xx ENOENT;spawnSync xx ENOENT
    const match = e.message.match(/\s(.*)ENOENT/);
    const intl = new index_2.default(index_3.default);
    if (match && match[0]) {
        const module = match[1].trim();
        const installer = 'npm';
        log.error(intl.get('commandNotFound', { module }));
        // 本地模块
        if (module.indexOf('node_modules') !== -1) {
            const cmdArr = module.split('/');
            const startIdx = lodash_1.default.indexOf(cmdArr, 'node_modules');
            let runModule;
            // 直接运行命令
            if (module.indexOf('node_modules/.bin/') !== -1) {
                runModule = cmdArr[cmdArr.length - 1];
            }
            else if (module.indexOf('node_modules/@ali') !== -1 && cmdArr.length >= 2) {
                // 本地文件直接运行
                runModule = `${cmdArr[startIdx + 1]}/${cmdArr[startIdx + 2]}`;
            }
            else {
                runModule = cmdArr[startIdx + 1];
            }
            log.error(intl.get('fixLocalTips', { installer, runModule }));
        }
        else {
            log.error(intl.get('fixGlobalTips', { installer, module }));
        }
        return true;
    }
    return false;
}
exports.default = default_1;
