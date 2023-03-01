"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../cli-config/index");
const handleList = [];
exports.default = {
    /**
     * 处理模块名,返回正确的名称
     * abc/abc.js
     * @cloud/abc/a.js
     * @cloud/abc
     * abc
     */
    pureModuleName(moduleName) {
        const modules = moduleName.split('/');
        const scope = index_1.getScope();
        let module = moduleName;
        // @cloud/xxx,@cloud/xxx的情况
        if (modules.length > 1) {
            if (modules[0].indexOf(`@${scope}`) !== -1) {
                module = `${modules[0]}/${modules[1]}`;
            }
            else {
                module = modules[0];
            }
        }
        return module;
    },
    register(handle) {
        if (typeof handle === 'function') {
            handleList.push(handle);
        }
    },
    getHandleList() {
        return handleList;
    },
};
