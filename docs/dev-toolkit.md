# 开发 tiny 套件

> 如果您有一套不错的开发模式想推荐给身边的同事使用,开发一个tiny 套件是一个很不错的方式.
> 在您开发 tiny 套件前,请务必先查看目前是否已经有跟您的开发模式相似的套件,若已经有了,您可以考虑加入该套件的开发,一起优化现有的套件.

## 基本约定

### 命名

- package.json 里面的 name 字段命名方式必须以 @opentiny/tiny-toolkit-xxx 格式书写

### 版本号

- 遵守 [semver](http://semver.org/lang/zh-CN/) 版本规范

## 开发流程


### 初始化套件模板

进入项目目录, 执行 tiny init dev,  操作 [dev套件](https://github.com/opentiny/tiny-cli/blob/main/packages/toolkits/dev/README.md) 会做几件事：

- 在当前目录下添加套件的基础模板
- 将当前目录链到 tiny 模块目录下

### 套件件配置

在生成 的模板 的 package.json 里面会有一个 tinyOption 的配置，这些配置是tiny 核心调用套件的时候会读取的, 配置主要意义如下：

```
{
  "type": "toolkit", //套件还是插件,此项不要修改
  "update": false, //是否自动更新，设置为true后，当插件发布新版本号后，tiny会自动更新插件到最新版本。
  "chName": "中文名" // 简单几个字介绍一下是什么类型的插件
}
```

###  接口实现

各插件根据自己的实际需求，自身的命令，最终只对外暴露一个对象即可（可以参考 [tiny-toolkit-dev](https://github.com/opentiny/tiny-cli/blob/main/packages/toolkits/dev/README.md)的实现）。

###  使用 tiny.config.js 配置

在项目里面必须会有一个 tiny.config.js的配置文件，所有的套件都要实现并按照这套规范来做，对于套件来说，需要实现以下几个配置 ，更多的配置是尽量用套件具体使用的打包工具对应的配置文件 来设置的，推置使用 webpack ：

```
module.exports = {
  //指定当前项目使用的套件
  toolkit: "@opentiny/tiny-toolkit-xxx",
  
  //以下是套件的基本配置，所有的套件都只会有这几个参数 
  //以下配置是非必填项目，默认配置就是下面这样
  toolkitConfig: {
    //tiny start时打开本地服务器的端口号
    port: 9000,
    //tiny start时，是否自动打开浏览器
    open: true,
    //tiny start打开浏览器时的默认页面（只有open为true时有效）
    openTarget: "src/index.html",
    //文件改变时是否自动刷新页面
    liveload: false
  }
};

```

### 套件发布

套件发布前需要注意以下几项:

- 必须按规范填写项目名
- 描述信息尽量明确且简短,在 tiny list 时可以被用户查看到
- changeLog 里面必须要有当前版本号的更新信息

最后执行发布:

```
tiny publish
```


## 套件调用机制

tiny 插件实际是一个纯净的 npm 包，单独将插件拎出来也能独立运行。

套件对外暴露的是一个object，其中object的 `key` 即是 tiny 调用的命令，假设开发一个套件名称叫 `tiny-toolkit-abc`，插件代码如下:

```
module.exports = {
  init : function(){ console.log('init') },
  build : function(){ console.log('build') },
  help: function(){ xxxx }
}
```

那么在tiny中运行这个套件，可以使用如下命令:

```
$ tiny init
```

这里也许大家有个疑问，为什么执行`tiny init` 这个命令，tiny知道init命令来自哪个套件？

答案就在`tiny.config.js`中：

```
module.exports = {
  // 声明当前项目使用的套件
  toolkit : "@opentiny/tiny-toolkit-abc"
}
```