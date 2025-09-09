# Tiny Pro 快速启动

## 环境准备

请确保您安装了`nodejs`, `npm`, `tiny-cli`

```bash
tiny init pro
```

运行上述代码后按照提示输入配置

```
? 请输入项目名称： tiny-pro
? 请输入项目描述： 基于TinyPro套件创建的中后台系统
* 请选择您希望使用的客户端技术栈： vue
* 请选择您希望使用的服务端技术栈： Nest.js
* 请选择你想要的构建工具:  Vite
* 请确保已安装数据库服务（参考文档
https://www.opentiny.design/tiny-cli/docs/toolkits/pro#database）：
已完成数据库服务安装，开始配置
* 请选择数据库类型： MySql
* 请输入数据库地址： localhost
* 请输入数据库端口： 3306
* 请输入数据库名称： ospp-nest
* 请输入登录用户名： root
* 请输入密码： [hidden]
```

初始化完成后，项目结构应该为

```
tiny-pro
  nestJs    # 后端服务
  web       # 前端服务
```

## 后端启动

后端服务支持`docker启动`与`命令启动`， 执行操作前请先确保所处位置为`tiny-pro/nestJS`

### 关闭演示模式

`TinyPro` 提供了一个 `RejectGuard` 的 `Guard`. 如果你需要关闭演示模式, 请在 `nestJS/src/app.module.ts` 中移除 L66~L69. 最终代码应当如下

```diff
@Module({
  ...
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
-   {
-     provide: APP_GUARD,
-     useClass: RejectRequestGuard,
-   },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
  ],
})
export class AppModule implements OnModuleInit {
```

### Docker启动

在运行`docker compose up -d`之前，请先修改`.env`环境变量文件，示例如下

```properties
# 数据库IP
DATABASE_HOST = 'mysql'
# 数据库端口
DATABASE_PORT = 3306
# 数据库用户名
DATABASE_USERNAME = 'root'
# 数据库密码
DATABASE_PASSWORD = 'root'
# 数据库名 (请确保该库存在)
DATABASE_NAME = 'ospp-nest'
# 请阅读: https://www.typeorm.org/migrations
# 线上环境请关闭
DATABASE_SYNCHRONIZE = true
DATABASE_AUTOLOADENTITIES = true
# jwt secret
AUTH_SECRET = 'secret'
REDIS_SECONDS = 7200
# redis ip
REDIS_HOST = 'redis'
# redis 端口
REDIS_PORT = 6379
# token过期时间
EXPIRES_IN = '2h'
# 分页默认起始页 (一般可以不修改)
PAGINATION_PAGE = 1
# 分页默认大小
PAGINATION_LIMIT = 10
```

修改完`.env`文件后，请执行`docker compose up -d`


当执行`docker ps`中`STATUS`列均为`Up`时，表示后端启动成功

```
CONTAINER ID   IMAGE         COMMAND                  CREATED          STATUS          PORTS                               NAMES
b76f3ebebe81   nestjs-back   "docker-entrypoint.s…"   12 minutes ago   Up 11 minutes   0.0.0.0:3000->3000/tcp              nestjs-back-1
32ae9982b96a   redis         "docker-entrypoint.s…"   12 minutes ago   Up 12 minutes   0.0.0.0:6379->6379/tcp              nestjs-redis-1
94f3b55b7b2b   mysql:8       "docker-entrypoint.s…"   12 minutes ago   Up 12 minutes   0.0.0.0:3306->3306/tcp, 33060/tcp   nestjs-mysql-1
```

### 命令启动

#### 依赖安装

```bash
npm i
```

#### 环境准备

#### 安装MySQL

