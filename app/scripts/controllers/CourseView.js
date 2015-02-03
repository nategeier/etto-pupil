"use strict";

angular.module("ettoPupil")
  .controller("CourseViewCtrl", ["Session", "$scope", "$compile", "course", "Record", "Tier", "CoursePlayer",
    function (Session, $scope, $compile, course, Record, Tier, CoursePlayer) {
      $scope.course = course;

      $scope.checkIfAuthorized = function () {
        if ($scope.course.price === 0 && $scope.course.status === "live") {
          return true;
        } else if ($scope.user && $scope.user._tier._company === $scope.course._creator) {
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
          createRecord($scope.user._id);
        } else {
          createRecord(null);
        }
      });

      var createRecord = function (userId) {

        var totalBlocks = course.blocks.length;

        Record.create(course._id, userId, totalBlocks, function (record) {
          if (record.err) {
            $scope.err = record.err;
          }
          $scope.record = record;
        });
      };

    }
  ]);
