CREATE TABLE `DATABASE`.`users` (
	`uid` INT NOT NULL AUTO_INCREMENT ,
	`open_id` TEXT NOT NULL ,
	`nickname` TEXT NOT NULL ,
	`phone` TEXT NOT NULL ,
	`email` TEXT NOT NULL,
	PRIMARY KEY (`uid`)
) ENGINE = InnoDB CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `DATABASE`.`capsules` (
	`capsule_id` INT NOT NULL AUTO_INCREMENT ,
	`sender_id` INT NULL , --获取发送者的信息
	`receiver_name` TEXT NOT NULL ,
	`receiver_tel` TEXT NOT NULL ,
	`receiver_email` TEXT NOT NULL ,
--     `receiver_id` INT NOT NULL ,    --获取接受者的信息
	`capsule_type` INT NOT NULL ,
	`time_limit` INT NOT NULL ,
	`cap_template` INT NOT NULL ,
	`cap_location` INT NOT NULL ,
	`content_word` TEXT NULL ,
	`content_pic` INT NULL ,
	`content_voice`  INT NULL,
-- 	`from_qrcode` BOOLEAN NOT NULL ,
 	`registered` TIMESTAMP NOT NULL, --DEFAULT CURRENT_TIMESTAMP 新增胶囊形成时间
	`sent` TIMESTAMP NOT NULL, --DEFAULT CURRENT_TIMESTAMP , --新增胶囊发送时间
	`content_name` TEXT NULL DEFAULT NULL ,
	`content_phone` INT NULL DEFAULT NULL ,
	`content_birth` TIMESTAMP NULL DEFAULT NULL hhh,
	PRIMARY KEY (`capsule_id`)
) ENGINE = InnoDB CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;