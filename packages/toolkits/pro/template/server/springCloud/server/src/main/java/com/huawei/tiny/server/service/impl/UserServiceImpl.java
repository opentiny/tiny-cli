package com.huawei.tiny.server.service.impl;

import com.huawei.tiny.server.dao.RegisterUser;
import com.huawei.tiny.server.dao.RegisterUserMapper;
import com.huawei.tiny.server.dao.UserInfo;
import com.huawei.tiny.server.dao.UserInfoMapper;
import com.huawei.tiny.server.service.UserService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
  private static Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);

  @Autowired
  private RegisterUserMapper RegisterUserMapper;

  @Autowired
  private UserInfoMapper UserInfoMapper;

  @Override
  public Long createUser(RegisterUser registerUser) {
    Long id = RegisterUserMapper.insert(registerUser);
    return id;
  }

  @Override
  public RegisterUser getRegisterUserByName(String name) {
    return RegisterUserMapper.getRegisterUserByName(name);
  }

  @Override
  public UserInfo getUserInfoById(Long id) {
    return UserInfoMapper.getUserInfoById(id);
  }

  @Override
  public Long createUserInfo(UserInfo userInfo) {
    return UserInfoMapper.insert(userInfo);
  }

  @Override
  public Long updateUserInfo(UserInfo userInfo) {
    return UserInfoMapper.update(userInfo);
  }
}
