function TeacherController($scope, Teacher,College, Pagination, $timeout, $rootScope,$injector){
  $injector.invoke(BasicController, this, {$scope: $scope});

  $scope.resource = Teacher;
  $scope.editView ="views/basicdata/teacher/edit.html";
  $scope.topEditView ="views/basicdata/topEditView.html";
  $scope.topNaviBar ="views/basicdata/teacher/naviBar.html";
  $scope.isQuery = false;
  $scope.isManage = true;
  $scope.itemName = '老师';
  $scope.teacherIDDuplication = "";
  $scope.entity = {};
  $scope.selfPagination = Pagination;
  $scope.colleges = {};
//  var collegeChangeTag = false;

  $scope.condition = {college : ''};

  console.log('TeacherController');

  College.getAll(function(result){
    console.log('TeacherController colleges result:', result);
    $scope.colleges = result.entities;
    $scope.options = {
      departments : result.entities
    }
  });

  // profile
  $scope.profileFields = [
    {name: "username", title: "用户名", readonly:true},
    {name: "emp_id", title: "工号", readonly:true}
    , {name: "name", title: "姓名",creatable:true,required:true}
    , {name: "collegeName", title: "学院",readonly:true}
    , {name: "phone", title: "手机号",creatable:true,required:true}
  ];

  $scope.$watch('selfPagination.iLength', function(){
    $scope.querySchedule();
  });
  $scope.$watch('selfPagination.iPage', function() {
    $scope.querySchedule();
  });

  $scope.refreshSelf = function(){
    var params = {page:$scope.selfPagination.iPage, limit:$scope.selfPagination.iLength};
    Teacher.get(params, function(result){
      console.log('refresh result:', result);
      $scope.entities = result.entities;
      $scope.pagination.paginate(result.total);
    });
  }

  $scope.initSelf = function() {
    $scope.activeView = "views/basicdata/teacher/page.html";
    $scope.selfPagination.iPage = 1;
    $scope.fields = $scope.profileFields.filter(function(field){
      return !field.unlist;
    });
    $scope.refreshSelf();
  };

  $scope.$watch('condition.college', function(){
    $scope.selfPagination.iPage = 1;
    $scope.querySchedule();
  });

  $scope.querySchedule = function(){
    $scope.activeView = "views/basicdata/teacher/page.html";
    console.log('condition:',$scope.condition);
    if(!!$scope.condition.college){
      var params = {page:$scope.selfPagination.iPage, limit:$scope.selfPagination.iLength,collegeID : $scope.condition.college.id};
      console.log('params:',params);
      Teacher.getByCollege(params, function(result){
        console.log('refresh result:', result);
        $scope.entities = result.entities;
        $scope.pagination.paginate(result.total);
      });
    }else{
      $scope.refreshSelf();
    }
  }

  $scope.checkDuplication = function(callback){

//    console.log("$scope.entity.student_id:"+$scope.entity.student_id);
//    $scope.studentIDDuplication = "sssss";

    if(!$scope.entity.emp_id) return;
    Teacher.checkTeacherIDDuplication({ teacherID : $scope.entity.emp_id,sid:$scope.entity.id},function(result){
      if(result.message === 'not exist'){
        $scope.teacherIDDuplication = "";
        console.log("不重复，准备执行回掉函数");
        if(callback){
          callback();
        }
      }else{
        $scope.entity.emp_id = "";
        $scope.teacherIDDuplication = "工号已存在！请重新输入。";
      }
    });
  }

  $scope.setPSNID = function(entity){
    $rootScope.psnID = entity.userid;
    console.log("entity.$rootScope.psnID:",$rootScope.psnID)
  }
}