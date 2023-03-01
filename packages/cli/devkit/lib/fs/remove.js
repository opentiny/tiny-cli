"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const index_1 = __importDefault(require("../log/index"));
const log = index_1.default('core-fs');
function remove(file) {
    if (!fs_extra_1.default.existsSync(file)) {
        return log.warn(`${file} Directory or file does not exist, no need to delete`);
    }
    fs_extra_1.default.removeSync(file);
    return log.success(`${file} successfully deleted`);
}
exports.default = remove;
