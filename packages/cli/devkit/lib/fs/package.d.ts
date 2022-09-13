import IPackageJSON from './interface';
/**
 * 读取package文件
 * @param cwd package.json 所在的目录，默认取值 process.cwd()
 */
export declare function readPackage(cwd?: string): IPackageJSON | null;
export declare function writePackage(pkg: IPackageJSON, cwd: string): void;
declare const _default: {
    readPackage: typeof readPackage;
    writePackage: typeof writePackage;
};
export default _default;
