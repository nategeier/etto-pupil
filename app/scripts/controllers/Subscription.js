"use strict";

angular.module("ettoPupil")
  .controller("SubscriptionCtrl", ["$rootScope", "$scope", "Session", "Users", "$resource", "Payment", "Tier",
    function ($rootScope, $scope, Session, Users, $resource, Payment, Tier) {

      $scope.currentSubscription = 0;

      $scope.show = function (id) {
        $scope.onSubscription = id;
      };

      $scope.cancelSubscription = function () {
        Payment.cancelSubscription($scope.user._tier._company, function (results) {
          $scope.currentSubscription = null;
          //$scope.resetSubscription();

          Tier.getCompany($scope.company._id, function (data) {
            $rootScope.company = data;
            $scope.resetSubscription();
          });

        });
      };

      $scope.resetSubscription = function () {

        async.parallel([

            function (callback) {
              Payment.subscriptions(function (results) {
                $scope.subscriptionTypes = results;
                $scope.onSubscription = $scope.subscriptionTypes[0]._id;
                callback(null, results);
              });
            },
            function (callback) {

              Users.fullDetails(Session.currentUser()._id, function (user) {
                Tier.findTier(user._tier._company, function (results) {
                  $scope.currentSubscription = results._subscription;
                  callback(null);
                });
              });
            }
          ],
          function (err, results) {
            //--- Set default opened tab

            async.map(results[0], function (subscriptionType) {
              if ($scope.currentSubscription === subscriptionType._id) {
                $scope.onSubscription = subscriptionType._id;
              }
            });

          });

      };

      $scope.resetSubscription();

    }
  ]);
