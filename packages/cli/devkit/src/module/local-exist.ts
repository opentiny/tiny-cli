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
import home from '../home/index';
import fs from 'fs-extra';
import * as path from 'path';

/**
 * 模块是否存在
 */
function localExist(name: string): boolean {
	const modulePath = path.resolve(home.getModulesPath(), name);
	const pkgPath = path.resolve(modulePath, 'package.json');

	return fs.existsSync(pkgPath);
}

export default localExist;
