# egg cli 服务

[建议读官方文档](https://eggjs.org/zh-cn/intro/quickstart.html)

>推荐使用docker启动egg服务

## 开发测试

step:

1.  ```yarn```

2.  ```npm run dev```

## 线上

```docker run --name test-egg -p 9999:7001 --net egg-mysql-net tgc-egg:v1.4 -d start```

接口路径：host:9999

## 关于连接mysql数据库注意事项

docker 服务启动后创建一个新的网络模式egg-mysql-net（bridger）更好的管理namsespace
```
docker network create egg-mysql-net
```


建议直接使用mysql官方的docker镜像启动服务
```
docker run --name test-mysql -p 3333:3306 --net egg-mysql-net -e MYSQL_ROOT_PASSWORD=123456 -d mysql:5.7
```
进入到mysql容器内：

```docker exec -it test-mysql sh```

登录mysql:

```mysql -u root -p 123456```


将/app/databases 中的sql运行一遍即可

或者用主机连接容器内部的数据库(推荐使用Navicat fo MySQL)

```
->新建连接 -> 常规

连接名：xxxx

主机名：localhost

端口：3333

用户名：root

密码：123456
```
