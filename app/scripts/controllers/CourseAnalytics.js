"use strict";

angular.module("ettoPupil")
  .controller("CourseAnalyticsCtrl", ["$scope", "$stateParams", "Record",
    function ($scope, $stateParams, Record) {

      var courseId = $stateParams.courseId;

      Record.findCourseRecords(courseId, function (report) {
        $scope.report = report;
      });

    }
  ]);
