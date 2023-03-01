# API


> tiny 对外 api 集合
## Installation

```
tiny i @opentiny/cli-devkit --save
```


## 使用

devkit 是一个 object 对象集合，集成了所有tiny的依赖包，其下面挂截着多个对象, 每个对象都包含着一类操作:

```
const { cache , logs } from '@opentiny/cli-devkit';

const log - 

log.info('啦啦啦');
cache.set('ff', 'ee');
cache.get('ff');
```

## API 列表

- [API](#api)
  - [Installation](#installation)
  - [使用](#%e4%bd%bf%e7%94%a8)
  - [API 列表](#api-%e5%88%97%e8%a1%a8)
  - [cache](#cache)
    - [get(key)](#getkey)
    - [set(key, value, options)](#setkey-value-options)
    - [clear](#clear)
  - [config](#config)
    - [get(key, cwd)](#getkey-cwd)
    - [set(key, value, cwd)](#setkey-value-cwd)
    - [exist(cwd)](#existcwd)
    - [getToolkitName(cwd)](#gettoolkitnamecwd)
  - [fs](#fs)
    - [copyTpl(from: string, to: string, context?: any, options?: CopyOption)](#copytplfrom-string-to-string-context-any-options-copyoption)
    - [move(srcPath, distPath)](#movesrcpath-distpath)
    - [remove(file)](#removefile)
    - [readPackage(cwd?:string)](#readpackagecwdstring)
    - [writePackage(pkg:object, cwd?:string)](#writepackagepkgobject-cwdstring)
  - [home](#home)
    - [getHomePath()](#gethomepath)
    - [getModulesPath()](#getmodulespath)
    - [initHomeDir()](#inithomedir)
    - [cleanHomeDir()](#cleanhomedir)
  - [logs](#logs)
    - [info(msg)](#infomsg)
    - [success(msg)](#successmsg)
    - [warn(msg)](#warnmsg)
    - [error(msg)](#errormsg)
    - [debug(msg)](#debugmsg)
    - [cli](#cli)
    - [func](#func)
  - [module](#module)
    - [get(name)](#getname)
    - [install(name)](#installname)
    - [unInstall(name)](#uninstallname)
    - [update(name)](#updatename)
    - [localList(options)](#locallistoptions)
    - [onlineList(options)](#onlinelistoptions)
    - [localExist(name)](#localexistname)
    - [onlineExist([type])](#onlineexisttype)
    - [fullName(name)](#fullnamename)
    - [pluginFullName(name)](#pluginfullnamename)
    - [toolkitFullName(name)](#toolkitfullnamename)
  - [npm](#npm)
    - [install(pkg, options)](#installpkg-options)
    - [uninstall(pkg, options)](#uninstallpkg-options)
    - [installDependencies(options)](#installdependenciesoptions)
    - [latest(pkg, options)](#latestpkg-options)
    - [has(pkg, options)](#haspkg-options)
  - [task](#task)
    - [has(tasks, when)](#hastasks-when)
    - [run(options)](#runoptions)
    - [runFunction();](#runfunction)
  - [user](#user)
  - [git](#git)
    - [status([filePath])](#statusfilepath)
    - [repository([filePath])](#repositoryfilepath)
    - [project([filePath])](#projectfilepath)
    - [long([filePath])](#longfilepath)
    - [short([filePath])](#shortfilepath)
    - [branch([filePath])](#branchfilepath)
    - [count()](#count)
    - [date()](#date)
    - [isTagDirty()](#istagdirty)
    - [message](#message)
    - [tag([markDirty])](#tagmarkdirty)



## cache

> tiny 数据缓存模块, 可以用来存储用户常用数据,支持有效期设置

### get(key)

> 获取缓存内容,如果不存在或已过期则返回 null

- key `{string}` 缓存的键值
- return: `{mix}` 缓存内容

### set(key, value, options)

> 修改tiny配置文件内容

- key `{string}` 缓存键值
- value `{mix}` 缓存内容,可以为字符串,数字或json对象
- options `{object}`
- options.expires `{number}` 缓存时间,毫秒为单位,如: 1小时 => 3600000

### clear

> 清除所有缓存

```js

import { cache } from '@opentiny/cli-devkit'

// 将abc这个key的对象写入tiny缓存文件。（该缓存文件一般在 ~/.tiny/tiny.cache.json 中）
cache.set('abc',{ data : 1 });

// 从tiny缓存中获取 abc 这个key的内容。
cache.get('abc');
// => return { data : 1 }

//清空tiny的缓存内容
cache.clear();

```

## config

> tiny.config.js 文件操作模块, 可以对 tiny.config.js 文件进行读写等操作

### get(key, cwd)

> 获取tiny配置文件(tiny.config.js)的内容,如果不存则返回 null

- key `{string}` 配置的键
- cwd `{string}` 配置文件所在的路径, 默认为 process.cwd()
- return: `{mix}` 配置内容


```js
//tiny.config.js文件
module.exports = {
	toolkit: '@opentiny/tiny-toolkit-dev',
	go : {
	   projectId: 85932,
	   assetsId: 21443
	}
};
```

```js
import { config } from '@opentiny/cli-devkit'
//获取配置文件中go字段的内容
config.get('go');
// => 返回 { projectId : 85932, assetsId : 21443 }

```



### set(key, value, cwd)

> 修改tiny配置文件内容

- key `{string}` 配置的键
- value `{mix}` 配置的值,可以为字符串,数字或json对象
- cwd `{string}` 配置文件所在的路径,默认为 process.cwd()

```js
//原始tiny.config.js文件
module.exports = {
  // abc 插件
  abc: {
    xyz: 22
  },
  // 任务列表
  tasks: {
    start: [{
      command: 'echo 33'
    }]
  }
};

```

```js
import { config } from '@opentiny/cli-devkit'
//set 设置一个对象
config.set('abc', {xyz: 23});

//set 设置一个带注释的字符串对象
config.set('gg',
			`
//这是一行注释
{
  "good" : "yes"
}
      `);
      
//set 设置一个带.的字符串
config.set('xx.yy','123');
config.set('tasks.build',[{
			command: 'echo 44'
		}]);
```


```js
//最终修改输出后的tiny.config.js文件
module.exports = {
    // abc 插件
    abc: { xyz: 23 },
    // 任务列表
    tasks: {
        start: [{ command: 'echo 33' }],
        build: [{ command: 'echo 44' }]
    },
    gg: //这是一行注释
    { 'good': 'yes' },
    xx: { yy: 123 }
};
```

### exist(cwd)

> 判断 tiny.config.js 文件是否存在

- cwd `{string}` 配置文件所在的路径,默认为 process.cwd()
- return: `{boolean}` 是否存在

### getToolkitName(cwd)

> 获取配置文件里面配置的 toolkit 的名字

- cwd `{string}` 配置文件所在的路径,默认为 process.cwd()
- return: `{string}` toolkit 的名字, 若不存在返回 null

```js
//tiny.config.js文件
module.exports = {
	toolkit: '@opentiny/tiny-toolkit-dev',
	go : {
	   projectId: 85932,
	   assetsId: 21443
	}
};
```

```js
import { config } from '@opentiny/cli-devkit'
const toolkit = config.getToolkitName();
// =>  toolkit = @opentiny/tiny-toolkit-dev
```




## fs

> tiny 文件及文件夹操作模块，一般用于套件中的模板生成及变量替换

fs模块 集成了 [fs-extra](https://www.npmjs.com/package/fs-extra) 包的全部功能。

/**
 *
 * @param from 原始文件路径
 * @param to 目标文件路径
 * @param context ejs 模板替换的对象
 * @param options object对象，用于过滤和重命名文件
 * @param options.ignore 数组, 类似 gitignore 的写法，默认值['node_modules', '.DS_Store', '.idea']
 * @param options.rename 重命名文件
 */

### copyTpl(from: string, to: string, context?: any, options?: CopyOption)

> 复制目录, 支持 ejs 模板引擎, 标签开始和结束符是: <% %>

- from `string` 原始文件路径
- to  `string` 目标文件路径
- context `object` ejs 模板替换的对象
- options `object`，用于过滤和重命名文件
- options.ignore `array`, 类似 gitignore 的写法，默认值['node_modules', '.DS_Store', '.idea']
- options.rename `function` 重命名文件
- options.notTextFile 非文本类型的文件，默认值[] (只有文本文件才需要通过ejs模板进行替换)

```
import { fs } from '@opentiny/cli-devkit'

fs.copyTpl(
		dirSrc,
		dirDist,
		{ name: 'test' },
		{
			ignore: ['zzz.js'],
			rename: function(filename) {
				if (filename === 'xxx.js') {
					return 'yyy.js';
				}
				return filename;
			},
		}
	);
```

### move(srcPath, distPath)

> 移动文件

- srcPath `string` 源文件,绝对路径
- distPath `string` 目标文件,绝对路径

### remove(file)

> 删除文件或目录

- file `string` 需要删除的文件路径

### readPackage(cwd?:string)

> 读取cwd目录下的package文件

- cwd `string` package.json所在的目录，默认是 process.cwd();

### writePackage(pkg:object, cwd?:string)

> 写入内容到package.json

- pkg `object` pkg的内容
- cwd `string` package.json所在的目录，默认是 process.cwd();

## home

> 获取 tiny 及模块的相关路径，不建议插件直接对 tiny 家目录里面的内容直接进行操作

### getHomePath()

> 获取 tiny 的 home 路径

- return: `{string}` 路径字符串

### getModulesPath()

> 获取 tiny 的模块安装路径

- return: `{string}` 路径字符串


### initHomeDir()

> 初始化 tiny 的 home 路径


### cleanHomeDir()

> 清空 tiny 的 home 路径



## logs

> 以不同颜色在控制台上输出log。(注意：error基本的log会写入log文件中。)

logs方法，是基于[winston](https://www.npmjs.com/package/winston)实现的。

logs 返回的是一个方法, 调用该方法可以直接返回一个对象, 并进行调用, 大概操作如下:

```
import { logs } from '@opentiny/cli-devkit';

const log = logs('test')

// 普通字符串
log.info('啦啦啦'); // 将紫红色打印:  2022-03-19 15:52:09 [test] 啦啦啦

// 使用占位符
log.info('字符串:%s 数字:%d ', 'ssss', 33); // 会打印: 2022-03-19 15:52:09 [test] 字符串:ssss 数字:33
log.info('对象:%o', {a: 1}); // 打打印: 2022-03-19 15:52:09 [test] 对象:{a: 1}
```

以下提供的 `info` `success` `warn` `error` `debug` 方法均支持了 [printf-style](https://wikipedia.org/wiki/Printf_format_string) 格式化. 支持的格式化方式有: 

| Formatter | Representation                 |
| --------- | ------------------------------ |
| `%O`      | 多行打印对象                   |
| `%o`      | 单行打印对象                   |
| `%s`      | 字符串                         |
| `%d`      | 数字                           |
| `%j`      | JSON                           |
| `%%`      | 打印 ('%'). 并不代表任何占位符 |


### info(msg)

> 以品红色打印

- msg `{string}` 需要打印的内容

### success(msg)

> 以品绿色打印

- msg `{string}` 需要打印的内容


### warn(msg)

> 以品黄色打印

- msg `{string}` 需要打印的内容

### error(msg)

> 以品红色打印，该级别的log会写入日志到文件中。
> 默认log文件存放在 `用户home目录/.tiny/log/`文件夹下，也可以通过`process.env.TINY_LOG_PATH`来设置log文件夹路径。

- msg `{string}` 需要打印的内容


### debug(msg)

> 只有在环境变量 DEBUG 匹配到传入 tiny-log 函数时的那个参数时才打印出来, 可参见 [debug](https://www.npmjs.com/package/debug)



## module

> tiny 模块的获取、安装及卸载

### get(name)

> `Generator 函数`, 获取 tiny 模块, 需要运行插件和套件都用这个方法来先获取, 如果本地尚示安装, 会自动进行安装,然后返回模块

- name `{string}` 模块名, 若需要获取 package.json 信息可以直接在模块名后面跟上  `/package.json`
- return: `{object}` modInfo 模块对象, modInfo.mod 模块对象, modInfo.options 模块的设置项.

```js
import { modules } from '@opentiny/cli-devkit';
const blue = await modules.get('@opentiny/tiny-toolkit-blue');
// blue 为blue套件时是一个对象，下面挂载几个命令对应的函数
yield blue.build(tinyObj, {
  clientArgs: ['index']
});

// 获取模块手 package.json 信息
import { modules } from '@opentiny/cli-devkit';
const pkg = await modules.get('@opentiny/tiny-toolkit-blue/package.json');
console.log(pkg.tinyOption);
```

### install(name)

> `Generator 函数`, 安装 tiny 模块

- name `{string}` 模块名, 若需要指定版本号直接在名字后面跟上即可,如: gulp@1.0.0

### unInstall(name)

> `Generator 函数`, 卸载 tiny 模块

- name `{string}` 模块名


### update(name)

> `Generator 函数`, 更新 tiny 模块

- name `{string}` 模块名



### localList(options)

> 获取本地已安装的 tiny 插件和套件列表

- options `{object}` 可选项
- options.type `{string}` 类型，可以是 plugin 或 toolkit， 不传获取全部列表
- return: `{array}` 模块列表



### onlineList(options)

> `Generator 函数`, 获取线上的 tiny 插件和套件列表

- options `{object}` 可选项
- options.type `{string}` 类型，可以是 plugin 或 toolkit， 不传获取全部列表
- return: `{array}` 模块列表



### localExist(name)

> 判断本地是否已安装对应的 tiny 模块了

- name `{string}` 模块名
- return: `{boolean}` 是否存在



### onlineExist([type])

> `Generator 函数`, 判断线上是否已存在对应的 tiny 模块了

- name `{string}` 模块名
- return: `{array}` 模块列表

### fullName(name)

> 根据传入的插件或套件名称缩写,生成对应的全称

- name `{string}` 缩写的名称
- return: `{string}` 全称


### pluginFullName(name)

> 根据传入插件名称缩写,生成对应的插件全称

- name `{string}` 缩写的名称
- return: `{string}` 全称


### toolkitFullName(name)

> 根据传入套件名称缩写,生成对应套件全称

- name `{string}` 缩写的名称
- return: `{string}` 全称


## npm

> npm 操作模块,用于安装,卸载,判断是否存在对应的 npm 模块, 会根据当前用户的配置来判断是要拉取阿里内网还是外网.

### install(pkg, options)

> `Generator 函数`,安装一个 npm 包

- pkg `{string}` 需要进行操作的包名
- options `{object}` 可选项
- options.registry `{string}` 包对应的源,默认会根据当前用户选择的网络切换
- options.stdio `{string}` 输入输出, 默认为 inherit
- options.cwd `{string}` 执行目录, 默认为 process.cwd()


```
import { npm } from '@opentiny/cli-devkit';

await npm.install('tiny');
await npm.install('tiny@2.7.7');


```



### uninstall(pkg, options)

> `Generator 函数`,卸载一个 npm 包

- pkg `{string}` 需要进行操作的包名
- options `{object}` 可选项
- options.stdio `{string}` 输入输出, 默认为 inherit
- options.cwd `{string}` 执行目录, 默认为 process.cwd()



### installDependencies(options)

> `Generator 函数`,安装当前目录的 package.json 对应的依赖包

- options `{object}` 可选项
- options.registry `{string}` 包对应的源,默认会根据当前用户选择的网络切换
- options.stdio `{string}` 输入输出, 默认为 inherit
- options.cwd `{string}` 执行目录, 默认为 process.cwd()

### latest(pkg, options)

> `Generator 函数`,获取最新的 npm 包信息

- pkg `{string}` 需要进行操作的包名
- options `{object}` 可选项
- options.registry `{string}` 包对应的源,默认会根据当前用户选择的网络切换
- options.version `{string}` 需要获取信息的版本号或 tag ,默认为 latest
- return: `{object}` 如果存在则返回对应的 json 对象 , 否则为 null


### has(pkg, options)

> `Generator 函数`,判断是否存在某个 npm 包

- pkg `{string}` 需要进行操作的包名
- options `{object}` 可选项
- options.registry `{string}` 包对应的源,默认会根据当前用户选择的网络切换
- return: `{boolean}` 是否存在

## task

> tiny 任务流模块，用于执行tiny的任务流

### has(tasks, when)

> 是否存在当前时机的任务流

- tasks `{array}` 任务列表
- when `{string}` 时机

### run(options)

> `Generator 函数`,执行一串任务流, 直接传一对应指令的任务流,并指定进行时机

- options `{object}` 选项
- options.tasks `{array}` 任务流数组, 如果需要传入函数,仅支持 generator 函数
- options.when `{string}` 时机, before 或 after
- options.args `{array}` 如果任务流里面有函数,当组数为传给函数的参数
- options.command `{string}` 当前正在运行的 tiny 指令, 用于在控制台提示及对 $$ 参数进行替换

使用案例

```js
const tasks = [{
  command: 'echo "$$"'
}, {
  * func(a, b) {
    console.log(a, b);
  }
}, {
  command: '__toolkitCommand__'
}, {
  comamnd: 'echo afterTask'
}];

// 调用前置任务
await run({
  tasks,
  when: 'before',
  args: ['aaa', 'bbb'],
  command: 'test'
});

// 调用后置任务
await run({
  tasks,
  when: 'after',
  command: 'test'
});

```

假设命令行里面输入的是 `tiny test x -y z` , 那么上面的两次调用的输出结果分别是:

```
> x -y z
> aaa bbb
```

```
> afterTask
```


### runFunction();

> `Generator 函数`,执行一个函数, 支持 generator 及普通函数

- options `{object}`
- options.method `{function}` 需要被执行的函数
- options.args `{array}` 需要传给 method 的参数 
- options.next `{function}` 下一步执行方法, 如果 method 是普通函数会自动拼到 args 里面,传给 method, 如果 method 是 generator 函数或 promise 可以不传, 里面会执行完该函数后才退出 runFunction函数

执行普通函数

```js
await runFunction({
  method(a, b, next) {
    setTimeout(() => {
      console.log(a, b);
      next();
    }, 10);
  },
  args: ['aaa', 'bbb'],
  next() {
    console.log('ccc');
  }
});

// 执行结果
// > aaa bbb
// > ccc
```

执行 generator 函数 

```js
await runFunction({
  async method(a, b) {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log(a, b);
        resolve();
      }, 10);
    });
  },
  args: ['aaa', 'bbb']
});
console.log('ccc');

// 执行结果
// > aaa bbb
// > ccc
```

## user

> 根据用户当前 git 信息去获取用户相关信息
> 获取git 用户名和邮箱地址

- return: `{object}` 包含用户名和邮箱地址的对象

```
import { user } from '@opentiny/cli-devkit';
const userInfo = user();

console.log(userInfo); // {name: 'xxx', email: 'xxx@xxx.xx'}
```

## git

> 套件或插件，经常需要获取当前项目的git信息，该git工具集提供了一组获取git及项目信息的相关方法。

### status([filePath])

获取当前git分支状态。

- options `{filePath}` 可选项，默认为 process.cwd()
- return: `{object}` 当前git的状态

```
const api = require('tiny-api');
const git = tiny.git;

const status = git.status();

// => console.log(status)
{ 
  local_branch: 'xxx',
  remote_branch: null,
  remote_diff: null,
  clean: true/false,
  files: []
}
```

### repository([filePath])

获取项目的远程仓库地址。

- options `{filePath}` 可选项，默认为 process.cwd()
- return: `{string}` 当前git仓库地址

```
const api = require('tiny-api');
const git = tiny.git;

const repository = git.repository();

// => console.log(repository)
// => git@github.com:tinyteam/tiny.git
```


### project([filePath])

获取当前项目的 NAMESPACE 和 PROJECT_NAME。注：云构建环境下，优先获取云构建提供的信息。

- options `{filePath}` 可选项，默认为 process.cwd()
- return: `{string}` 当前git仓库的 NAMESPACE/PROJECT_NAME

```
const api = require('tiny-api');
const git = tiny.git;

const project = git.project();

// => console.log(project)
// => tinyteam/tiny
```

### long([filePath])

获取当前最新的一个commit id。注：云构建环境下，优先获取云构建提供的信息。

- options `{filePath}` 可选项，默认为 process.cwd()
- return: `{string}` commit id

```
const api = require('tiny-api');
const git = tiny.git;

const long = long();

// => console.log(long)
// => 5f6f63cf3a7f094c8041054e7092cd7a0e5d0aa5
```

### short([filePath])

获取当前最新的一个commit id。注：云构建环境下，优先获取云构建提供的信息。

- options `{filePath}` 可选项，默认为 process.cwd()
- return: `{string}` commit id 的前7位

```
const api = require('tiny-api');
const git = tiny.git;

const short = short();

// => console.log(short)
// => 5f6f63c
```

### branch([filePath])

获取当前项目的分支名称。注：云构建环境下，优先获取云构建提供的信息。

- options `{filePath}` 可选项，默认为 process.cwd()
- return: `{string}` branch

```
const api = require('tiny-api');
const git = tiny.git;

const branch = branch();

// => console.log(branch)
// => master
```

以下方法来自[git-rev-sync](https://github.com/kurttheviking/git-rev-sync-js)

### count()

- return: `{number}`

return the count of commits across all branches; this method will fail if the `git` command is not found in `PATH`

### date()

- return: `{Date}`

returns the date of the current commit; this method will fail if the `git` command is not found in `PATH`

### isTagDirty()

- return: `{boolean}`

returns true if the current tag is dirty; this method will fail if the `git` command is not found in `PATH`

### message

- return: `{string}`

return the current commit message; this method will fail if the `git` command is not found in `PATH`

### tag([markDirty])

- return: `{string}`

return the current tag and mark as dirty if markDirty is truthful; this method will fail if the `git` command is not found in `PATH`
