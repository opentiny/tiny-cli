package com.huawei.tiny.server.util;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

/**
 * 接口通用返回值数据结构
 *
 * @param <T>
 */
public class Result<T> {
  //错误码
  private String code;
  //提示信息
  private String errMsg;
  //数据
  private T data;

  public String getCode() {
    return code;
  }

  public void setCode(String code) {
    this.code = code;
  }

  public String getErrMsg() {
    return errMsg;
  }

  public void setErrMsg(String msg) {
    this.errMsg = msg;
  }

  public T getData() {
    return data;
  }

  public void setData(T data) {
    this.data = data;
  }

  public static <T> ResponseEntity<Result<T>> success(T data) {
    return success(data, "");
  }

  public static <T> ResponseEntity<Result<T>> success(T data, String errMsg) {
    Result<T> result = new Result<>();
    result.setErrMsg(errMsg);
    result.setCode("0");
    result.setData(data);
    return ResponseEntity.ok(result);
  }

  public static <T> ResponseEntity<Result<T>> error(String code) {
    return error(code, code);
  }

  public static <T> ResponseEntity<Result<T>> error(String code, String errMsg) {
    return error(code, errMsg, null);
  }

  public static <T> ResponseEntity<Result<T>> error(String code, String errMsg, T data) {
    Result<T> result = new Result<>();
    result.setCode(code);
    result.setErrMsg(errMsg);
    result.setData(data);
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(result);
  }
}
