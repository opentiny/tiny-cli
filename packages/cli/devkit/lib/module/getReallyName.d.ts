/**
 * 返回的模块信息
 */
export interface ModuleInfo {
    exist: boolean;
    isUseModule: boolean;
    reallyName: string;
}
/**
 * 获取实际可执行的套件或插件名称
 * 获取逻辑: 自定义本地套件/插件 -> cli本地套件/插件 -> 自定义线上套件/插件 -> cli线上套件/插件
 * @param name 套件或插件名，传入的是完整，必须带上 toolkit 或 plugin
 */
export default function (name: string): Promise<ModuleInfo>;
