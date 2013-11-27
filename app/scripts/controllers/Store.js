'use strict';

angular.module("engoPupil")
.controller("StoreCtrl", [ "$scope", "$http", "$location", 'Store', 'Reports', function ( $scope, $http, $location, Store, Reports) {

  var totOverallUsers = 0;

  async.parallel([
    function(callback){
      Store.course_store(function(data){
        $scope.error = data.err;
        $scope.courses = data.courses;
        $scope.user = data.user;
        callback(null);
      });
    },
    function(callback){
      Reports.brand_tree(function(data){
        $scope.medLevels = data.medLevels;
        $scope.totUsers = intCountUsers($scope.medLevels);
        totOverallUsers = $scope.totUsers;
        callback(null);
      });

    }
    ],
    function(err, results){
      setPrice();
    }
  );
  //--- Main tree
  $scope.allLevels = {};

  //---- Fired when top all levels is clicked
  $scope.updateAllLevel = function(allLevels){
    allLevels.totEmps = totOverallUsers;
    allLevels.ison = switchCol(allLevels);
    //--- Check what Med levels are on
    _.map($scope.medLevels, function(level){
      level.ison = allLevels.ison;
      _.map(level.lowerLevels, function(level){
        level.ison = allLevels.ison;
      });
    });
    $scope.totUsers = countUsers();
    setPrice();
  }

  //---- Fired when any medium levels are clicked
  $scope.updateMedLevel = function(medLevel){
    medLevel.ison = switchCol(medLevel);
    //--- Check what Lower levels are on
    _.map(medLevel.lowerLevels, function(level){
      level.ison = medLevel.ison;
    });

    $scope.totUsers = countUsers();
    setPrice();
  }

  //---- Fired when any medium levels are clicked
  $scope.updateLowLevel = function(level){
    level.ison = switchCol(level);
    if(level.ison){
      $scope.totUsers = $scope.totUsers - level.totEmps;
    }else{
      $scope.totUsers = $scope.totUsers + level.totEmps;
    }
    setPrice();
  }

  var switchCol = function(level){
    var ison = null;
    if(!level.ison){
      ison = 1;
    }else{
      ison = null;
    }
    return ison;
  }

  var intCountUsers = function (levels){
    var sum = _.reduce(levels, function(memo, num){ 
      if(!num.ison){
        return memo + num.totEmps;
      }else{
        return 0;
      }
    }, 0);
    return sum;
  }
  //---- Count all enabled higher levels, then count still enabled lower levels within
  var countUsers = function (){
    var count = 0;
     _.map($scope.medLevels, function(midLevel){
      count = count + Number(intCountUsers(midLevel.lowerLevels));
    });
    return count;
  }

  //--- Sets binding price to all courses according to how many users will have access to the courses
  var setPrice = function (){
    _.map($scope.courses, function(course){
      course.priceWithEmps = (course.price * $scope.totUsers).toFixed(2);
    });
  }
}]);
