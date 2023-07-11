package com.huawei.tiny.server.dao;

public interface UserInfoMapper {
  Long insert(UserInfo userInfo);

  Long update(UserInfo userInfo);

  UserInfo getUserInfoById(Long id);
}
