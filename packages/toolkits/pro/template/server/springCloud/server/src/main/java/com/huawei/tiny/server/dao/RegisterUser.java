package com.huawei.tiny.server.dao;


import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

public class RegisterUser {

  private Long id;

  @Email(message = "邮箱格式错误")
  private String username;

  @Pattern(regexp="^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$",message = "密码格式错误")
  private String password;

  private String registerType;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getRegisterType() {
    return registerType;
  }

  public void setRegisterType(String registerType) {
    this.registerType = registerType;
  }
}
