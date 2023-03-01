## Tiny 文档的开源网站

### Tiny-design 重要架构调整  2023.1.4
  目前本项目计划编译多个目标产物，以部署到内外网的网站 
  1、部署到内网： https://tinyuidesign.cloudbu.huawei.com/   引用包: `@huawei/tinydoc-ng-tiny`
        -----> build:innerhome
        -----> build:innerdocs

  2、部署到外网： https://www.opentiny.design/   引用包：`@opentiny/ng-tinydoc`
        -----> build:openhome
        -----> build:opendocs
### 1.项目技术架构

1.  vite + vue3 + naive UI
2.  特色：
    - 支持 md 格式文档！
    - 国际化切换、主题切换、配置/非配置化文档切换！
    - 支持组件的 demo 导航，API 属性向 demo 跳转！
    - 支持单列 demo 及 2 列 demo 展示！

### 2.项目作用

~~将 tiny3-angular的非配置化组件以及 Tiny-vue3的文档以iframe的方法嵌入  ~~

tiny-vue3的文档是独立仓库了！   2022.7.22

### 3.项目启动

需要 node14+的环境，在 根目录下 执行`npm install`后，运行`npm run dev：innerdocs`命令！

### 3.1 启动命令说明：
`npm run dev：innerhome` -----> 启动 内部新官网首页
`npm run dev：innerdocs` -----> 启动 TinyNG 内部新官网
`npm run dev：openhome`  -----> 启动 外部新官网首页
`npm run dev：opendocs`  -----> 启动 TinyNG 外部新官网

### 4.项目部署

npm run build之后，复制到 tinyui-design-server 仓库     https://codehub-g.huawei.com/Tiny/tiny-club/tinyui-design-server/files?ref=master    
                         /app/public/tiny-ng 目录中去

再部署 tinyui-design-server 流水线：                    https://fuxi.huawei.com/mine/components/10089577/pipeline/list/259496

最后验证：                                              https://tinyuidesign.cloudbu.huawei.com/


### 5. 更换环境时

1、检查 env 中的context变量
2、检查 viteconfig 中的base路径


### TinyNG 自适应方案 2023.1.4 

#### 1.屏幕宽度为`1920px`以下时

a. 总览组件单行显示4个

#### 2.屏幕宽度为`1280px`以下时

a. 组件示例和文档页面，隐藏快速导航

b. 总览组件单行显示2个

#### 3.屏幕宽度为`1024px`以下时

a. 页面整体隐藏左侧菜单

#### 4.屏幕宽度为`768px`以下时

a. 组件示例页面，代码示例单行显示

#### 图片说明：

![layout](public/images/layout.png)