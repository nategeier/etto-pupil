"use strict";

angular.module("ettoPupil")
  .directive("ettoSession", ["Store", "$location",

    function (Store, $location) {
      return {
        restrict: "EA",

        controller: function ($scope, Session, Tier, Tiers, WhiteLabel, $location) {

          $scope.$on("401", function () {
            $scope.login();
          });

          $scope.destroySession = function (redir) {
            Session.destroySession(function () {
              $location.path(redir);
            });
          };

          $scope.checkTrial = function () {
            var trialEnds = new Date($scope.company.trialEnds);
            var trailEnded = trialEnds < Date.now();
            var basePath = $location.path().split("/")[1];

            //-- Check if user is not already on the subscrption page
            if (basePath !== "subscription") {
              //----- Compnay tral period is over
              if (trailEnded === true) {
                //--- Company does not have a subscription
                if (!$scope.company._subscription) {
                  redirSubscriptions();
                } else if ($scope.company._subscription.empRange.high < $scope.company.totUsers) {
                  redirSubscriptions();
                }
              }
            } else {

              //----- user is on the subscription page, give the proper error info
              if (trailEnded === true) {
                //--- Company does not have a subscription
                if (!$scope.company._subscription) {
                  $scope.err = "Looks like your trial expired, your company needs a subscription to continue.";
                } else if ($scope.company._subscription.empRange.high < $scope.company.totUsers) {
                  $scope.err = "Looks you need a larger subscription. You currently have " + $scope.company.totUsers + " total employees.";
                }
              }
            }
          };

          var redirSubscriptions = function () {
            $location.path("/subscription/" + $scope.user._id);
          };

          $scope.updateSession = function () {

            Session.getSession(function (data) {
              $scope.user = data;

              if ($scope.user) {
                Store.findCredit($scope.user._tier._company, function (results) {
                  $scope.credits = results.credits;
                });

                Tier.getCompany($scope.user._tier._id, function (company) {

                  $scope.company = company;

                  if (company.colors) {
                    WhiteLabel.setColors(company.colors);
                    WhiteLabel.setFonts(company.font);
                  }

                  //----Grandfathered users will always have a feww account with < 5 users
                  if (company.trialEnds) {
                    $scope.checkTrial();
                  }
                });
              }
            });
          };

          $scope.updateSession();

        },
        link: function (scope, element, attrs) {

        }
      };
    }
  ]);
