function DepartmentController($scope, Department, Pagination, $timeout, $injector){
  $injector.invoke(BasicController, this, {$scope: $scope});

  $scope.resource = Department
  $scope.topNaviBar ="views/basicdata/department/naviBar.html"
  $scope.isQuery = false
  $scope.isManage = true
  $scope.itemName = '行政部门'

  // profile
  $scope.profileFields = [
    {name: "name", title: "名称", creatable:true,required:true}
    , {name: "code", title: "代号",required:true}
  ]
}