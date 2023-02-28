# @/tiny-toolkit-docs

## 说明

这里对你的套件进行简单描述, 比如适用哪些场景,使用了什么技术, 有什么特点

## 用法

### 初始化

```
tiny init @/docs
```
### 开启本地服务器

```
tiny start 
```

### 单元测试

```
tiny test 
```

### 代码打包

```
tiny build 
```

### 代码发布

```
tiny publish -d # 发布到日常
tiny publish -p # 发布到预发
tiny publish -o # 发布到线上
```


## tiny.config.js 配置

```
{
    toolkit: "@opentiny/tiny-toolkit-docs",
    toolkitConfig: {
        port: 9000, //本地服务器端口号
        open: true,  //是否自动打开浏览器
        log: true,  //是否打印本地服务器访问日志
        openTarget: "src/index.html",   //打开浏览器后自动打开目标页面
        liveload: false //是否自动刷新
    }    
}
```



