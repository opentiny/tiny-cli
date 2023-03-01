/**
 * json clone， 会丢失函数等。
 * @param obj 普通对象或reactive对象
 */
const $clone = target => JSON.parse(JSON.stringify(target));

/**
 * 将目标字段分隔后，取相应位置的值
 * @example $split("/project/home","/",-1)   //取出home
 * @param target 目标字符串
 * @param splitor 分隔符
 * @param pos 取数位置，可为-1,-2
 */
const $split = (target, splitor = '/', pos = 0) => target.split(splitor).slice(pos)[0];

/**
 * 延时函数
 * @example $delay(300).then(()=>{   })
 */
const $delay = time => new Promise(resolve => setTimeout(resolve, time));

/**
 * 空闲函数
 * @example $idle().then(()=>{   })
 */
const $idle = () => new Promise(resolve => (window.requestIdleCallback || window.requestAnimationFrame)(resolve));

/**
 * 返回动态路径拼接
 * @param {string} fileName
 * @returns
 */
const $getImageUrl = fileName => {
  return new URL(`/${import.meta.env.VITE_DEMOS}/overviewimage/${fileName}`, import.meta.url).href;
};

export { $clone, $split, $delay, $idle, $getImageUrl };
