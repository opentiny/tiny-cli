package com.huawei.tiny.server.controller;

import com.huawei.tiny.server.dao.RegisterUser;
import com.huawei.tiny.server.dao.UserInfo;
import com.huawei.tiny.server.service.UserService;
import com.huawei.tiny.server.service.impl.UserServiceImpl;
import com.huawei.tiny.server.util.Result;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(path = "/v1/user", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserController {
  private final UserService userService;
  private static Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);

  @Autowired
  public UserController(UserService userService) {
    this.userService = userService;
  }

  /**
   * 注册用户
   *
   * @param registerUser
   * @return
   */
  @Transactional(rollbackFor = Exception.class)
  @PostMapping(path = "/register", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity register(@Validated @RequestBody RegisterUser registerUser, Errors errors) {
    UserInfo resultMap = new UserInfo();
    try {
      // 入参校验错误
      if (errors.hasErrors()) {
        return Result.error("InvalidParameter");
      }

      // 判断用户是否已经存在
      RegisterUser user = userService.getRegisterUserByName(registerUser.getUsername());
      if (user != null) {
        return Result.error("UserAlreadyExist");
      }

      String hashed = BCrypt.hashpw(registerUser.getPassword(), BCrypt.gensalt(10));
      registerUser.setPassword(hashed);
      userService.createUser(registerUser);
      resultMap.setUserId(registerUser.getId());
      resultMap.setUsername(registerUser.getUsername());
      userService.createUserInfo(resultMap);
      return Result.success(resultMap);
    } catch (Exception e) {
      e.printStackTrace();
      // 回滚事务
      TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
      return Result.error("InternalError");
    }
  }

  @PutMapping(path = "/userInfo", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity updateUserInfo(@RequestBody UserInfo userInfo) {
    try {
      userService.updateUserInfo(userInfo);
      UserInfo result = userService.getUserInfoById(userInfo.getUserId());
      return Result.success(result);
    } catch (Exception e) {
      e.printStackTrace();
      return Result.error("InternalError");
    }
  }

  @GetMapping (path = "/userInfo/{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity getUserInfo(@PathVariable("userId") Long userId) {
    try {
      UserInfo result = userService.getUserInfoById(userId);
      return Result.success(result);
    } catch (Exception e) {
      e.printStackTrace();
      return Result.error("InternalError");
    }
  }
}
