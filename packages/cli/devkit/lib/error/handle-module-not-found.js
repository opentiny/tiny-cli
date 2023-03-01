"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../log/index"));
const index_2 = __importDefault(require("./locale/index"));
const utils_1 = __importDefault(require("./utils"));
const index_3 = __importDefault(require("../npm/index"));
const index_4 = __importDefault(require("../intl/index"));
const home_1 = __importDefault(require("../home"));
const log = index_1.default('core-error');
// 处理
async function default_1(e) {
    if (e.code !== 'MODULE_NOT_FOUND') {
        return false;
    }
    const match = e.message.match(/'(.*)'/);
    const intl = new index_4.default(index_2.default);
    const cwd = process.cwd();
    // 排除 相对路径 ../ & ./ 的情况( . 开头)
    if (match && match[0] && match[0].indexOf('.') !== 1) {
        const module = utils_1.default.pureModuleName(match[1]);
        log.error(intl.get('moduleNotFound', { module }));
        let moduleCwd = home_1.default.getHomePath();
        // 判断一下如果是项目文件中抛出的报错,则需要安装在项目文件夹中
        if (e.stack && e.stack.toString().indexOf(cwd) !== -1) {
            moduleCwd = cwd;
            // 这种情况下极有可能是本地的相关依赖没有安装,先全部执行一次安装
            await index_3.default.installDependencies();
            log.success(intl.get('installSuccess'));
        }
        try {
            // 安装所需的依赖
            await index_3.default.install(module, {
                cwd: moduleCwd,
            });
            log.success(intl.get('installDone', { module, moduleCwd }));
            log.success(intl.get('installDoneTips'));
            return true;
        }
        catch (err) {
            log.error(intl.get('installError'));
            return false;
        }
    }
    else if (match && match.length === 2) {
        log.error(intl.get('notFound', { file: match[1] }));
        if (e.stack) {
            log.error(intl.get('detailError'));
            console.log(e.stack);
        }
        return true;
    }
    return false;
}
exports.default = default_1;
