function BasicController($scope, Pagination,Users, Classes,StudentCourse,$timeout){
	$scope.activeView = undefined
	$scope.resource = undefined
	$scope.editView = undefined
	$scope.searchOptions = {
		text: '',
		tooltip: '',
		fields: []
	}

	// list
	$scope.fields = []
	$scope.fieldOperations = [
//			{styleclass: "btn-success ", icon: "icon-zoom-in ", op:"showProfile(entity,itemName,options)"},
			{styleclass: "btn-info ", icon: "icon-edit", op:"showEdit(entity,itemName,options,entities)", title:"编辑"}
		,	{styleclass: "btn-danger ", icon: "icon-trash", op:"remove(entity)", title:"删除"}
	]

	// profile
	$scope.profileShortcuts = [
			{styleclass: "box quick-button-small span1", icon: "icon-edit", text: "编辑", op:"showEdit(entity)"},	{styleclass: "box quick-button-small span1", icon: "icon-trash", text: "删除", op:"remove(entity)"}
	]
	$scope.profileFields = []

	$scope.shouldOpenConfirmCreate = false
	$scope.entities = []
	$scope.entity = {}

	$scope.$watch('pagination.iLength', function(){
		$scope.refreshList()
	})
	$scope.$watch('pagination.iPage', function() {
		$scope.refreshList()
	})
	$scope.pagination = Pagination

  console.log('$scope.pagination:',$scope.pagination)

	// route
	$scope.showEdit = function(entity,itemName,options,entities) {
    console.log('xxxxxxxxxentity:',entity)
    console.log('xxxxxxxxxitemName:',itemName)
    $scope.entity = entity
    if(!$scope.entity){
      $scope.entity = {}
    }

    $scope.entity.itemName = itemName
    $scope.entity.department = null //一定设为null，不然学院，部门的非空不起作用
    $scope.options = options
    $scope.teacherIDDuplication = "";
    $scope.studentIDDuplication = "";
    $scope.Duplication = " ";

    if(!!itemName){
      $scope.itemName = itemName

//      console.log(itemName+"进来了");

      switch (itemName){
        case '教务处' :
          options.departments.forEach(function(value){
//            console.log("value:",value);
            if(value.id === entity.department_id){
              $scope.entity.department = value;
            }
          })
            console.log("$scope.entity.department:",$scope.entity.department)
          $scope.Duplication = " ";
          $scope.entity.position = 'office'
          break
        case '学院领导' :
          options.departments.forEach(function(value){
//            console.log("value:",value);
            if(value.id === entity.department_id){
              $scope.entity.department = value;
            }
          })
//          console.log("$scope.entity.department:",$scope.entity.department)
          $scope.entity.position = 'collegeLeader'
          break
        case '学校领导' :
          options.departments.forEach(function(value){
//            console.log("value:",value);
            if(value.id === entity.department_id){
              $scope.entity.department = value;
            }
          })
//          console.log("$scope.entity.department:",$scope.entity.department)
          $scope.entity.position = 'schoolLeader'
          break
        case '其他部门' :
          $scope.entity.position = 'other'
          break
        case '辅导员' :
          options.departments.forEach(function(value){
//            console.log("value:",value);
            if(value.id === entity.department_id){
              $scope.entity.department = value;
            }
          })
          $scope.Duplication = " ";
          break
        case '学生' :
          $scope.classes = [{id:$scope.entity.class_id,name:$scope.entity.className}];
          $scope.entity.class_o = $scope.classes[0]
//          console.log("$scope.entity.class_o:",$scope.entity.class_o);
//          console.log("$scope.classes:",$scope.classes);
          break
        case '老师' :
          options.departments.forEach(function(value){
//            console.log("value:",value);
            if(value.id === entity.department_id){
              $scope.entity.department = value;
            }
          })
          $scope.Duplication = " ";
          break
        case '专业' :
          options.colleges.forEach(function(value){
//            console.log("value:",value);
            if(value.name === entity.departName){
              $scope.entity.college = value;
            }
          })
          break
        case '班级' :
          options.subjects.forEach(function(value){
//            console.log("value:",value);
            if(value.name === entity.subjectName){
              $scope.entity.subject = value;
            }
          })
          break
        case '教室' :
          options.buildings.forEach(function(value){
            console.log("value:",value);
            if(value.name === entity.buildingName){
              $scope.entity.building = value;
            }
          })
          break
        case '请假' :
            if(options.students){
              options.students.forEach(function(value){
//            console.log("value:",value);
                if(value.name === entity.studentName){
                  $scope.entity.student = value;
                }
              })
            }

          break

        case '作息表' :
          options.seasones.forEach(function(value){
//            console.log("value:",value);
            if(value.name === entity.seasonName){
              $scope.entity.season = value;
            }
          })
          options.campuses.forEach(function(value){
//            console.log("value:",value);
            if(value.name === entity.campusName){
              $scope.entity.campus = value;
            }
          })
          break

        case '教学楼' :
          options.campuses.forEach(function(value){
//            console.log("value:",value);
            if(value.name === entity.campusName){
              $scope.entity.campuse = value;
            }
          })
          break

        case '课程' :
          options.attendTypes.forEach(function(value){
//            console.log("value:",value);
            if(value.name === entity.takeAttendTypeName){
              $scope.entity.takeAttendType = value.code;
            }
            if(value.name === entity.intervalAttendTypeName){
              $scope.entity.intervalAttendType = value.code;
            }
            if(value.name === entity.dismissAttendTypeName){
              $scope.entity.dismissAttendType = value.code;
            }
          })
          options.types.forEach(function(value){
//            console.log("value:",value);
            if(value.name === entity.typeName){
              $scope.entity.type = value;
            }
          })
          options.teachers.forEach(function(value){
//            console.log("value:",value);
            if(value.name === entity.teacherName){
              $scope.entity.teacher = value;
            }
          })
          options.statuses.forEach(function(value){
//            console.log("value:",value);
            if(value.name === entity.statusName){
              $scope.entity.status = value;
            }
          })
          break

        case '课程表' :
          options.evenUsedCollectiones.forEach(function(value){
//            console.log("value:",value);
            if(value.name === entity.evenUsedName){
              $scope.entity.evenUsed = value.code;
            }
          })
          options.weekes.forEach(function(value){
//            console.log("value:",value);
            if(value.name === entity.dayOfWeekName){
              $scope.entity.dayOfWeek = value;
            }
          })
          options.courses.forEach(function(value){
//            console.log("value:",value);
            if(value.name === entity.courseName){
              $scope.entity.course = value;
            }
          })
          options.schedules.forEach(function(value){
//            console.log("value:",value);
            if(value.name === entity.startTime){
              $scope.entity.start = value;
            }
            if(value.name === entity.endTime){
              $scope.entity.end = value;
            }
          })
          options.classroomes.forEach(function(value){
//            console.log("value:",value);
            if(value.serial_number === entity.classroomName){
              $scope.entity.classroom = value;
            }
          })
          options.statuses.forEach(function(value){
//            console.log("value:",value);
            if(value.name === entity.statusName){
              $scope.entity.status = value;
            }
          })
          break

      }
    }

		$scope.activeView = "views/basicEdit.html"
	}

	$scope.showCreate = function() {
		$scope.showEdit({createdAt: Date()})
	}

	$scope.showList = function(){
    if($scope.itemName === '学生' ||$scope.itemName === '老师' || $scope.itemName === '辅导员' || $scope.itemName === '学院领导'|| $scope.itemName === '专业'|| $scope.itemName === '班级'|| $scope.itemName === '教室'|| $scope.itemName === '教学楼'|| $scope.itemName === '作息表'){
//      console.log('刷新');
      $scope.querySchedule();
    }else{
      $scope.activeView = "views/basicList.html";
      $scope.refreshList();
    }
	}

	$scope.showProfile = function(entity,itemName,options) {
		$scope.entity = entity

    if(!!itemName){
      $scope.itemName = itemName
      switch (itemName){
        case '教务处' :
          $scope.entity.position = 'office'
          break
        case '学院领导' :
          $scope.entity.position = 'collegeLeader'
          break
        case '学校领导' :
          $scope.entity.position = 'schoolLeader'
          break
        case '其他部门' :
          $scope.entity.position = 'other'
          break
      }
    }
    $scope.options = options

		$scope.activeView = "views/basicProfile.html"
	}

	$scope.cancelEdit = function() {
    //修复编辑 取消 新增变成编辑的bug
    $scope.entity = {}
		$scope.showList()
	}

	// Restful
	$scope.refreshList = function(options) {
//    console.log('%^%^%$scope.currentView:',$scope.currentView);
    if($scope.currentView.name === '学生管理'||$scope.currentView.name === '老师管理'||$scope.currentView.name === '辅导员管理' || $scope.currentView.name === '学院领导管理'|| $scope.currentView.name === '专业管理'|| $scope.currentView.name === '班级管理'|| $scope.currentView.name === '教室管理'|| $scope.currentView.name === '教学楼管理'|| $scope.currentView.name === '作息表管理') {
      $scope.querySchedule();
      return;
    }
    console.log('^^^^^^^^^^^^^^^^^^^^^^');
    var p = $scope.pagination
		var params = {page:p.iPage, limit:p.iLength,options:options}
//    $scope.pagination.paginate(0)

//		console.log($scope.searchOptions.text)
//		if($scope.searchOptions.text !== '' && $scope.searchOptions.fields.length > 0) {
//			params["$or"] = []
//			$scope.searchOptions.fields.forEach(function(field){
//				var filter = {}
//				filter[field] = {$regex:$scope.searchOptions.text}
//				params.$or.push(filter)
//			})
//			console.log(params)
//		}
//    console.log('params:',params)
    if($scope.resource){
      $scope.resource.get(params, function(result){
        console.log('refresh result:', result)
        $scope.entities = result.entities
        $scope.pagination.paginate(result.total)
      })
    }
	}

	$scope.create = function(entity) {
    if(!!entity.password){
      if(entity.password !== entity.passwordEnsure){
        console.log("不相等");
        $('.alert').show();
        return;
      }else{
        $('.alert').hide();
      }
    }

//    if(!!entity.username){
////      if(entity.password !== entity.passwordEnsure){
////        console.log("不相等");
////        $('.alert').show();
////        return;
////      }else{
////        $('.alert').hide();
////      }
//
//
//
//    }


    if(entity.itemName === '老师' || entity.itemName === '学生'|| entity.itemName === '辅导员'|| entity.itemName === '教务处'|| entity.itemName === '学院领导'|| entity.itemName === '学校领导' ){
      console.log("进来了");
      $scope.checkDuplication(function(){

        Users

        var resource = new $scope.resource(entity)
        resource.$save(function(err) {
          $scope.entity = {}
          $scope.showList()
        }, function(err) {
          console.log('update user error:', err)
        })

      });
    }else{

      var newOne = new $scope.resource(entity)
      newOne.$save(function(result) {
//        alert(result.message);
        if(result.message === 'already exist'){
          alert("同一时间相同课程已存在！");
          return;
        }
        console.log("success",result)
        $scope.entity = {};
        $scope.showList();
      },function(err){
        console.log('error:', err);
      })

    }
	}

	$scope.update = function(entity) {

    console.log("55555￥￥%￥%%%entity:",entity)

    if(entity.itemName === '老师' || entity.itemName === '学生'|| entity.itemName === '辅导员'|| entity.itemName === '教务处'|| entity.itemName === '学院领导'|| entity.itemName === '学校领导' ){
      console.log("进来了");
      $scope.checkDuplication(function(){
        var resource = new $scope.resource(entity)
        resource.$update(function(err) {
          $scope.entity = {}
          $scope.showList()
        }, function(err) {
          console.log('update user error:', err)
        })

      });
    }else{
      var resource = new $scope.resource(entity)
      resource.$update(function(result) {
//        alert(result.message);
        if(result.message === 'already exist'){
          alert("同一时间相同课程已存在！");
          return;
        }

        $scope.entity = {}
        $scope.showList()
      }, function(err) {
        console.log('update user error:', err)
      })
    }




	}

	$scope.remove = function(entity) {
    if(!confirm("确定删除？")) return;
		var resource = new $scope.resource(entity)
		resource.$remove(function() {
			if($scope.activeView === 'views/basicProfile.html'){
				$scope.showList()
			} else {
				var iPage = $scope.pagination.iPage
				$scope.pagination.paginate($scope.pagination.iTotal-1)
				if(iPage === $scope.pagination.iPage) {
					$scope.refreshList()
				}
			}
		}, function(err) {
			console.log('Remove error:', err)
		})
	}
  $scope.correspond = function(entity){
    $scope.entity = entity
    $scope.selection = [];
    if($scope.entity.typeName === '公共必修课' || $scope.entity.typeName === '专业必修课'){
      var param = {teacherID : $scope.entity.teacher_id}
      Classes.getAllByTeacherID(param,function(result){
        $scope.classes = result.entities;
        console.log('$scope.classes',$scope.classes);
        console.log('$scope.entity',$scope.entity);

        Classes.getBySelectedCourseID({courseID:$scope.entity.id},function(selectedClass){
          console.log("selectedClass:",selectedClass);
          var selectedClasses = selectedClass.entities;
          $scope.classes.forEach(function(value){
            if(selectedClasses){
              selectedClasses.forEach(function(selectedValue){
                if(selectedValue.id === value.id){
                  $scope.selection.push(value);
                }
              });
            }
          });
          console.log("$scope.selection:",$scope.selection);
        });
      });
      $scope.activeView = "views/course/courseSchedule/classCorrespond.html";



//      $scope.colors = [
//        {name: 'black',shade: 'dark'}
//        ,{name: 'white',shade: 'light'}
//        ,{name: 'red',shade: 'dark'}
//        ,{name: 'blue',shade: 'dark'}
//        ,{name: 'yellow', shade: 'light'
//        }
//      ];
//
//      $scope.selectedColors = [$scope.colors[1],$scope.colors[3]];

    }else{
      $scope.activeView = "views/course/courseSchedule/studentCorrespond.html"
    }
  }

  $scope.saveCorrespond = function(selection,entity){
    //selection本身为字符串，转换成json对象
//    selection.forEach(function(i, index) {
//      selection[index] = JSON.parse(i)
//    })
//    console.log("转换成功:",selection)
    var selectedClasses = ''
    for(var i = 0,len = selection.length; i<len; i++){
      selectedClasses += selection[i].id + "$"
    }

    selectedClasses = selectedClasses.substring(0,selectedClasses.length-1)
    console.log('selectedClasses',selectedClasses)
    var newOne = new StudentCourse()
    var params = {
      courseID : entity.id,
      selectedClasses : selectedClasses
    }
    newOne.$save(params,function(result) {
      console.log("success",result)
      $scope.entity = {}
      $scope.showList()
    },function(err){
      console.log('error:', err);
      alert("此班级无学生，请重新选择！");
    })

  }

	$scope.init = function() {
		$scope.activeView = "views/basicList.html"
		$scope.pagination.iPage = 1
		$scope.fields = $scope.profileFields.filter(function(field){
			return !field.unlist
		})
	}

	$scope.valueOfKeyString = function(entity, keyString) {
		var v = entity
		var keys = keyString.split('.')
		keys.forEach(function(key){
			v = v[key]
		})
		return v
	}
}