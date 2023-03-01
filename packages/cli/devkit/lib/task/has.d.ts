/**
 * 一个任务列表里面是否存在有指定时间的任务
 * @param tasks , 任务列表,与 aio.config.js 里面任务流数据格式保持一致
 * @param when {string} 可以不传, 或传 before , after
 * @returns {boolean}
 */
declare function has(tasks: any, when?: string): boolean;
export default has;
