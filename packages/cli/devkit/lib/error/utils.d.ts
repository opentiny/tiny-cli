declare const _default: {
    /**
     * 处理模块名,返回正确的名称
     * abc/abc.js
     * @cloud/abc/a.js
     * @cloud/abc
     * abc
     */
    pureModuleName(moduleName: any): any;
    register(handle: any): void;
    getHandleList(): any;
};
export default _default;
