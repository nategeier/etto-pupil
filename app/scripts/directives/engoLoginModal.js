"use strict";

angular.module("engoPupil")
  .directive("engoLoginModal", [function () {
    return {
      template: "<a class='button small' href='#' ng-click='login()'>Login</a>",
      restrict: "AE",
      controller: function( $scope, $modal, Session, $location ) {
        $scope.login = function() {
          var modal = $modal.open({
            templateUrl: "views/directives/engoLoginModal.html",
            controller: function( $scope, $modalInstance ) {
              $scope.user = {};
              $scope.handleLogin = function() {
                $modalInstance.close( $scope.user );
              };
            }
          });

          modal.result.then( function( user ) {
            Session.authenticate( user );
            $location.path( "/engo" );
          });
        };
      },
      link: function postLink(scope, element, attrs) {
      }
    };
  }]);
