import git from 'git-rev-sync';
import shelljs from 'shelljs';
import semver from 'semver';
import * as path from 'path';
import * as fs from 'fs';

const root = process.cwd();

function getShortCommitId(dir?: string) {
	return git.long(dir).substr(0, 7);
}

const parseStatus = function (str: string) {
	let branch_line;
	const status: any = {
		local_branch: null,
		remote_branch: null,
		remote_diff: null,
		clean: true,
		files: [],
	};
	let result;
	const initial_commit_rx = /^## Initial commit on ([^\n]+)\s?$/;
	const lines: any = str.trim().split('\n');
	branch_line = lines.shift();

	result = branch_line.match(initial_commit_rx);
	if (result) {
		status.local_branch = result[1];
		return status;
	}

	branch_line = branch_line.replace(/##\s+/, '');

	const branches = branch_line.split('...');
	status.local_branch = branches[0];
	status.remote_diff = null;
	if (branches[1]) {
		result = branches[1].match(/^([^\s]+)/);
		status.remote_branch = result[1];
		result = branches[1].match(/\[([^\]]+)\]/);
		status.remote_diff = result ? result[1] : null;
	}
	lines.forEach((s) => {
		if (s.match(/\S/)) {
			status.files.push(s);
		}
	});
	status.clean = status.files.length === 0;
	return status;
};

/**
 * 同步分支版本号到package中
 * 需满足条件 分支版本号格式为 {name}/x.y.z
 * @param pkg pkg
 */
function syncVersion(cwd?: string) {
	cwd = cwd || root;
	let branch: string = git.branch(cwd);
	const branchArr = branch.split('/');
	if (branchArr && branchArr.length === 2) {
		branch = branchArr[1];
	}
	// 判断一下 是否是标准的 x.y.z格式
	if (semver.valid(branch)) {
		try {
			const pkgPath = path.resolve(cwd, 'package.json');
			const pkg = require(pkgPath);
			pkg.version = branch;
			fs.writeFileSync(path.resolve(cwd, 'package.json'), JSON.stringify(pkg, null, 2), { encoding: 'utf8' });
			return branch;
		} catch (e) {
			return '';
		}
	}
	return '';
}

/**
 * 获取git的提交状态
 * return
 * { local_branch: 'xxx',
     remote_branch: null,
     remote_diff: null,
     clean: true/false,
     files: []
   }
 */
git.status = function (cwd?: string) {
	cwd = cwd || root;
	const result = (shelljs.exec('git status --porcelain -b', { silent: true, cwd }).stdout.toString() || '').trim();
	return parseStatus(result);
};

/**
 * 获取项目URL
 * @returns {*}
 */
git.repository = function (cwd?: string) {
	cwd = cwd || root;
	let repository;

	try {
		repository = (
			shelljs.exec('git config --get remote.origin.url', { silent: true, cwd }).stdout.toString() || ''
		).trim();
		// 有些git的url是http开头的，需要格式化为git@格式，方便统一处理
		const match = repository.match(/^(http|https):\/\/(.*huawei\.com|github\.com)\/(.*)/);
		if (match && match.length > 3) {
			repository = `git@${match[2]}:${match[3]}`;
		}
	} catch (err) {
		console.error('git config 错误：', err.message);
	}
	return repository;
};

/**
 * 获取项目的project name 和 group name
 */
git.project = function (cwd?: string) {
	cwd = cwd || root;
	const repository = git.repository(cwd);
	const match = repository.match(/git@(.*):(.*)/);
	if (match && match[2]) {
		// 2222 是huawei git的额外路径
		return match[2].replace(/\.git|2222\//g, '');
	}
};

git.short = getShortCommitId;
git.syncVersion = syncVersion;
/**
 * @exports aio-git
 */
export default git;
