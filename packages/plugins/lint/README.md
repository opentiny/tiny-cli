# tiny-plugin-lint

> 本地代码 commit 时校验提交代码的 eslint，禁止不规范的代码入库

当前 lint 插件基于 Opentiny 前端规范开发而成，eslint 规则包可查看：[@opentiny/eslint-config](https://www.npmjs.com/package/@opentiny/eslint-config)

## 说明

> 代码提交时校验 eslint
> 提交校验不通过的代码，可以通过 fix 操作，修复不合规的代码（部分不规范的 eslint 问题仍需要手动修复）

## 使用场景

1. 代码提交时校验
2. 代码提交后修复

## 用法

### 在命令行里面使用

```
$ tiny lint help
$ tiny lint init  //初始化tiny lint
$ tiny lint fix   //修复本地lint，包括eslint（规则见:.eslintrc.js）、prettier(规则见：.prettierrc.js)、stylelint(规则见：.stylelintrc.js)
```