/**
 * Copyright (c) 2022 - present OpentinyCli Authors.
 * Copyright (c) 2022 - present Huawei Cloud Computing Technologies Co., Ltd.
 *
 * Use of this source code is governed by an MIT-style license.
 *
 * THE OPEN SOURCE SOFTWARE IN THIS PRODUCT IS DISTRIBUTED IN THE HOPE THAT IT WILL BE USEFUL,
 * BUT WITHOUT ANY WARRANTY, WITHOUT EVEN THE IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS FOR
 * A PARTICULAR PURPOSE. SEE THE APPLICABLE LICENSES FOR MORE DETAILS.
 *
 */
import test from 'ava';
import handleEnoent from './handle-eaddrinuse';

test('#处理 EADDRINUSE 的异常 listen EADDRINUSE :::9000', async (t) => {
	// const intl = new Intl(message);
	// const locale = intl.getLocale();
	const result: boolean = await handleEnoent({
		code: 'EADDRINUSE',
		message: `
Error: listen EADDRINUSE :::9000
    at Object.exports._errnoException (util.js:1007:11)
    at exports._exceptionWithHostPort (util.js:1030:20)
    at Server._listen2 (net.js:1253:14)
    at listen (net.js:1289:10)
    at Server.listen (net.js:1385:5)
    at Application.app.listen (/Users/hugo/.aio/node_modules/._koa@1.4.0@koa/lib/application.js:74:24)
    at Object.Commands.open (/Users/hugo/.aio/node_modules/._@cloud_aio-plugin-server@1.2.3@@cloud/aio-plugin-server/index.js:43:18)
    at Promise (/Users/hugo/.aio/node_modules/._@cloud_aio-plugin-server@1.2.3@@cloud/aio-plugin-server/index.js:140:30)
    at module.exports (/Users/hugo/.aio/node_modules/._@cloud_aio-plugin-server@1.2.3@@cloud/aio-plugin-server/index.js:134:10)
`,
	});
	t.true(result);
});

test('# 处理 EADDRINUSE 的异常 listen EADDRINUSE 127.0.0.1:3000', async (t) => {
	const result = await handleEnoent({
		code: 'EADDRINUSE',
		message: `
Error: listen EADDRINUSE 127.0.0.1:3000
    at Object.exports._errnoException (util.js:1007:11)
    at exports._exceptionWithHostPort (util.js:1030:20)
    at Server._listen2 (net.js:1253:14)
    at listen (net.js:1289:10)
    at Server.listen (net.js:1385:5)
    at Application.app.listen (/Users/hugo/.aio/node_modules/._koa@1.4.0@koa/lib/application.js:74:24)
    at Object.Commands.open (/Users/hugo/.aio/node_modules/._@cloud_aio-plugin-server@1.2.3@@cloud/aio-plugin-server/index.js:43:18)
    at Promise (/Users/hugo/.aio/node_modules/._@cloud_aio-plugin-server@1.2.3@@cloud/aio-plugin-server/index.js:140:30)
    at module.exports (/Users/hugo/.aio/node_modules/._@cloud_aio-plugin-server@1.2.3@@cloud/aio-plugin-server/index.js:134:10)
`,
	});
	t.true(result);
});
