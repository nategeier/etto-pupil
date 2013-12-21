"use strict";

angular.module("ettoPupil")
  .controller("ReportsCtrl", ["$scope", "$http", "$location", "Reports",
    function ($scope, $http, $location, Reports) {

      var link = "/api/v1/" + $location.path();

      Reports.get_reports(link, function (data) {
        $scope.error = data.err;
        $scope.currLevel = data.currLevel;
        $scope.levels = data.levels;
        $scope.user = data.user;
        console.log($scope.levels);
      });

      $scope.update = function (newLevel) {
        newLevel.auth = $scope.currLevel.auth - 1;
        newLevel.aboveID = $scope.currLevel.levelID;

        Reports.create_level(newLevel, function (data) {
          $scope.levels.unshift(data.level);
        });

      };

      $scope.sendInvite = function (newLevel) {
        newLevel.auth = $scope.currLevel.auth - 1;
        newLevel.lowID = $scope.currLevel.levelID;
        newLevel.medID = $scope.currLevel.aboveID;
        newLevel.brandID = $scope.currLevel.brandID;

        Reports.invite_user(newLevel, function (results) {
          if (results.err) {
            $scope.err = results.err;
          } else {
            $scope.levels.unshift(results.user);
            $scope.err = "Invite has been sent to " + newLevel.levelTitle;
          }

        });

      };
      /*
  var createLevel = function(levelTitle, auth, aboveID){
    var newLevel = {
      levelTitle: levelTitle,
      levelID:
    }


  }

  */

    }
  ]);
