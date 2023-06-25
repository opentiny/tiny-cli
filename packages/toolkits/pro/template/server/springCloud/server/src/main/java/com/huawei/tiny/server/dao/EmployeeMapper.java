package com.huawei.tiny.server.dao;


import java.util.List;

public interface EmployeeMapper {
    void insert(Employee employee);

    List<Employee> getEmployees(Employee employee);

    void update(Employee employee);

    void delete(Long id);

    Integer getCount(Employee employee);

    Employee getEmployee(Long id);
}
