/**
 * 控制台传入的参数
 */
export interface CliOption {
  clientArgs: any;
  clientOptions: any;
}

/**
 * 服务端类型
 */
export enum serverTypes {
  eggJs = 'eggJs',
  nestJs = 'nestJs',
  springCloud = 'springCloud',
  skip = ''
}

/**
 * 初始化问题的选项 -> 选择的值
 */
export interface InitAnswers {
  description: string;
  framework: string;
  name: string;
  serverType: serverTypes;
}

/**
 * 数据库配置-> 选择的值
 */
export interface DBAnswers {
  dialect: string | boolean;
  host: string;
  port: string;
  database: string;
  username: string;
  password: string;
}
