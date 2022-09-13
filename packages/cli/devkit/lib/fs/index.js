"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const copy_tpl_1 = __importDefault(require("./copy-tpl"));
const move_1 = __importDefault(require("./move"));
const remove_1 = __importDefault(require("./remove"));
const package_1 = __importDefault(require("./package"));
exports.default = Object.assign(Object.assign(Object.assign({}, fs_extra_1.default), { copyTpl: copy_tpl_1.default,
    move: move_1.default,
    remove: remove_1.default }), package_1.default);
