"use strict";

angular.module("ettoPupil")
  .controller("HomeCtrl", ["$scope", "$compile", "Session", "CourseList", "CourseMetaChange", "$rootScope",
    function ($scope, $compile, Session, CourseList, CourseMetaChange, $rootScope) {

      $scope.$watch('user', function() {
        $scope.listUsersCreatedCourses()
      })


      $scope.listUsersCreatedCourses = function(){

        var obj = {
          userID: $scope.user._id
        }

        CourseList.list_users_created_courses(obj, function (data) {
          $scope.courses = data.results;
        });
      }


      $scope.removeCourse = function(id){

        var course = {
          courseID: id
        }

        CourseMetaChange.remove_course(course, function (data) {
          $scope.listUsersCreatedCourses();
        });
      }
    }
  ]);
