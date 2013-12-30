"use strict";

angular.module("ettoPupil")
  .controller("ReportsCtrl", ["$scope", "Reports", "$routeParams",
    function ($scope, Reports, $routeParams) {

     var link = "/api/v1/tier/list_children";
      var parentID = $routeParams.parentID;

      if(parentID == '0'){
        parentID = null;
      }

      $scope.reset = function () {
        Reports.get_reports(link, parentID, function (err, results) {
          $scope.error = err;
          $scope.tiers = results;
        });

        var currentTier = {
          tierID : parentID
        }

        Reports.find_tier(currentTier, function (err, results) {
          $scope.error = err;
          console.log(results);
          $scope.currentTier = results;
        });

      }

      $scope.add = function (newTier) {
        var newTier = {
          title : newTier.title,
          parentID : parentID
        }
        Reports.add_tier(newTier, function (err, results) {
          $scope.reset();
        });
      };

       $scope.delete = function (tierID) {
        var tier = {
          tierID : tierID
        }
        Reports.delete_tier(tier, function (err, results) {
          $scope.reset();
        });
      };

      $scope.reset();
    }
  ]);
