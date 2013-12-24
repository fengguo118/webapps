var StudentCorrespondCtrl = [ '$scope', '$http', 'StudentCourse', function ($scope, $http, StudentCourse) {
  $scope.onFileSelect = function ($files) {
    for (var i = 0; i < $files.length; i++) {
      var $file = $files[i];
      $http.uploadFile({
        url: "http://" + window.location.hostname + ":8888" + '/server/upload', //upload.php script, node.js route, or servlet upload url
        // headers: {'optional', 'value'}
        data: {courseID: $scope.entity.id},
        file: $file
      }).progress(function (evt) {
            console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
          }).then(function (data, status, headers, config) {
            // file is uploaded successfully
            if (data.message == 'upload success!') {
              alert("上传成功！");
              $scope.showList();
            } else {
              alert("上传失败！");
              $scope.showList();
            }
          });
    }
  }
}];