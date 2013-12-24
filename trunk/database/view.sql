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

