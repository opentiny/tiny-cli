# tiny-toolkit-pro

## 说明

tiny-toolkit-pro 套件，开箱即用的全栈开发基础平台

## 准备工作
### 数据库准备工作
如果要对接服务端，请提前安装配置本地数据库服务或者云数据库服务，确保连接正常可用，可使用本地数据库或云数据库。

**本地数据库：** 本地数据库安装MySQL
- 查看本机操作系统，选择合适的安装包版本[下载MySQL](https://dev.mysql.com/downloads/)
- 安装完成MySQL软件
- 进行初始化配置，设置端口、用户、登录密码等，测试连接正常

**云数据库：** 云数据库推荐使用[华为云数据库RDS](https://support.huaweicloud.com/productdesc-rds/zh-cn_topic_dashboard.html)
- 注册华为帐号并开通华为云
- 选择合适的计费模式购买并配置数据库实例
- 选择合适的连接模式进行连接
具体开通过程请参考：[RDS for MySQL快速入门](https://support.huaweicloud.com/qs-rds/rds_02_0008.html)，也可使用TinyCLI云服务插件以命令行的方式开通创建，具体请参考：[TinyCLI 云服务插件](https://opentiny.design/vue-pro/docs/advanced/plugin)

### Egg.js准备工作
Egg.js 是一个Node.js服务端框架，开发环境准备好Node、Git等即可，[参考指南](https://www.eggjs.org/zh-CN/intro/quickstart)

### Spring Cloud准备工作
如选择对接Spring Cloud，需要提前安装好JDK、IDE、Maven、配置好环境变量等
#### Java环境安装
1. [下载JDK](https://www.oracle.com/java/technologies/downloads/)
2. [配置环境变量](https://www.runoob.com/java/java-environment-setup.html)
#### IDE安装
建议安装使用 [IntelliJ IDEA](https://www.jetbrains.com/idea/)，内置Maven，[下载链接](https://www.jetbrains.com/zh-cn/idea/download/)

#### Maven安装
tiny-toolkit-pro 套件中的 Spring Cloud 采用 Maven 构建项目和依赖管理  
1. [下载链接](https://maven.apache.org/download.cgi)
2. [环境配置](https://www.runoob.com/maven/maven-setup.html)

#### 微服务引擎
有两种方式可供选择：
  
  * 通过下载安装本地简化版 CSE 搭建本地开发环境，下载链接：[CSE 2.0](https://support.huaweicloud.com/devg-cse/cse_devg_0036.html)，下载完成，一键启动cse.exe 
  
  * 使用[华为云微服务引擎(CSE)](https://support.huaweicloud.com/qs-cse/cse_qs_0002.html) 

#### 

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
**目前仅 `Vue`工程支持对接服务端，剩余功能正在开发中。**  
如果选择不对接服务端，全部接口将采用mock数据。
```
 ? 请选择您希望使用的服务端技术栈： (Use arrow keys)
 > Egg.js
   Spring Cloud
   暂不配置
```
### 选择数据库（可选配置）
```
 ? 请选择数据库类型： (Use arrow keys)
 > mySQL
   暂不配置
```

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
* EggJS
```
cd server && npm run dev
```
* Spring Cloud  
  * 直接使用IDEA一键启动所有服务（推荐）
  * 使用 ```mvn``` 命令
  ```
  // 进入对应目录下
  mvn spring-boot:run
  ```
  * 使用 ```java -jar ``` 命令
  ```
  // 使用IDEA或者mvn进行打包
  mvn clean package

  // 进入对应 target 目录下
  java -jar packagename.jar
  ```

### 构建部署
前端：Vue项目采用Vite工具构建，请参考[Vite 部署指南](https://cn.vitejs.dev/guide/static-deploy.html)、[Vite 生产环境指南](https://cn.vitejs.dev/guide/build.html)  
后端：
* EggJS项目请参考[Egg构建部署指南](https://www.eggjs.org/zh-CN/core/deployment)
* Spring Cloud请参考[CSE部署微服务应用](https://support.huaweicloud.com/intl/zh-cn/devg-cse/cse_devg_0016.html)

## 维护者

添加官方小助手微信：opentiny-official，加入我们的技术交流群
