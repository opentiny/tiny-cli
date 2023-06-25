package com.huawei.tiny.gateway.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/gateway/benchmark")
public class LoadController {

  @GetMapping("/health")
  public boolean health() {
    return true;
  }
}
