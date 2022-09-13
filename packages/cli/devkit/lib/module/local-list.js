"use strict";
/**
 * @desc: 本地模块列表
 */
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
const index_1 = __importDefault(require("../home/index"));
const index_2 = __importDefault(require("../log/index"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const path = __importStar(require("path"));
const utils_1 = __importDefault(require("./utils"));
const log = index_2.default('core-module');
/**
 * 列出所有本地模块
 * @param options object {type (按类型筛选): 'toolkit | plugin'}
 * @returns {Array}
 */
function localList(options) {
    options = options || {};
    const modulesPath = index_1.default.getModulesPath();
    let modulePkgs = [];
    const homePath = index_1.default.getHomePath();
    const homePkgPath = path.resolve(homePath, 'package.json');
    if (fs_extra_1.default.existsSync(homePkgPath)) {
        const homePkg = fs_extra_1.default.readJsonSync(homePkgPath);
        if (homePkg.dependencies) {
            Object.keys(homePkg.dependencies).forEach((item) => {
                const pkgPath = path.resolve(modulesPath, item, 'package.json');
                if (fs_extra_1.default.existsSync(pkgPath)) {
                    const modPkg = fs_extra_1.default.readJsonSync(pkgPath);
                    modulePkgs.push({
                        name: modPkg.name,
                        description: modPkg.description,
                        chName: modPkg.aioOption && modPkg.aioOption.chName ? modPkg.aioOption.chName : modPkg.description,
                    });
                }
            });
        }
    }
    modulePkgs = options.type ? utils_1.default.moduleFilter(modulePkgs, options.type) : modulePkgs;
    log.debug('所有本地模块: %o', modulePkgs);
    return modulePkgs;
}
exports.default = localList;
