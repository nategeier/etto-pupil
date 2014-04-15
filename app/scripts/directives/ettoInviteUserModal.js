"use strict";

angular.module("ettoPupil")
  .directive("ettoInviteUserModal", ["Users",

    function () {
      return {
        restrict: "AE",
        controller: function ($scope, $modal, Users) {

          var _tier = $scope.parentID;

          $scope.inviteUser = function () {
            var modal = $modal.open({
              templateUrl: "/views/directives/ettoInviteUserModal.html",
              controller: function ($scope, $modalInstance, Invite) {

                $scope.newUser = Invite.defaultUser;
                $scope.newUser.emails = [""];

                $scope.addEmail = function () {
                  $scope.newUser.emails.unshift("");
                };

                $scope.cancel = function (newUser) {
                  $modalInstance.close();
                };

                $scope.inviteUser = function (newUser) {

                  newUser._tier = _tier;

                  Users.inviteUser(newUser, function (data) {
                    if (data.rejected && data.rejected[0]) {
                      $scope.err = "The following emails were rejected: " + data.rejected;
                    } else {
                      $modalInstance.close();
                    }
                  });

                };
              }
            });
            modal.result.then(function () {
              $scope.listUsers();
            });

          };
        },
        link: function postLink(scope, element, attrs) {
          scope.redirectTo = attrs.redirectTo;
        }
      };
    }
  ]);
