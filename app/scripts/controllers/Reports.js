'use strict';


angular.module("engoPupil")
.controller("ReportsCtrl", [ "$scope", "$http", "$location", function ( $scope, $http, $location ) {

  console.log($location.path())


  var link = '/api/v1/' + $location.path();

  $http({method: 'GET', url: link})
    .success(function(data, status, headers, config){
      $scope.error = data.err;
      $scope.currLevel = data.currLevel;
      $scope.levels = data.levels;
      $scope.user = data.user;

  }).
    error(function(data, status, headers, config) {
      console.log(data, 'err');
  });


  $scope.update = function(newLevel) {
    $scope.master = angular.copy(newLevel);
    newLevel.auth =  $scope.currLevel.auth - 1;
    newLevel.aboveID =  $scope.currLevel.levelID;
    //newLevel.courses = $scope.levels[0].courses;
    $http.post('/api/v1/reports/createLevel', newLevel).success(function(created){
      $scope.levels.unshift(newLevel);
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


}]);
