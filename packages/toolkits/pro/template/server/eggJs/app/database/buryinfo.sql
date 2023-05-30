CREATE TABLE buryinfo(
    `_id` INT NOT NULL AUTO_INCREMENT COMMENT '自增id',
    `type_id` VARCHAR(50) NOT NULL COMMENT '埋点ID',
    `business_desc` VARCHAR(255) NOT NULL COMMENT '业务描述',
    `parameter` VARCHAR(255) COMMENT '埋点自定义参数',
    `user_email` VARCHAR(50) COMMENT '注册人邮箱',
    `user_phone` VARCHAR(20) COMMENT '注册人电话',
    `user_name` VARCHAR(50) NOT NULL COMMENT '注册人姓名',
    `is_registered` TINYINT(3) DEFAULT 1 COMMENT '是否在鲁班上注册过',
    `disable` TINYINT(3) DEFAULT 1 COMMENT '是否启用埋点',
    `platform` VARCHAR(50) NOT NULL COMMENT '平台',
    `category` VARCHAR(255) NOT NULL COMMENT '目录',
    `created_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (_id),
    INDEX locktype (platform, category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8
