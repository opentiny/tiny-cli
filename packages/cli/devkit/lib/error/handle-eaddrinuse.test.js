"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const handle_eaddrinuse_1 = __importDefault(require("./handle-eaddrinuse"));
ava_1.default('#处理 EADDRINUSE 的异常 listen EADDRINUSE :::9000', async (t) => {
    // const intl = new Intl(message);
    // const locale = intl.getLocale();
    const result = await handle_eaddrinuse_1.default({
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
ava_1.default('# 处理 EADDRINUSE 的异常 listen EADDRINUSE 127.0.0.1:3000', async (t) => {
    const result = await handle_eaddrinuse_1.default({
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
