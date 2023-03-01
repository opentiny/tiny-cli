# <%=pluginName%>

> 一句话描述插件作用

## 说明

说明一下插件的功能, 架构等

## 使用场景

描述一下插件的使用场景




## 用法


### 在命令行里面使用

```
$ <%=prefix%> <%=pluginShortName%> go
$ <%=prefix%> <%=pluginShortName%> help
```

### 在套件/插件里面使用

```
import { modules } from '@opentiny/cli-devkit';

const <%=pluginShortName%> = await modules.get('<%=pluginFullname%>');
await <%=pluginShortName%>.go({clientArgs: ['some-args'], clientOptions: { a: 2, b: 2}});
```

