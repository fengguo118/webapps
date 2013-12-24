SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

DROP SCHEMA IF EXISTS `ams4u` ;
CREATE SCHEMA IF NOT EXISTS `ams4u` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `ams4u` ;

-- -----------------------------------------------------
-- Table `ams4u`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ams4u`.`user` ;

CREATE TABLE IF NOT EXISTS `ams4u`.`user` (
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
-- Table `ams4u`.`department`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ams4u`.`department` ;

CREATE TABLE IF NOT EXISTS `ams4u`.`department` (
  `id` MEDIUMTEXT NOT NULL,
  `name` VARCHAR(254) NOT NULL COMMENT '名称',
  `is_admin` INT NULL COMMENT '1二级职能 0学院',
  `code` VARCHAR(254) NULL COMMENT '代号',
  `create_time` DATETIME NULL COMMENT '创建时间',
  `modify_time` DATETIME NULL COMMENT '修改时间',
  PRIMARY KEY (`id`(254)))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ams4u`.`subject`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ams4u`.`subject` ;

CREATE TABLE IF NOT EXISTS `ams4u`.`subject` (
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
-- Table `ams4u`.`class`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ams4u`.`class` ;

CREATE TABLE IF NOT EXISTS `ams4u`.`class` (
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
-- Table `ams4u`.`student`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ams4u`.`student` ;

CREATE TABLE IF NOT EXISTS `ams4u`.`student` (
  `id` MEDIUMTEXT NOT NULL,
  `student_id` VARCHAR(254) NOT NULL COMMENT '学号',
  `user_id` MEDIUMTEXT NOT NULL,
  `class_id` MEDIUMTEXT NOT NULL,
  `create_time` DATETIME NULL COMMENT '创建时间',
  `modify_time` DATETIME NULL COMMENT '修改时间',
  PRIMARY KEY (`id`(254)))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ams4u`.`teacher`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ams4u`.`teacher` ;

CREATE TABLE IF NOT EXISTS `ams4u`.`teacher` (
  `id` MEDIUMTEXT NOT NULL,
  `emp_id` VARCHAR(254) NOT NULL COMMENT '工号',
  `user_id` MEDIUMTEXT NOT NULL,
  `department_id` MEDIUMTEXT NOT NULL,
  `create_time` DATETIME NULL COMMENT '创建时间',
  `modify_time` DATETIME NULL COMMENT '修改时间',
  PRIMARY KEY (`id`(254)))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ams4u`.`counsellor`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ams4u`.`counsellor` ;

CREATE TABLE IF NOT EXISTS `ams4u`.`counsellor` (
  `id` MEDIUMTEXT NOT NULL,
  `emp_id` VARCHAR(254) NOT NULL COMMENT '工号',
  `user_id` MEDIUMTEXT NOT NULL,
  `department_id` MEDIUMTEXT NOT NULL,
  `create_time` DATETIME NULL COMMENT '创建时间',
  `modify_time` DATETIME NULL COMMENT '修改时间',
  PRIMARY KEY (`id`(254)))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ams4u`.`staffadmin`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ams4u`.`staffadmin` ;

CREATE TABLE IF NOT EXISTS `ams4u`.`staffadmin` (
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
-- Table `ams4u`.`campus`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ams4u`.`campus` ;

CREATE TABLE IF NOT EXISTS `ams4u`.`campus` (
  `id` MEDIUMTEXT NOT NULL,
  `name` VARCHAR(254) NOT NULL COMMENT '校区名称',
  `create_time` DATETIME NULL COMMENT '创建时间',
  `modify_time` DATETIME NULL COMMENT '修改时间',
  PRIMARY KEY (`id`(254)))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ams4u`.`building`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ams4u`.`building` ;

CREATE TABLE IF NOT EXISTS `ams4u`.`building` (
  `id` MEDIUMTEXT NOT NULL,
  `name` VARCHAR(254) NOT NULL COMMENT '名称',
  `campus_id` MEDIUMTEXT NOT NULL,
  `create_time` DATETIME NULL COMMENT '创建时间',
  `modify_time` DATETIME NULL COMMENT '修改时间',
  PRIMARY KEY (`id`(254)))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ams4u`.`classroom`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ams4u`.`classroom` ;

CREATE TABLE IF NOT EXISTS `ams4u`.`classroom` (
  `id` MEDIUMTEXT NOT NULL,
  `serial_number` VARCHAR(254) NOT NULL COMMENT '编号',
  `building_id` MEDIUMTEXT NOT NULL,
  `create_time` DATETIME NULL COMMENT '创建时间',
  `modify_time` DATETIME NULL COMMENT '修改时间',
  PRIMARY KEY (`id`(254)))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ams4u`.`daily_schedule`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ams4u`.`daily_schedule` ;

CREATE TABLE IF NOT EXISTS `ams4u`.`daily_schedule` (
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
-- Table `ams4u`.`course`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ams4u`.`course` ;

CREATE TABLE IF NOT EXISTS `ams4u`.`course` (
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
-- Table `ams4u`.`course_schedule`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ams4u`.`course_schedule` ;

CREATE TABLE IF NOT EXISTS `ams4u`.`course_schedule` (
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
-- Table `ams4u`.`attendence_record`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ams4u`.`attendence_record` ;

CREATE TABLE IF NOT EXISTS `ams4u`.`attendence_record` (
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
-- Table `ams4u`.`leave_record`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ams4u`.`leave_record` ;

CREATE TABLE IF NOT EXISTS `ams4u`.`leave_record` (
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
-- Table `ams4u`.`student_course`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ams4u`.`student_course` ;

CREATE TABLE IF NOT EXISTS `ams4u`.`student_course` (
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


-- -----------------------------------------------------
-- 课程表视图子查询1
-- -----------------------------------------------------
CREATE or REPLACE VIEW v_course_schedule_subquery1 AS
select *,case status
							when 0 then 1
							when 1 then -1
							end as code,
						case STATUS
							when 0 then id
							when 1 then src_id
							end as w
				from course_schedule
				where status in (0,1);

-- -----------------------------------------------------
-- 课程表视图子查询2
-- -----------------------------------------------------

CREATE or REPLACE VIEW v_course_schedule_subquery2 AS
select
			*,sum(m.code) as total
		 from v_course_schedule_subquery1 m
		GROUP BY m.w;

-- -----------------------------------------------------
-- 课程表视图
-- -----------------------------------------------------
CREATE or REPLACE VIEW v_course_schedule AS
select
	n.id,n.even_used,n.day_of_week,n.start,n.end,
	n.status,n.course_id,n.classroom_id,n.create_time,
	n.modify_time,n.dest_date,n.src_date,n.src_id
	from v_course_schedule_subquery2 n
where n.total =1
UNION select 	*
 from course_schedule where STATUS= 3;

 -- 删除教学楼触发器，在删除教学楼之前先删除关联到教学楼的教室
 delimiter ||
 drop trigger if exists del_building||
 create trigger del_building before delete on building for each row
 begin
      delete from classroom where building_id=old.id;
 end||
 delimiter ;

 -- 删除校区触发器，在删除校区之前先删除关联到校区的教学楼和作息表
 delimiter ||
 drop trigger if exists del_campus||
 create trigger del_campus before delete on campus for each row
 begin
      delete from building where campus_id=old.id;
 	 delete from daily_schedule where campus_id=old.id;
 end||
 delimiter ;

 -- 删除班级触发器，在删除班级之前先删除关联到班级的学生
 delimiter ||
 drop trigger if exists del_class||
 create trigger del_class before delete on class for each row
 begin
      delete from student where class_id=old.id;
 end||
 delimiter ;

 -- 删除专业触发器，在删除专业之前先删除关联到专业的班级
 delimiter ||
 drop trigger if exists del_subject||
 create trigger del_subject before delete on subject for each row
 begin
      delete from class where subject_id=old.id;
 end||
 delimiter ;

 -- 删除部门学院触发器，在删除部门学院之前先删除关联到部门学院的专业，行政人员，老师和辅导员
 delimiter ||
 drop trigger if exists del_department||
 create trigger del_department before delete on department for each row
 begin
     delete from subject where department_id=old.id;
 	delete from staffadmin where department_id=old.id;
 	delete from teacher where department_id=old.id;
 	delete from counsellor where department_id=old.id;
 end||
 delimiter ;

-- 插入管理员
 insert into user (id,name,username,hashed_password,role) values ('admin','Admin','admin','e10adc3949ba59abbe56e057f20f883e',0)
