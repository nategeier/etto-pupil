"use strict";

angular.module("ettoPupil")
  .controller("HomeCtrl", ["$scope", "$compile", "Session", "CourseList", "CourseMetaChange",
    function ($scope, $compile, Session, CourseList, CourseMetaChange) {


      Session.get_session(function (data) {
        Session.treat_session(data);
        $scope.user = data;
      });

      $scope.listCourses = function(){
        CourseList.list_all(function (data) {
          console.log(data.results)

          $scope.courses = data.results;
        });
      }

      $scope.removeCourse = function(id){
        console.log(id)

        var course = {
          courseID: id
        }
        CourseMetaChange.remove_course(course, function (data) {

          $scope.listCourses();
        });
      }


      $scope.listCourses();

    }
  ]);
