package com.huawei.tiny.server.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.huawei.tiny.server.dao.UserInfo;
import io.jsonwebtoken.*;

import java.util.*;

public class JWTUtil {

  // TOKEN的有效期一天（S）
  private static final int TOKEN_TIME_OUT = 3600;
  // 加密KEY
  private static final String TOKEN_ENCRYPT_KEY = "tiny_pro_server";
  // 最小刷新间隔(S)
  private static ObjectMapper objectMapper = new ObjectMapper();

  // 生产ID
  public static String getToken(UserInfo userInfo) {
    Map<String, Object> claimMaps = new HashMap<>();
    claimMaps.put("id", userInfo.getUserId());
    long currentTime = System.currentTimeMillis();
    try {
      return Jwts.builder()
        .setId(UUID.randomUUID().toString())
        .setIssuedAt(new Date(currentTime))  //签发时间
        .setSubject(objectMapper.writeValueAsString(userInfo))
        .signWith(SignatureAlgorithm.HS256, TOKEN_ENCRYPT_KEY) //加密方式
        .setExpiration(new Date(currentTime + TOKEN_TIME_OUT * 1000))  //过期时间戳
        .addClaims(claimMaps) //cla信息
        .compact();
    } catch (JsonProcessingException e) {
      throw new RuntimeException(e);
    }
  }

  /**
   * 获取token中的claims信息
   *
   * @param token
   * @return
   */
  private static Jws<Claims> getJws(String token) {
    return Jwts.parser()
      .setSigningKey(TOKEN_ENCRYPT_KEY)
      .parseClaimsJws(token);
  }


  /**
   * 解析token中user信息
   *
   * @param token
   * @return
   */
  public static UserInfo parseToken(String token) {
    try {
      String subject = getJws(token).getBody().getSubject();
      UserInfo userInfo = objectMapper.readValue(subject, UserInfo.class);
      return userInfo;
    } catch (ExpiredJwtException | JsonProcessingException e) {
      return null;
    }
  }

}

