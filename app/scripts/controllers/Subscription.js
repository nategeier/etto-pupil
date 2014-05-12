"use strict";

angular.module("ettoPupil")
  .controller("SubscriptionCtrl", ["$scope", "$routeParams", "Users", "$resource", "Payment", "Tier",
    function ($scope, $routeParams, Users, $resource, Payment, Tier) {

      $scope.currentSubscription = 0;

      $scope.show = function (id) {
        $scope.onSubscription = id;
      };

      $scope.cancelSubscription = function () {
        Payment.cancelSubscription($scope.user._tier._company, function (results) {
          $scope.currentSubscription = null;
          $scope.resetSubscription();
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
              Users.fullDetails($routeParams.userID, function (user) {
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
              async.map(subscriptionType.subscriptions, function (subscription) {
                if ($scope.currentSubscription === subscription._id) {
                  $scope.onSubscription = subscriptionType._id;
                }
              });
            });

          });

      };

      $scope.resetSubscription();

    }
  ]);
