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
import get from './get';
import getEsModule from './getEsModule';
import getReallyName from './getReallyName';
import installOne from './install-one';
import localExist from './local-exist';
import localList from './local-list';
import onlineExist from './online-exist';
import onlineList from './online-list';
import update from './update';
import utils from './utils';

export default {
	get,
	getReallyName,
	localExist,
	onlineExist,
	localList,
	onlineList,
	installOne,
	update,
	getEsModule,
	utils,
};
