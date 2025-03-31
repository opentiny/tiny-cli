/**
 * 使用NCC进行打包
 * https://github.com/zeit/ncc
 */
const spawn = require('cross-spawn');
const path = require('path');

const devketPath = path.join(__dirname, '../');

console.log('build devkit ...');
spawn.sync(
	require.resolve('@vercel/ncc/dist/ncc/cli.js'),
	[
		'build',
		path.join(devketPath, 'src/index.ts'),
		'-o',
		path.join(__dirname, '../../devkit/dist'),
		'--v8-cache',
		'-e',
		['shelljs'],
	],
	{
		stdio: 'inherit',
	}
);
console.log('build devkit success');
