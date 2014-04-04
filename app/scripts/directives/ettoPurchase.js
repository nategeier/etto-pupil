"use strict";

angular.module("ettoPupil")
  .directive("ettoPurchase", [

    function () {

      return {
        restrict: "AE",
        controller: function ($scope, $modal, Store) {

          $scope.addToLibrary = function (course) {

            //---- Isssue to deal with later on, may run in async not adding all on tiers before going to the server
            $scope.listAllOnTiers();
            course.added = true;

            if ($scope.credits <= course.priceWithEmps) {
              $scope.purchase(course, null);
            } else {
              console.log("add it")
            }

          };

          $scope.purchase = function (course, subscription) {

            if (course) {
              $scope.listAllOnTiers();
              course.added = true;
              console.log("added")
            }

            var user = $scope.user;
            var onTiers = $scope.onTiers;

            Store.findCards($scope.user._tier._company, function (customer) {
              if (customer === "204") {
                customer = null;
              }

              var modal = $modal.open({
                templateUrl: "/views/directives/ettoPurchaseModal.html",
                controller: function ($scope, $modalInstance) {

                  if (course) {
                    $scope.addedCredits = course.priceWithEmps;
                    $scope.selCourse = course;
                  } else if (subscription) {
                    $scope.addedCredits = subscription.price;
                    $scope.subscription = subscription;
                  }

                  $scope.customer = customer;
                  $scope.user = user;

                  $scope.handleCancil = function () {
                    $modalInstance.close();
                  };

                  $scope.handlePurchase = function (card, addedCredits) {

                    var courseId = null;

                    if (course) {
                      courseId = course._id;
                    }

                    var order = {
                      user: user,
                      card: card,
                      tiers: onTiers,
                      courseId: courseId,
                      subscription: subscription,
                      addedCredits: addedCredits
                    };

                    Store.purchase(order, function (responce) {
                      if (responce.message) {
                        $scope.err = responce.message;
                      } else {
                        $modalInstance.close(order);
                      }
                    });
                  };
                }
              });
              modal.result.then(function (order) {
                if (order.subscription) {
                  $scope.resetSubscription();
                }
                $scope.updateSession();
              });
            });
          };
        },
        link: function postLink(scope, element, attrs) {
          scope.redirectTo = attrs.redirectTo;
        }
      };
    }
  ]);
