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
**目前仅 `vue`工程支持对接服务端，且只支持`Egg.js`，剩余功能正在开发中**  
如果选择不对接服务端，全部接口将采用mock数据。
```
 ? 请选择您希望使用的服务端技术栈： (Use arrow keys)
 > Egg.js
   Spring Cloud
   Nest.js
   暂不配置
```
### 选择数据库（可选配置）
```
 ? 请选择数据库类型： (Use arrow keys)
 > mySQL
   暂不配置
```
### 配置数据库信息
可使用本地数据库或云数据库，推荐使用[华为云数据库RDS](https://opentiny.design/vue-pro/docs/advanced/plugin#RDS)  
此处配置也可在项目创建完成后在`server/config/config.default.ts`中进行配置修改
```
 ? 请输入数据库地址： (localhost)
 ? 请输入数据库端口： (3306)
 ? 请输入数据库名称：
 ? 请输入登录用户名： (root)
 ? 请输入密码： [input is hidden]
```
### 数据库准备工作
- 安装配置本地数据库或者云数据库，确保连接正常可用。
- 确保数据库`地址` `名称`等与 `server/config/config.default.ts` 中配置一致。
- 将 `server/app/databases` 中的sql运行一遍初始化数据库和表。（`app.ts` 中会同步模型到数据库帮助新建表但只建议在开发环境下使用）


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