请参考[MySQL 8.0安装](https://dev.mysql.com/doc/mysql-installation-excerpt/8.0/en/windows-installation.html)

#### 安装Redis服务

请参考[Redis 官方手册](https://redis.io/docs/latest/operate/oss_and_stack/install/install-redis/install-redis-on-windows/)

请确保您的机器已经安装了`Mysql`与`Redis`服务。接下来，我们需要配置`.env`环境变量文件。`.env`文件示例如下

```properties
# 数据库IP
DATABASE_HOST = 'localhost'
# 数据库端口
DATABASE_PORT = 3306
# 数据库用户名
DATABASE_USERNAME = 'root'
# 数据库密码
DATABASE_PASSWORD = 'root'
# 数据库名 (请确保该库存在)
DATABASE_NAME = 'ospp-nest'
# 请阅读: https://www.typeorm.org/migrations
# 线上环境请关闭
DATABASE_SYNCHRONIZE = true
DATABASE_AUTOLOADENTITIES = true
# jwt secret
AUTH_SECRET = 'secret'
REDIS_SECONDS = 7200
# redis ip
REDIS_HOST = 'localhost'
# redis 端口
REDIS_PORT = 6379
# token过期时间
EXPIRES_IN = '2h'
# 分页默认起始页 (一般可以不修改)
PAGINATION_PAGE = 1
# 分页默认大小
PAGINATION_LIMIT = 10
```

#### 启动项目

在启动项目前请您做好如下检查

- [ ] MySQL服务可以正常访问
- [ ] Redis服务可以正常访问
- [ ] MySQL中存在`.env`文件中`DATABASE_NAME`字段定义的数据库，且该数据库为空
- [ ] `.env`文件中`DATABASE_SYNCHRONIZE`为`true`
- [ ] `tiny-pro`后端依赖已经安装

完成上述检查后，您可以在`tiny-pro/nestJs`下执行`npm run start`.

```
LOG [NestApplication] Nest application successfully started +11ms
Application is running on: http://[::1]:3000
```

当出现上述文本时候即为后端启动成功。

## 前端启动

### 依赖安装

```bash
cd tiny-pro/web
npm i
```

### 项目启动

在项目启动前，请您确保后端服务已经启动成功，且可以正常访问。我们列出了一个启动前检查清单，您可以对照检查清单来进行启动前检查

- [ ] 后端服务启动成功
- [ ] 前端依赖安装完成
- [ ] `npm run mock`启动mock服务

上述列表全部检查完成后，运行 `npm run start` 即可启动前端服务，浏览器会自行打开项目，当出现下图时则代表启动成功。

![启动成功](./images/tiny-pro-show.png)

## 前端打包

对于前端项目打包，只需要执行`npm run build`即可

## 后端打包

### 命令打包

运行`npm run build`即可

### docker打包

> 这里只阐述默认 tiny-pro 后端打包，如果您进行了修改(例如增加了某些node-gyp依赖，请修改`dockerfile`手动安装`node-gyp`系统级前置依赖)

运行 `docker build -t tinypro:latest` 即可

## 遇到困难?

加官方小助手微信 opentiny-official，加入技术交流群

## 常见问题

### 后端docker启动时出现 `Error response from daemon: Ports are not available: exposing port TCP 0.0.0.0:3306 -> 0.0.0.0:0: listen tcp 0.0.0.0:3306: bind: Only one usage of each socket address (protocol/network address/port) is normally permitted.`

这是因为宿主机的某些应用占用了`3306`端口, 请先释放宿主机该端口后手动启动MySQL服务

### 后端使用`docker compose up -d`启动时候，出现I/O timeout错误

这主要是因为网络问题，您可以手动执行下述命令

```
docker pull node:alpine
docker pull node:lts
```

输入完上述命令后再次执行`docker compose up -d`即可。


### 提示 `Lock file exists, if you want init agin, please remove dist or dist/lock`

为了避免重复初始化，系统会在第一次初始化的时候在`dist`目录下新建`app/lock`文件，如果您需要再次初始化，那么请您删除`dist/app`或者直接删除`dist`文件夹

### docker 部署时数据库超时

`docker-compose.yaml`实际上配置了`depends_on`字段，但`mysql`镜像并没有提供对应的健康检查。如果服务挂掉，可以等待`mysql`启动成功后手动重启后端服务

### 前端跨域问题如何解决

对于开发环境来说，可以直接修改`dev-server`的`proxy`. 例如`vite`工具的`server.proxy`

### 代码无法提交

您可以选择移除husky或根据[Angular 规范](https://zj-git-guide.readthedocs.io/zh-cn/latest/message/Angular%E6%8F%90%E4%BA%A4%E4%BF%A1%E6%81%AF%E8%A7%84%E8%8C%83/)书写commit信息

### 页面部署后刷新404

请移步[Vue Router服务器部署指南](https://router.vuejs.org/guide/essentials/history-mode.html#Example-Server-Configurations)
