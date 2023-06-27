CREATE TABLE
    `userinfo` (
        `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
        `user_id` bigint(20) unsigned DEFAULT NULL,
        `user_name` varchar(32) NOT NULL COMMENT '用户名',
        `department` varchar(32) NOT NULL DEFAULT '' COMMENT '部门',
        `employee_type` varchar(32) DEFAULT NULL COMMENT '招聘类型',
        `role` varchar(32) DEFAULT NULL COMMENT '角色',
        `probation_start` date DEFAULT NULL COMMENT '试用期开始时间',
        `probation_end` date DEFAULT NULL COMMENT '试用期结束时间',
        `probation_duration` bigint(11) unsigned DEFAULT NULL COMMENT '试用期时长',
        `protocol_start` date DEFAULT NULL COMMENT '合同开始日期',
        `protocol_end` date DEFAULT NULL COMMENT '合同结束日期',
        `address` varchar(32) DEFAULT NULL COMMENT '地址',
        `status` varchar(32) DEFAULT NULL COMMENT '状态',
        `job` varchar(32) DEFAULT NULL COMMENT '职位',
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;