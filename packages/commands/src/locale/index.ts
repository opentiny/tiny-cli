/**
 * Copyright (c) 2022 - present Tiny CLI Authors.
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
    // clear.js
    startClear: '开始清除缓存...',
    finishClear: '缓存清除完成!',
    // help.js
    help: `
 {tool} 使用帮助:  $ {tool} [command] [options]

    $  {tool}                     显示{tool}帮助信息,若目录下有使用的套件,则会同时显示套件的帮助信息
    $  {tool} init [toolkitName]  初始化套件
    $  {tool} update [name]       更新{tool}模块
    $  {tool} list [type]         插件列表
    $  {tool} i                   安装npm模块
    $  {tool} mirror              切换npm源
    $  {tool} switch              切换npm包安装方式，支持npm和cnpm
    $  {tool} clear               清空 {tool} 的本地缓存
    $  {tool} config [type]       显示/设置.cnpmrc文件，类似npm config的用法
    $  {tool} [name]              其他调用插件命令

   Options:

     -h, --help                显示{tool}帮助信息
     -v, --version             显示{tool}版本

`,
    helpTips: ' 提示: ',
    helpToolkit: '   套件 - 若想查看项目中所使用的套件帮助信息,请在项目根目录执行该命令.',
    helpPlugin: '   插件 - 若想查看插件的帮助信息,请使用 {tool} [name] help 命令, eg : {tool} git help',
    helpEnv: '   环境 - 当前{tool}开发环境为: {env} , 可使用 $ {tool} switch 进行切换',
    helpList: '\r\n ------- 以下是 {tool} 自身的命令 ------- ',
    // init.js
    toolkitNotFound: '{toolkit} 套件不存在，请确认套件名称或npm源是否正确',
    toolkitInit: '请选择一个适合您项目的套件进行初始化:',
    toolkitReportInit: '该项目已初始化过,无需再次进行init',
    toolkitInitTips: '若想重新初始化,请删除项目中的 {file} 文件',
    fileExist: '当前目录下已存在文件,继续执行初始化会覆盖已存在的同名文件',
    confirmInit: '确认需要继续执行初始化,请输入(y)',
    // install.js
    installTips: '请输入需要安装的模块名!',
    // list.js
    toolkit: 'toolkit',
    plugin: 'plugin',
    toolkitAndPlugin: 'toolkit/plugin',
    list: 'list',
    toolkitList: '- 套件列表 \r\n',
    pluginList: '\r\n- 插件列表 \r\n',
    // main.js
    pluginNotFound: '{plugin} 插件不存在，请确认套件名称或npm源是否正确',
    pluginCommandNotFound: '未找到 {module} 插件对应的命令 {pluginCmd}',
    moduleVersion: '\n {module} 对应版本为 {version}\n',
    localNotFound: '本地未安装 toolkit-{name} 或 plugin-{name} 模块',
    configFileNotFound: '未检测到 {file} 文件, 请确认当前命令是否在项目根目录下执行',
    runPlugin: '请输入您要运行的插件名',
    notRunTips: '未找到 {command} 对应的套件命令,后置任务无法执行',
    startNotRunTips: '该套件尚未实现 {command} 命令，请检查拼写是否正确或执行 {tool} -h 查看可用命令',
    configNotRunTips: '{file} 文件中尚不存在 {command} 命令，请检查拼写是否正确',
    notMethod: '当前套件没有实现 init 方法',
    // locale
    switchLocaleTips: '初始化语言环境',
    initLocalSuccess: '成功初始化语言环境',
    removeNpm: '正在删除 node_modules 目录，请稍后...',
    clearfail: '缓存清除失败，会导致 {tool} 运行异常，请手动删除 {removePath} 目录，或重新执行 $ {tool} clear',
    updateError: '当前 {name} 不存在',
  },
  en: {
    startClear: 'Start clearing the app cache...',
    finishClear: 'The cache is cleared',
    help: `
 {tool} help tips:  $ {tool} [command] [options]

    $  {tool}                     display {tool} help info. If there are existing toolkits, it would display the help info of the toolkits
    $  {tool} init [toolkitName]  Initialize Toolkit
    $  {tool} update [name]       Update {tool}
    $  {tool} list [type]         List toolkits
    $  {tool} i                   Install npm modules
    $  {tool} mirror              switch npm mirror
    $  {tool} switch              switch npm install
		$  {tool} clear               Clear {tool}'s local cache
		$  {tool} config [type]       show or setting .cnpmrc file
    $  {tool} [name]              Other command for toolkit

   Options:

     -h, --help                display {tool} help info
     -v, --version             show {tool} version

`,
    helpTips: ' Tips: ',
    helpToolkit: '   Toolkit - Please run this command at root folder to get help info of toolkits in current project.',
    helpPlugin: '   Plugin - Please run {tool} [name] help to read the help info of the plugins, eg : {tool} git help',
    helpEnv: '   Environment - Current {tool} environment: {env} , use $ {tool} switch to switch environment',
    helpList: '\r\n ------- Below are {tool} useful command ------- ',
    // init.js
    toolkitNotFound: '{toolkit} toolkit not exist',
    toolkitInit: 'Please choose a toolkit to init the project:',
    toolkitReportInit: 'The project is already initialized, no need to init again',
    toolkitInitTips: 'Please remove {file}, if you need to re-initialize the project',
    fileExist: 'Current folder is not empty, continuing the init procedure would replace existing files',
    confirmInit: 'Confirm if you need to continue init, type in (y)',
    // install.js
    installTips: 'Please input the module name that you need to install!',
    // list.js
    toolkit: 'Toolkit',
    plugin: 'Plugin',
    toolkitAndPlugin: 'Toolkit/Plugin',
    list: 'List',
    toolkitList: '- Toolkit List \r\n',
    pluginList: '\r\n- Plugin List \r\n',
    // main.js
    pluginNotFound: '{plugin} plugin no exist',
    pluginCommandNotFound: '{module} plugin {pluginCmd} command no exist',
    moduleVersion: '\n {module} version is {version}\n',
    localNotFound: 'No toolkit-{name} or  plugin-{name} installed',
    configFileNotFound: 'Cannot find {file}, Please make sure your are in root folder',
    runPlugin: 'Please input the toolkit name',
    notRunTips: 'Can not find {command} for toolkit, stop progressing',
    startNotRunTips:
      'No {command} exist for current toolkit，Please check your spell or run {tool} -h to list all usable command',
    configNotRunTips: '{file} does not have {command} command，Please check your spell',
    notMethod: 'The current toolkit does not implement the init method',
    // locale
    switchLocaleTips: 'Init language environment',
    initLocalSuccess: 'Init language environment succeed!',
    removeNpm: 'The node_modules directory is being deleted, please wait...',
    clearfail: 'Cache clear failed, Please manually remove the {removePath} directory, or re-execute $ {tool} clear',
    updateError: '{name} module not exist',
  },
};
