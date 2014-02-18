"use strict";

angular.module("ettoPupil")
  .directive("ettoInviteUserModal", ["Users",

    function () {
      return {
        template: "<a class='btn btn-primary btn-xs' href='#' ng-click='inviteUser()'><i class='fa fa-envelope-o'></i>Invite</a>",
        restrict: "AE",
        controller: function ($scope, $modal, Users) {

          var _tier = $scope.parentID;

          $scope.inviteUser = function () {
            var modal = $modal.open({
              templateUrl: "/views/directives/ettoInviteUserModal.html",
              controller: function ($scope, $modalInstance) {
                $scope.newUser = {
                  auth: {
                    canPurchase: false,
                    canGetCourses: true,
                    canCreateCourses: true,
                    canInvite: true
                  }
                };

                $scope.inviteUser = function (newUser) {

                  newUser._tier = _tier;

                  Users.inviteUser(newUser, function (data) {
                    if (data.err) {
                      $scope.err = data.err;
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
