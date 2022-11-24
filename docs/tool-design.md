# CLI工具设计文档



## 业务场景举例

对于一个前端团队来说，需要怎么样的cli？这个问题，我们先试想下如下的一些场景：

1. **技术栈多样化**：一个前端团队的项目工程模板往往不止一个，比如基于vue的单页面应用模板、PEP的页面和楼层组件开发模板、nodejs项目开发模板、XXX业务开发模板等等。**如何让cli拥有能够支持多种业务形态，具有良好的可扩展性？**
1. **存量项目多**：一个团队的工程化进程肯定是不断积累与完善的，比如有些业务项目历史比较久用的是jq那套，可能都不需要编译的过程。**如何让cli工具如何兼容存量项目？**
1. **落地效果保障**：目前大部分团队都有研发规范，很多时候，规范就像一阵风，领导抓的时候，大家都在遵守，但是慢慢又会归于原位，人总是有惰性的，那么**基于cli如何保障规范的落地和执行效果？**
1. **项目共性问题**：比如一般每个项目都可能会有eslint、pretter这些代码规范及格式的环境及配置；与公司环境相关的，比如code Review、代码发布等等，这些属于项目共性问题，是否每套工程模板都要各自去搞一套这些环境？是否可以通过插件、中间件或者其他切片方式将这些共性问题抽象出来，单独进行初始化或使用？
1. **项目升级问题**：前端技术日新月异，就我们最常用的webpack就已经到webpack4了，**如何让已初始化的项目能批量升级技术栈？**再比如eslint规范，规范更新了，怎么保证每个项目的eslint配置文件升级、项目工程bug如何快速修复等。
1. **环境容错问题**：开发过程中会遇到很多nodejs环境问题，比如端口占用、webpack构建失败、依赖包缺失等，**基于cli能否更优雅的解决环境问题**，让开发者聚焦业务上？
1. **大数据统计**：大家都在用这个工具，**通过什么方式可以收集一些共性信息？**比如 大家项目里都依赖了哪些常用的npm包，大家项目的eslint通过率怎么样？甚至可以基于这个工具看一下大家的开发时间主要集中在哪个时间段。


每个团队的业务特征不一样，场景也非常多，这里只是举例我在现有业务上抽象出来的场景。如何定义好核心场景，是设计一个满足团队诉求的cli的前提。

<a name="43ba85f6"></a>
## cli工具功能分析

基于以上的场景，大致描绘一下一个工程化工具的一些功能。

