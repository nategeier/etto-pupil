'use strict';


angular.module("engoPupil")
.controller("ReportsCtrl", [ "$scope", "$http", "$location", 'Reports', function ( $scope, $http, $location, Reports ) {

  var link = '/api/v1/' + $location.path();

  
  Reports.get_reports(link, function(data){
    $scope.error = data.err;
    $scope.currLevel = data.currLevel;
    $scope.levels = data.levels;
    $scope.user = data.user;
    console.log($scope.levels);
  });

  $scope.update = function(newLevel) {
    newLevel.auth =  $scope.currLevel.auth - 1;
    newLevel.aboveID =  $scope.currLevel.levelID;

    $http.post('/api/v1/reports/createLevel', newLevel).success(function(data){
      console.log(data)
      $scope.levels.unshift(data.level);
    });
  };


  $scope.sendInvite = function(newLevel) {
    newLevel.auth =  $scope.currLevel.auth - 1;
    newLevel.lowID = $scope.currLevel.levelID;
    newLevel.medID = $scope.currLevel.aboveID;
    newLevel.brandID = $scope.currLevel.brandID;
    $http.post('/api/v1/invite_user', newLevel).success(function(err, created){
      $scope.users.err = err.message;
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


}]);
