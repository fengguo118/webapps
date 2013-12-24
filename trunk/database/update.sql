-- -----------------------------------------------------
-- update course 2013.10.22
-- 添加 ：
--      新日期 dest_date
--      原日期 src_date
--      原课程ID src_id
-- -----------------------------------------------------
alter table course_schedule add column dest_date DATE;
alter table course_schedule add column src_date DATE;
alter table course_schedule add column src_id LONG;
-- -----------------------------------------------------
-- 2013.10.23
-- 添加 ：
--      新表
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `ams4u_dev`.`website_setting` (
  `id` LONG NOT NULL,
  `s_key` VARCHAR(254) NOT NULL,
  `s_value` VARCHAR(254) NOT NULL,
  PRIMARY KEY (`id`(254)))