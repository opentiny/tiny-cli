package com.huawei.tiny.server.dao;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

public class UserInfo {

  private Long id;

  private String username;

  private Long userId;

  private String department;

  private String employeeType;

  private String job;

  private String role;

  @JsonFormat(timezone = "GMT+8",pattern = "yyyy-MM-dd")
  private Date probationStart;

  @JsonFormat(timezone = "GMT+8",pattern = "yyyy-MM-dd")
  private Date probationEnd;

  private String probationDuration;

  @JsonFormat(timezone = "GMT+8",pattern = "yyyy-MM-dd")
  private Date protocolStart;

  @JsonFormat(timezone = "GMT+8",pattern = "yyyy-MM-dd")
  private Date protocolEnd;

  private String address;

  private String status;

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

  public Long getUserId() {
    return userId;
  }

  public void setUserId(Long userId) {
    this.userId = userId;
  }

  public String getDepartment() {
    return department;
  }

  public void setDepartment(String department) {
    this.department = department;
  }

  public String getEmployeeType() {
    return employeeType;
  }

  public void setEmployeeType(String employeeType) {
    this.employeeType = employeeType;
  }

  public String getJob() {
    return job;
  }

  public void setJob(String job) {
    this.job = job;
  }

  public String getRole() {
    return role;
  }

  public void setRole(String role) {
    this.role = role;
  }

  public Date getProbationStart() {
    return probationStart;
  }

  public void setProbationStart(Date probationStart) {
    this.probationStart = probationStart;
  }

  public Date getProbationEnd() {
    return probationEnd;
  }

  public void setProbationEnd(Date probationEnd) {
    this.probationEnd = probationEnd;
  }

  public String getProbationDuration() {
    return probationDuration;
  }

  public void setProbationDuration(String probationDuration) {
    this.probationDuration = probationDuration;
  }

  public Date getProtocolStart() {
    return protocolStart;
  }

  public void setProtocolStart(Date protocolStart) {
    this.protocolStart = protocolStart;
  }

  public Date getProtocolEnd() {
    return protocolEnd;
  }

  public void setProtocolEnd(Date protocolEnd) {
    this.protocolEnd = protocolEnd;
  }

  public String getAddress() {
    return address;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }
}


