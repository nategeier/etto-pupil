"use strict";

angular.module("ettoPupil")
  .directive("ettoPurchaseCourse", [

    function () {

      return {
        restrict: "AE",
        controller: function ($scope, $modal, Store, $location) {

          $scope.purchaseCourse = function (course) {

            if (course) {
              $scope.listAllOnTiers();
            }

            var user = $scope.user;
            var onTiers = $scope.onTiers;

            Store.findCards($scope.user._tier._company, function (customer) {
              console.log(customer)
              if (customer === "204") {
                customer = null;
              }

              var modal = $modal.open({
                templateUrl: "/views/directives/ettoPurchaseCourseModal.html",
                controller: function ($scope, $modalInstance) {
                  $scope.selCourse = course;
                  if (course) {
                    $scope.addedCredits = course.priceWithEmps;
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

                    //credits = addedCredits;
                    console.log(addedCredits);

                    var order = {
                      user: user,
                      card: card,
                      tiers: onTiers,
                      courseId: courseId,
                      addedCredits: addedCredits
                    };

                    Store.purchase(order, function (responce) {
                      console.log("responce--------", responce);
                      if (responce.message) {
                        $scope.err = responce.message;
                      } else {
                        $modalInstance.close(responce);
                      }

                    });
                  };
                }
              });
              modal.result.then(function (responce) {
                $location.path("/etto");
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
