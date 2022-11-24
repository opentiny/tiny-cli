/**
 * Copyright (c) 2022 - present TinyCli Authors.
 * Copyright (c) 2022 - present Huawei Cloud Computing Technologies Co., Ltd.
 *
 * Use of this source code is governed by an MIT-style license.
 *
 * THE OPEN SOURCE SOFTWARE IN THIS PRODUCT IS DISTRIBUTED IN THE HOPE THAT IT WILL BE USEFUL,
 * BUT WITHOUT ANY WARRANTY, WITHOUT EVEN THE IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS FOR
 * A PARTICULAR PURPOSE. SEE THE APPLICABLE LICENSES FOR MORE DETAILS.
 *
 */
/**
 * @desc: 所有的套件/插件公共流程
 * 自定义prefix 本地套件/插件 -> tiny本地套件/插件 -> 自定义线上套件/插件 -> tiny线上套件/插件
 */
import { config, home, Intl, logs, modules, task, cliConfig, error } from '@opentiny/cli-devkit';
import chalk from 'chalk';
import fs from 'fs-extra';
import * as path from 'path';
import yargs from 'yargs';
import message from './locale/index';

const log = logs('core-commands');

const clientOptions = { ...yargs.parserConfiguration({ 'camel-case-expansion': false }).help(false).argv };

/**
 * 当遇到 start , build 命令时,判断用户是否在正确的目录
 * @param command
 * @returns {boolean}
 */
function isErrorDirectory(command: string): boolean {
	const intl = new Intl(message);
	// 如果当前目录下不存在tiny.config.js 则提示
	if (['start', 'build'].indexOf(command) !== -1 && !config.exist()) {
		log.debug('error directory');
		log.error(intl.get('configFileNotFound', { file: config.getConfigName() }));
		return false;
	}
	return true;
}

class Main {
	/**
	 * 主流程(非内置核心命令主流程)
	 * @param command
	 * @param cliArgs
	 */
	public async start(command: string, cliArgs: any) {
		const tasks = config.get('tasks') || {};
		const hasBeforeTask = task.has(tasks[command], 'before');
		const hasAfterTask = task.has(tasks[command], 'after');

		const intl = new Intl(message);
		log.debug('tasks = %o , command = %s, cliArgs = %o', tasks, command, cliArgs);
		log.debug(`before task ${hasBeforeTask}`);

		// 去掉 clientOptions 里面多余的字段
		delete clientOptions._;
		delete clientOptions.$0;

		// 错误提示提前判断
		if (!isErrorDirectory(command)) {
			return;
		}
		// 如果第一个参数为 plugin, 强制执行某个插件, 并且忽略所有的前置,后置任务
		if (command === 'plugin') {
			if (cliArgs.length < 1) {
				log.error(intl.get('runPlugin'));
				return;
			}
			command = cliArgs.splice(0, 1)[0];

			log.debug('new tasks = %o , command = %s, cliArgs = %o', tasks, command, cliArgs);
			await this.runPlugin(command, cliArgs);
			return;
		}

		// ------------- 展示版本号, 并中止后面的任务 ---------------
		if (cliArgs && cliArgs.length === 0 && (clientOptions.v || clientOptions.version)) {
			await this.showVersion(command);
			return;
		}

		// ------------- 执行前置任务 ---------------
		await this.runPreTask(command, cliArgs);

		// -------------- 执行套件任务 ---------------
		let toolkitName = config.exist() ? config.get('toolkit') : '';
		let toolkit: any = {};
		if (toolkitName) {
			const moduleInfo = await modules.getReallyName(toolkitName);
			// 判断套件是否存在
			if (moduleInfo.exist) {
				toolkitName = moduleInfo.reallyName;
				toolkit = await modules.get(toolkitName);
			}
		}
		const toolkitCommand = modules.getEsModule(toolkit[command]);

		// 如果判断到有套件且有对应命令的方法,那么直接执行并返回, 否则向下执行插件逻辑
		if (typeof toolkitCommand === 'function') {
			log.debug(`找到套件 ${toolkitName} 对应的 ${command} 方法`);
			// 套件发送log
			// log.debug(`套件 ${toolkitName} LOG开始发送...`);
			cliConfig.setModuleEntry(toolkitName);
			const afterToolCommand = async () => {
				// -------------- 执行后置任务 ---------------
				await this.runPostTask(command, cliArgs);
			};
			// 传入 callback ,兼容未使用 generator 版本套件和插件
			const optionsArg = {
				clientArgs: cliArgs,
				clientOptions,
			};
			await task.runFunction({
				method: toolkitCommand,
				args: toolkitCommand.length > 1 ? [optionsArg, afterToolCommand] : [optionsArg],
				// task 模块调用
				next: afterToolCommand,
			});
			return;
		} else if (hasAfterTask) {
			log.debug('未找到对应的套件及方法');
			// 只有后置命令, 却没有套件模块的给个提示
			const msg = intl.get('notRunTips', { command });
			log.error(msg);
			return;
		}

		// start build 错误提示
		if (['start', 'build'].indexOf(command) !== -1) {
			if (toolkitName) {
				const tool = cliConfig.getBinName();
				log.error(intl.get('startNotRunTips', { command, tool }));
			} else {
				// 存在tiny.config.js文件且文件中有对应的 start、build、publish时则不需要提示
				if (!(hasBeforeTask || hasAfterTask)) {
					log.error(
						intl.get('configNotRunTips', {
							file: config.getConfigName(),
							command,
						})
					);
				}
			}
			return;
		}

		// -------------- 执行插件任务 ---------------
		// 在已经执行了任务流的情况下,直接不执行插件逻辑
		if (!hasBeforeTask && !hasAfterTask) {
			log.debug('尝试执行插件方法');
			await this.runPlugin(command, cliArgs);
		}
	}

