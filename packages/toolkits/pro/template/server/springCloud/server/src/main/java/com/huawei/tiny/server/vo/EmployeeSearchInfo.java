package com.huawei.tiny.server.vo;

import com.huawei.tiny.server.dao.Employee;


public class EmployeeSearchInfo {
    private Integer pageIndex;
    private Integer pageSize;
    private Employee searchInfo;

    public Integer getPageIndex() {
        return pageIndex;
    }

    public void setPageIndex(Integer pageIndex) {
        this.pageIndex = pageIndex;
    }

    public Integer getPageSize() {
        return pageSize;
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }

    public Employee getSearchInfo() {
        return searchInfo;
    }

    public void setSearchInfo(Employee searchInfo) {
        this.searchInfo = searchInfo;
    }
}
