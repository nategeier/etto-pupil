"use strict";

angular.module("ettoPupil")
  .directive("ettoTierTree", [

    function () {
      return {
        templateUrl: "/views/directives/ettoTierTree.html",
        restrict: "AE",
        terminal: true,
        controller: function ($scope, Tiers, $compile) {

          
          console.log('listChildren', $element)

          $scope.listChildren = function (tierID) {
            

            if(!tierID){
              $scope.$watch('user', function() {
                if($scope.user){
                  $scope.listChildren($scope.user._id);
                }
              })
            }else{
              var obj = {
                parentID: $scope.user._tier
              }

              Tiers.list_children_and_count_users($scope.user._tier, function(err, results){
                console.log(results)
                $scope.tiers = results;

              })

            }
          };


          $scope.openTier = function (tierID) {
            console.log('element');
          }

          
        },
        link: function (scope, element, attrs) {
          
          scope.redirectTo = attrs.redirectTo;
        }
      };
    }
  ]);
