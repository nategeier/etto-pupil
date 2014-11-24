"use strict";

angular.module("ettoPupil")
  .directive("ettoSyncBamboo", [

    function () {
      return {
        restrict: "AE",
        controller: function ($scope, $modal, Tier, Tiers, Key) {

          $scope.keys = {};

          var companyId;

          var user;

          $scope.$watch("user", function () {
            if ($scope.user) {
              user = $scope.user;
            }
          });

          $scope.syncBambooHR = function (editKeys) {

            async.waterfall([

              function (done) {
                Tier.getCompany($scope.parentID, function (results) {
                  done(null, results);
                });
              }
            ], function (err, company) {
              companyId = company._id;

              Key.findBambooKey(company._id, function (err, results) {

                //---- No keys found, go to edit
                if (err) {
                  $scope.editBambooKeys(null, $scope.keys);
                } else {
                  if (results[0] || editKeys === true) {
                    $scope.keys = results[0];
                  }
                  //==== editKeys, mean they pressed to edit the keys, no results just go to the edit keys interface
                  if (!results[0] || editKeys === true) {
                    $scope.editBambooKeys(null, $scope.keys);
                  } else {
                    $scope.refreshBamboo(results[0]);
                  }
                }

              });
            });
          };

          $scope.refreshBamboo = function (keys) {
            Tiers.syncBambooHR(keys, function (err, results) {

              if (err) {
                $scope.editBambooKeys(err, keys);
              } else if (results.rejected) {

                $scope.rejectedUsers = results.rejected;
                $scope.reset();
                $scope.listUsers();
              } else {
                $scope.reset();
                $scope.listUsers();
              }
            });
          };

          $scope.editBambooKeys = function (err, keys) {

            var modal = $modal.open({
              templateUrl: "/views/directives/ettoEditBambooKeys.html",
              controller: function ($scope, $modalInstance) {

                $scope.keys = keys;
                $scope.err = err;
                $scope.user = user;

                $scope.keys.auth = {
                  canEditCompany: false,
                  canPurchase: false,
                  canGetCourses: false,
                  canCreateCourses: false,
                  canInvite: false
                };

                $scope.saveBambooKey = function (keys) {

                  if (keys.bamboo && keys.bamboo.apikey && keys.bamboo.subdomain) {
                    keys._company = companyId;
                    Key.saveBambooKey(keys, function (results) {
                      $modalInstance.close(keys);
                    });
                  } else {
                    $scope.err = "Please enter all information";
                  }
                };
              }
            });
            modal.result.then(function (keys) {
              $scope.refreshBamboo(keys);
            });

          };

        },
        link: function postLink(scope, element, attrs) {
          scope.redirectTo = attrs.redirectTo;
        }
      };
    }
  ]);
