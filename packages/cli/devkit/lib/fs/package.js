"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writePackage = exports.readPackage = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path = __importStar(require("path"));
/**
 * 读取package文件
 * @param cwd package.json 所在的目录，默认取值 process.cwd()
 */
function readPackage(cwd) {
    cwd = cwd || process.cwd();
    const pkgPath = path.resolve(cwd, 'package.json');
    if (fs_extra_1.default.existsSync(pkgPath)) {
        return fs_extra_1.default.readJsonSync(pkgPath);
    }
    return null;
}
exports.readPackage = readPackage;
function writePackage(pkg, cwd) {
    cwd = cwd || process.cwd();
    const pkgPath = path.resolve(cwd, 'package.json');
    fs_extra_1.default.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2), { encoding: 'utf8' });
}
exports.writePackage = writePackage;
exports.default = {
    readPackage,
    writePackage,
};
