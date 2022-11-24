# tiny基础命令详解

tiny提供了三类命令：

1. tiny基础命令
2. tiny套件固定命令
3. tiny插件扩展命令

本文主要讲解tiny提供的基础命令，[tiny套件固定命令](docs/use-toolkit.md)及[tiny插件命令](docs/use-plugin.md)请跳转至对应的文档查看。

## 基础命令一览

可在终端输入`$ tiny -h` 查看tiny使用帮助

```bash
$ tiny -h

tiny 使用帮助:  $ tiny [command] [options]

    $  tiny                     显示tiny帮助信息,若目录下有使用的套件,则会同时显示套件的帮助信息
    $  tiny init [toolkitName]  初始化套件
    $  tiny update [name]       更新tiny模块
    $  tiny list [type]         插件列表
    $  tiny i                   安装npm模块
    $  tiny clear               清空 tiny 的本地缓存
    $  tiny help                显示套件帮助信息
    $  tiny [name]              其他调用插件命令

```

## tiny init [toolkitName]

初始化套件

```bash
$ tiny init [toolkitName]
```

其中`toolkitName`表示套件的名字。一般的套件名格式为：`tiny-toolkit-{toolkitName}`。如DEV套件：[tiny-toolkit-dev](http://git.huawei.com/tiny/tiny-toolkit-dev)，若要使用该套件可直接初始化：

```bash
$ tiny init dev
```

执行该命令后，会自动判断本地是否已安装了该套件，若已安装则直接初始化；若未安装，则自动在电脑中进行安装，安装完后再进行初始化操作。

### 例子

```bash
# 创建一个叫toolkit-demo的空文件夹，并进入该文件夹
$ mkdir toolkit-demo && cd $_
# 初始化dev套件
$ tiny init dev
```




## tiny i [name]

安装tiny模块(套件及插件)。该命令类似于：`npm i / npm install`.
与 npm install 的区别是，tiny内部调用的是`pnpm`来进行安装，安装速度比`npm`更快。**强烈建议用`tiny i`代替`npm install`**


```bash
$ tiny install [name]
```

其中`name`表示tiny的模块名称。套件名称格式为：`tiny-{toolkit-name}`，插件名称格式为：`tiny-{plugin-name}`，输入对应的名字即可安装。

### 例子

```bash
# 安装jquery 到项目中
$ tiny i jquery -S

# 安装package.json中的依赖
$ tiny i

# 安装 4.2.0版本的 co模块
$ tiny i co@4.2.0

```

## tiny update [name]

更新tiny模块到最新版本。

### 例子

```bash
# 更新dev套件到最新版本
$ tiny update @opentiny/tiny-toolkit-dev

# 更新npm操作插件到最新版本
$ tiny update @opentiny/tiny-plugin-npm
```

## tiny list [type]

显示tiny可用的模块列表。

其中 `type` 值为 `toolkit` 和 `plugin`。

### 例子

```bash
# 显示tiny所有模块
$ tiny list

# 显示tiny所有套件
$ tiny list toolkit

# 显示tiny所有插件
$ tiny list plugin
```




## tiny clear

清空tiny本地缓存。

当tiny模块安装出现异常时，可使用该命令将tiny的缓存目录进行初始化。初始化之后，**会清空tiny安装过的所有tiny模块**

### 例子

```bash
# 清空tiny本地缓存
$ tiny clear
```