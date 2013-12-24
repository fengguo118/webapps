function ManageController($scope, $http, $timeout, $injector){
//  $injector.invoke(BasicController, this, {$scope: $scope});

  $scope.entity = {
    'takeAttendType': '' ,
    'intervalAttendType' : '',
    'dismissAttendType' : '',
    'evenUsed' : '',
    'attendStartTime' : '',
    'attendEndTime' : '',
    'intervalEndTime' : '',
    'termStart' : '',
    'termEnd' : '',
//    'summaryStart' : '',
//    'summaryEnd' : '',
//    'winterStart' : '',
//    'winterEnd' : '',
    'studentLeaveDay' : '',
    'teacherChangeCourseDay' : '',
    'dismissEndTime' : ''
  };

  $scope.init = function() {
    $scope.activeView = "views/manage/systemManage/settingPage.html"
    $http.get('/admin/info').success(function (options) {
      if (!options || (options.length === 0)) {
        return;
      } else {
        options.forEach(function (option) {
          $scope.entity[option['skey']] = option['value'];
        })

        $scope.entity['studentLeaveDay'] = Number($scope.entity['studentLeaveDay'])
        $scope.entity['teacherChangeCourseDay'] = Number($scope.entity['teacherChangeCourseDay'])
        $scope.entity['attendStartTime'] = Number($scope.entity['attendStartTime'])
        $scope.entity['attendEndTime'] = Number($scope.entity['attendEndTime'])
        $scope.entity['intervalEndTime'] = Number($scope.entity['intervalEndTime'])
        $scope.entity['dismissEndTime'] = Number($scope.entity['dismissEndTime'])

      }
    }).error(function (error) {
          console.log(error);
    })
  }
  $scope.updateWebsiteSetting = function(entity){

    console.log("updateWebsiteSetting:",entity)

    $http.post('/admin/info', {options: entity}).success(function (data) {
      console.log(data);
      alert("保存成功！");
    }).error(function (error) {
          console.log(error);
          alert("保存失败！");
    })
  }

  $scope.$watch('entity.termStartBing', function () {
    console.log("dateBing:",$scope.entity.termStartBing)
    console.log("%%%%%%%%%%%%%%%%%%%:")
    if(!$scope.entity.termStartBing) return;
    $scope.entity.termStart = getDateYMDFromSecond($scope.entity.termStartBing.getTime());
  });

  $scope.$watch('entity.termEndBing', function () {
    console.log("dateBing:",$scope.entity.termEndBing)
    console.log("%%%%%%%%%%%%%%%%%%%:")
    if(!$scope.entity.termEndBing) return;
    $scope.entity.termEnd = getDateYMDFromSecond($scope.entity.termEndBing.getTime());
  });

  $scope.$watch('entity.summaryStartBing', function () {
    console.log("entity.summaryStartBing:",$scope.entity.summaryStartBing)
//    console.log("%%%%%%%%%%%%%%%%%%%:")
    if(!$scope.entity.summaryStartBing) return;
    $scope.entity.summaryStart = getDateYMDFromSecond($scope.entity.summaryStartBing.getTime());
  });

  $scope.$watch('entity.summaryEndBing', function () {
    console.log("entity.summaryEndBing:",$scope.entity.summaryEndBing)
//    console.log("%%%%%%%%%%%%%%%%%%%:")
    if(!$scope.entity.summaryEndBing) return;
    $scope.entity.summaryEnd = getDateYMDFromSecond($scope.entity.summaryEndBing.getTime());
  });

  $scope.$watch('entity.winterStartBing', function () {
    console.log("entity.winterStartBing:",$scope.entity.winterStartBing)
//    console.log("%%%%%%%%%%%%%%%%%%%:")
    if(!$scope.entity.winterStartBing) return;
    $scope.entity.winterStart = getDateYMDFromSecond($scope.entity.winterStartBing.getTime());
  });

  $scope.$watch('entity.winterEndBing', function () {
    console.log("entity.winterEndBing:",$scope.entity.winterEndBing)
//    console.log("%%%%%%%%%%%%%%%%%%%:")
    if(!$scope.entity.winterEndBing) return;
    $scope.entity.winterEnd = getDateYMDFromSecond($scope.entity.winterEndBing.getTime());
  });

}