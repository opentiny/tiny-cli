import child from 'child_process';
import * as io from '@actions/io';
import {
  logs,
  cliConfig as tinyStageCliConfig,
  cache,
} from '@opentiny/cli-devkit';
import { CONSTANTS } from '../config';
import {
  WINDOWS_KOOCLI_PATH,
  KOOCLI_HCLOUD_PATH_KEY,
} from '../kooCli/constants';

const log = logs(
  `${tinyStageCliConfig.DEFAULT_BIN}-plugin-${CONSTANTS.TINY_PRO_DEFAULT_BIN}-hcloud`
);

const loading = () => {
  const animations = ['\\', '|', '/', '-'];
  let x = 0;

  return setInterval(function () {
    x = x + 1;
    process.stdout.write(`\r${animations[x]}\r`);
    x &= 3;
  }, 250);
};

class HCloudClient {
  /**
   * @param command 待执行命令
   * @param processInput 【可选】若key不为空，则给hcloud进程执行后，传入相应的key
   */
  async exec(command: string, processInput?: string) {
    if (!cache.get(KOOCLI_HCLOUD_PATH_KEY)) {
      const kooCLI = await io.which('hcloud');

      if (!kooCLI) {
        log.error(
          `系统未检测到 KooCLI 环境变量，请参考 https://support.huaweicloud.com/qs-hcli/hcli_02_003_01.html 设置 Path 环境变量，环境变量值是 ${WINDOWS_KOOCLI_PATH}`
        );
        cache.set(KOOCLI_HCLOUD_PATH_KEY, false);
        process.exit(1);
      } else {
        cache.set(KOOCLI_HCLOUD_PATH_KEY, true);
      }
    }

    return new Promise<string>((resolve) => {
      const timeId = loading();
      const cmd = command.replace(/\n/g, '');

      const childProc = child.exec(cmd, (error, stdout, stderr) => {
        clearInterval(timeId);

        // 处理1：hcloud输出到stderr了
        if (error) {
          log.error(stderr);
          process.exit(1);
        }
        let content = stdout.trim();

        // 处理2： 空字符串
        if (content === '') {
          resolve('');
        }
        // 处理： 网络错误时给出正确的提示
        content = this.cleanContent(
          content,
          (line) =>
            line.includes('远程获取API列表失败') ||
            line.includes('远程获取服务endpoint列表失败') ||
            line.includes('[NETWORK_ERROR]') ||
            line.includes('Failed to send request to'), // 以此判断网络是否连接失败
          () => {
            log.error(
              '当前网络访问华为云服务出错，请检查网络连接或配置正确的网络代理（https://support.huaweicloud.com/usermanual-hcli/hcli_22_001.html）！'
            );
            process.exit(1);
          }
        );
        // 处理3：可执行`hcloud update`更新KooCLI至最新版本3.3.6
        content = this.cleanContent(
          content,
          (line) => line.includes('hcloud update'),
          () => 'remove'
        );
        // 处理4：  cli-jsonInput中各位置(如path、query、body、formData、header、cookie)传入的API参数优先于命令传入
        content = this.cleanContent(
          content,
          (line) =>
            line.includes('cli-jsonInput') &&
            line.includes('参数优先于命令传入'),
          () => 'remove'
        );

        // 处理5：[XXX_ERROR]提示
        content = this.cleanContent(
          content,
          (line) => line.match(/\[\w*_error\]/gi) != null,
          () => 'quit'
        );
        // 处理6：hcloud文档上提到的： 返回标准错误的json {error:{message:"xxxxxxxx"}} 也是错误
        try {
          const result = JSON.parse(content);
          if (result.error && result.error.message) {
            log.error(result.error.message);
            process.exit(1);
          }
        } catch (err) {}
        // 处理7：  命令中同时存在'cli-region'和'region',优先识别'cli-region'的值为KooCLI系统参数值
        content = this.cleanContent(
          content,
          (line) =>
            line.includes('优先识别') && line.includes('KooCLI系统参数'),
          () => 'remove'
        );
        // 处理8： 错误详情参见错误中心'https://apierrorcenter.developer.huaweicloud.com/apierrorcenter?keyword=DBS.280247&product=RDS'
        content = this.cleanContent(
          content,
          (line) => line.includes('//apierrorcenter.developer.huaweicloud.com'),
          (rest) => {
            // 白名单, 这些错误码可能是正常执行了,只是警告，并不需要暴力quit。
            const whiteList = ['FSS.0409', 'APIG.3301'];

            try {
              const errCode = JSON.parse(rest).error_code;
              return whiteList.includes(errCode) ? 'remove' : 'quit';
            } catch (error) {
              return 'quit';
            }
          }
        );

        // 以上均通过了，直接返回字符串值
        resolve(content);
      });

      if (processInput) {
        setTimeout(() => {
          childProc.stdin.write(processInput);
          childProc.stdin.end();
        }, 5);
      }
    });
  }

  // 期望返回的是一个Json时
  execJson(command: string) {
    return new Promise<any>((resolve) => {
      this.exec(command).then((res) => {
        try {
          resolve(JSON.parse(res));
        } catch (error) {
          log.error(res);
          process.exit(1);
        }
      });
    });
  }

  /**
   * 过滤掉多余的行
   * @param content 正文
   * @param matchFn 返回true时，匹配成功
   * @param actionCb  动作回调，根据返回值，再决定是移除行，还是直接退出程序
   */
  cleanContent(
    content: string,
    matchFn: (line: string) => boolean,
    actionCb: (rest: string) => 'remove' | 'quit'
  ) {
    let lines = content.split('\n');
    let matched = false;
    lines = lines.filter((line) => {
      const lineMatched = matchFn(line);
      matched ||= lineMatched;
      return !lineMatched;
    });
    const rest = lines.join('\n');
    if (matched && actionCb(rest) === 'quit') {
      log.error(content);
      process.exit(1);
    }
    return rest;
  }
}

export default new HCloudClient();
