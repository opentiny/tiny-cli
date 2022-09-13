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
