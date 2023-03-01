# tiny配置文件

基于tiny的项目，每个项目根目录下均有`tiny.config.js`配置文件。

该文件可以配置当前项目的：tiny任务流、tiny插件配置、项目所使用的套件


## 配置文件格式

`tiny.config.js`文件实际是一个object对象。

以下是一个配置文件的例子

```js
// tiny.config.js

module.exports = {
    // 组件所使用的tiny toolkit
  toolkitName: '@opentiny/tiny-toolkit-xxx',

  tasks: {
    start: [
      {
        // 使用tiny link插件将当前目录链接到tiny 本地cdn目录
        command: 'tiny link'
      }
    ],

    build: [
      {
        // 执行自定义脚本
        command: 'node custom.js'
      }
    ],

    publish: [
      {
        command: 'npm publish'
      }
    ]
  },

  // ci 插件所需的配置
  ci: {
    // 返回项目中的webpack配置
    getWebpackConfig() {
      return require('./webpack.config').dev();
    }
  }
};
```

## 套件配置说明

项目指定使用的套件使用 toolkit 字段来说明,如果当前项目没有合适的套件使用, 只有任务流的话,也可以不配置套件名及套件参数.

套件参数都写在 toolkitConfig 里面.

为了满足有些项目对某些项目匹配某个套件的大部分需求,就是一两个命令的需求不太一样,我们提供了重写套件命令的方式, 只需要传入以 命令 + Rewirte 的方法便可以了.

```
{
    toolkit: "@opentiny/tiny-toolkit-mod", // 套件名
    toolkitConfig: {
        port: 9000, // 本地服务器端口号
        open: true,  // 是否自动打开浏览器
        log: true,  // 是否打印本地服务器访问日志
        openTarget: "src/index.html",   // 打开浏览器后自动打开目标页面
        liveload: false, // 是否自动刷新
    }    
}
```

另外,根据不同的套件还会有一些不同字段.


## 插件配置说明

插件配置,是根据当前项目使用的插件不同而配置不同的,每个插件的配置写在与其插件名相同的字段下面,如以下是 awp 的插件配置:

```
{
    awp: {
        dailyAppID: 554,
        onlineAppID: 219,
        appDir: 'mcm',
        awpBuildDir: 'build'
    }
}
```

## 任务流配置


使用者可以在其自定义一些任务, 如果对应任务名有对应的套件命令,那么会在先执行用户自定义的任务,再执行套件的任务.

如果您配置了对应命令的任务, 那么执行时可以不需要配置套件名.

任务可以是函数式,也可以是命令式, 具体配置如下,只需要在 tiny.config.js 里面添加以下配置即可:

```
{
   tasks: {
        // start 前执行一些 shell 命令
        start: [{
            command: 'echo test1'
        },{
            command: 'tiny server',
            // 添加 async 为 true 选项，可以无须等待当前异步命令执行完成便可招待下面的命令
            async: true
        }],
        // build 前执行一些 gulp命令
        build: [{
            command: 'gulp clean'
        }]
   }
}
```


