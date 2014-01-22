"use strict";

angular.module("ettoPupil")
  .controller("StoreCtrl", ["$scope", "$http", "Session", "Store", "CourseList", "Tiers", "$timeout", "$routeParams",
    function ($scope, $http, Session, Store, CourseList, Tiers, $timeout, $routeParams) {

      var totUsers = 0;
      $scope.onTiers = [];
      $scope.parentID = $routeParams.tierID;

      $scope.listCourses = function () {
        CourseList.listAll(function (data) {
          $scope.courses = data;
        });
      };

      $scope.listCourses();

      $scope.$watch("user", function () {
        if ($scope.user) {

          Store.find($scope.user._id, function (customer) {

            if (customer === "null") {
              $scope.customer = null;
            } else {
              $scope.customer = customer;
            }

          });

          Tiers.findTier($scope.parentID, function (results) {
            $scope.currentTier = results;
          });

          var obj = {
            _id: $scope.user._tier._id
          };

          Tiers.listChildrenAndCountUsers(obj, function (tiers) {

            $scope.data = {
              children: tiers
            };
            //---- Count initial total users
            for (var i = 0; i < tiers.length; i++) {
              totUsers += tiers[i].totUsers;
            }
            $scope.totUsers = totUsers;
            //----- Set price for each course.
            setPrice();
          });
        }
      });

      $scope.toggleMinimized = function (child) {

        if (child.minimized === undefined) {
          var obj = {
            _id: child._id
          };
          Tiers.listChildrenAndCountUsers(obj, function (tiers) {
            child.children = tiers;

            for (var i = 0; i < tiers.length; i++) {
              tiers[i].isoff = child.isoff;
            }
            child.minimized = false;
          });
        } else {
          child.minimized = !child.minimized;
        }
      };

      $scope.toggleIsOn = function (child) {
        if (child.isoff === undefined) {
          child.isoff = true;
        } else {
          child.isoff = !child.isoff;
        }

        $scope.changeParent(child, function (totUsersInChildren) {
          if (child.isoff) {
            $scope.totUsers -= totUsersInChildren;
          } else {
            $scope.totUsers += totUsersInChildren;
          }
          setPrice();
        });

      };

      $scope.changeParent = function (intChild, callback) {

        function recursive(tier, child) {

          if (tier.children && tier.children[0]) {
            for (var j = 0; j < tier.children.length; j++) {
              if (tier.children[j]._id === child.parent) {
                if (intChild.isoff) {
                  tier.children[j].totUsers -= intChild.totUsers;
                } else {
                  tier.children[j].totUsers += intChild.totUsers;
                }

                if (tier.children[j].parent === $scope.currentTier._id) {
                  callback(intChild.totUsers);
                } else {
                  recursive($scope.data, tier.children[j]);
                }

              } else {
                recursive(tier.children[j], child);
              }
            }
          }
        }
        if (intChild.parent === $scope.currentTier._id) {
          callback(intChild.totUsers);
        } else {
          recursive($scope.data, intChild);
        }
      };
      $scope.listAllOnTiers = function () {

        $scope.onTiers = [{
          hasChildren: true,
          hasAddedChildren: true,
          minimized: true,
          _id: $scope.parentID
        }];

        function recursiveFindOnTiers(tier) {
          if (tier.children[0]) {
            async.map(tier.children, function (child, callback) {
              if (!child.isoff) {

                var hasChildren = false;
                var hasAddedChildren = false;

                if (child._children && child._children[0]) {
                  hasChildren = true;
                }

                if (child.children && child.children[0]) {
                  hasAddedChildren = true;
                }

                if (child.minimized === undefined) {
                  child.minimized = true;
                }

                $scope.onTiers.push({
                  hasChildren: hasChildren,
                  hasAddedChildren: hasAddedChildren,
                  minimized: child.minimized,
                  _id: child._id
                });
                recursiveFindOnTiers(child);
              }
              callback(null, null);
            }, function (err, results) {
              //----Nothing called back
            });
          }
        }
        recursiveFindOnTiers($scope.data);
      };

      /*
      $scope.turnChildren = function(tier, callback) {


        function recursive(tier) {
          if (tier.children[0]) {
            for (var j = 0; j < tier.children.length; j++) {

              tier.children[j].isoff = tier.isoff;
              recursive(tier.children[j]);
            }
            callback(totUsersInChildren);
          }
        }
        if (tier.children[0]) {
          callback(0);
        } else {
          recursive(tier);
        }

      };

      */

      var setPrice = function () {
        _.map($scope.courses, function (course) {
          course.priceWithEmps = (course.price * $scope.totUsers).toFixed(2);
        });
      };
    }
  ]);
