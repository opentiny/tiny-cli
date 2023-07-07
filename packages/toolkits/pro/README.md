# tiny-toolkit-pro

## 说明

tiny-toolkit-pro 套件，开箱即用的中后台前端/设计解决方案

## 用法

### 初始化

```
tiny init pro
```
### 配置项目名称、描述

```
 ? 请输入项目名称： (tiny-pro)
 ? 请输入项目描述： (基于TinyPro套件创建的中后台系统)
```
### 选择前端技术栈
目前支持`Vue` `Angular`两种前端技术栈。
```
 ? 请选择您希望使用的技术栈： (Use arrow keys)
 > vue
   angular
```
### 选择服务端技术栈（可选配置）
**目前仅 `Vue`工程支持对接服务端，且只支持`Egg.js`，剩余功能正在开发中。**  
如果选择不对接服务端，全部接口将采用mock数据。
```
 ? 请选择您希望使用的服务端技术栈： (Use arrow keys)
 > Egg.js
   暂不配置
```
### 选择数据库（可选配置）
```
 ? 请选择数据库类型： (Use arrow keys)
 > mySQL
   暂不配置
```
### 数据库准备工作
可使用本地数据库或云数据库，请提前安装配置本地数据库服务或者云数据库服务，确保连接正常可用。

**本地数据库：** 本地数据库安装MySQL
- 查看本机操作系统，选择合适的安装包版本[下载MySQL](https://dev.mysql.com/downloads/)
- 安装完成MySQL软件
- 进行初始化配置，设置端口、用户、登录密码等，测试连接正常

**云数据库：** 云数据库推荐使用[华为云数据库RDS](https://support.huaweicloud.com/productdesc-rds/zh-cn_topic_dashboard.html)
- 注册华为帐号并开通华为云
- 选择合适的计费模式购买并配置数据库实例
- 选择合适的连接模式进行连接
具体开通过程请参考：[RDS for MySQL快速入门](https://support.huaweicloud.com/qs-rds/rds_02_0008.html)，也可使用TinyCLI云服务插件以命令行的方式开通创建，具体请参考：[TinyCLI 云服务插件](https://opentiny.design/vue-pro/docs/advanced/plugin)



### 配置数据库信息  
 **初始化过程中会自动创建数据库和表，建议输入新的数据库名称以免造成数据库覆盖风险！**
```
 ? 请输入数据库地址： (localhost)
 ? 请输入数据库端口： (3306)
 ? 请输入数据库名称：
 ? 请输入登录用户名： (root)
 ? 请输入密码： [input is hidden]
```
- 此处配置也可在项目创建完成后在`server/config/config.default.ts`中进行配置修改。
- pro套件会在初始化时自动创建数据库和表，如因配置等问题导致数据库初始化失败，有以下两种方式可帮助重新初始化数据库：
    - 确认好正确配置后重新运行 `tiny init pro` 覆盖安装。
    - 进入 `server/app/databases` 目录下手动执行相关sql。
- 数据库表中会自动插入一条用户信息（账号：admin@example.com  密码：admin），可直接用于登录。
- 如server服务启动失败，请确保数据库服务的地址、名称、账号、密码等与`server/config/config.default.ts` 中配置一致。
- `server/app.ts` 中会同步ORM模型到数据库帮助新建表但只建议在开发环境下使用。

### 开启本地服务器

前端
```
cd web && npm run start
```
后端
```
cd server && npm run dev
```

### 构建部署
前端：Vue项目采用Vite工具构建，请参考[Vite 部署指南](https://cn.vitejs.dev/guide/static-deploy.html)、[Vite 生产环境指南](https://cn.vitejs.dev/guide/build.html)  
后端：Egg项目请参考[Egg构建部署指南](https://www.eggjs.org/zh-CN/core/deployment)

## 维护者

添加官方小助手微信：opentiny-official，加入我们的技术交流群
