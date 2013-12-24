function CourseScheduleQueryController($scope, $http, Subject, College, Classes, Student, CourseSchedule, $rootScope, $timeout, $injector) {
    $injector.invoke(BasicController, this, {$scope: $scope});


    if ($rootScope.uuser.role == 0 || $rootScope.uuser.role =='office') {

        $scope.topNaviBar ="views/course/courseScheduleQuery/naviBar.html"
    }
    if ($rootScope.uuser.role == 2) {

        $scope.topNaviBar ="views/course/courseScheduleQuery/naviBarForTeacher.html"
    }
//    $scope.topNaviBar = "views/course/courseScheduleQuery/naviBar.html"

    $scope.colleges = {};
    $scope.subjectes = {};
    $scope.grades = [];
    $scope.classes = {};
    $scope.students = {};
    $scope.schdedule = {};
    $scope.changes = null;
    $scope.evenUsed = 0;

    $scope.condition = {
        college: '',
        subject: '',
        grade: '',
        class_o: '',
        student: ''
    }

    // 若是老师则根据其id获得对应的学院

    getColleageById();
    function getColleageById() {
        var role = $rootScope.uuser.role;
        if (role === 2) {
            var param = {
                id: $rootScope.uuser.id
            };

            CourseSchedule.getColleage(param, function (result) {
//                alert(JSON.stringify(result));
                $scope.colleges = result.colleage;
                $scope.condition.college = $scope.colleges[0];

            });

        } else {

            College.getAll(function (result) {
                $scope.colleges = result.entities;

            });

        }

    }




//    alert(JSON.stringify($scope.colleages));
    $scope.$watch('evenUsed', function () {
        console.log("evenUsed:", $scope.evenUsed)
    })

    $scope.$watch('condition.college', function () {
        try {
            $scope.condition.subject = null;
            $scope.subjectes = null;
            $scope.condition.grade = null;
            $scope.grades = null;
            $scope.condition.class_o = null;
            $scope.classes = null;
            $scope.condition.student = null;
            $scope.studentes = null;
//      alert($scope.condition.college);
            if (!!$scope.condition.college) {
//                alert($scope.condition.college.id);
                var param = { collegeID: $scope.condition.college.id}
                Subject.getAllByCollegeID(param, function (result) {
                    $scope.subjectes = result.entities;
                })
            }
        } catch (e) {
            return;
        }
    });

    $scope.$watch('condition.subject', function () {
        try {
            $scope.condition.grade = null;
            $scope.grades = [];
            $scope.condition.class_o = null;
            $scope.classes = null;
            $scope.condition.student = null;
            $scope.studentes = null;

            if (!!$scope.condition.subject) {
                var num = $scope.condition.subject.years;
                console.log('num:', num)
                for (var i = 0; i < num;) {
                    $scope.grades.push(++i);
                }
            }
        } catch (e) {
            return;
        }
    });

    $scope.$watch('condition.grade', function () {
        try {
            $scope.condition.class_o = null;
            $scope.classes = null;
            $scope.condition.student = null;
            $scope.studentes = null;

            if (!!$scope.condition.grade) {
                var param = {
                    subjectID: $scope.condition.subject.id,
                    grade: $scope.condition.grade
                };
                Classes.getAllBySubjectIDAndGrade(param, function (result) {
                    $scope.classes = result.entities;
                })
            }
        } catch (e) {
            return;
        }
    });

    $scope.$watch('condition.class_o', function () {
        try {
            $scope.condition.student = null;
            $scope.students = null;

            if (!!$scope.condition.class_o) {
                var param = {
                    classID: $scope.condition.class_o.id
                };
                Student.getAllByClassID(param, function (result) {
                    $scope.students = result.entities;
                })
            }
        } catch (e) {
            return;
        }
    });

    $scope.initSelf = function () {
        $scope.activeView = "views/course/courseScheduleQuery/queryPage.html"
        $scope.pagination.iPage = 1
        $scope.fields = $scope.profileFields.filter(function (field) {
            return !field.unlist
        });
    }

    $scope.changTo1 = function () {
        $scope.evenUsed = 1;
    }
    $scope.changTo0 = function () {
        $scope.evenUsed = 0;
    }

    $scope.querySchedule = function (condition) {

        if (!condition.class_o) {
            alert('请选择班级！');
            return;
        }
        if (!condition.student) {
            //学生为空，以班级为单位查询课程表
            var param = {
                classID: condition.class_o.id,
                evenUsed: $scope.evenUsed
            }
            CourseSchedule.queryCourseSchedule(param, function (result) {
                console.log('CourseScheduleQueryController 班级 result:', result);
                if (!result.entities) {
//          alert('结果为空！');
                    $scope.schdedule = {};
                    return;
                }
                $scope.schdedule = result.entities;
                $scope.changes = result.changes;
            });
        } else {
            //学生不为空，一学生为条件查询课程表
            var param = {
                studentID: condition.student.id,
                evenUsed: $scope.evenUsed
            };
            CourseSchedule.queryCourseSchedule(param, function (result) {
                console.log('CourseScheduleQueryController 学生 result:', result);
                if (!result.entities) {
//          alert('结果为空！');
                    $scope.schdedule = {};
                    return;
                }
                $scope.schdedule = result.entities;
                $scope.changes = result.changes;
            });
        }
    }
}