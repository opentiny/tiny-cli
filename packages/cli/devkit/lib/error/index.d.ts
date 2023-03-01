/**
 * @desc 错误处理,先会调用之前注册过的错误处理,最后执行默认的处理
 */
/**
 * 错误处理器
 * @param {error} e 错误对象
 */
export default function handle(e: any): Promise<void>;
