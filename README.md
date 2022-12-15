# Tiny CLI

> Tiny CLI是前端工程化cli工具



## Installation

打开命令行工具，输入如下命令后回车：

```bash
npm i @opentiny/cli npminstall -g
```

等待片刻，待安装完成之后在终端执行 `$ tiny -v`，正常返回版本信息，表示安装成功。

注意：tiny依赖 nodejs > 10.x 、 npm 环境，在安装tiny时，请确保本机已安装了nodejs和npm

## Docs

* [CLI工具设计文档](docs/tool-design.md)
* 使用者文档
	* [tiny介绍](docs/use-summary.md)
	* [安装tiny](docs/use-install.md)
	* [tiny基础命令详解](docs/use-cli.md)
	* [使用tiny套件](docs/use-toolkit.md)
	* [使用tiny插件](docs/use-plugin.md)
	* [tiny配置文件](docs/use-config.md)
* 开发者文档
	* [tiny API](docs/api.md)
	* [套件开发指南](docs/dev-toolkit.md)
	* [插件开发指南](docs/dev-plugin.md)

## Usage

可在终端输入`$ tiny -h` 查看tiny使用帮助

```bash
 tiny 使用帮助:  $ tiny [command] [options]

    $  tiny                     显示tiny帮助信息,若目录下有使用的套件,则会同时显示套件的帮助信息
    $  tiny init [toolkitName]  初始化套件
    $  tiny update [name]       更新tiny模块
    $  tiny list [type]         插件列表
    $  tiny i                   安装npm模块
    $  tiny clear               清空 tiny 的本地缓存
    $  tiny help                显示套件帮助信息
    $  tiny [name]              其他调用插件命令

   Options:

     -h, --help                显示tiny帮助信息
     -v, --version             显示tiny版本


 提示:
   套件 - 若想查看项目中所使用的套件帮助信息,请在项目根目录执行该命令.
   插件 - 若想查看插件的帮助信息,请使用 tiny [name] help 命令, eg : tiny git help
```

### Quick start

以 `@opentiny/tiny-toolkit-dev` 套件为例，讲解开发流程。


1. 初始化项目

	```bash
	# 创建并进入项目文件夹
	$ mkdir my-project && cd $_
	
	# 初始化dev的开发环境
	$ tiny init dev
	```
	
3. 开启本地环境

	```bash
	# 开启dev的开发环境
	$ tiny start
	```

4. 项目编译及打包

	```bash
	$ tiny build
	```	

## ChangeLog

[CHANGELOG.md](CHANGELOG.md)

## Support

开发及使用过程中的问题，可以在代码仓库新建issue

## 开发文档

### 前置条件

* 确保已安装lerna，未安装可执行命令: `npm install --global lerna`
* 确保node版本在10及以上。(原因是ncc用了v8的模块:https://github.com/zeit/ncc/issues/51)

### 本地开发调试命令

首次：`npm run init`
开发：`npm run dev`
构建：`npm run build`
本地验证: `npm run link`
发布: `npm run publish`

### 构建流程

根目录执行`npm run build`即可，会打包出lib目录和dist目录。

