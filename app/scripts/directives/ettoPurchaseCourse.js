"use strict";

angular.module("ettoPupil")
  .directive("ettoPurchaseCourse", [

    function() {
      return {
        template: "<a class='btn btn-primary btn-xs top-logout-btn' href='#' ng-click='purchaseCourse(course)'>Purchase</a>",
        restrict: "AE",
        controller: function($scope, $modal, Store, $location) {

          $scope.purchaseCourse = function(course) {
            $scope.listAllOnTiers();
            var user = $scope.user;
            var onTiers = $scope.onTiers;
            var customer = $scope.customer;


            var modal = $modal.open({
              templateUrl: "/views/directives/ettoPurchaseCourseModal.html",
              controller: function($scope, $modalInstance) {
                $scope.selCourse = course;
                $scope.customer = customer;

                $scope.handlePurchase = function(card) {

                  var order = {
                    course: {
                      price: course.priceWithEmps,
                      _id: course._id
                    },
                    user: user,
                    card: card,
                    tiers: onTiers
                  };

                  Store.purchase(order, function(responce) {
                    $modalInstance.close(responce);
                  });
                };
              }
            });
            modal.result.then(function(responce) {
              $location.path($scope.redirectTo);
            });
          };
        },
        link: function postLink(scope, element, attrs) {
          scope.redirectTo = attrs.redirectTo;
        }
      };
    }
  ]);