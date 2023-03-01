# <%=pluginName%>

## 说明

这里对你的套件进行简单描述, 比如适用哪些场景,使用了什么技术, 有什么特点

## 用法

### 初始化

```
<%=prefix%> init <%=pluginShortName%>
```
### 开启本地服务器

```
<%=prefix%> start 
```

### 单元测试

```
<%=prefix%> test 
```

### 代码打包

```
<%=prefix%> build 
```

### 代码发布

```
<%=prefix%> publish -d # 发布到日常
<%=prefix%> publish -p # 发布到预发
<%=prefix%> publish -o # 发布到线上
```


## <%=prefix%>.config.js 配置

```
{
    toolkit: "<%=pluginFullname%>",
    toolkitConfig: {
        port: 9000, //本地服务器端口号
        open: true,  //是否自动打开浏览器
        log: true,  //是否打印本地服务器访问日志
        openTarget: "src/index.html",   //打开浏览器后自动打开目标页面
        liveload: false //是否自动刷新
    }    
}
```



