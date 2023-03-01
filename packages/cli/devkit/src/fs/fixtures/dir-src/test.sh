#!/bin/bash
#check user
if [ -f /opt/cloud/billboard/service.flag ]; then
    rm -f /opt/cloud/billboard/service.flag
fi
pm2 start /opt/cbcssrservice/pm2.json
