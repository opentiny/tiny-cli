# TinyPro 后端开发指南

在阅读本指南前，我们假设您已经阅读过[Nest.js官方文档](https://docs.nestjs.com/)并能够独立本机启动`MySQL`与`Redis`的能力。

## 项目初始化

[快速开始](./tiny-pro.md)

## 后端启动

开发阶段通常不会使用docker进行启动，更多的是本地启动。首先我们要配置环境变量文件, 也就是`.env`文件

```properties
# 数据库IP (一般是本地)
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
DATABASE_SYNCHRONIZE = 'true'
DATABASE_AUTOLOADENTITIES = 'true'
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

### 开发前检查清单

- [ ] 后端项目已被初始化
- [ ] `.env`文件中`DATABASE_HOST`**是开发环境**
- [ ] `.env`文件中`DATABASE_NAME`为开发库
- [ ] `.env`文件中`DATABASE_NAME`存在
- [ ] `.env`文件中`DATABASE_SYNCHRONIZE`为`true`
- [ ] `.env`文件中`REDIS_HOST`**是开发环境**
- [ ] MySQL服务可以正常访问
- [ ] Redis服务可以正常访问
- [ ] `dist`目录被删除 (可选,如果你不需要测试初始化数据的话)

配置好文件后您可以运行`npm run start:dev`来运行后端服务。当出现下述字样时，表示后端启动成功。

```
LOG [NestApplication] Nest application successfully started +11ms
Application is running on: http://[::1]:3000
```


### 关闭演示模式

`TinyPro` 提供了一个 `RejectGuard` 的 `Guard`. 如果你需要关闭演示模式, 请在 `nestJs/src/app.module.ts` 中移除 L66~L69. 最终代码应当如下

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

## 初始化数据

有些时候我们需要自动初始化一些数据(比如前端的默认国际化字段). 这些逻辑**均需**写在`App.module.ts`中`AppModule`类中的`onModuleInit`函数中。

## 国际化

> 这里的国际化指的是报错信息的国际化

后端采用的是`nestjs-i18n`依赖库。国际化词条放在`i18n/<lang>/xxx.json`下

```
i18n
  enUS
    exception.json
    validation.json
  zhCN
    exception.json
    validation.json
```

目前仅支持`enUS`与`zhCN`两种语言，且`fallback`为`enUS`.

### 报错时候使用国际化词条

后端服务遵循`Restful`规范，可以直接抛出错误使用HttpStatusCode来代替错误代码。如果需要使用国际化词条，请确保该词条已经存在于`enUS|zhCN/exception.json`文件内。假设有一个服务`PolicyService`需要抛出一个`409`错误。

1. 添加国际化词条
2. 在服务中注入`I18nService`
3. 使用该词条

```json
// zhCN/exception.json
{
  // 前面不做修改
  "policy":{
    "exists": "Policy已存在"
  }
}
```

```ts
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { I18nTranslations } from '../.generate/i18n.generated';
import { I18nContext, I18nService } from 'nestjs-i18n';
@Injectable()
export class PolicyService {
  constructor(
    private readonly i18n: I18nService<I18nTranslations>
  ) {}
  createPolicy(){
    const exists = ...;
    if (exists){
      throw new HttpException(
        this.i18n.translate('exception.policy.exists', {
          lang: I18nContext.current().lang,
        }),
        HttpStatus.CONFLICT // 409
      )
    }
    //....
  }
}
```

## 接口权限管理

### Token管理

凡是**没有**被`Public`修饰器修饰的接口，均会被`auth/auth.guard.ts`进行校验，如果**token不存在**、**token过期**、**token不合法**，均不允许访问。

### 权限控制

如果一个接口没有被`Permission`修饰器进行修饰，那么这个接口是**允许**所有**已经登录**的用户访问。如果一个接口**被**`Permission`修饰器进行修饰，那么该接口**仅允许**拥有该权限的用户访问，其余用户会返回**403**错误代码

默认`admin`用户存在超级权限`(*)`, 拥有该权限且已经登陆的用户可以访问任何接口。

例如

```ts
@Controller('/policy')
export class PolicyController {
  @Get('/list')
  async getPolicy(){}
}
```

上述代码中`GET /policy/list`是一个不公开，不受保护的接口。我们可以使用`Permission`修饰器对他进行权限认证，当且仅当用户角色存在`policy::get::list`权限时才放行

```ts
@Controller('/policy')
export class PolicyController {
  @Get('/list')
  @Permission('policy::get::list')
  async getPolicy(){}
}
```

这样一来`GET /policy/list`就只允许拥有`policy::get::list`权限的角色访问，其余角色访问则会返回一个403错误

但有些时候我们需要一个接口允许未登陆的用户访问。例如我们在登陆的时候经常需要获取免责声明，那么我们就可以写一个`GET /policy`接口，用于获取一个免责声明的法律条文。

所以我们可以添加如下

```ts
@Controller('/policy')
export class PolicyController {
  @Get('/list')
  @Permission('policy::get::list')
  async getPolicies(){}
  @Get('/')
  @Public()
  async getPolicy(){}
}
```

这样一来`GET /policy/list`接口只允许**登录**且**拥有policy::get::list**权限的角色访问。`GET /policy`接口则允许**未登陆**的**所有角色**进行访问。

如果未来的某一天，我们需要让`/policy/*`都允许未登录的用户访问，那么我们可以这么写

```ts
@Public()
@Controller('/policy')
export class PolicyController {
  @Get('/list')
  async getPolicies(){}
  @Get('/')
  async getPolicy(){}
}
```

这样一来，所有的policy接口都可以被未登录的用户访问了

## 遇到困难?

加官方小助手微信 opentiny-official，加入技术交流群

## 常见问题

### 打包速度慢

请阅读[SWC](https://docs.nestjs.com/recipes/swc)

### 提示 `Lock file exists, if you want init agin, please remove dist or dist/lock`

为了避免重复初始化，系统会在第一次初始化的时候在`dist`目录下新建`app/lock`文件，如果您需要再次初始化，那么请您删除`dist/app`或者直接删除`dist`文件夹

### docker 部署时数据库超时

`docker-compose.yaml`实际上配置了`depends_on`字段，但`mysql`镜像并没有提供对应的健康检查。如果服务挂掉，可以等待`mysql`启动成功后手动重启后端服务
