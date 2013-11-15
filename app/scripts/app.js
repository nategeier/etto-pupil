"use strict";

var engoPupil = angular.module( "engoPupil", [ "ngResource", "ngTouch" ]);

engoPupil
.config( function ($routeProvider) {
  $routeProvider
  .when( "/", {
    templateUrl: "views/main.html",
    controller: "MainCtrl",
  })
  .when( "/module/view/:moduleId", {
    templateUrl: "views/ModuleView.html",
    controller: "ModuleViewCtrl",
    resolve: {
      module: function( ModuleLoader ) { return new ModuleLoader(); }
    }
  })
  .when("/module/edit/:moduleId", {
    templateUrl: "views/ModuleEdit.html",
    controller: "ModuleEditCtrl",
    resolve: {
      module: function( ModuleLoader ) { return new ModuleLoader(); }
    }
  })
  .otherwise({
    redirectTo: "/"
  });
});
