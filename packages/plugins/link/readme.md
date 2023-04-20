# tiny-plugin-link

## 描述

> 帮助开发同事本地调试插件，本地通过软链接的方式，调用本地开发的插件。避免组件开发人员，必须将组件 publish后 本地才可以体验调试的尴尬场景，提升组件开发成员开发、调试效率。

## 使用说明 - 已调试 lazyload 为例

> 为了方便理解，现以本地开发调试 lazyload 组件为例。

1. 第一步：首先将 lazyload 软链到 .tiny/LocalCDNPath 目录去。
   `执行tiny link 或者 tiny link init`
   ![init](https://github.com/opentiny/tiny-cli/blob/dev/packages/plugins/link/doc/init.png)  
   此时在个人的用户目录下会存在一份目标组件的软链接:  
   ![initlink](https://github.com/opentiny/tiny-cli/blob/dev/packages/plugins/link/doc/initlink.png)

2. 第二步：在.tiny/LocalCDNPath 目录查找 @opentiny/xxxx 组件，找到的话，将页面依赖的@opentiny/xxxx 删除，将.tiny/LocalCDNPath 下的组件软链到页面项目中去。  
   `执行tiny link -m @opentiny/xxx 本例中xxx表示lazyload`  
   ![insert](https://github.com/opentiny/tiny-cli/blob/dev/packages/plugins/link/doc/insert.png)  
   此时，在测试工程中，就会将目标组件软链接过来，如：  
   ![insertlink](https://github.com/opentiny/tiny-cli/blob/dev/packages/plugins/link/doc/insertlink.png)

## 使用场景

各组件开发的 owner 本地调试自己开发的组件，不需要每次发布在可以调试本地工程。

## 用法

### 在命令行里面使用

```
$ tiny link                      初始化本地插件的link环境
$ tiny link init                 同tiny link，初始化本地link环境
$ tiny link help                 显示link插件的相关明林
$ tiny link link -m @opentiny/xxx   将@opentiny/xxx插件link到当前的路径下
```
