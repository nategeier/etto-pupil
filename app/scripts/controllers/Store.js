"use strict";

angular.module("ettoPupil")
  .controller("StoreCtrl", ["$scope", "$http", "Session", "Store", "CourseList", "Tiers", "$timeout", "$routeParams",
    function ($scope, $http, Session, Store, CourseList, Tiers, $timeout, $routeParams) {

      var totUsers = 0;
      $scope.onTiers = [];
      $scope.parentID = $routeParams.tierID;

      TweenMax.from($("#head-img"), 1, {
        opacity: 0,
        x: -50
      });

      $scope.listCourses = function () {

        CourseList.storeCourses(function (data) {
          $scope.courses = data;
        });
      };

      $scope.listCourses();

      $scope.$watch("user", function () {
        if ($scope.user) {

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
              tiers[i].dynamicTotalUsers = tiers[i].totUsers;
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
              tiers[i].dynamicTotalUsers = tiers[i].totUsers;
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

        var numToChange = countChildrenUsers(child);

        var changeTotal = 0;

        if (child.isoff) {
          child.dynamicTotalUsers -= numToChange;
        } else {
          child.dynamicTotalUsers = child.totUsers;

          child.totUsers += numToChange;
        }

        changeTotal = child.dynamicTotalUsers + countChildrenUsers(child);

        $scope.changeChildren(child);
        $scope.checkIfParentsAreOff(child, function (totalOff) {

          if (totalOff !== 0) {
            changeTotal = totalOff + child.totUsers;
          }

          $scope.changeParent(child, changeTotal, function (totUsersInChildren) {
            $scope.totUsers = countChildrenUsers($scope.data);
            setPrice();
          });

        });

      };

      $scope.checkIfParentsAreOff = function (intChild, callback) {
        var totToChange = 0;

        function recursive(tiers, child) {

          if (tiers.children && tiers.children[0]) {
            for (var j = 0; j < tiers.children.length; j++) {
              if (tiers.children[j]._id === child.parent) {
                //------- Parent tier is off == true

                if (tiers.children[j].isoff === true) {
                  totToChange += tiers.children[j].dynamicTotalUsers;
                }
                if (tiers.children[j].parent === $scope.currentTier._id) {
                  callback(totToChange);
                } else {
                  recursive($scope.data, tiers.children[j]);
                }

              } else {
                recursive(tiers.children[j], child);
              }
            }
          }
        }
        if (intChild.parent === $scope.currentTier._id) {
          callback(totToChange);
        } else {
          recursive($scope.data, intChild);
        }

      };

      $scope.changeChildren = function (intChild) {

        function recursive(tier) {

          if (tier.children && tier.children[0]) {
            for (var j = 0; j < tier.children.length; j++) {

              tier.children[j].isoff = intChild.isoff;

              if (tier.children[j].isoff === true) {
                tier.children[j].dynamicTotalUsers -= countChildrenUsers(tier.children[j]);
              } else {
                tier.children[j].dynamicTotalUsers = tier.children[j].totUsers;
              }

              if (tier.children[j].children) {
                recursive(tier.children[j]);
              }

            }
          }
        }

        recursive(intChild);

      };

      var countChildrenUsers = function (tier) {
        var numUsers = 0;

        for (var j = 0; j < tier.children.length; j++) {
          if (!tier.children[j].isoff) {
            numUsers += tier.children[j].dynamicTotalUsers;
          }

        }
        return numUsers;

      };

      $scope.changeParent = function (intChild, changeTotal, callback) {

        var totToChange = intChild.totUsers;

        function recursive(tiers, child) {

          if (tiers.children && tiers.children[0]) {
            for (var j = 0; j < tiers.children.length; j++) {

              if (tiers.children[j]._id === child.parent) {
                //------- Parent tier is off == true

                if (intChild.isoff === false && tiers.children[j].isoff === true) {

                  tiers.children[j].isoff = false;
                  tiers.children[j].dynamicTotalUsers = tiers.children[j].dynamicTotalUsers + countChildrenUsers(tiers.children[j]);

                  totToChange = tiers.children[j].dynamicTotalUsers + totToChange;
                  //tiers.children[j].dynamicTotalUsers += changeTotal + ;

                } else if (intChild.isoff) {
                  //tiers.children[j].totUsers -= changeTotal;
                  tiers.children[j].dynamicTotalUsers -= changeTotal;

                } else {
                  //tiers.children[j].totUsers += changeTotal;
                  tiers.children[j].dynamicTotalUsers += changeTotal;
                }

                if (tiers.children[j].parent === $scope.currentTier._id) {
                  callback(totToChange);
                } else {
                  recursive($scope.data, tiers.children[j]);
                }

              } else {
                recursive(tiers.children[j], child);
              }
            }
          }
        }

        //----- Start check if there are even tiers if so start recursion
        if (intChild.parent === $scope.currentTier._id) {

          callback(intChild.dynamicTotalUsers);
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
                var isMinimized = child.minimized;

                if (isMinimized === undefined) {
                  isMinimized = true;
                }

                $scope.onTiers.push({
                  hasChildren: hasChildren,
                  hasAddedChildren: hasAddedChildren,
                  minimized: isMinimized,
                  _id: child._id
                });

                recursiveFindOnTiers(child);
              }
              callback(null, null);
            }, function (err, results) {
              console.log("finished children----")
              //----Nothing called back
            });
          } else {
            console.log("no children----", tier.title)
          }
        }
        recursiveFindOnTiers($scope.data);
        console.log("tiers----", $scope.data)
      };

      var setPrice = function () {
        _.map($scope.courses, function (course) {
          course.priceWithEmps = (course.price * $scope.totUsers).toFixed(2);
        });
      };
    }
  ]);
