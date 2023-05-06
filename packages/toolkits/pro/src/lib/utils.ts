import * as path from 'path';
import { modules, cache } from '@opentiny/cli-devkit';

const cwd = process.cwd();

function firstUpperCase(str: string) {
  return str.replace(/^\S/, (s) => s.toUpperCase());
}

/**
 * 转换格式
 * @param str 英文字符串
 * @param isBig 是否转大写
 */
function camelTrans(value: string, isBig?: boolean) {
  let i = isBig ? 0 : 1;
  const str = value.split('-');
  // tslint:disable-next-line
  for (; i < str.length; i++) {
    str[i] = firstUpperCase(str[i]);
  }
  return str.join('');
}

/**
 * 用户输入的是用横杠连接的名字
 * 根据用户输入的name生成各类规格变量名: 横杠连接,小驼峰,大驼峰,全大写
 */
export function generateNames(name: string) {
  return {
    // 横杠连接
    fileName: name,

    // 小驼峰
    varName: camelTrans(name),

    // 大驼峰
    className: camelTrans(name, true),

    // 全大写
    constName: name.split('-').join('').toUpperCase(),
  };
}

/**
 * 获取模板文件夹路径
 * @param source template目录下的路径
 */
export function getTemplatePath(source?: string): string {
  const templatePath = path.join(__dirname, '../../template/');
  return source ? path.join(templatePath, source) : templatePath;
}

/**
 * 获取目标文件夹路径，参数不传为为当前命令执行的目录
 *  @param dist 目标根目录下的子文件夹路径
 */
export function getDistPath(dist?: string): string {
  return dist ? path.join(cwd, dist) : cwd;
}

/**
 * 设置模块的缓存
 * @param name 模块名称
 */
export function setModuleCache(name: string) {
  // 写一下缓存，避免未发布时一直去线上拉数据
  const cacheKey = `${modules.utils.UPDATE_CHECK_PRE}${name}`;
  cache.set(cacheKey, true, {
    expires: modules.utils.NO_TIP_PERIOD * 10,
  });
}

export default {
  getDistPath,
  getTemplatePath,
  generateNames,
  setModuleCache,
};
