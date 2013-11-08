"use strict";

angular.module("enrollgoComposerApp")
.directive("engoYoutube", [ function () {
  return {

    restrict: "EA",

    scope: { code: "@" },

    template: "<div style='height:540px;'><iframe style='overflow:hidden;height:100%;width:100%' width='100%' height='100%' src='http://www.youtube.com/embed/{{code}}' frameborder='0' allowfullscreen></iframe></div>"

  };
}]);

