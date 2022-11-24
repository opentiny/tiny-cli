#! /usr/bin/env node
import './config';
import commands from '@opentiny/cli-commands';
import { argv, home, Intl, logs, upgrade, error } from '@opentiny/cli-devkit';
const pkg = require('../package.json');
const log = logs('core-core');
try {
	(async function (this: any) {
		// 家目录存在性检查
		home.initHomeDir();

		// 初始化语言环境
		const intl = new Intl({ zh: {} });
		intl.initLocale();

		// 版本更新提示
		const needFocusUpdate = await upgrade({
			name: pkg.name,
			version: pkg.version,
		});

		if (needFocusUpdate) {
			log.error('\n当前cli工具版本太低，请升级到最新版后再使用\n');
			process.exit(1);
		}

		// 核心运行命令
		const coreCommands = Object.keys(commands).filter((item) => {
			return item !== 'main';
		});

		const cliArgv = argv();
		const command = cliArgv.command;
		const newArgv = cliArgv.argv;

		// 主入口日志上报
		if (!process.env.CLI_IS_CHILD_ENTRY) {
			process.env.CLI_IS_CHILD_ENTRY = 'true';
			// report.entry();
		}

		if (coreCommands.indexOf(command) === -1) {
			log.debug('进入套件,插件分支');
			await commands.main.apply(this, [command, newArgv]);
		} else {
			log.debug('进入核心命令分支');
			// init, install, install, uninstall, update ,version 等命令
			// 对 tiny.config.js 没有依赖, 也不执行自定义命令流
			await commands[command].apply(null, [newArgv]);
		}

		// 捕获异常
		process.on('uncaughtException', (err) => {
			log.debug(`进入未知错误${JSON.stringify(err)}`);
			error(err);
		});
	})();
} catch (err) {
	error(err);
}
