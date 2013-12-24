function CounsellorController($scope, Counsellor,College, Pagination, $timeout,$rootScope, $injector){
  $injector.invoke(BasicController, this, {$scope: $scope});

  $scope.resource = Counsellor;
  $scope.editView ="views/basicdata/counsellor/edit.html";
  $scope.topEditView ="views/basicdata/topEditView.html";
  $scope.topNaviBar ="views/basicdata/counsellor/naviBar.html";
  $scope.isQuery = false;
  $scope.isManage = true;
  $scope.itemName = '辅导员';
  $scope.entity = {};
  $scope.selfPagination = Pagination;
  $scope.colleges = {};
  $scope.condition = {college : ''};

  College.getAll(function(result){
    console.log('CounsellorController departments result:', result)
    $scope.colleges = result.entities;
    $scope.options = {
      departments : result.entities
    }
  })

  $scope.$watch('selfPagination.iLength', function(){
    $scope.querySchedule();
  });
  $scope.$watch('selfPagination.iPage', function() {
    $scope.querySchedule();
  });

  $scope.refreshSelf = function(){
    var params = {page:$scope.selfPagination.iPage, limit:$scope.selfPagination.iLength};
    Counsellor.get(params, function(result){
      console.log('refresh result:', result);
      $scope.entities = result.entities;
      $scope.pagination.paginate(result.total);
    });
  }

  $scope.initSelf = function() {
    $scope.activeView = "views/basicdata/counsellor/page.html";
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
    $scope.activeView = "views/basicdata/counsellor/page.html";
    console.log('condition:',$scope.condition);
    if(!!$scope.condition.college){
      var params = {page:$scope.selfPagination.iPage, limit:$scope.selfPagination.iLength,collegeID : $scope.condition.college.id};
      console.log('params:',params);
      Counsellor.getByCollege(params, function(result){
        console.log('refresh result:', result);
        $scope.entities = result.entities;
        $scope.pagination.paginate(result.total);
      });
    }else{
      $scope.refreshSelf();
    }
  }

  // profile
  $scope.profileFields = [
    {name: "username", title: "用户名", readonly:true},
    {name: "emp_id", title: "工号", readonly:true}
    , {name: "name", title: "姓名",creatable:true,required:true}
    , {name: "collegeName", title: "学院",readonly:true}
    , {name: "phone", title: "手机号",creatable:true,required:true}
  ]

  $scope.checkDuplication = function(callback){

    if(!$scope.entity.emp_id) return;
    Counsellor.checkDuplication({ id : $scope.entity.emp_id,sid:$scope.entity.id},function(result){
      if(result.message === 'not exist'){
        $scope.Duplication = "";
        if(callback){
          callback();
        }
      }else{
        $scope.entity.emp_id = "";
        $scope.Duplication = "工号已存在！请重新输入。";
      }
    });
  }

  $scope.setPSNID = function(entity){
    $rootScope.psnID = entity.userid;
    console.log("entity.$rootScope.psnID:",$rootScope.psnID)
  }

}