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
const path = __importStar(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const fsPkg = __importStar(require("./package"));
const ava_1 = __importDefault(require("ava"));
const pkgMock = {
    varsion: '1.0.0',
    name: 'aio',
};
const pkgPath = path.join(__dirname, 'package.json');
ava_1.default.before(() => {
    fs_extra_1.default.outputJsonSync(pkgMock, pkgPath);
});
ava_1.default('# readPackage', t => {
    const pkg = fsPkg.readPackage(__dirname);
    t.is(pkg.name, 'aio');
});
ava_1.default('# writePackage', t => {
    fsPkg.writePackage({
        version: '1.0.1',
        name: 'aio2',
    }, __dirname);
    const pkg = require(path.join(__dirname, 'package.json'));
    t.is(pkg.name, 'aio2');
});
