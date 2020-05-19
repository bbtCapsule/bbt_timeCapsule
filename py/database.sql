CREATE TABLE `users` (
	`uid` INT NOT NULL AUTO_INCREMENT ,
	`open_id` TEXT NULL ,
	`nickname` TEXT NULL ,
	`phone` TEXT NULL ,
	`email` TEXT NULL,
	PRIMARY KEY (`uid`)
) ENGINE = InnoDB CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `selfCapsules` (
	`capsule_id` INT NOT NULL AUTO_INCREMENT ,
	`sender_id` TEXT NULL ,
	`time_limit` TEXT NULL ,
	`cap_template` INT NULL ,
	`cap_location` INT NULL ,
	`content_word` TEXT NULL ,
	`content_pic` TEXT NULL ,
	`content_voice`  TEXT NULL,
	PRIMARY KEY (`capsule_id`)
) ENGINE = InnoDB CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `toTaCapsules` (
	`capsule_id` INT NOT NULL AUTO_INCREMENT ,
	`code` TEXT NULL ,
	`sender_id` TEXT NULL ,
	`time_limit` TEXT NULL ,
	`cap_template` INT NULL ,
	`from_qrcode` BOOLEAN NULL ,
	`cap_location` INT NULL ,
    `receiver_name` TEXT NULL ,
	`receiver_tel` TEXT NULL ,
	`receiver_email` TEXT NULL ,
	`content_word` TEXT NULL ,
	`content_pic` TEXT NULL ,
	`content_voice` TEXT NULL ,
	`content_name` TEXT NULL DEFAULT NULL ,
	`content_phone` TEXT NULL DEFAULT NULL ,
	`content_birth` TEXT NULL DEFAULT NULL ,
	`xingzuo` TEXT NULL DEFAULT NULL ,
	`hobby` TEXT NULL DEFAULT NULL ,
	`music` TEXT NULL DEFAULT NULL ,
	`movie` TEXT NULL DEFAULT NULL ,
	`food`  TEXT NULL DEFAULT NULL ,
	`wechat` TEXT NULL DEFAULT NULL ,
	`QQ` TEXT NULL DEFAULT NULL ,
	`email` TEXT NULL DEFAULT NULL ,
	`place` TEXT NULL DEFAULT NULL ,
	`tucao` TEXT NULL DEFAULT NULL ,
	PRIMARY KEY (`capsule_id`)
) ENGINE = InnoDB CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `strangerCapsules` (
	`capsule_id` INT NOT NULL AUTO_INCREMENT ,
	`sender_id` TEXT NULL ,
	`time_limit` TEXT NULL ,
	`cap_template` INT NULL ,
	`cap_location` INT NULL ,
	`content_word` TEXT NULL ,
	`content_pic` TEXT NULL ,
	`content_voice`  TEXT NULL,
	PRIMARY KEY (`capsule_id`)
) ENGINE = InnoDB CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;
