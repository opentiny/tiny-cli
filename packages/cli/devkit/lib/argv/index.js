"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const index_1 = __importDefault(require("../log/index"));
const argv = yargs_1.default.help(false).argv;
const log = index_1.default('core-argv');
exports.default = () => {
    // cli所需的命令
    let command;
    // cli命令所需的参数
    let newArgv = [];
    // 特殊处理一下传入的参数
    // aio -v 时候的处理
    if (!argv._.concat().pop() && (argv.v || argv.version)) {
        // 没有传入任何参数, 且有 -v 或 --version
        // 如果有传了参数,说明希望看到套件插件的版本,套件插件版本在 all.js 里面进行处理
        command = 'version';
    }
    else if (argv.help || argv.h) {
        // 执行 aio -h 或 aio -help 的时候
        if (argv._.length === 1) {
            // 显示插件帮助信息
            command = argv._[0];
            newArgv = ['help'];
        }
        else {
            command = 'help';
        }
    }
    else if (argv._.length === 0) {
        command = 'help';
    }
    else {
        newArgv = argv._.concat();
        command = newArgv.splice(0, 1).pop() || '';
    }
    log.debug('控制台传入的原始参数:', argv);
    log.debug('即将执行的aio命令:', command);
    log.debug('aio命令的参数:', newArgv);
    return {
        command,
        argv: newArgv,
    };
};
