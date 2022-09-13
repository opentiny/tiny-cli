/**
 * cli 多语言文案文件
 */
export declare const FILE_LOCALE = "aio.locale.json";
/**
 * cli 多语言文案文件
 */
export declare const FILE_CACHE = "aio.cache.json";
/**
 * cli 环境设置
 */
export declare const FILE_ENV = "aio.env.json";
/**
 * cli所需的项目配置文件
 */
export declare const DEFAULT_CONFIG_FILE = "aio.config.js";
/**
 * cli所需的项目配置文件
 */
export declare const FILE_USER = "aio.user.json";
/**
 * cli默认的根目录文件夹
 */
export declare const DEFAULT_HOME_FOLDER = ".aio";
/**
 * cli运行命令名称
 */
export declare const DEFAULT_BIN = "aio";
/**
 * 项目scope
 */
export declare const DEFAULT_SCOPE = "cloud";
/**
 * process.env 中的locale设置
 */
export declare const PROCESS_ENV_LOCALE = "AIO_LOCALE";
/**
 * process.env 中 cli的根目录所在的路径
 */
export declare const PROCESS_ENV_HOME_PATH = "AIO_HOME_PATH";
/**
 * process.env 中 cli的根目录文件夹名称
 */
export declare const PROCESS_ENV_HOME_FOLDE = "AIO_HOME_FOLDER";
/**
 * process.env 中 记录的cli配置文件名称key
 */
export declare const PROCESS_ENV_CONFIG_FILE = "AIO_CONFIG_FILE";
/**
 * process.env 中 记录的cli配置文件路径key
 */
export declare const PROCESS_ENV_CONFIG_PATH = "AIO_CONFIG_PATH";
/**
 * process.env 中记录cli当前环境的key
 */
export declare const PROCESS_ENV_CLI_ENV = "AIO_ENV";
/**
 * process.env 中 记录的cli命令名称key
 */
export declare const PROCESS_ENV_BIN = "AIO_BIN";
/**
 * process.env 中 记录项目scope的key
 */
export declare const PROCESS_ENV_SCOPE = "AIO_SCOPE";
/**
 * process.env 中 记录的cli version key
 */
export declare const PROCESS_ENV_CLI_VERSION = "AIO_VERSION";
/**
 * process.env 中 记录的cli name key
 */
export declare const PROCESS_ENV_CLI_PACKAGE = "AIO_PACKAGE";
/**
 * process.env 中 记录用户在控制台输入的真实命令
 */
export declare const PROCESS_ENV_MODULE_ENTRY = "AIO_MODULE_ENTRY";
/**
 * process.env 中记录当前cli的运行环境，可选的值有Node/FUXI
 */
export declare const PROCESS_ENV_RUN = "AIO_RUN_ENV";
/**
 * CLI当前的运行环境
 */
export declare enum ENV_RUN {
    NONE = "none",
    FUXI = "fuxi"
}
/**
 * 获取运行时的aio命令
 */
export declare function getBinName(): string;
/**
 * 获取项目scope
 */
export declare function getScope(): string;
/**
 *
 * @param name
 */
export declare function setModuleEntry(name: string): void;
export declare function getModuleEntry(): string;
declare const _default: {
    FILE_CACHE: string;
    FILE_ENV: string;
    FILE_LOCALE: string;
    FILE_USER: string;
    PROCESS_ENV_BIN: string;
    PROCESS_ENV_SCOPE: string;
    PROCESS_ENV_CLI_ENV: string;
    PROCESS_ENV_CONFIG_FILE: string;
    PROCESS_ENV_CONFIG_PATH: string;
    PROCESS_ENV_HOME_FOLDE: string;
    PROCESS_ENV_HOME_PATH: string;
    PROCESS_ENV_LOCALE: string;
    PROCESS_ENV_CLI_VERSION: string;
    PROCESS_ENV_CLI_PACKAGE: string;
    PROCESS_ENV_RUN: string;
    ENV_RUN: typeof ENV_RUN;
    getBinName: typeof getBinName;
    getModuleEntry: typeof getModuleEntry;
    setModuleEntry: typeof setModuleEntry;
    DEFAULT_BIN: string;
    DEFAULT_SCOPE: string;
    DEFAULT_CONFIG_FILE: string;
    DEFAULT_HOME_FOLDER: string;
};
export default _default;
