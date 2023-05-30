FROM node:12.6.0-alpine

# 创建app目录
RUN mkdir -p /usr/src/app

# 设置容器内工作目录
WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN yarn

# 拷贝所有源代码到工作目录
COPY . /usr/src/app

# 暴露容器端口
EXPOSE 7001

# 启动node应用
ENTRYPOINT ["npm", "run"]
