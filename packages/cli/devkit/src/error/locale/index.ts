/**
 * Copyright (c) 2022 - present TinyCli Authors.
 * Copyright (c) 2022 - present Huawei Cloud Computing Technologies Co., Ltd.
 *
 * Use of this source code is governed by an MIT-style license.
 *
 * THE OPEN SOURCE SOFTWARE IN THIS PRODUCT IS DISTRIBUTED IN THE HOPE THAT IT WILL BE USEFUL,
 * BUT WITHOUT ANY WARRANTY, WITHOUT EVEN THE IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS FOR
 * A PARTICULAR PURPOSE. SEE THE APPLICABLE LICENSES FOR MORE DETAILS.
 *
 */
/**
 * 语言文件
 */

export default {
	zh: {
		// handle-default.js
		intranetTips:
			'运行报错, 请在issue中反馈问题：https://codehub-g.huawei.com/Tiny/opentiny/opentiny-cli/issues/new',
		winPidTips: `   # 看下是哪个PID占用的端口
   $ lsof -i :{port}
   # 杀进程
   $ kill -9 【pid】`,
		macPidTips: `   # 看下是哪个PID占用的端口
   $ netstat -anop tcp | find /i ":{port}" |  find "LISTENING"
   # 杀进程
   $ taskkill /F /pid 【pid】`,
		helpTips: `运行失败，检测到当前端口号 {port} 已被其他程序占用
修复建议：
  1. 切换到其他端口再试试
  2. 请按下面的方法关闭占用端口的程序

{solution}
`,
		commandNotFound: '运行插件或套件时出现了错误, 未找到 {module} 命令,请看下是否有安装!',
		fixLocalTips: '修复建议: 在控制台执行 {installer} install {runModule} 试试!',
		fixGlobalTips: '修复建议: 在控制台执行 {installer} install -g {module} 试试!',
		moduleNotFound: '运行插件或套件时出现了错误, 未找到 {module} 模块! 正在尝试自动修复...',
		installSuccess: '成功安装当前项目中的依赖,请重新运行命令!',
		installDone: '已将 {module} 模块安装至 {moduleCwd} ,自动修复成功,请重新运行命令!',
		installDoneTips: '若重新运行仍然出现问题，请在命令前面加上：DEBUG=core-error 来获取详细错误堆栈',
		installError: 'sorry 自动修复失败, 请手动修复',
		notFound: '运行时出现了错误, 未找到 {file} 文件,请确认 {file} 是否存在!',
		detailError: '详细错误堆栈信息如下:',
		npmNotFound: '安装 {module} 出错,请确认网络是否正常及包名是否输入正确',
	},
	en: {
		// handle-default.js
		intranetTips:
			'Runtime Error, please report the issue: https://codehub-g.huawei.com/Tiny/opentiny/opentiny-cli/issues/new',
		winPidTips: `   # Look up for the PID which occupies the port
   $ lsof -i :{port}
   # Kill process
   $ kill -9 【pid】`,
		macPidTips: `   # Look up for the PID which occupies the port
   $ netstat -anop tcp | find /i ":{port}" |  find "LISTENING"
   # Kill process
   $ taskkill /F /pid 【pid】`,
		helpTips: `The operation failed and the current port number {port} was detected to be occupied by other programs
Fix suggestions：
  1. Try switching to another port
  2. Please follow the procedure below to close the program that occupies the port

{solution}
`,
		commandNotFound:
			'The {module} command was not found, there was an error when running the plugin or toolkit. Please see if there is an installation!',
		fixLocalTips: 'Fix Suggestions: Try {installer} install {runModule} in terminal!',
		fixGlobalTips: 'Fix Suggestions: Try {installer} install -g {module} in terminal!',
		moduleNotFound:
			'the {module} module was not found, there was an error when running the plugin or toolkit! Trying to fix it automatically ...',
		installSuccess: 'Re-run the command to successfully install dependencies in the current project!',
		installDone:
			'The {module} module has been installed to {moduleCwd} and the automatic repair is successful. Please re-run the command!',
		installDoneTips:
			'If there is still a problem while re-run, please add: 【 DEBUG=core-error 】 to the beginning of your command to get the detailed error stack',
		installError: 'sorry, the automatic repair failed, please repair manually',
		notFound: 'The {file} file was not found, there was an error in the run. Please make sure {file} exists!',
		detailError: 'Detailed error stack information is as follows:',
		npmNotFound:
			'Install {module} error, please check whether the network is normal and the package name is correct',
	},
};
