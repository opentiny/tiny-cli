interface CopyOption {
    ignoreEjs?: string[];
    ignore?: string[];
    notTextFile?: string[] | undefined;
    rename?(filename: string): string;
}
/**
 *
 * @param from 原始文件路径
 * @param to 目标文件路径
 * @param context ejs 模板替换的对象
 * @param options object对象，用于过滤和重命名文件
 * @param options.ignore 数组, 类似 gitignore 的写法，默认值['node_modules', '.DS_Store', '.idea']
 * @param options.rename 重命名文件
 * @param options.notTextFile 非文本类型的文件，默认值[];
 */
export default function copyDirectory(from: string, to: string, context?: any, options?: CopyOption): void;
export {};
