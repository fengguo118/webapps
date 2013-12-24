function StudentController($scope, Student,Classes,Subject,College,Classes, Student,Pagination, $rootScope,$timeout, $injector){
  $injector.invoke(BasicController, this, {$scope: $scope});

  $scope.resource = Student
  $scope.editView ="views/basicdata/student/edit.html"
  $scope.topEditView ="views/basicdata/topEditView.html"
  $scope.topNaviBar ="views/basicdata/student/naviBar.html"
  $scope.isQuery = false
  $scope.isManage = true
  $scope.itemName = '学生'
  $scope.entity = {}
  $scope.colleges = {};
  $scope.subjectes = {};
  $scope.grades = [];
  $scope.classes = {};
  $scope.selfPagination = Pagination;
  
  $scope.condition = {
    college : '',
    subject : '',
    grade : '',
    class_o : '',
    student : ''
  }

  College.getAll(function(result){
    console.log('CourseScheduleQueryController College result:', result)
    $scope.colleges = result.entities;
  });

  $scope.$watch('entity.college', function(){
    try{
      $scope.entity.subject = null;
      $scope.subjectes = null;
//      $scope.entity.grade = null;
//      $scope.grades = null;
//      $scope.entity.class_o = null;
//      $scope.classes = null;
//      $scope.entity.student = null;
//      $scope.selfPagination.iPage = 1;

      if(!!$scope.entity.college){
        var param = { collegeID : $scope.entity.college.id}
        console.log('param：',param)
        Subject.getAllByCollegeID(param,function(result){
          console.log('CourseScheduleQueryController Subject result:', result)
          $scope.subjectes = result.entities;
        })
      }
    }catch(e){
      return;
    }
  });

  $scope.$watch('entity.subject', function(){
    try{
      $scope.entity.grade = null;
      $scope.grades = [];
//      $scope.entity.class_o = null;
//      $scope.classes = null;
//      $scope.entity.student = null;

      if(!!$scope.entity.subject){
        var num = $scope.entity.subject.years;
        console.log('num:',num)
        for(var i = 0;i < num ;){
          $scope.grades.push(++i);
        }
      }
    }catch(e){
      return;
    }
  });

  $scope.$watch('entity.grade', function(){
    try{
//      $scope.entity.class_o = null;
//      $scope.classes = null;
//      $scope.entity.student = null;

      if(!!$scope.entity.grade){
        var param = {
          subjectID : $scope.entity.subject.id ,
          grade : $scope.entity.grade
        };
        console.log('param：',param)
        Classes.getAllBySubjectIDAndGrade(param,function(result){
          console.log('CourseScheduleQueryController Classes result:', result)
          $scope.classes = result.entities;
        })
      }
    }catch(e){
      return;
    }
  });

  $scope.$watch('condition.college', function(){
    try{
      $scope.condition.subject = null;
      $scope.subjectes = null;
      $scope.condition.grade = null;
      $scope.grades = null;
      $scope.condition.class_o = null;
      $scope.classes = null;
      $scope.condition.student = null;
      $scope.studentes = null;
      $scope.selfPagination.iPage = 1;

      if(!!$scope.condition.college){
        var param = { collegeID : $scope.condition.college.id}
        Subject.getAllByCollegeID(param,function(result){
          $scope.subjectes = result.entities;
        })
      }
      $scope.querySchedule();
    }catch(e){
      return;
    }
  });

  $scope.$watch('condition.subject', function(){
    try{
      $scope.condition.grade = null;
      $scope.grades = [];
      $scope.condition.class_o = null;
      $scope.classes = null;
      $scope.condition.student = null;
      $scope.studentes = null;
      $scope.selfPagination.iPage = 1;

      if(!!$scope.condition.subject){
        var num = $scope.condition.subject.years;
        console.log('num:',num)
        for(var i = 0;i < num ;){
          $scope.grades.push(++i);
        }
      }
      $scope.querySchedule();
    }catch(e){
      return;
    }
  });

  $scope.$watch('condition.grade', function(){
    try{
      $scope.condition.class_o = null;
      $scope.classes = null;
      $scope.condition.student = null;
      $scope.studentes = null;
      $scope.selfPagination.iPage = 1;

      if(!!$scope.condition.grade){
        var param = {
          subjectID : $scope.condition.subject.id ,
          grade : $scope.condition.grade
        };
        Classes.getAllBySubjectIDAndGrade(param,function(result){
          $scope.classes = result.entities;
        })
      }
      $scope.querySchedule();
    }catch(e){
      return;
    }
  });

  $scope.$watch('condition.class_o', function(){
    $scope.selfPagination.iPage = 1;
    $scope.querySchedule();
  });

  $scope.$watch('selfPagination.iLength', function(){
    $scope.querySchedule($scope.condition);
  })
  $scope.$watch('selfPagination.iPage', function() {
    $scope.querySchedule($scope.condition);

  })
4
  $scope.querySchedule = function(){

    $scope.activeView = "views/basicdata/student/page.html";
    var params = {page:$scope.selfPagination.iPage, limit:$scope.selfPagination.iLength};
    if(!$scope.condition.college){//学院为空，则加载所有学生
      console.log('学院为空，则加载所有学生');
      Student.get(params, function(result){
        console.log('refresh result:', result);
        $scope.entities = result.entities;
        $scope.selfPagination.paginate(result.total);
      })
    }else{
      console.log('学院不为空')
      if(!$scope.condition.subject){//学院不为空，专业为空，则根据学院过滤学生
        console.log('学院不为空，专业为空，则根据学院过滤学生');
        params = {page:$scope.selfPagination.iPage, limit:$scope.selfPagination.iLength,collegeID : $scope.condition.college.id};
        Student.getAllByCollegeID(params, function(result){
          console.log('refresh result:', result);
          $scope.entities = result.entities;
          $scope.selfPagination.paginate(result.total);
        })
      }else{
        if(!$scope.condition.grade){//学院不为空，专业不为空，年级为空的，则根据专业过滤学生
          console.log('学院不为空，专业不为空，年级为空的，则根据专业过滤学生');
          params = {page:$scope.selfPagination.iPage, limit:$scope.selfPagination.iLength,subjectID : $scope.condition.subject.id};
          Student.getAllBySubjectID(params, function(result){
            console.log('refresh result:', result);
            $scope.entities = result.entities;
            $scope.selfPagination.paginate(result.total);
          })
        }else{
          if(!$scope.condition.class_o){//学院不为空，专业不为空，年级不为空，班级为空，则根据专业和年级去过滤学生
            console.log('学院不为空，专业不为空，年级不为空，班级为空，则根据专业和年级去过滤学生');
            params = {page:$scope.selfPagination.iPage, limit:$scope.selfPagination.iLength,subjectID : $scope.condition.subject.id,grade : $scope.condition.grade};
            Student.getAllBySubjectIDAndGrade(params, function(result){
              console.log('refresh result:', result);
              $scope.entities = result.entities;
              $scope.selfPagination.paginate(result.total);
            })
          }else{
            //学院不为空，专业不为空，年级不为空，班级不为空，则根据班级过滤学生
            console.log('学院不为空，专业不为空，年级不为空，班级不为空，则根据班级过滤学生');
            params = {page:$scope.selfPagination.iPage, limit:$scope.selfPagination.iLength,classID : $scope.condition.class_o.id};
            console.log("params:",params)
            Student.getByClassID(params, function(result){
              console.log('refresh result:', result);
              $scope.entities = result.entities;
              $scope.selfPagination.paginate(result.total);
            })
          }
        }
      }
    }
  }

  // profile
  $scope.profileFields = [
    {name: "username", title: "用户名", readonly:true},
    {name: "student_id", title: "学号", readonly:true}
    , {name: "name", title: "姓名",creatable:true,required:true}
    , {name: "className", title: "班级",readonly:true}
    , {name: "grade", title: "年级",readonly:true}
    , {name: "collegeName", title: "学院",readonly:true}
    , {name: "phone", title: "手机号",creatable:true,required:true}
  ];

  $scope.initSelf = function() {
    $scope.activeView = "views/basicdata/student/page.html"
    $scope.selfPagination.iPage = 1
    $scope.fields = $scope.profileFields.filter(function(field){
      return !field.unlist
    })
  }

  $scope.checkDuplication = function(callback){

//    console.log("$scope.entity.student_id:"+$scope.entity.student_id);
//    $scope.studentIDDuplication = "sssss";

    if(!$scope.entity.student_id) return;
    Student.checkStudentIDDuplication({ studentID : $scope.entity.student_id,sid:$scope.entity.id},function(result){
      if(result.message === 'not exist'){
        $scope.studentIDDuplication = "";
        if(callback){
          callback();
        }
      }else{
        $scope.entity.student_id = "";
        $scope.studentIDDuplication = "学号已存在！请重新输入。";
      }
    });
  }

  $scope.setPSNID = function(entity){
    $rootScope.psnID = entity.userid;
    console.log("entity.$rootScope.psnID:",$rootScope.psnID)
  }

}
