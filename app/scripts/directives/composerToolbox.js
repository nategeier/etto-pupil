"use strict";

angular.module("enrollgoComposerApp")
  .directive("composerToolbox", [function () {
    return {
      template: "<div></div>",
      restrict: "E",
      link: function postLink(scope, element, attrs) {
      }
    };
  }]);
