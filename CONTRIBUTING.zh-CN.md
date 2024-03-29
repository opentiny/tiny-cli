# 贡献指南

很高兴你有意愿参与 TinyCLI 开源项目的贡献，参与贡献的形式有很多种，你可以根据自己的特长和兴趣选择其中的一个或多个：

- 报告[新缺陷](https://github.com/opentiny/tiny-cli/issues/new?template=bug-report.yml)
- 为[已有缺陷](https://github.com/opentiny/tiny-cli/labels/bug)提供更详细的信息，比如补充截图、提供更详细的复现步骤、提供最小可复现demo链接等
- 提交 Pull requests 修复文档中的错别字或让文档更清晰和完善
- 添加官方小助手微信 opentiny-official，加入技术交流群参与讨论

当你亲自使用 TinyCLI 组件库，并参与多次以上形式的贡献，对 TinyCLI 逐渐熟悉之后，可以尝试做一些更有挑战的事情，比如：

- 修复缺陷，可以先从 [Good-first issue](https://github.com/opentiny/tiny-cli/labels/good%20first%20issue) 开始
- 实现新特性
- 完善单元测试
- 翻译文档
- 参与代码检视

## 提交 Issue

如果你在使用 TinyCLI 组件过程中遇到问题，欢迎给我们提交 Issue，提交 Issue 之前，请先仔细阅读相关的[官方文档](https://opentiny.design)，确认这是一个缺陷还是尚未实现的功能。

如果是一个缺陷，创建新 Issue 时选择 [Bug report](https://github.com/opentiny/tiny-cli/issues/new?template=bug-report.yml) 模板，标题遵循 `[toolkitName/pluginName/CliCore]缺陷简述` 的格式，比如：`[tiny-toolkit-xxx] xxx套件执行tiny start命令启动后提示xxx错误`。

报告缺陷的 Issue 主要需要填写以下信息：
- tiny-cli 和 node 的版本号
- 缺陷的表现，可截图辅助说明，如果有报错可贴上报错信息
- 缺陷的复现步骤，最好能提供一个最小可复现 demo 链接

如果是一个新特性，则选择 [Feature request](https://github.com/opentiny/tiny-cli/issues/new?template=feature-request.yml) 模板，标题遵循 `[toolkitName/pluginName/CliCore]新特性简述` 的格式，比如：`[CliCore] 新增switch命令支持切换NPM源功能`。

新特性的 Issue 主要需要填写以下信息：
- 该特性主要解决用户的什么问题
- 该特性的 api 是什么样的

## 提交 PR

提交 PR 之前，请先确保你提交的内容是符合 TinyCLI 整体规划的，一般已经标记为 [bug](https://github.com/opentiny/tiny-cli/labels/bug) 的 Issue 是鼓励提交 PR 的，如果你不是很确定，可以创建一个 [Discussion](https://github.com/opentiny/tiny-cli/discussions) 进行讨论。

本地启动步骤：

- 点击 [TinyCLI](https://github.com/opentiny/tiny-cli) 代码仓库右上角的 Fork 按钮，将上游仓库 Fork 到个人仓库
- Clone 个人仓库到本地
- 在 Tiny CLI 根目录下运行 npm init, 安装依赖
- 运行 npm run dev，启动本地代码编译开发

```shell
# username 为用户名，执行前请替换
git clone git@github.com:username/tiny-cli.git
cd tiny-cli
git remote add upstream git@github.com:opentiny/tiny-cli.git
npm i

# 启动项目
npm run dev
```

提交 PR 的步骤：

- 创建新分支 `git checkout -b username/feature1`，分支名字建议为 `username/feat-xxx` / `username/fix-xxx`
- 本地编码
- 遵循 Commit Message Format 规范进行提交，不符合提交规范的 PR 将不会被合并
- 提交到远程仓库：git push origin branchName
- (可选)同步上游仓库 dev 分支最新代码：git pull upstream dev
- 打开 TinyCLI 代码仓库的 [Pull requests](https://github.com/opentiny/tiny-cli/pulls) 链接，点击 New pull request 按钮提交 PR
- 项目 Committer 进行 Code Review，并提出意见
- PR 作者根据意见调整代码，请注意一个分支发起了 PR 后，后续的 commit 会自动同步，无需重新提交 PR
- 项目管理员合并 PR

贡献流程结束，感谢你的贡献！

## 加入开源社区

如果你对我们的开源项目感兴趣，欢迎通过以下方式加入我们的开源社区。

- 添加官方小助手微信：opentiny-official，加入我们的技术交流群
- 加入邮件列表：opentiny@googlegroups.com
