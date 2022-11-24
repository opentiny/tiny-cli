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
/**
 * Created by hugo on 16/11/16.
 */

import logs from '../log/index';
import message from './locale/index';
import Intl from '../intl/index';

const log = logs('core-error');

export default async function (e: any) {
	const intl = new Intl(message);
	const ERROR_MSG = intl.get('intranetTips');
	log.error(ERROR_MSG);
	e.stack && console.log(e.stack);
	return true;
}
