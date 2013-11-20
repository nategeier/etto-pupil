'use strict';

angular.module("engoPupil")
.controller("StoreCtrl", [ "$scope", "$http", "$location", 'Store', 'Reports', function ( $scope, $http, $location, Store, Reports) {


  Store.course_store(function(data){
    $scope.error = data.err;
    $scope.courses = data.courses;
    $scope.user = data.user;

    $scope.delegatedTo = [{brandID:data.user.brandID, medID:null, lowID:null}];
  });


  

  Reports.brand_tree(function(data){
    $scope.medLevels = data.medLevels;
  });

  $scope.updateSelected = function(delegated, index, brandID, medID, lowID){
    console.log(delegated['medID_' + index]);
    //$scope.delegated = delegation;


    $scope.delegatedTo.push({brandID:brandID, medID:medID, lowID:lowID});
  }


  $scope.countEmps = function(){
    console.log('we')
  }


  var createNewDeligation = function(){

  }

}]);
