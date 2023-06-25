# tiny-toolkit-pro

## 说明

tiny-toolkit-pro 套件，开箱即用的中后台前端/设计解决方案

## 用法

### 初始化

```
tiny init pro
```
### 配置项目名称、描述
项目名称默认是当前所在文件夹名称

```
 ? 请输入项目名称： 
 ? 请输入项目描述： (基于TinyPro套件创建的中后台系统)
```
### 选择前端技术栈
目前支持```vue``` ```angular```两种前端技术栈。
```
 ? 请选择您希望使用的技术栈： (Use arrow keys)
 > vue
   angular
```
### 选择服务端技术栈（可选配置）
**目前仅 ```vue```工程支持对接服务端，且只支持```Egg.js```，剩余功能正在开发中**  
如果选择不对接服务端，全部接口将采用mock数据。
```
 ? 请选择您希望使用的服务端技术栈： (Use arrow keys)
 > Egg.js
   Spring Cloud
   Nest.js
   暂不配置
```
### 配置数据库信息（可选配置）

```
 ? 请选择数据库类型： (Use arrow keys)
 > mySQL
   暂不配置

 ? 请输入数据库地址： (localhost)
 ? 请输入数据库端口： (3306)
 ? 请输入数据库名称：
 ? 请输入登录用户名： (root)
 ? 请输入密码： [input is hidden]
```

### 开启本地服务器

```
tiny start
```

### 代码打包

```
tiny build
```

## 维护者

添加官方小助手微信：opentiny-official，加入我们的技术交流群
