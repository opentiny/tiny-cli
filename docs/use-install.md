# 使用环境安装

tiny依赖 nodejs 、 npm 环境，若你还未安装好前端开发的环境，请先参考本文档进行安装。

## 安装 nodejs 与 npm

*若已安装了 nodejs 与 npm ，该步可忽略。*

进入 [Node.js官网](https://nodejs.org/en/) 下载 Node.js 安装包, 并安装。  

验证安装是否成功，可以在命令行中执行以下命令，查看 Node.js 版本及 NPM 版本：

```
$ node -v
v16.18.1
$ npm -v
8.19.2
```
> [NPM](https://www.npmjs.com/) 是 node.js 的包管理工具，用于管理包的依赖。类似于 Java 中的 Maven, Ruby 中的 Gem。

## 安装tiny


```bash
$ npm install @opentiny/cli npminstall -g
```	


注意：mac用户如果提示没有权限，请在前面加上 `sudo` 命令。

验证是否安装成功，可以在命令行中执行以下命令，查看 tiny 的版本：

```bash
$ tiny -v
tiny v1.x.x
```
