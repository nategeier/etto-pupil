"use strict";

angular.module("ettoPupil")
  .controller("HomeCtrl", ["$scope", "$compile", "Session", "CourseList", "CourseMetaChange",
    function ($scope, $compile, Session, CourseList, CourseMetaChange) {


      Session.get_session(function (data) {
        Session.treat_session(data);
        $scope.user = data;
        $scope.listUsersCreatedCourses();
      });

       $scope.listUsersCreatedCourses = function(){
        var obj = {
          userID:$scope.user._id
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
