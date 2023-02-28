# tiny-toolkit-dev

> 快速生成 tiny 插件/套件 开发环境的工具


## 使用场景

用于开发 tiny 套件及插件




## 用法


### 初始化

```
tiny init dev 
```

### 创建软链

在当前正在开发的插件或套件根目录下执行以下命令后, 之后你在本机操作的所有关于该套件或插件的命令,都是在执行你当前项目的代码

```
tiny link
```

### 发布代码

发布代码至 npm 上, 发布前会对文档进行简单的检查

```
tiny publish
```


### 查看帮助信息

```
tiny help
```

## 最佳实践

### 使用最新的 tiny-toolkit-dev 初始化

该套件会已经整合了以下所有的推荐实践方案, 并且已经处理好了所有套件, 插件的 eslint 的校验问题.


### 统一使用 `@opentiny/cli-devkit` 模块来调用 tiny 提供的方法

[API 链接](http://git.huawei.com/tiny/tiny/blob/master/docs/api.md)

```
# 使用方式
const { modules , logs } from '@opentiny/cli-devkit';

```

### 插件/套件对外暴露对象

插件和套件 本身是一个纯 npm 模块，对外暴露一个对象出来即可，其中对象的key，就是tiny的命令。

如果无子命令就可以执行的,可以给 `default` 属性传一个默认命令, 具体代码如下:

```
// 假定以下为 tiny-plugin-commit 插件逻辑

function commit() {
  // 执行弹出 commit 类型选择框操作
}

function help() {
  // 打印帮助信息
}

module.exports = {
  help,
  default: commit
}
```


### 获取命令行参数


会有 `clientArgs` 和 `clientOptions` 两个属性, 前者是控制台参数数组, 后者是控制台选项对象, 具体使用如下:

```
// 假定以下为 tiny commit help 命令的实现
// 参数保有一个，是控制台参数及选项
module.exports = function(options) {
  console.log(options.clientArgs);
  console.log(options.clientOptions);
}

// 执行 tiny commit help --x 1
// 那么将会输出:  
// ['help']
// { x: 1 }
```