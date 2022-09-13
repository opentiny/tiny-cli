import Intl from '../intl/index';
import logs from '../log/index';
import message from './locale/index';
import runFunction from './run-function';
import fs from '../fs/index';
import report, { ErrorType } from '../report/index';
import utils from './utils';
import corssSpawn from 'cross-spawn';
import { DEFAULT_BIN, PROCESS_ENV_BIN } from '../cli-config/index';

const npmRun = require('npm-run');

const log = logs('core-task');

const spawn = npmRun.spawn;

/**
 * 设置 package.json中的config字段到 env 中，兼容npm run 的场景
 *
 */
function setNpmConfigToEnv() {
	const pkg = fs.readPackage();
	if (pkg && pkg.config && typeof pkg.config === 'object') {
		Object.keys(pkg.config).forEach((item) => {
			process.env[`npm_package_config_${item}`] = pkg.config[item];
		});
	}
}

/**
 * 运行单个任务
 * @param task
 * @param args
 * @return {boolean} 是否继续往下执行, 为 false 的话,不继续执行,后面进程直接退出
 */
async function oneTask(task: any, args: any) {
	const intl = new Intl(message);
	// task是一个function时,执行function
	if (task.func) {
		const res = await runFunction({
			method: task.func,
			args,
		});
		return res;
	} else if (task.command) {
		// task 是个命令的时候，执行命令
		return new Promise((resolve, reject) => {
			const command = task.command.split(' ');
			const env: any = {};
			// 缓存旧环境变量
			const oldEnv: any = {};
			const resetEnv = () => {
				// 这里一定要用 oldEnv 的key ,否则任务体里面添加新的环境变量会被变成 undefined 的
				Object.keys(oldEnv).forEach((item: any) => {
					process.env[item] = oldEnv[item];
				});
			};

			for (let i = 0; i < command.length; i += 1) {
				if (/^\w+=.+$/.test(command[i])) {
					command[i] = command[i].split('=');
					env[command[i][0]] = command[i][1];
				} else {
					if (i !== 0) {
						command.splice(0, i);
					}
					break;
				}
			}

			Object.keys(env).forEach((item) => {
				oldEnv[item] = process.env[item];
				process.env[item] = env[item];
			});

			log.debug(`${task.command} 开始执行`);

			// 因为 其他基于aio衍生的工具也具备执行aio插件的能力，故为了不混淆aio的使用，这里在运行时将aio替换为工具本身来执行
			let cliBin = command.splice(0, 1).pop();
			if (cliBin === DEFAULT_BIN && process.env[PROCESS_ENV_BIN]) {
				cliBin = process.env[PROCESS_ENV_BIN];
			}
			setNpmConfigToEnv();
			const options = {
				cwd: task.cwd || process.cwd(),
				env: process.env,
				stdio: 'inherit',
			};

			// 透传 args的参数
			if (!task.args && args[0] && args[0].clientOptions) {
				const cArgs = args[0].clientOptions;
				const clientOptions = Object.keys(cArgs);
				clientOptions.forEach((item) => {
					command.push(`--${item}`);
					if (cArgs[item] !== true) {
						command.push(cArgs[item]);
					}
				});
			}
			log.debug('完整执行的command命令参数是 ->', command);
			log.debug('完整执行的options透传参数是->', options);
			// 兼容多平台
			const parsed = corssSpawn._parse(cliBin, command, options);

			const child = spawn(parsed.command, parsed.args, parsed.options);
			// const child = spawn(cliBin, command, options);

			// 任务流执行失败
			child.on('error', (err: any) => {
				resetEnv();
				reject(err);
			});

			child.on('close', (status: number) => {
				// 插件自己要退出,则不抛出异常
				if (status === 10) {
					resetEnv();
					resolve(false);
				} else if (status !== 0) {
					const msg = intl.get('commandError', { command: task.command });
					log.error(msg);
					report.error(ErrorType.TASK_ERROR, msg);
					resetEnv();
					// 执行失败后，退出终端，不再继续执行
					process.exit(status);
					// 这里抛出的错误和全局扑获的错误重复了,先不执行reject吧
					// reject(new Error(message));
				} else {
					resetEnv();
					resolve(true);
				}
			});
		});
	}
	return true;
}

/**
 * 运行任务
 * @param options
 */
async function run(options: any) {
	// 筛选出对应的任务
	const intl = new Intl(message);
	const tasks = options.tasks || []; // 任务流
	const when = options.when || 'before'; // 前置任务还是后置,默认是前置任务
	const args = options.args || []; // 任务流传进来的参数
	const command = options.command || ''; // 运行的命令
	const newTasks = utils.classify(tasks)[when];
	const whenTips = when === 'after' ? intl.get('nextTask') : intl.get('preTask');

	log.info(intl.get('runCommand', { command, whenTips }));
	// log.info(`正在执行行${command}${(when === 'after' ? '后置' : '前置')}任务`);
	for (let i = 0; i < newTasks.length; i += 1) {
		if (newTasks[i].async) {
			oneTask(newTasks[i], args);
		} else {
			const result = await oneTask(newTasks[i], args);
			if (result === false) {
				// 用户强制要求退出,则正常退出一下
				process.exit(0);
			}
		}
	}

	log.success(intl.get('runSuccess', { command, whenTips }));
	// log.success(`${command}${(when === 'after' ? '后置' : '前置')}任务执行成功`);
}

export default run;
