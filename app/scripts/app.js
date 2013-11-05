"use strict";

var enrollgoComposerApp = angular.module("enrollgoComposerApp", [ "ngResource" ]);

enrollgoComposerApp
.config(function ($routeProvider) {
  $routeProvider
  .when("/", {
    templateUrl: "views/main.html",
    controller: "MainCtrl",
  })
  .when("/module/view/:moduleId", {
    templateUrl: "views/ModuleView.html",
    controller: "ModuleViewCtrl",
    resolve: {
      module: function( ModuleLoader ) { return new ModuleLoader(); }
    }
  })
  .otherwise({
    redirectTo: "/"
  });
});
