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
import logs from '../log/index';
import message from './locale/index';
import utils from './utils';
import npm from '../npm/index';
import Intl from '../intl/index';
import home from '../home';

const log = logs('core-error');

// 处理
export default async function (e: any) {
	if (e.code !== 'MODULE_NOT_FOUND') {
		return false;
	}
	const match = e.message.match(/'(.*)'/);
	const intl = new Intl(message);
	const cwd = process.cwd();
	// 排除 相对路径 ../ & ./ 的情况( . 开头)
	if (match && match[0] && match[0].indexOf('.') !== 1) {
		const module = utils.pureModuleName(match[1]);
		log.error(intl.get('moduleNotFound', { module }));

		let moduleCwd = home.getHomePath();
		// 判断一下如果是项目文件中抛出的报错,则需要安装在项目文件夹中
		if (e.stack && e.stack.toString().indexOf(cwd) !== -1) {
			moduleCwd = cwd;
			// 这种情况下极有可能是本地的相关依赖没有安装,先全部执行一次安装
			await npm.installDependencies();
			log.success(intl.get('installSuccess'));
		}

		try {
			// 安装所需的依赖
			await npm.install(module, {
				cwd: moduleCwd,
			});
			log.success(intl.get('installDone', { module, moduleCwd }));
			log.success(intl.get('installDoneTips'));
			return true;
		} catch (err) {
			log.error(intl.get('installError'));
			return false;
		}
	} else if (match && match.length === 2) {
		log.error(intl.get('notFound', { file: match[1] }));
		if (e.stack) {
			log.error(intl.get('detailError'));
			console.log(e.stack);
		}
		return true;
	}
	return false;
}
