# TinyPro

TinyCLI 是一个跨平台的前端工程化 CLI 工具，为开发者提供一系列开发套件及工程插件，覆盖前端开发的整个链路，保证团队开发过程的一致性和可复制性。

TinyPro 是 TinyCLI 的一个套件，是一个开箱即用、前后端分离的后台管理模板。

特性：
- 支持 NestJS 后端
- 支持通过可视化方式配置菜单
- 细粒度权限管理：角色、用户、菜单、组件权限
- 支持多种构建工具：Webpack / Vite / Rspack / Farm
- 多级菜单
- 页签模式
- Mock 数据
- 主题定制
- 国际化

官网：[https://opentiny.design/vue-pro](https://opentiny.design/vue-pro)

## 一行命令初始化一个后台管理模板

请确保您安装了`Node.js`、`NPM`、`TinyCLI`。

```bash
tiny init pro
```

选择 Vue 技术栈，初始化完成后，项目结构应该为：

```
tiny-pro
  nestJs    # 后端服务
  web       # 前端服务
```

## 后端启动

后端服务支持 `Docker 启动` 与 `命令启动` 两种方式。

### Docker 启动

请确保您安装了 `Docker`。

在 `tiny-pro/nestJs` 下执行以下命令，启动后端服务：

```bash
docker compose up -d
```

### 命令启动

请确保您安装了 `MySQL`、`Redis`。

在启动项目前请您做好如下检查：

- MySQL 服务可以正常访问
- Redis 服务可以正常访问
- MySQL 中存在 `.env` 文件中 `DATABASE_NAME` 字段定义的数据库，且该数据库为空
- `.env` 文件中 `DATABASE_SYNCHRONIZE` 为 `true`

完成上述检查后，您可以在 `tiny-pro/nestJs` 下执行以下命令，启动后端服务：

```bash
npm i && npm start
```

## 前端启动

在 `tiny-pro/web` 下依次执行以下命令：

- 安装依赖：`npm i`
- 启动 Mock 服务：`npm run mock`
- 启动前端项目：`npm start`

更详细的文档请参考 TinyPro 官网：[https://opentiny.design/vue-pro](https://opentiny.design/vue-pro)

## 维护者

添加官方小助手微信：opentiny-official，加入我们的技术交流群。
