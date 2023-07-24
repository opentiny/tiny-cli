package com.huawei.tiny.server.service;

import com.huawei.tiny.server.dao.RegisterUser;
import com.huawei.tiny.server.dao.UserInfo;

public interface UserService {
  Long createUser(RegisterUser registerUser);

  RegisterUser getRegisterUserByName(String name);

  UserInfo getUserInfoById(Long id);

  Long createUserInfo(UserInfo userInfo);

  Long updateUserInfo(UserInfo userInfo);
}
