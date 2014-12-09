"use strict";

angular.module("ettoPupil")
  .directive("ettoCourseStatus", [

    function () {
      return {
        restrict: "AE",
        controller: function ($scope, $modal, CourseMetaChange, $location) {
          $scope.changeStatus = function () {

            var course = $scope.course;
            var user;
            $scope.$watch("user", function () {
              if ($scope.user) {
                user = $scope.user;
              }
            });

            var modal = $modal.open({
              templateUrl: "/views/directives/ettoCourseStatusModal.html",
              controller: function ($scope, $modalInstance, CourseMetaChange, $location) {

                $scope.course = course;
                $scope.saveSettings = function () {

                  var status = {
                    _id: $scope.course._id,
                    status: $scope.course.status
                  };

                  CourseMetaChange.updateStatus(status, function () {
                    $modalInstance.close(true);
                  });

                };

                $scope.cancel = function () {
                  $modalInstance.close(false);
                };
              }
            });
            modal.result.then(function (didRemove) {
              if (didRemove) {
                //$scope.saveCourse();
                if ($scope.course.status === "private") {
                  $location.path("/tier/edit/" + $scope.user._tier._id);
                }
              }
            });
          };
        },
        link: function postLink(scope, element, attrs) {
          scope.redirectTo = attrs.redirectTo;
        }
      };
    }
  ]);
