"use strict";

angular.module("ettoPupil")
  .directive("ettoInviteUserModal", ["Users",

    function (Users) {
      return {
        template: "<a class='btn btn-primary btn-sm top-logout-btn' href='#' ng-click='inviteUser()'>Invite User to {{currentTier.title}}</a>",
        restrict: "AE",
        controller: function ($scope, $modal, CourseMetaChange, $location) {
          $scope.inviteUser = function () {
            var modal = $modal.open({
              templateUrl: "/views/directives/ettoInviteUserModal.html",
              controller: function ($scope, $modalInstance) {
                $scope.course = {};
                $scope.inviteUser = function () {
                  $modalInstance.close($scope.course);
                };
              }
            });
            modal.result.then(function (user) {

              //console.log($scope.user._id);
              //course._creators = [$scope.user._id];

              Users.invite_user(user, function (data) {

                if (data) {
                  //$scope.listUsersCreatedCourses();
                  //$location.path($scope.redirectTo);
                }
              });
            });
          };
        },
        link: function postLink(scope, element, attrs) {
          scope.redirectTo = attrs.redirectTo;
        }
      };
    }
  ]);
