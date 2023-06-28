DROP TABLE IF EXISTS `registeruser`;
CREATE TABLE
    `registeruser` (
        `id` bigint(50) unsigned NOT NULL AUTO_INCREMENT,
        `user_name` varchar(20) NOT NULL COMMENT '用户名',
        `password` varchar(60) NOT NULL COMMENT '密码',
        `register_type` varchar(10) DEFAULT NULL COMMENT '注册类型',
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;