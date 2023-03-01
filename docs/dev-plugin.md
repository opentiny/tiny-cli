# 开发 tiny 插件

> 如果您有一套不错的 nodejs 小工具推荐给身边的同事使用,开发一个 tiny 插件是一个很不错的方式. 
> 在您开发 tiny 插件前,请务必先查看目前是否已经有跟您的 nodejs 小工具功能相似的插件,若已经有了,您可以考虑加入该插件的开发,一起优化现有的插件.

## 基本约定

### 命名

- package.json 里面的 name 字段命名方式必须以 @opentiny/tiny-plugin-xxx 格式书写

### 版本号

- 遵守 [semver](http://semver.org/lang/zh-CN/) 版本规范

## 开发流程

### 初始化套件模板

进入项目目录, 执行 tiny init dev,  操作 [dev套件](https://github.com/opentiny/tiny-cli/blob/main/packages/toolkits/dev/README.md) 会做几件事：

- 在当前目录下添加插件的基础模板
- 将当前目录链到 tiny 模块目录下

### 插件件配置

在生成 的模板 的 package.json 里面会有一个 tinyOption 的配置，这些配置是tiny 核心调用套件的时候会读取的, 配置主要意义如下：

```
{
  "type": "plugin", //套件还是插件,此项不要修改
  "update": true, //是否自动更新，设置为true后，当插件发布新版本号后，tiny会自动更新插件到最新版本。
  "chName": "中文名" // 简单几个字介绍一下是什么类型的插件
}
```

###  接口实现

各插件根据自己的实际需求，自身的命令，最终只对外暴露一个对象即可（可以参考 [tiny-plugin-link](https://github.com/opentiny/tiny-cli/blob/main/packages/plugins/link/readme.md)的实现）。

###  使用 tiny.config.js 配置

在项目里面必须会有一个 tiny.config.js的配置文件，所有的插件配置都是在下面以插件名另起一个字段，假设现在有一个插件名为 tiny-plugin-npm，则其配置如下：

```
{
  npm: {
    //些处填插件需要使用的配置项目
  }
}
```

然后通过 config 方法获取值：

```
import { config } from '@opentiny/cli-devkit';

config.get('npm');

```

### 插件发布

插件发布前需要注意以下几项:

- 必须按规范填写项目名
- 描述信息尽量明确且简短,在 tiny list 时可以被用户查看到
- changeLog 里面必须要有当前版本号的更新信息

最后执行发布:

```
npm publish
```

## 插件调用机制

tiny 插件实际是一个纯净的 npm 包，单独将插件拎出来也能独立运行。

插件对外暴露的是一个object，其中object的 `key` 即是 tiny 调用的命令，假设开发一个插件名称叫 `tiny-plugin-abc`，插件代码如下:

```
module.exports = {
  go : function(){ console.log('go') },
  help: function(){ xxxx }
}
```

那么在tiny中运行这个插件，可以使用如下命令:

```
$ tiny abc go
```

其中 `tiny` 是tiny工具命令，`abc` 是插件名，`go` 是插件的object key。