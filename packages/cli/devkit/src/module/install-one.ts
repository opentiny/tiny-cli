import cache from '../cache/index';
import home from '../home/index';
import Intl from '../intl/index';
import logs from '../log/index';
import npm from '../npm/index';
import message from './locale/index';
import utils from './utils';
import { DEFAULT_BIN, DEFAULT_SCOPE, getScope } from '../cli-config/index';

const log = logs('core-module');

/**
 *
 * @param name 模块名称，可能的格式{modulename}@{version} or {modulename}
 * @param options
 */
async function installOne(name: string, options?: any) {
	const prefix = utils.prefix();
	const homeCwd = home.getHomePath();
	const scope = getScope();
	let version = 'latest';
	const intl = new Intl(message);
	let pureName = '';
	options = {
		type: 'install',
		...options,
	};
	// 匹配套件名称，其中需要判断前缀是否是自定义的
	let match = name.match(new RegExp(`^(@${scope}/)?([A-Za-z0-9_-]*)-(toolkit|plugin)-`));
	if (!match && scope != DEFAULT_SCOPE) {
		match = name.match(new RegExp(`^(@${DEFAULT_SCOPE}/)?([A-Za-z0-9_-]*)-(toolkit|plugin)-`));
	}
	// 判断逻辑：前缀存在 且 前缀为自定义设置的 或者前缀是aio
	if (!(match && match[2] && (match[2] === prefix || match[2] === DEFAULT_BIN))) {
		log.error(intl.get('importPkgError'));
		return;
	}

	// 判断是否带了 @版本号
	if (!new RegExp(`^(@${scope}/)?.+@.+$`).test(name)) {
		// 没带版本号
		pureName = name;
		// TODO option值哪里来
		if (options.lastPkg && options.lastPkg.version) {
			version = options.lastPkg.version;
		}
		name += `@${version}`;
	} else {
		const nameArr: string[] = name.split('@');
		version = nameArr.pop() || 'latest';
		pureName = nameArr.join('@');
	}

	// 开始安装
	log.debug(`开始安装 ${name}`);
	utils.addModuleToDependencies(homeCwd, pureName, version);
	try {
		await npm.installDependencies({
			cwd: homeCwd,
		});
	} catch (e) {
		utils.removeModuleToDependencies(homeCwd, pureName);
		log.error(intl.get('installError', { name: pureName }));
		log.error(e);
		process.exit(1);
	}

	// 设置缓存, 1天内不再检查
	cache.set(`${utils.UPDATE_CHECK_PRE}${pureName}`, true, {
		expires: utils.NO_TIP_PERIOD,
	});

	// 提示安装成功
	if (options.type === 'install') {
		log.success(intl.get('installSuccess', { name: pureName }));
		return;
	}

	log.success(intl.get('updateSuccess', { name: pureName }));
	// 打印更新日志
	if (!options.lastPkg) {
		options.lastPkg = await npm.latest(pureName);
	}
	if (!options.lastPkg) {
		return;
	}
	utils.updateLog(pureName, {
		localPkg: options.localPkg,
		lastPkg: options.lastPkg,
		level: 'success',
	});
}

export default installOne;
