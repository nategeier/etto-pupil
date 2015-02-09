"use strict";

angular.module("ettoPupil")
  .directive("ettoVerifyModal", ["Tiers", "Users", "Session",

    function () {

      return {

        restrict: "AE",
        controller: function (Store, WhiteLabel, Tier, $rootScope, $scope, $modal, Tiers, $location, Users, Session) {
          var user = null;
          $scope.opened = false;

          $scope.$watch("user", function () {
            if ($scope.user && $scope.user.isBeta && !$scope.user._tier) {
              user = $scope.user;

              $scope.register();
            }
          });

          $scope.register = function () {
            if ($scope.opened === false) {
              $scope.opened = true;
              var modal = $modal.open({
                templateUrl: "/views/directives/ettoVerifyModal.html",
                controller: function ($scope, $modalInstance) {
                  $scope.user = user;
                  $scope.handleLogin = function (user) {

                    var newTier = {
                      title: user.tier.title
                    };

                    Tiers.createCompany(newTier, function (tier) {

                      user._tier = tier._id;

                      Users.updateUsersTier(user, function (data) {

                        if (data.err) {
                          $scope.err = data.err;
                        } else {
                          $modalInstance.close(data);
                        }

                      });
                    });

                  };
                }
              });

              modal.result.then(function (user) {

                Tier.getCompany(user._tier._id, function (company) {

                  $rootScope.company = company;

                  Store.findCredit($rootScope.user._tier._company, function (results) {
                    $rootScope.credits = results.credits;
                  });

                  if (company.colors) {
                    WhiteLabel.setColors(company.colors);
                    WhiteLabel.setFonts(company.font);
                  }
                });

                Session.updateSession($scope.user, function (data) {
                  $rootScope.user = data;
                });
              });
            }
          };
        },
        link: function postLink(scope, element, attrs) {
          scope.redirectTo = attrs.redirectTo;
        }
      };
    }
  ]);
