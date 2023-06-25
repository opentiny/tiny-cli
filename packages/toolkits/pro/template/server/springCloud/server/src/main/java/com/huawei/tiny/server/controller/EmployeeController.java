package com.huawei.tiny.server.controller;

import com.huawei.tiny.server.dao.Employee;
import com.huawei.tiny.server.service.EmployeeService;
import com.huawei.tiny.server.vo.EmployeeSearchInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping(path = "/v1/employee", produces = MediaType.APPLICATION_JSON_VALUE)
public class EmployeeController {
  private final EmployeeService employeeService;

  @Autowired
  public EmployeeController(EmployeeService employeeService) {
    this.employeeService = employeeService;
  }

  @PostMapping(path = "/addOrUpdate", produces = MediaType.APPLICATION_JSON_VALUE)
  @ResponseBody
  public Map<String,Object> addOrUpdate(@RequestBody Employee employee) {
    Map<String,Object> resultMap = new HashMap<String,Object>();
    if ( employee.getId() == null ) {
      try{
        employeeService.insert(employee);
        resultMap.put("code", 20000);
      }catch (Exception e){
        e.printStackTrace();
        resultMap.put("code", 0);
        resultMap.put("errMsg", "新增数据失败");
      }
    } else {
      try{
        employeeService.update(employee);
        resultMap.put("code", 20000);
      }catch (Exception e){
        resultMap.put("code", 0);
        resultMap.put("errMsg", "更新数据失败");
      }
    }
    return resultMap;
  }

  @PostMapping(path = "/getEmployee", produces = MediaType.APPLICATION_JSON_VALUE)
  @ResponseBody
  public Map<String,Object> getEmployee(@RequestBody EmployeeSearchInfo searchInfo) {
    Map<String,Object> resultMap = new HashMap<String,Object>();
    try{
      Employee employee = searchInfo.getSearchInfo();
      if(employee == null){
        employee = new Employee();
      }
      employee.setPageIndex(searchInfo.getPageIndex());
      employee.setPageSize(searchInfo.getPageSize());
      Integer total = employeeService.getCount(employee);
      List<Employee> list= employeeService.getEmployees(employee);
      Map<String,Object> data = new HashMap<String,Object>();
      data.put("pageIndex",searchInfo.getPageIndex());
      data.put("pageSize",searchInfo.getPageSize());
      data.put("total",total);
      data.put("data",list);
      resultMap.put("code", 20000);
      resultMap.put("data", data);
      return resultMap;
    }catch (Exception e){
      e.printStackTrace();
      resultMap.put("code", 0);
      return resultMap;
    }
  }

  @DeleteMapping(path = "/delete", produces = MediaType.APPLICATION_JSON_VALUE)
  @ResponseBody
  public Map<String,Object> delete(@RequestParam(name = "id") Long id) {
    Map<String,Object> resultMap = new HashMap<String,Object>();
    try{
      employeeService.delete(id);
      resultMap.put("code", 20000);
    }catch (Exception e){
      resultMap.put("code", 0);
      resultMap.put("errMsg", "删除数据失败");
    }
     return resultMap;
  }

  @GetMapping(path = "/employeeDetail", produces = MediaType.APPLICATION_JSON_VALUE)
  @ResponseBody
  public Map<String,Object> employeeDetail(@RequestParam(name = "id") Long id) {
    Map<String,Object> resultMap = new HashMap<String,Object>();
    try{
      Employee e = employeeService.getEmployee(id);
      resultMap.put("code", 20000);
      resultMap.put("data", e);
    }catch (Exception e){
      resultMap.put("code", 0);
      resultMap.put("errMsg", "删除数据失败");
    }
    return resultMap;
  }
}
