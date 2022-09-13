import fs from 'fs-extra';
import copyTpl from './copy-tpl';
import move from './move';
import remove from './remove';
import packages from './package';
export { default as IPackageJSON } from './interface';

export default {
	...fs,
	copyTpl,
	move,
	remove,
	...packages,
};
