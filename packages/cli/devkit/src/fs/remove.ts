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
import logs from '../log/index';

const log = logs('core-fs');

export default function remove(file: string) {
	if (!fs.existsSync(file)) {
		return log.warn(`${file} Directory or file does not exist, no need to delete`);
	}
	fs.removeSync(file);
	return log.success(`${file} successfully deleted`);
}
