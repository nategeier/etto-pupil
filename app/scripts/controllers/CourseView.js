"use strict";

angular.module("ettoPupil")
  .controller("CourseViewCtrl", ["Session", "$scope", "$compile", "course", "Record", "Tier",
    function (Session, $scope, $compile, course, Record, Tier) {
      $scope.course = course;

      $scope.checkIfFreeCourse = function () {
        if ($scope.course.price === 0 && $scope.course.status === "live") {
          return true;
        }
        return false;
      };

      $scope.lockedBlock = false;

      Tier.getCompany($scope.course._creator, function (company) {
        $scope.company = company;
      });

      Session.getSession(function (user) {

        $scope.user = user;

        if ($scope.user) {

          Record.create(course._id, $scope.user._id, function (record) {
            if (record.err) {
              $scope.err = record.err;
            }
            $scope.record = record;
          });
        }
      });

    }
  ]);
