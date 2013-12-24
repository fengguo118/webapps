function ClassController($scope, Classes,Subject,College, Pagination, $timeout, $injector){
  $injector.invoke(BasicController, this, {$scope: $scope});

  $scope.resource = Classes;
  $scope.editView ="views/basicdata/class/edit.html";
  $scope.topNaviBar ="views/basicdata/class/naviBar.html";
  $scope.isQuery = false;
  $scope.isManage = true;
  $scope.itemName = '班级';

  $scope.colleges = {};
  $scope.subjectes = {};
  $scope.grades = [];

  $scope.condition = {
    college : '',
    subject : '',
    grade : ''
  }

  $scope.selfPagination = Pagination;

  Subject.getAll(function(result){
    console.log('ClassController Building result:', result)
    $scope.options = {
      subjects : result.entities
    }
  });

  College.getAll(function(result){
    console.log('CourseScheduleQueryController College result:', result)
    $scope.colleges = result.entities;
  });


  $scope.$watch('condition.college', function(){
    try{
      $scope.condition.subject = null;
      $scope.subjectes = {};
      $scope.condition.grade = null;
      $scope.grades = [];

      console.log('condition.college&&&&');

      if(!!$scope.condition.college){
        var param = { collegeID : $scope.condition.college.id}
        Subject.getAllByCollegeID(param,function(result){
          $scope.subjectes = result.entities;
        })
      }
      $scope.selfPagination.iPage = 1;
      $scope.querySchedule();
    }catch(e){
      return;
    }
  });

  $scope.$watch('condition.subject', function(){
    try{
      $scope.condition.grade = null;
      $scope.grades = [];

      console.log('condition.subject&&&&');

      if(!!$scope.condition.subject){
        var num = $scope.condition.subject.years;
        console.log('num:',num)
        for(var i = 0;i < num ;){
          $scope.grades.push(++i);
        }
      }
      $scope.selfPagination.iPage = 1;
      $scope.querySchedule();
    }catch(e){
      return;
    }
  });

  $scope.$watch('condition.grade', function(){
    try{
      console.log('condition.grade&&&&');
      $scope.selfPagination.iPage = 1;
      $scope.querySchedule();
    }catch(e){
      return;
    }
  });

  $scope.$watch('selfPagination.iLength', function(){
    $scope.querySchedule();
  });
  $scope.$watch('selfPagination.iPage', function() {
    $scope.querySchedule();
  });

  $scope.refreshSelf = function(){
    var params = {page:$scope.selfPagination.iPage, limit:$scope.selfPagination.iLength};
    Classes.get(params, function(result){
      console.log('refresh result:', result);
      $scope.entities = result.entities;
      $scope.pagination.paginate(result.total);
    });
  }

  $scope.initSelf = function() {
    $scope.activeView = "views/basicdata/class/page.html";
    $scope.selfPagination.iPage = 1;
    $scope.fields = $scope.profileFields.filter(function(field){
      return !field.unlist;
    });
    $scope.refreshSelf();
  };

  $scope.querySchedule = function(){
    $scope.activeView = "views/basicdata/class/page.html";
    var params = {};
    if(!$scope.condition.college){//学院为空，则加载所有班级
      console.log('学院为空，则加载所有班级');
      $scope.refreshSelf();
    }else{
      if(!$scope.condition.subject){//学院不为空，专业为空，则根据学院过滤班级
        console.log('学院不为空，专业为空，则根据学院过滤班级');
        params = {page:$scope.selfPagination.iPage, limit:$scope.selfPagination.iLength,collegeID : $scope.condition.college.id};
        console.log('params:',params);
        Classes.getByCollege(params, function(result){
          console.log('refresh result:', result);
          $scope.entities = result.entities;
          $scope.selfPagination.paginate(result.total);
        });
      }else{
        if(!$scope.condition.grade){//学院不为空，专业不为空，年级为空的，则根据专业过滤班级
          console.log('学院不为空，专业不为空，年级为空的，则根据专业过滤班级');
          params = {page:$scope.selfPagination.iPage, limit:$scope.selfPagination.iLength,subjectID : $scope.condition.subject.id};
          console.log('params:',params);
          Classes.getBySubject(params, function(result){
            console.log('refresh result:', result);
            $scope.entities = result.entities;
            $scope.selfPagination.paginate(result.total);
          });
        }else{
          console.log('学院不为空，专业不为空，年级不为空，则根据专业和年级去过滤班级');
          params = {page:$scope.selfPagination.iPage, limit:$scope.selfPagination.iLength,subjectID : $scope.condition.subject.id,grade : $scope.condition.grade};
          console.log('params:',params);
          Classes.getBySubjectIDAndGrade(params, function(result){
            console.log('refresh result:', result);
            $scope.entities = result.entities;
            $scope.selfPagination.paginate(result.total);
          });
        }
      }
    }
  }

  // profile
  $scope.profileFields = [
    {name: "name", title: "名称", creatable:true,required:true}
    , {name: "subjectName", title: "专业",readonly:true}
    , {name: "code", title: "代号",creatable:true,required:true}
    , {name: "grade", title: "年级",readonly:true}
  ];


  $scope.$watch('entity.subject', function(){
    console.log("chenge! entity.subject:",$scope.entity.subject);
    try{
//      $scope.entity.grade = null;
      $scope.grades = [];

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

}