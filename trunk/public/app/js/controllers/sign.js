function SigninController($scope, Users, $location) {
    $scope.errorLoginDetail = "用户名或密码不正确";
    $scope.loginUser = {
        username: "", password: ""
    }
    $scope.Login = function () {
        var user = $scope.loginUser;
//        alert("user的信息:" + JSON.stringify(user));
        if (user.username.length === 0 || user.password.length === 0) return;
        Users.signin(user, function (data) {
            // $scope.setUserStatus(data.name, true, data, user.username)

            $scope.setUserStatus(data.name, true, data, user.username)
            user = {username: "", password: ""};
            $location.path('/crm');
        }, function () {
            $('.alert').show();
        });
    };
}

function SettingPasswordController($scope, Users, $rootScope, $location) {
    $scope.prePassword = "";
    $scope.newPassword = "";
    $scope.passwordConfirmation = "";
    $scope.errorDetail = "更新失败请重试！";
    $scope.prePasswordTag = false;
    $scope.prePassword = '';

    $scope.checkPassword = function () {
//        alert($rootScope.uuser.id);
        if (!$scope.prePassword) return;
        var param = {
            password: $scope.prePassword,
            id: $rootScope.uuser.id
        };
        Users.checkPassword(param, function (result) {
            $scope.prePasswordTag = result.tag;
            if (!$scope.prePasswordTag) {
                $scope.errorDetail = "原密码不正确！";
                $('.alert').show();
            } else {
                $('.alert').hide();
            }
        });
    }

    $scope.setPassword = function () {

        if ($scope.newPassword === "" || $scope.passwordConfirmation === "") {
            $scope.errorDetail = "密码不能为空！";
            $('.alert').show();
        } else if (!$scope.prePasswordTag) {
            $scope.errorDetail = "原密码不正确！";
            $('.alert').show();
        } else if ($scope.newPassword !== $scope.passwordConfirmation) {
            $scope.errorDetail = "两次输入密码不一致！";
            $('.alert').show();
        } else {

            Users.save({userID: $scope.uuser.id}, {password: $scope.newPassword}, function () {
                $location.path('/signout');
                console.log('$scope.uuser:', $scope.uuser)
                Users.signout($scope.uuser);
            }, function () {
                $scope.errorDetail = "更新失败请重试！";
                $('.alert').show();
            })
        }
    }

    $scope.backToMain = function () {
        $location.path('/crm')
    }

}


function ReSetPasswordController($scope, Users, $rootScope, $location) {
    $scope.prePassword = "";
    $scope.newPassword = "";
    $scope.passwordConfirmation = "";
    $scope.errorDetail = "更新失败请重试！";
    $scope.prePasswordTag = false;
    $scope.prePassword = '';

//  console.log("^&&&&&&$rootScope.psnID:",$rootScope.psnID);

//  $scope.checkPassword = function(){
//
////    if(!$scope.prePassword) return;
//    var param = {
//      password : $scope.prePassword ,
//      id : $rootScope.uuser.id
//    };
//    Users.checkPassword(param,function(result){
//      $scope.prePasswordTag = result.tag;
//      if(!$scope.prePasswordTag){
//        $scope.errorDetail = "原密码不正确！";
//        $('.alert').show();
//      }else{
//        $('.alert').hide();
//      }
//    });
//  }

    $scope.setPassword = function () {
        if ($scope.newPassword === "" || $scope.passwordConfirmation === "") {
            $scope.errorDetail = "密码不能为空！";
            $('.alert').show();
        } else if ($scope.newPassword !== $scope.passwordConfirmation) {
            $scope.errorDetail = "两次输入密码不一致！";
            $('.alert').show();
        } else {
            console.log($scope.uuser) // $rootScope.psnID是在跳转到这个页面前存放在$rootScope中的。
            Users.save({userID: $rootScope.psnID}, {password: $scope.newPassword}, function () {
                alert("更新成功！");
                $scope.dismiss();
            }, function () {
                $scope.errorDetail = "更新失败请重试！";
                $('.alert').show();
            })
        }
    }

    $scope.backToMain = function () {
        $location.path('/crm')
    }

    $scope.test = function () {
        console.log("^&&&&&&$rootScope.psnID:", $rootScope.psnID);
    }

    $scope.init = function () {
        $scope.prePassword = "";
        $scope.newPassword = "";
        $scope.passwordConfirmation = "";
        $scope.errorDetail = "更新失败请重试！";
        $scope.prePasswordTag = false;
        $scope.prePassword = '';
        console.log('init!!!!')
    }
}