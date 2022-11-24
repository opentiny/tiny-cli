#!/bin/bash

# install
npm config set @huawei:registry https://npm.cloudartifact.dgg.dragon.tools.huawei.com/artifactory/api/npm/npm-cbcbigate/
npm i --unsafe-perm=true --allow-root
if [ $? -ne 0 ];then
    echo "[ERROR] install dependencies falid!"
    exit 1
fi
echo '[INFO] dependencies installed'

npm run build

if [ $? -ne 0 ];then
    echo "[ERROR] build falid!"
    exit 1
fi
echo '[INFO] build completed'