	/**
	 * 执行前置任务
	 * @param command 
	 * @param cliArgs 
	 */
	public async runPreTask(command: string, cliArgs: any) {
		const tasks = config.get('tasks') || {};
		const hasBeforeTask = task.has(tasks[command], 'before');
		if (hasBeforeTask) {
			const optionsArg = {
				clientArgs: cliArgs,
				clientOptions,
			};

			await task.run({
				tasks: tasks[command],
				args: [
					{
						...optionsArg,
					},
					optionsArg,
				],
				when: 'before',
				command,
			});
		}
	}

	/**
	 * 执行后置任务
	 * @param command 
	 * @param cliArgs 
	 */
	public async runPostTask(command: string, cliArgs: any) {
		const tasks = config.get('tasks') || {};
		const hasAfterTask = task.has(tasks[command], 'after');
		if (hasAfterTask) {
			try {
				const optionsArg = {
					clientArgs: cliArgs,
					clientOptions,
				};
				await task.run({
					tasks: tasks[command],
					args: [optionsArg],
					when: 'after',
					command,
				});
			} catch (err) {
				error(err);
			}
		}
	}

	/**
	 * 运行插件命令
	 * 运行逻辑：自定义本地插件 -> tiny本地插件 -> 自定义线上插件 -> tiny线上插件
	 * 先走本地已安装，速度快一些
	 * @param name
	 * @param cliArgs
	 */
	public async runPlugin(name: string, cliArgs: any[]) {
		const fullName = modules.utils.pluginFullName(name);
		const module = await modules.getReallyName(fullName);
		const intl = new Intl(message);
		if (module.exist) {
			// 设置模块入口
			cliConfig.setModuleEntry(module.reallyName);
			const plugin = await modules.get(module.reallyName);
			let method;
			let pluginCmd = '';
			log.debug(' 插件信息 %o', plugin);
			if (typeof plugin === 'function') {
				method = plugin;
			} else if (typeof plugin === 'object') {
				if (cliArgs.length) {
					pluginCmd = cliArgs.shift();
					method = modules.getEsModule(plugin[pluginCmd]);
				} else if (typeof plugin.default === 'function') {
					method = plugin.default;
				}
			}
			if (!method) {
				const msg = intl.get('pluginCommandNotFound', {
					module: module.reallyName,
					pluginCmd,
				});
				log.error(msg);
				return;
			}

			const optionsArg = { clientArgs: cliArgs, clientOptions };

			await task.runFunction({
				method,
				args: [optionsArg],
			});
		} else {
			const msg = intl.get('pluginNotFound', { plugin: module.reallyName });
			log.error(msg);
		}
	}

	/**
	 * 展示本地版本号，显示查找逻辑：自定义prefix本地模块 -> tiny本地模块
	 */
	public async showVersion(name: string) {
		let existsOne = false;
		const intl = new Intl(message);
		const logOne = async function (n: string) {
			n = modules.utils.fullName(n);
			const prefix = modules.utils.prefix();
			const localExist = modules.localExist(n);
			let mod: any = '';
			if (localExist) {
				mod = fs.readJsonSync(path.resolve(home.getModulesPath(), n, 'package.json'), {
					throws: false,
				});
			} else if (prefix !== cliConfig.DEFAULT_BIN) {
				n = n.replace(prefix, cliConfig.DEFAULT_BIN);
				mod = fs.readJsonSync(path.resolve(home.getModulesPath(), n, 'package.json'), {
					throws: false,
				});
			}
			if (mod && mod.version) {
				existsOne = true;
				console.log(chalk.magenta(intl.get('moduleVersion', { module: n, version: mod.version })));
			}
		};
		if (name.indexOf('toolkit-') > -1 || name.indexOf('plugin-') > -1) {
			await logOne(name);
			return;
		}

		await logOne(`toolkit-${name}`);
		await logOne(`plugin-${name}`);

		if (!existsOne) {
			const msg = intl.get('localNotFound', { name });
			log.error(msg);
		}
	}
}
const main = new Main();

export default (command: string, cliArgs: any) => {
	main.start(command, cliArgs);
};
