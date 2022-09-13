/**
 * 核心入口命令发送，用于统计谁做了什么操作
 */
export declare function baseData(): {
    userEmail: any;
    userName: any;
    cliName: any;
    cliVersion: any;
    system: any;
    npm: any;
    node: any;
    git: null;
    branch: null;
    command: string;
    cwd: string;
};
/**
* 上报日志
* @param {object} data
*/
export declare function send(type: string, data: any): void;
export declare function sendReportEntry(): void;
/**
 * 根据模块名称发送日志
 * 非入口命令发送，主要是任务流中tasks 里面的command 任务
 */
export declare function sendReportForModule(name: string): void;
export declare enum ErrorType {
    MODULE_NOT_FOUND = "module-not-found",
    CLI_CORE = "cli-core",
    CONFIG_ERROR = "config-error",
    TASK_ERROR = "task-error"
}
/**
 * 发生错误时，上报日志
 */
export declare function sendReportForError(errType: ErrorType, errDetail: any): void;
declare const _default: {
    ErrorType: typeof ErrorType;
    /**
     * 用户执行命令时发送记录
     */
    entry: () => void;
    /**
     * 由aio工具触发的命令时记录
     * @param name aio模块名称
     */
    module: (name: string) => void;
    /**
     * 运行异常时发送日志
     * @param errType 错误类型
     * @param errDetail 错误详情
     */
    error: (errType: ErrorType, errDetail: any) => void;
};
export default _default;
