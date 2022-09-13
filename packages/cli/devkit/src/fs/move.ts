import fs from 'fs-extra';
import logs from '../log/index';

const log = logs('core-fs');

export default function move(oldPath: string, newPath: string) {
	fs.renameSync(oldPath, newPath);
	log.success(`${oldPath} move to ${newPath}`);
}
