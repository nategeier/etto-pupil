"use strict";

angular.module("ettoPupil")
  .directive("ettoInviteUserModal", ["Users",

    function () {
      return {
        template: "<a class='w100 btn btn-primary btn-sm' href='#' ng-click='inviteUser()'><i class='fa fa-envelope-o'></i>Invite User</a>",
        restrict: "AE",
        controller: function ($scope, $modal, Users) {
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

              newUser._tier = $scope.parentID;

              Users.inviteUser(newUser, function (data) {

                if (data) {
                  $scope.listUsers();
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
