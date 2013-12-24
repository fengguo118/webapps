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