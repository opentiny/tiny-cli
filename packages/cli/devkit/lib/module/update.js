"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../intl/index"));
const index_2 = __importDefault(require("../log/index"));
const index_3 = __importDefault(require("./locale/index"));
const install_one_1 = __importDefault(require("./install-one"));
const local_list_1 = __importDefault(require("./local-list"));
const log = index_2.default('core-module');
/**
 * 更新模块
 * @param name
 */
async function update(name) {
    const options = {
        type: 'update',
    };
    if (name) {
        log.debug(`单独更新模块 ${name}`);
        await install_one_1.default(name, options);
        return;
    }
    const list = await local_list_1.default();
    log.debug('更新本地列表 %o', list);
    for (let i = 0; i < list.length; i += 1) {
        // todo 先全部重新安装 ,后面再做版本判断
        await install_one_1.default(list[i].name, options);
    }
    if (list.length === 0) {
        const intl = new index_1.default(index_3.default);
        log.success(intl.get('updateNone'));
    }
}
exports.default = update;
