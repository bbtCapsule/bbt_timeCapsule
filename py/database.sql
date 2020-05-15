CREATE TABLE `DATABASE`.`users` (
	`uid` INT NOT NULL AUTO_INCREMENT ,
	`open_id` TEXT NOT NULL ,
	`nickname` TEXT NOT NULL ,
	`phone` TEXT NOT NULL ,
	`email` TEXT NOT NULL,
	PRIMARY KEY (`uid`)
) ENGINE = InnoDB CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `DATABASE`.`selfCapsules` (
	`capsule_id` INT NOT NULL AUTO_INCREMENT ,
	`sender_id` INT NULL ,
	`time_limit` INT NOT NULL ,
	`cap_template` INT NOT NULL ,
	`cap_location` INT NOT NULL ,
	`content_word` TEXT NULL ,
	`content_pic` TEXT NULL ,
	`content_voice`  TEXT NULL,
	PRIMARY KEY (`capsule_id`)
) ENGINE = InnoDB CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `DATABASE`.`toTaCapsules` (
	`capsule_id` INT NOT NULL AUTO_INCREMENT ,
	`code` INT NULL ,
	`receiver_name` TEXT NOT NULL ,
	`receiver_tel` TEXT NOT NULL ,
	`receiver_email` TEXT NOT NULL ,
	`time_limit` INT NOT NULL ,
	`cap_template` INT NOT NULL ,
	`cap_location` INT NOT NULL ,
	`content_word` TEXT NULL ,
	`content_pic` TEXT NULL ,
	`content_voice`  TEXT NULL,
   	`from_qrcode`   BOOLEAN NOT NULL ,
	`content_name` TEXT NULL DEFAULT NULL ,
	`content_phone` INT NULL DEFAULT NULL ,
	`content_birth` TIMESTAMP NULL DEFAULT NULL,
	PRIMARY KEY (`capsule_id`)
) ENGINE = InnoDB CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `DATABASE`.`strangerCapsules` (
	`capsule_id` INT NOT NULL AUTO_INCREMENT ,
	`sender_id` INT NULL ,
	`time_limit` INT NOT NULL ,
	`cap_template` INT NOT NULL ,
	`cap_location` INT NOT NULL ,
	`content_word` TEXT NULL ,
	`content_pic` TEXT NULL ,
	`content_voice`  TEXT NULL,
	PRIMARY KEY (`capsule_id`)
) ENGINE = InnoDB CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;
