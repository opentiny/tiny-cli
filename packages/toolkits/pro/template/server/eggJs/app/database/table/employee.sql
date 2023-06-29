DROP TABLE IF EXISTS `employee`;

CREATE TABLE
    `employee` (
        `id` bigint(16) NOT NULL,
        `name` varchar(20) DEFAULT NULL COMMENT '姓名',
        `employee_no` varchar(50) DEFAULT NULL COMMENT '工号',
        `department` varchar(50) DEFAULT NULL COMMENT '部门',
        `department_level` varchar(50) DEFAULT NULL COMMENT '部门层级',
        `status` varchar(10) DEFAULT NULL COMMENT '状态',
        `workbench_name` varchar(50) DEFAULT NULL COMMENT '工作台名称',
        `project` varchar(50) DEFAULT NULL COMMENT '赋能项目',
        `type` varchar(50) DEFAULT NULL COMMENT '人员类型',
        `address` varchar(50) DEFAULT NULL COMMENT '研究所',
        `roles` varchar(50) DEFAULT NULL COMMENT '角色',
        `last_update_user` varchar(50) DEFAULT NULL COMMENT '最后更新人',
        `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
        PRIMARY KEY (`id`) USING BTREE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 ROW_FORMAT = DYNAMIC;