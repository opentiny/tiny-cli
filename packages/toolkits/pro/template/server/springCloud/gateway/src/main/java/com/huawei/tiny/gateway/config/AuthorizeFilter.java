package com.huawei.tiny.gateway.config;

import io.jsonwebtoken.*;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.Arrays;

@Component
public class AuthorizeFilter implements GlobalFilter, Ordered {

  private String[] skipAuthUrl = {
    "/v1/user/login",
    "/v1/user/register"
  };

  private static final String TOKEN_ENCRYPT_KEY = "tiny_pro_server";

  private static final String TOKEN_PREFIX = "Bearer ";

  @Override
  public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
    // 获取请求对象和响应对象
    ServerHttpRequest request = exchange.getRequest();
    ServerHttpResponse response = exchange.getResponse();

    // 获取请求地址
    String url = request.getURI().getPath();

    // 如果在跳过列表里，则不进行鉴定
    if (skipAuthUrl != null && (Arrays.asList(skipAuthUrl).contains(url))) {
      //放行
      return chain.filter(exchange);
    }

    // 获取当前用户的请求头jwt信息
    HttpHeaders headers = request.getHeaders();
    String token = headers.getFirst("Authorization").replace(TOKEN_PREFIX, "");

    // 判断当前令牌是否存在
    if (StringUtils.isEmpty(token)) {
      //如果不存在，向客户端返回错误提示信息
      response.setStatusCode(HttpStatus.UNAUTHORIZED);
      return response.setComplete();
    }

    try {
      // 验证token
      Jwts.parser().setSigningKey(TOKEN_ENCRYPT_KEY).parseClaimsJws(token);
    } catch (Exception e) {
      e.printStackTrace();
      // token失效
      response.setStatusCode(HttpStatus.UNAUTHORIZED);
      return response.setComplete();
    }
    // 放行
    return chain.filter(exchange);
  }


  @Override
  public int getOrder() {
    return 0;
  }
}
