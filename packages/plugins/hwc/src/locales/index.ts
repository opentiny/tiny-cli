import zhCn from './zhCn.json';
import { template, get } from 'lodash';

/**
 * 通过键值，查找对应文字。配合I18n Ally插件使用
 * 比如： t("key", {err})  t("key", [1,2,3,4])
 * @param key
 * @param context 对象或数组。 键值中使用 ${name} 或 ${0} 占位
 * @returns 查询后返回的文字
 */
// tslint:disable-next-line: function-name
export default function t(key: string, context: any = {}) {
  const value = get(zhCn, key);
  return template(value)(context);
}
