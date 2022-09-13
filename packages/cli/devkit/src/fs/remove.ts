import fs from 'fs-extra';
import logs from '../log/index';

const log = logs('core-fs');

export default function remove(file: string) {
	if (!fs.existsSync(file)) {
		return log.warn(`${file} Directory or file does not exist, no need to delete`);
	}
	fs.removeSync(file);
	return log.success(`${file} successfully deleted`);
}
