-- -----------------
-- 某一门课的出席人数
-- -----------------
select COUNT(status) as attendNum from attendence_record
where status = 0 and course_id = '38440ef0-3b00-11e3-8c19-2f9f987abd39'
GROUP BY course_id

-- -----------------
-- 某一门课的旷课人数
-- -----------------
select COUNT(status) as outOfClassNum from attendence_record
where status = 1 and course_id = '38440ef0-3b00-11e3-8c19-2f9f987abd39'
GROUP BY course_id

-- -----------------
-- 某一门课的迟到人数
-- -----------------
select COUNT(status) as lateNum from attendence_record
where status = 2 and course_id = '38440ef0-3b00-11e3-8c19-2f9f987abd39'
GROUP BY course_id

-- -----------------
-- 某一门课的早退人数
-- -----------------
select COUNT(status) as earlyLeaveNum from attendence_record
where status = 3 and course_id = '38440ef0-3b00-11e3-8c19-2f9f987abd39'
GROUP BY course_id

-- -----------------
-- 某一门课的病假人数
-- -----------------
select COUNT(status) as sickLeaveNum from attendence_record
where status = 4 and course_id = '38440ef0-3b00-11e3-8c19-2f9f987abd39'
GROUP BY course_id

-- -----------------
-- 某一门课的事假人数
-- -----------------
select COUNT(status) as affairLeaveNum from attendence_record
where status = 5 and course_id = '38440ef0-3b00-11e3-8c19-2f9f987abd39'
GROUP BY course_id
















