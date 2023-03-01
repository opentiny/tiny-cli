"use strict";
/**
 * Created by hugo on 16/11/16.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../log/index"));
const index_2 = __importDefault(require("./locale/index"));
const index_3 = __importDefault(require("../intl/index"));
const log = index_1.default('core-error');
async function default_1(e) {
    const intl = new index_3.default(index_2.default);
    const ERROR_MSG = intl.get('intranetTips');
    log.error(ERROR_MSG);
    e.stack && console.log(e.stack);
    return true;
}
exports.default = default_1;
