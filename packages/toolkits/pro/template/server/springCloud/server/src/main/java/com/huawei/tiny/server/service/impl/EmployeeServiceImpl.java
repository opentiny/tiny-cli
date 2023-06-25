package com.huawei.tiny.server.service.impl;

import com.huawei.tiny.server.dao.Employee;
import com.huawei.tiny.server.dao.EmployeeMapper;
import com.huawei.tiny.server.service.EmployeeService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;


@Service
public class EmployeeServiceImpl implements EmployeeService {
  private static Logger LOGGER = LoggerFactory.getLogger(EmployeeServiceImpl.class);

  @Autowired
  private EmployeeMapper employeeMapper;



  @Override
  public void insert(Employee employee) {
    employee.setId(new Date().getTime());
    employeeMapper.insert(employee);
  }

  @Override
  public List<Employee> getEmployees(Employee employee) {
    return employeeMapper.getEmployees(employee);
  }

  @Override
  public void update(Employee employee) {
    employee.setLastUpdateUser("admin");
    employeeMapper.update(employee);
  }

  @Override
  public void delete(Long id) {
     employeeMapper.delete(id);
  }

  @Override
  public Integer getCount(Employee employee) {
    return employeeMapper.getCount(employee);
  }

  @Override
  public Employee getEmployee(Long id) {
    return employeeMapper.getEmployee(id);
  }

}
