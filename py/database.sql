CREATE TABLE `users` (
	`uid` INT NOT NULL AUTO_INCREMENT ,
	`open_id` TEXT NOT NULL ,
	`nickname` TEXT NOT NULL ,
	`phone` TEXT NOT NULL ,
	`email` TEXT NOT NULL,
	PRIMARY KEY (`uid`)
) ENGINE = InnoDB CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `selfCapsules` (
	`capsule_id` INT NOT NULL AUTO_INCREMENT ,
	`sender_id` TEXT NULL ,
	`time_limit` TEXT NOT NULL ,
	`cap_template` INT NOT NULL ,
	`cap_location` INT NOT NULL ,
	`content_word` TEXT NULL ,
	`content_pic` TEXT NULL ,
	`content_voice`  TEXT NULL,
	PRIMARY KEY (`capsule_id`)
) ENGINE = InnoDB CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `toTaCapsules` (
	`capsule_id` INT NOT NULL AUTO_INCREMENT ,
	`code` TEXT NULL ,
	`sender_id` TEXT NOT NULL ,
	`time_limit` TEXT NOT NULL ,
	`cap_template` INT NOT NULL ,
	`from_qrcode` BOOLEAN NOT NULL ,
	`cap_location` INT NOT NULL ,
    `receiver_name` TEXT NOT NULL ,
	`receiver_tel` TEXT NOT NULL ,
	`receiver_email` TEXT NOT NULL ,
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
	PRIMARY KEY (`capsule_id`)
) ENGINE = InnoDB CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `strangerCapsules` (
	`capsule_id` INT NOT NULL AUTO_INCREMENT ,
	`sender_id` TEXT NOT NULL ,
	`time_limit` TEXT NOT NULL ,
	`cap_template` INT NOT NULL ,
	`cap_location` INT NOT NULL ,
	`content_word` TEXT NULL ,
	`content_pic` TEXT NULL ,
	`content_voice`  TEXT NULL,
	PRIMARY KEY (`capsule_id`)
) ENGINE = InnoDB CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;
