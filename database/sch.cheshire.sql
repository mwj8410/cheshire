-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema cheshire
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `cheshire` DEFAULT CHARACTER SET utf8;
USE `cheshire`;

-- -----------------------------------------------------
-- Table `cheshire`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cheshire`.`user` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `universal_id` CHAR(36) NOT NULL,
  `display_name` CHAR(32) NULL,
  `email` CHAR(255) NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`, `universal_id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  UNIQUE INDEX `universal_id_UNIQUE` (`universal_id` ASC),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `cheshire`.`workspace`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cheshire`.`workspace` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `owner` INT(10) UNSIGNED NOT NULL,
  `name` CHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `owner_user_idx` (`owner` ASC),
  CONSTRAINT `fk_owner_user`
    FOREIGN KEY (`owner`)
    REFERENCES `cheshire`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cheshire`.`role_index`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cheshire`.`role_index` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `label` CHAR(45) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cheshire`.`membership`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cheshire`.`membership` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user` INT(10) UNSIGNED NOT NULL,
  `role` INT(10) UNSIGNED NOT NULL,
  `workspace` INT(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `idworkspace_membership_UNIQUE` (`id` ASC),
  INDEX `membership_user_idx` (`user` ASC),
  INDEX `membership_workspace_idx` (`workspace` ASC),
  INDEX `membership_role_idx` (`role` ASC),
  CONSTRAINT `fk_membership_user`
    FOREIGN KEY (`user`)
    REFERENCES `cheshire`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_membership_workspace`
    FOREIGN KEY (`workspace`)
    REFERENCES `cheshire`.`workspace` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `membership_role`
    FOREIGN KEY (`role`)
    REFERENCES `cheshire`.`role_index` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
COMMENT = 'A join table used to indicate all workspace membership and r' /* comment truncated */ /*ole relationships other than workspace owners*/;


-- -----------------------------------------------------
-- Table `cheshire`.`scene`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cheshire`.`scene` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `workspace` INT(10) UNSIGNED NOT NULL,
  `display_name` CHAR(45) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_scene_workspace_idx` (`workspace` ASC),
  CONSTRAINT `fk_scene_workspace`
    FOREIGN KEY (`workspace`)
    REFERENCES `cheshire`.`workspace` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cheshire`.`beat`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cheshire`.`beat` (
  `id` INT(10) UNSIGNED NOT NULL,
  `scene` INT(10) UNSIGNED NOT NULL,
  `display_name` CHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_beat_scene_idx` (`scene` ASC),
  CONSTRAINT `fk_beat_scene`
    FOREIGN KEY (`scene`)
    REFERENCES `cheshire`.`scene` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cheshire`.`option`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cheshire`.`option` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `scene` INT(10) UNSIGNED NOT NULL,
  `beat` INT(10) UNSIGNED NOT NULL,
  `display_name` CHAR(45) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_option_scene_idx` (`scene` ASC),
  INDEX `fk_option_beat_idx` (`beat` ASC),
  CONSTRAINT `fk_option_scene`
    FOREIGN KEY (`scene`)
    REFERENCES `cheshire`.`scene` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_option_beat`
    FOREIGN KEY (`beat`)
    REFERENCES `cheshire`.`beat` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cheshire`.`linkage`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cheshire`.`linkage` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `source` INT(10) UNSIGNED NOT NULL,
  `dest` INT(10) UNSIGNED NOT NULL,
  `case` TEXT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_linkage_source_option_idx` (`source` ASC),
  INDEX `fk_linkage_dest_option_idx` (`dest` ASC),
  CONSTRAINT `fk_linkage_source_option`
    FOREIGN KEY (`source`)
    REFERENCES `cheshire`.`option` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_linkage_dest_option`
    FOREIGN KEY (`dest`)
    REFERENCES `cheshire`.`option` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
