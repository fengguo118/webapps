function CollegeController($scope, College, Pagination, $timeout, $injector){
  $injector.invoke(BasicController, this, {$scope: $scope});

  $scope.resource = College
  $scope.searchOptions.fields = ['name']
  $scope.topNaviBar ="views/basicdata/college/naviBar.html"
  $scope.isQuery = false
  $scope.isManage = true
  $scope.itemName = '学院'

  // profile
  $scope.profileFields = [
    {name: "name", title: "学院", creatable:true,required:true}
    , {name: "code", title: "代号",required:true}
  ]
}