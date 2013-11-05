"use strict";

angular.module("enrollgoComposerApp")
.directive("enrollgoBlock", [function () {
  return {

    template: "<div class='enrollgo-block columns'>{{ content }}</div>",

    restrict: "E",

    controller: function( $scope ) {
      $scope.isCurrentBlock = function() {
        return $scope.index === $scope.$parent.currentBlock;
      };

      $scope.show = function() {
        this.show();
      };
    },

    scope: {
      index: "=",
      content: "="
    },

    link: function postLink(scope, element, attrs) {
      //element.hide();
    }

  };
}]);
