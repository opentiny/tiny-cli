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
import fs from 'fs-extra';
import * as path from 'path';
import IPackageJSON from './interface';

/**
 * 读取package文件
 * @param cwd package.json 所在的目录，默认取值 process.cwd()
 */
export function readPackage(cwd?: string): IPackageJSON | null {
	cwd = cwd || process.cwd();
	const pkgPath = path.resolve(cwd, 'package.json');
	if (fs.existsSync(pkgPath)) {
		return fs.readJsonSync(pkgPath);
	}
	return null;
}

export function writePackage(pkg: IPackageJSON, cwd: string) {
	cwd = cwd || process.cwd();
	const pkgPath = path.resolve(cwd, 'package.json');
	fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2), { encoding: 'utf8' });
}

export default {
	readPackage,
	writePackage,
};
