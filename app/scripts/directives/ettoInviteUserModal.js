"use strict";

angular.module("ettoPupil")
  .directive("ettoInviteUserModal", ["Users",

    function () {
      return {
        template: "<a class='btn btn-primary btn-sm top-logout-btn' href='#' ng-click='inviteUser()'>Invite User to {{currentTier.title}}</a>",
        restrict: "AE",
        controller: function ($scope, $modal, Users, $location) {
          $scope.inviteUser = function () {
            var modal = $modal.open({
              templateUrl: "/views/directives/ettoInviteUserModal.html",
              controller: function ($scope, $modalInstance) {
                $scope.newUser = {};
                $scope.inviteUser = function () {
                  $modalInstance.close($scope.newUser);
                };
              }
            });
            modal.result.then(function (newUser) {

              console.log(newUser);

              newUser._tier = $scope.parentID;

              console.log(newUser);

              Users.inviteUser(newUser, function (data) {

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
