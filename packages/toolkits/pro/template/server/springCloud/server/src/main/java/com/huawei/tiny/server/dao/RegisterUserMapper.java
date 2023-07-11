package com.huawei.tiny.server.dao;

public interface RegisterUserMapper {

  Long insert(RegisterUser registerUser);

  RegisterUser getRegisterUserByName(String name);
}
