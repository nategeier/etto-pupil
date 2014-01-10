
"use strict";

angular.module("ettoPupil")
  .controller("StoreCtrl", ["$scope", "$http", "Session", "Store", "CourseList", "Tiers", "$timeout",
    function ($scope, $http, Session, Store, CourseList, Tiers, $timeout) {


      var totUsers = 0;


      $scope.listCourses = function(){
        CourseList.listAll(function (data) {
          $scope.courses = data;
        });
      };


      $scope.listCourses();


      $scope.$watch('user', function() {
        if($scope.user){

         var obj = {
            _id: $scope.user._tier._id
          };

          Tiers.listChildrenAndCountUsers(obj, function(tiers){

            $scope.data = {
              children: tiers
            };
            //---- Count initial total users
            for(var i = 0; i < tiers.length; i++){
              totUsers += tiers[i].totUsers;
            }
            $scope.totUsers = totUsers;
            //----- Set price for each course.
            setPrice();
          });
        }
      })
        

      $scope.toggleMinimized = function (child) {
        
        if(child.minimized === undefined){
          var obj = {
            _id: child._id
          }
          Tiers.listChildrenAndCountUsers(obj, function(tiers){
            child.children = tiers;

            for(var i = 0; i < tiers.length; i++){
              tiers[i].isoff = child.isoff;
            }
            child.minimized = false;
          });
        }else{
          child.minimized = !child.minimized;
        }
      };


      $scope.toggleIsOn = function (child) {
        if(child.isoff === undefined){
          child.isoff = true;
        }else{
          child.isoff = !child.isoff;
        }

        $scope.countUsers(child, function(totUsersInChildren){
          if(child.isoff){
            $scope.totUsers -= child.totUsers - totUsersInChildren;
          }else{
            $scope.totUsers += child.totUsers - totUsersInChildren;
          }
          setPrice();
        });
      };


      $scope.countUsers = function(tier, callback){

        var totUsersInChildren = 0;

        function recursive(tier){
          if(tier.children[0]){
            for(var j = 0; j < tier.children.length; j++){
              if(tier.children[j].isoff === tier.isoff){
                totUsersInChildren += tier.children[j].totUsers;
              }

              tier.children[j].isoff = tier.isoff;
              recursive(tier.children[j]);
            }
            callback(totUsersInChildren);
          }else{
            callback(0);
          }

        }

        recursive(tier);
      };


      var setPrice = function () {
        _.map($scope.courses, function (course) {
          course.priceWithEmps = (course.price * $scope.totUsers).toFixed(2);
        });
      };
    }
  ]);
