"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../npm/index"));
/**
 * 线上模块是否存在
 */
async function onlineExist(name) {
    const latest = await index_1.default.latest(name);
    // 如果description 为 delete的话，则排查掉该模块，因为publish 之后，是不允许unpublish的
    return !!(latest && latest.description !== 'delete');
}
exports.default = onlineExist;
