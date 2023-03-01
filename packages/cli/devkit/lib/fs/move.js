"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const index_1 = __importDefault(require("../log/index"));
const log = index_1.default('core-fs');
function move(oldPath, newPath) {
    fs_extra_1.default.renameSync(oldPath, newPath);
    log.success(`${oldPath} move to ${newPath}`);
}
exports.default = move;
