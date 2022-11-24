/**
 * Copyright (c) 2022 - present OpentinyCli Authors.
 * Copyright (c) 2022 - present Huawei Cloud Computing Technologies Co., Ltd.
 *
 * Use of this source code is governed by an MIT-style license.
 *
 * THE OPEN SOURCE SOFTWARE IN THIS PRODUCT IS DISTRIBUTED IN THE HOPE THAT IT WILL BE USEFUL,
 * BUT WITHOUT ANY WARRANTY, WITHOUT EVEN THE IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS FOR
 * A PARTICULAR PURPOSE. SEE THE APPLICABLE LICENSES FOR MORE DETAILS.
 *
 */
import * as path from 'path';
import fs from 'fs-extra';
import IPackageJSON from './interface';
import * as fsPkg from './package';
import test from 'ava';

const pkgMock: IPackageJSON = {
	varsion: '1.0.0',
	name: 'aio',
};
const pkgPath = path.join(__dirname, 'package.json');

test.before(() => {
	fs.outputJsonSync(pkgMock, pkgPath);
});

test('# readPackage', t => {
	const pkg = fsPkg.readPackage(__dirname);
	t.is(pkg!.name, 'aio');
});

test('# writePackage', t => {
	fsPkg.writePackage(
		{
			version: '1.0.1',
			name: 'aio2',
		},
		__dirname
	);

	const pkg = require(path.join(__dirname, 'package.json'));
	t.is(pkg.name, 'aio2');
});
