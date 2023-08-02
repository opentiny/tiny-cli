package com.huawei.tiny.server.service;


import com.huawei.tiny.server.dao.Employee;

import java.util.List;

public interface EmployeeService {
  void insert(Employee employee);

  List<Employee> getEmployees(Employee employee);

  void update(Employee employee);

  void delete(Long id);

  Integer getCount(Employee employee);

  Employee getEmployee(Long id);
}
