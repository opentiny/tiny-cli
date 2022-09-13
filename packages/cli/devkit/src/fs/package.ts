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
