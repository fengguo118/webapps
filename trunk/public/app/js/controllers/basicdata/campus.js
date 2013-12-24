function CampusController($scope, Campus, Pagination, $timeout, $injector){
  $injector.invoke(BasicController, this, {$scope: $scope});

  $scope.resource = Campus
  $scope.searchOptions.fields = ['name']
  $scope.topNaviBar ="views/basicdata/campus/naviBar.html"
  $scope.isQuery = false
  $scope.isManage = true
  $scope.itemName = '校区'

  // profile
  $scope.profileFields = [
    {name: "name", title: "名称", creatable:true,required:true}
  ]
}