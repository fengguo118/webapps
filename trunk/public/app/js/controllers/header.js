function HeaderController($scope, $location, Users) {
    $scope.showSettingPassword = function () {
        $scope.showSettingPasswordModal = true;
    }

    $scope.hideSettingPassword = function () {
        $scope.showSettingPasswordModal = false;
    }

    $scope.signout = function () {
        $location.path('/signout');
        Users.signout($scope.uuser);
    };

    $scope.init = function () {
        $scope.showSettingPasswordModal = false;
    };
}