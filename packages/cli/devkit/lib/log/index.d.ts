interface ILogger {
    info(...args: any[]): void;
    success(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
    debug(...args: any[]): void;
}
declare const _default: (label: string) => ILogger;
/**
 * 基于winston输出日志
 * @param label: 标签，一般用于定位该日志是哪个模块输出的
 */
export default _default;
