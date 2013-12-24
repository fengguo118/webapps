SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

DROP SCHEMA IF EXISTS `ams4u_test` ;
CREATE SCHEMA IF NOT EXISTS `ams4u_test` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `ams4u_test` ;

-- -----------------------------------------------------
-- Table `ams4u_test`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ams4u_test`.`user` ;

CREATE TABLE IF NOT EXISTS `ams4u_test`.`user` (
  `id` MEDIUMTEXT NOT NULL,
  `username` VARCHAR(254) NOT NULL COMMENT '用户名',
  `name` VARCHAR(254) NOT NULL COMMENT '姓名',
  `hashed_password` VARCHAR(254) NOT NULL COMMENT '密码',
  `phone` VARCHAR(254) NULL COMMENT '手机号',
  `role` INT NOT NULL COMMENT '角色',
  `create_time` DATETIME NULL COMMENT '创建时间',
  `modify_time` DATETIME NULL COMMENT '修改时间',
  PRIMARY KEY (`id`(254)))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ams4u_test`.`department`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ams4u_test`.`department` ;

CREATE TABLE IF NOT EXISTS `ams4u_test`.`department` (
  `id` MEDIUMTEXT NOT NULL,
  `name` VARCHAR(254) NOT NULL COMMENT '名称',
  `is_admin` INT NULL COMMENT '1二级职能 0学院',
  `code` VARCHAR(254) NULL COMMENT '代号',
  `create_time` DATETIME NULL COMMENT '创建时间',
  `modify_time` DATETIME NULL COMMENT '修改时间',
  PRIMARY KEY (`id`(254)))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ams4u_test`.`subject`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ams4u_test`.`subject` ;

CREATE TABLE IF NOT EXISTS `ams4u_test`.`subject` (
  `id` MEDIUMTEXT NOT NULL,
  `name` VARCHAR(254) NOT NULL COMMENT '名称',
  `code` VARCHAR(254) NULL COMMENT '代号',
  `years` INT NULL COMMENT '年制',
  `department_id` MEDIUMTEXT NOT NULL,
  `create_time` DATETIME NULL COMMENT '创建时间',
  `modify_time` DATETIME NULL COMMENT '修改时间',
  PRIMARY KEY (`id`(254)))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ams4u_test`.`class`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ams4u_test`.`class` ;

CREATE TABLE IF NOT EXISTS `ams4u_test`.`class` (
  `id` MEDIUMTEXT NOT NULL,
  `name` VARCHAR(254) NOT NULL COMMENT '名称',
  `code` VARCHAR(254) NULL COMMENT '代号',
  `grade` INT NOT NULL COMMENT '年级',
  `subject_id` MEDIUMTEXT NOT NULL,
  `create_time` DATETIME NULL COMMENT '创建时间',
  `modify_time` DATETIME NULL COMMENT '修改时间',
  PRIMARY KEY (`id`(254)))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ams4u_test`.`student`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ams4u_test`.`student` ;

CREATE TABLE IF NOT EXISTS `ams4u_test`.`student` (
  `id` MEDIUMTEXT NOT NULL,
  `student_id` VARCHAR(254) NOT NULL COMMENT '学号',
  `user_id` MEDIUMTEXT NOT NULL,
  `class_id` MEDIUMTEXT NOT NULL,
  `create_time` DATETIME NULL COMMENT '创建时间',
  `modify_time` DATETIME NULL COMMENT '修改时间',
  PRIMARY KEY (`id`(254)))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ams4u_test`.`teacher`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ams4u_test`.`teacher` ;

CREATE TABLE IF NOT EXISTS `ams4u_test`.`teacher` (
  `id` MEDIUMTEXT NOT NULL,
  `emp_id` VARCHAR(254) NOT NULL COMMENT '工号',
  `user_id` MEDIUMTEXT NOT NULL,
  `department_id` MEDIUMTEXT NOT NULL,
  `create_time` DATETIME NULL COMMENT '创建时间',
  `modify_time` DATETIME NULL COMMENT '修改时间',
  PRIMARY KEY (`id`(254)))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ams4u_test`.`counsellor`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ams4u_test`.`counsellor` ;

CREATE TABLE IF NOT EXISTS `ams4u_test`.`counsellor` (
  `id` MEDIUMTEXT NOT NULL,
  `emp_id` VARCHAR(254) NOT NULL COMMENT '工号',
  `user_id` MEDIUMTEXT NOT NULL,
  `department_id` MEDIUMTEXT NOT NULL,
  `create_time` DATETIME NULL COMMENT '创建时间',
  `modify_time` DATETIME NULL COMMENT '修改时间',
  PRIMARY KEY (`id`(254)))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ams4u_test`.`staffadmin`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ams4u_test`.`staffadmin` ;

CREATE TABLE IF NOT EXISTS `ams4u_test`.`staffadmin` (
  `id` MEDIUMTEXT NOT NULL,
  `emp_id` VARCHAR(254) NOT NULL COMMENT '工号',
  `position` VARCHAR(254) NULL COMMENT '职位',
  `user_id` MEDIUMTEXT NOT NULL,
  `department_id` MEDIUMTEXT NOT NULL,
  `create_time` DATETIME NULL COMMENT '创建时间',
  `modify_time` DATETIME NULL COMMENT '修改时间',
  PRIMARY KEY (`id`(254)))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ams4u_test`.`campus`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ams4u_test`.`campus` ;

CREATE TABLE IF NOT EXISTS `ams4u_test`.`campus` (
  `id` MEDIUMTEXT NOT NULL,
  `name` VARCHAR(254) NOT NULL COMMENT '校区名称',
  `create_time` DATETIME NULL COMMENT '创建时间',
  `modify_time` DATETIME NULL COMMENT '修改时间',
  PRIMARY KEY (`id`(254)))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ams4u_test`.`building`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ams4u_test`.`building` ;

CREATE TABLE IF NOT EXISTS `ams4u_test`.`building` (
  `id` MEDIUMTEXT NOT NULL,
  `name` VARCHAR(254) NOT NULL COMMENT '名称',
  `campus_id` MEDIUMTEXT NOT NULL,
  `create_time` DATETIME NULL COMMENT '创建时间',
  `modify_time` DATETIME NULL COMMENT '修改时间',
  PRIMARY KEY (`id`(254)))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ams4u_test`.`classroom`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ams4u_test`.`classroom` ;

CREATE TABLE IF NOT EXISTS `ams4u_test`.`classroom` (
  `id` MEDIUMTEXT NOT NULL,
  `serial_number` VARCHAR(254) NOT NULL COMMENT '编号',
  `building_id` MEDIUMTEXT NOT NULL,
  `create_time` DATETIME NULL COMMENT '创建时间',
  `modify_time` DATETIME NULL COMMENT '修改时间',
  PRIMARY KEY (`id`(254)))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ams4u_test`.`daily_schedule`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ams4u_test`.`daily_schedule` ;

CREATE TABLE IF NOT EXISTS `ams4u_test`.`daily_schedule` (
  `id` MEDIUMTEXT NOT NULL,
  `serial_number` INT NULL COMMENT '序号',
  `name` VARCHAR(254) NULL COMMENT '名称',
  `start` TIME NOT NULL COMMENT '开始时间',
  `end` TIME NOT NULL COMMENT '结束时间',
  `season` INT NOT NULL COMMENT '0夏季 1冬季',
  `campus_id` MEDIUMTEXT NOT NULL,
  `create_time` DATETIME NULL COMMENT '创建时间',
  `modify_time` DATETIME NULL COMMENT '修改时间',
  PRIMARY KEY (`id`(254)))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ams4u_test`.`course`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ams4u_test`.`course` ;

CREATE TABLE IF NOT EXISTS `ams4u_test`.`course` (
  `id` MEDIUMTEXT NOT NULL,
  `name` VARCHAR(254) NOT NULL COMMENT '名称',
  `type` INT NOT NULL COMMENT '课程类型',
  `take_attend_type` INT NOT NULL COMMENT '上课考勤方式',
  `dismiss_attend_type` INT NOT NULL COMMENT '上课考勤方式',
  `interval_attend_type` INT NOT NULL COMMENT '课间考勤方式',
  `status` INT NOT NULL COMMENT '状态',
  `create_time` DATETIME NULL COMMENT '创建时间',
  `modify_time` DATETIME NULL COMMENT '修改时间',
  `teacher_id` MEDIUMTEXT NOT NULL,
  PRIMARY KEY (`id`(254)))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ams4u_test`.`course_schedule`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ams4u_test`.`course_schedule` ;

CREATE TABLE IF NOT EXISTS `ams4u_test`.`course_schedule` (
  `id` MEDIUMTEXT NOT NULL,
  `even_used` INT NOT NULL COMMENT '单双周',
  `day_of_week` INT NOT NULL COMMENT '周几 1周一',
  `start` MEDIUMTEXT NOT NULL COMMENT '开始',
  `end` MEDIUMTEXT NOT NULL COMMENT '结束',
  `status` INT NOT NULL COMMENT '状态',
  `course_id` MEDIUMTEXT NOT NULL,
  `classroom_id` MEDIUMTEXT NOT NULL,
  `create_time` DATETIME NULL COMMENT '创建时间',
  `modify_time` DATETIME NULL COMMENT '修改时间',
  `dest_date` DATE NULL COMMENT '新日期',
  `src_date` DATE NULL COMMENT '原日期',
  `src_id` MEDIUMTEXT NULL COMMENT '原课程表ID',
  PRIMARY KEY (`id`(254)))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ams4u_test`.`attendence_record`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ams4u_test`.`attendence_record` ;

CREATE TABLE IF NOT EXISTS `ams4u_test`.`attendence_record` (
  `id` MEDIUMTEXT NOT NULL,
  `type` INT NOT NULL COMMENT '考勤类型',
  `status` INT NOT NULL COMMENT '考勤状态',
  `time` DATETIME NOT NULL COMMENT '考勤时间',
  `course_id` MEDIUMTEXT NOT NULL,
  `student_id` MEDIUMTEXT NOT NULL,
  `create_time` DATETIME NULL COMMENT '创建时间',
  `modify_time` DATETIME NULL COMMENT '修改时间',
  PRIMARY KEY (`id`(254)))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ams4u_test`.`leave_record`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ams4u_test`.`leave_record` ;

CREATE TABLE IF NOT EXISTS `ams4u_test`.`leave_record` (
  `id` MEDIUMTEXT NOT NULL,
  `type` INT NOT NULL COMMENT '类型 1病假 2事假 ',
  `start` DATETIME NOT NULL COMMENT '开始时间',
  `end` DATETIME NOT NULL COMMENT '结束时间',
  `reason` VARCHAR(254) NULL COMMENT '原因',
  `permit_time` DATETIME NULL COMMENT '批准时间',
  `student_id` MEDIUMTEXT NOT NULL,
  `create_time` DATETIME NULL COMMENT '创建时间',
  `modify_time` DATETIME NULL COMMENT '修改时间',
  `permit_by_id` MEDIUMTEXT NOT NULL COMMENT '批准人',
  PRIMARY KEY (`id`(254)))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ams4u_test`.`student_course`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ams4u_test`.`student_course` ;

CREATE TABLE IF NOT EXISTS `ams4u_test`.`student_course` (
  `id` MEDIUMTEXT NULL,
  `student_id` MEDIUMTEXT NOT NULL,
  `course_id` MEDIUMTEXT NOT NULL,
  `create_time` DATETIME NULL COMMENT '创建时间',
  `modify_time` DATETIME NULL COMMENT '修改时间',
  PRIMARY KEY (`id`(254)))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `ams4u_dev`.`website_setting`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ams4u_dev`.`website_setting` ;

CREATE TABLE IF NOT EXISTS `ams4u_dev`.`website_setting` (
  `id` LONG NOT NULL,
  `s_key` VARCHAR(254) NOT NULL,
  `s_value` VARCHAR(254) NOT NULL,
  PRIMARY KEY (`id`(254)))
ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
