"use strict";

angular.module("ettoPupil")
  .controller("HomeCtrl", ["$scope", "$compile", "Session", "CourseList", "CourseMetaChange", "$rootScope",
    function ($scope, $compile, Session, CourseList, CourseMetaChange, $rootScope) {

      $scope.$watch('user', function() {
        if($scope.user){
          $scope.listUsersCreatedCourses()
        }
       
      })


      $scope.listUsersCreatedCourses = function(){

        CourseList.list_users_created_courses($scope.user, function (data) {

          $scope.courses = data;
        });
      }


      $scope.removeCourse = function(id){

        var course = {
          id: id
        }

        CourseMetaChange.remove_course(course, function (data) {
          $scope.listUsersCreatedCourses();
        });
      }
    }
  ]);