![](http://image.huawei.com/tiny-lts/v1/images/586a21dd336aea44a06cb728f23eb1d5_2012x914.png)


<a name="c9200446"></a>
### 套件

右边标星的两项，是这个cli工具的核心功能。模板管理这个好理解，大名鼎鼎的yeoman估计蛮多人都用过，他其中一个核心能力是可以安装各种generator来丰富自己的生态体系。基于这种平台式的架构有个最大的好处：**可以让前端参与到这个工具生态里面共建模板，同时也能应对各种类型的项目，可扩展性高**。

<a name="236b0cdd"></a>
### 插件

而插件的概念与模板稍微有些区别，模板主要解决的是项目层面的事情，比如项目工程初始化，打包编译等事情。而插件侧重于**解决项目间的共性问题**，如上面场景的第四点。举个例子，比如一个eslint插件，功能可包含：

1. 初始化eslint运行环境
1. 运行eslint
1. 在项目的添加git hooks，当执行git commit 时自动触发eslint

基于这个插件，无论在什么项目中，都能快速接入eslint。类似的，基于插件机制，我们可以开发出各种项目小插件，如：

1. 效率提升类：mock服务插件、前端资源代理插件、前端项目依赖分析插件等。
1. 流程优化类：git操作封装插件、前端资源发布CDN插件等。
1. 质量保障类：console检测插件、快速搭建测试环境插件、prettier插件等。

<a name="27d0b425"></a>
### 任务流

关于任务的执行，我们最常用的是npm scripts里面定义的任务。比如我们在`package.json`中定义一系列命令：

```
{
"scripts": {
    "clean": "git reset --hard && git clean -df",
    "dev": "cross-env NODE_ENV=development BABEL_ENV=dev node tools/server.js",
    "build": "NODE_ENV=production BABEL_ENV=production node tools/packer.js"
  },
}
```

然后我们可以用`npm run`命令运行，比如上面的例子，开启本地开发环境，我们可以执行命令：`npm run dev`。

而我们这个cli工具也要做类似的事情，定义一个可以执行任务的功能。可以是如下的格式：

```
// config.js
module.exports = {
  tasks: {
    init: [{
      // 清除临时文件
      command: 'clearn'
    },
    {
      // 安装依赖
      command: 'npm install'
    },
    ] start: [{
      // 开启服务
      command: 'node tools/server.js'
    },
    {
      // 监听文件变化
      command: 'watch',
    },
    {
      // 异步开启前端资源代理服务
      command: 'proxy start --enable',
      async: true
    }],
    build: [{
      // 基于webpack构建
      command: 'webpack2',
    },
    ],
    test: [{
      // 执行eslint
      command: 'lint',
    },
    ],
  },
};
```

每个阶段都可声明要做的事情，每个任务流可以配置不同的任务，任务可以是cli的插件也可以是一个nodejs的脚本。每个插件可能有不同用法，不同的工程模板可根据需求进行不同的配置。然后执行的时候，可以用`cli start`、`cli build`执行。

<a name="c3e4c7fb"></a>
### npm run dev 与 cli start 命令区别

你可能会想，`npm run dev`不就可以满足需求了吗，这里的区别是什么？

我认为这里最主要的区别在于**命令“是否可控”**。npm不是自己开发的，npm可以理解为一个不可控命令。举个例子：

如果我们需要在开启服务时，强制执行eslint，eslint不通过的，项目没法开启，同时将当前项目的开发人员和项目名称上报到数据库。

如果是`npm run dev`，你没法有效快速的执行，而基于`cli start`命令，我们可以在cli层面的`start`命令中加入eslint检测及上报功能。通过完善cli任务轻松就解决了大型团队中的协同问题，这就是可控性。

<a name="d4f67783"></a>
## cli功能定义

cli本身不具备任何工程化能力，cli只是提供了一个让你写套件(脚手架)、写插件的平台，该平台可以安装、管理、运行对应的套件/插件。

基于上面的思考，我们参考DDD的思维模式，将域能力划分出来，将cli的整体框架理清晰。


![image.png](http://image.huawei.com/tiny-lts/v1/images/bcaed973d9deccf67381b6fc06c3d67c_1418x1248.png)

<a name="dmXHx"></a>
### 包函数说明

- cli-fs -  文件及文件夹操作模块
  - copyDirectory(options)
  - copyTpl - 复制文件
  - rewriteFile - 重写文件内容
  - move - 移动文件
  - remove - 删除文件或目录
- cli-config cli配置文件读写模块
  - get(key,cwd) - 获取cli配置文件(cli.config.js)的内容,如果不存则返回 null
  - set(key, value, cwd) - 修改cli配置文件内容
  - exist(cwd) - 判断 config.js 文件是否存在
- cli-home - 获取cli及模块的相关路径
  - getHomePath() - 获取 cli 的 home 目录
  - getModulesPath() - 获取 cli 的模块安装目录
  - initHomeDir() - 初始化 cli 的 home 目录
  - cleanHomeDir() - 清空 cli 的 home 目录内容
- cli-module - cli 模块的获取、安装及卸载
  - get(name) - 获取 cli 模块
  - install(name) - 安装 cli 模块
  - unInstall(name) - 卸载 cli 模块
  - update(name) - 更新 cli 模块
  - localList(options) - 获取本地已安装的 cli 插件和套件列表
  - onlineList(options) - 获取线上的 cli 插件和套件列表
  - fullName(name) - 获取cli模块全名
  - pluginFullName(name) - 获取cli插件全称
  - toolkitFullName(name) - 获取cli套件全称
- cli-npm - npm模块的安装及卸载
  - install(pkg, options) - 安装一个 npm 包
  - uninstall(pkg, options) - 卸载一个 npm 包
  - installDependencies(options) - 安装package.json 对应的依赖包
  - latest(pkg, options) - 获取最新的 npm 包信息
  - has(pkg, options) - 判断是否存在某个 npm 包
  - install(pkg, options)
  - uninstall(pkg, options)
  - installDependencies(options)
  - latest(pkg, options)
  - has(pkg, options)
- cli-task - cli任务流
  - has(tasks, when) - 是否存在当前时机的任务流
  - run(options) - 执行一串任务流
- cli-log - 以不同颜色在控制台上输出log
  - info(msg) - 以紫色输出内容到控制台
  - success(msg) - 以绿色输出内容到控制台
  - error(msg) - 以红色输出内容到控制台
  - debug(msg) - 只有在环境变量 DEBUG 与传入的参数一致时才打印，参debug包。

<a name="WZj5q"></a>
### 说明

- cli-home 包是cli的npm包安装目录，为啥不参考yeaman那种方式将generator独立全局安装，主要考虑有2个点：一是generator独立全局安装，经常会遇到权限问题，二是统一目录管理不污染全局目录且模块的安装卸载更可控。
- cli-error 包主要用来扑获nodejs抛出的异常，对异常进行分析及包装，加入自动修复的能力。

