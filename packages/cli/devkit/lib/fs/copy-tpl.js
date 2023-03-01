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
const fs_extra_1 = __importDefault(require("fs-extra"));
const path = __importStar(require("path"));
const index_1 = __importDefault(require("../log/index"));
const ejs_1 = __importDefault(require("ejs"));
const log = index_1.default('core-fs');
/**
 * 判断是否是模板路径
 * @param srcPath 路径
 */
function isTemplate(srcPath) {
    const arr = srcPath.split(path.sep);
    let i = 0;
    arr.forEach(item => {
        if (item === 'template') {
            i += 1;
        }
    });
    return i >= 2;
}
/**
 * replace content with template scope,
 * - `{{ test }}` will replace
 * - `\{{ test }}` will skip
 *
 * @param {String} content - template content
 * @param {Object} scope - variable scope
 * @return {String} new content
 */
function replaceTemplate(content, scope) {
    const pattern = /{\s*(\w+?)\s*}/g; // {property}
    return content.replace(pattern, (_, token) => scope[token] || '');
}
// 非文本类型的文件直接copy过去
const notTextFileType = [
    '.gz',
    '.tgz',
    '.jpg',
    '.xls',
    '.xlsx',
    '.doc',
    '.docx',
    '.png',
    '.apng',
    '.gif',
    '.webp',
    '.psd',
    '.zip',
    '.tar',
    '.rar',
    '.7z',
    '.bz2',
    '.dmg',
    '.mp4',
    '.jpeg',
    '.woff',
    '.woff2',
    '.eot',
    '.ttf',
    '.otf',
    '.ico',
];
/**
 *
 * @param from 原始文件路径
 * @param to 目标文件路径
 * @param context ejs 模板替换的对象
 * @param options object对象，用于过滤和重命名文件
 * @param options.ignore 数组, 类似 gitignore 的写法，默认值['node_modules', '.DS_Store', '.idea']
 * @param options.rename 重命名文件
 * @param options.notTextFile 非文本类型的文件，默认值[];
 */
function copyDirectory(from, to, context, options) {
    options = options || {};
    options.ignore = options.ignore || ['node_modules', '.DS_Store', '.idea'];
    const notTextFile = options.notTextFile ? notTextFileType.concat(options.notTextFile) : notTextFileType;
    // 递归读取目录
    const recursiveDir = (curSrcPath, curDistPath) => {
        curDistPath = replaceTemplate(curDistPath, context);
        // curSrcPath = ejs.render(curSrcPath, context, { escape: '{{', rmWhitespace: '}}'})
        // console.log(curSrcPath, '=curSrcPath2',context)
        const stats = fs_extra_1.default.statSync(curSrcPath);
        // 目录处理
        if (stats.isDirectory()) {
            // 若目标目录不存在, 会创建一个
            fs_extra_1.default.mkdirsSync(curDistPath);
            const dirFiles = fs_extra_1.default.readdirSync(curSrcPath);
            for (let i = 0; i < dirFiles.length; i += 1) {
                if (options && options.ignore && options.ignore.indexOf(dirFiles[i]) === -1) {
                    recursiveDir(path.resolve(curSrcPath, dirFiles[i]), path.resolve(curDistPath, dirFiles[i]));
                }
            }
        }
        else {
            // 文件处理
            const curDistPathArr = curDistPath.split(path.sep);
            const fileName = curDistPathArr.pop() || '';
            let newFilename = fileName;
            // 自定义文件名转换
            if (options && options.rename) {
                newFilename = options.rename(fileName);
                if (!newFilename) {
                    log.error(`${fileName} = File name conversion failed and returned empty`);
                    return;
                }
            }
            // 重命名 _ 开头的文件为 . ， 过滤掉template目录下的内容
            if (fileName.indexOf('_') === 0) {
                newFilename = fileName.replace('_', '.');
                curDistPath = path.resolve(curDistPathArr.join(path.sep), newFilename);
            }
            curDistPath = path.resolve(curDistPathArr.join(path.sep), newFilename);
            // 非文本文件，直接copy
            if (notTextFile.indexOf(path.extname(newFilename)) !== -1) {
                fs_extra_1.default.copySync(curSrcPath, curDistPath);
                log.success(`${curDistPath} copy successfully`);
            }
            else {
                let fileContent = fs_extra_1.default.readFileSync(curSrcPath, { encoding: 'utf8' }).toString();
                // 文件内容变量替换
                // 模板下的模板不做替换，如toolkit-dev 下的toolkit/template
                const ignoreTemplate = isTemplate(curSrcPath);
                // 单独设置了不需要ejs的文件
                let ignoreFile = false;
                if (options && options.ignoreEjs && options.ignoreEjs.length) {
                    ignoreFile = options.ignoreEjs.indexOf(curSrcPath) !== -1;
                }
                if (context && !ignoreTemplate && !ignoreFile) {
                    try {
                        fileContent = ejs_1.default.render(fileContent, context, options);
                    }
                    catch (e) {
                        log.error(`${curDistPath} file written error !`);
                        throw e;
                    }
                }
                const writeErr = fs_extra_1.default.writeFileSync(curDistPath, fileContent);
                if (!writeErr) {
                    log.success(`${curDistPath} written successfully`);
                }
                else {
                    log.error(`${curDistPath} written error`);
                }
            }
        }
    };
    recursiveDir(from, to);
}
exports.default = copyDirectory;
