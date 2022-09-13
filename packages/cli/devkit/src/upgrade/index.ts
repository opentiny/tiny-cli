import cache from '../cache/index';
import Intl from '../intl/index';
import logs from '../log/index';
import npm from '../npm/index';
import cliConfig from '../cli-config/index';
import chalk from 'chalk';
import emoji from 'node-emoji';
import semver from 'semver';
import message from './locale/index';

const log = logs('core-upgrade');

const TIP_CACHE_KEY = '__versionTip';

/**
 * 升级提示，若发布新版本，会定时提醒是否需要更新
 * @param data object { "name" : 包名, "version" : 当前版本}
 */
async function updateTip(data: any): Promise<boolean> {
	let needFocusUpdate = false;

	if (cache.get(TIP_CACHE_KEY)) {
		return needFocusUpdate;
	}

	const latest = await npm.latest(data.name);

	// 缓存设置为24小时，过24小时才重新提示升级 cli
	cache.set(TIP_CACHE_KEY, true, {
		expires: 86400000,
	});

	// latest 没有值，可能没有网络
	if (!latest) {
		return needFocusUpdate;
	}

	log.debug('%s current-version: %s, latest-version: %s', data.name, data.version, latest.version);

	// 当前版本是最新
	if (!semver.lt(data.version, latest.version)) {
		return needFocusUpdate;
	}

	// 当更新了Y位的话，启动自动升级机制
	needFocusUpdate = semver.diff(data.version, latest.version) === 'minor';
	log.debug('needFocusUpdate =>', needFocusUpdate);

	// 当当前版本的y位有变化，强制更新cli
	const installer = cliConfig.getBinName() || 'npm';
	const intl = new Intl(message);
	console.log('\n');
	log.warn(
		`******************** ${emoji.get('warning')} ${emoji.get('warning')}   ${intl.get('updateTips')}  ${emoji.get(
			'warning'
		)} ${emoji.get('warning')} **********************`
	);
	log.warn(
		intl.get('recommendedVersion', {
			latest: chalk.green.bold(latest.version),
			localVersion: data.version,
		})
	);
	// 区分一下自动升级与手动升级的文案
	if (needFocusUpdate) {
		log.warn(
			intl.get('updatingCommand', {
				icon: emoji.get('point_right'),
				command: chalk.bgRed.bold(` ${installer} i ${data.name} @opentiny/cli-install -g `),
			})
		);
	} else {
		log.warn(
			intl.get('updateCommand', {
				icon: emoji.get('point_right'),
				command: chalk.bgRed.bold(` ${installer} i ${data.name} @opentiny/cli-install -g`),
			})
		);
	}

	// linux & mac 下才提示
	if (process!.platform.indexOf('win') !== 0) {
		log.warn(`${intl.get('ifUpdateError')} ${chalk.red.bold(`sudo ${installer} install -g ${data.name} @opentiny/cli-install`)}`);
	}
	log.warn(
		`******************************${emoji.get('point_up_2')} ${emoji.get(
			'point_up_2'
		)} ******************************`
	);
	console.log('\n');

	if (needFocusUpdate) {
		// 执行 npm install -g @opentiny/cli 和  @opentiny/cli-install更新本地系统
		const depen = [`${data.name}`, '@opentiny/cli-install'];
		await npm.install(depen, {
			// global安装
			g: true,
		});

		log.success('当前cli工具已更新至最新版本');

		// cli工具更新完成，终止进程
		process.exit(1);
	}

	return needFocusUpdate;
}

export default updateTip;
