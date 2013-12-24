function UsersController($scope, Users, Pagination, $timeout, $injector){
	$injector.invoke(BasicController, this, {$scope: $scope});
	$scope.resource = Users
	$scope.searchOptions.fields = ['username']
	$scope.editView = "views/user/edit.html"

	// profile 
	$scope.profileShortcuts = $scope.profileShortcuts.concat([
			{styleclass: "span9"},	{styleclass: "box quick-button-small span1", icon: "icon-certificate", text: "重置密码", op:"resetPassword(entity)"}
	])
//	$scope.profileAvatar = "img/avatar.jpg"
//	$scope.profileFields = [
//			{name: "username", title: "用户名", readonly:true, creatable:true}
//		, {name: "name", title: "姓名"}
//		, {name: "idcard", title: "身份证"}
//		, {name: "phone", title: "电话"}
//		,	{name: "email", title: "电子邮箱"}
//		,	{name: "createdAt", title: "注册日期", readonly:true}
//		,	{name: "male", title: "性别", value:function(entity){
//				if(entity.male) {
//					return "男"
//				} else if(entity.male == false) {
//					return "女"
//				} else {
//					return "保密"
//				}
//		}, hide:true}
//	]
	
//	// route
//	$scope.showCreate = function() {
//		$scope.showEdit({password: '123456'})
//	}
	
	// bussiness
//	$scope.resetPassword = function(entity) {
//		entity.password = "654321"
//		$scope.update(entity)
//	}
	
}