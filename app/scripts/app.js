"use strict";

var engoPupil = angular.module( "engoPupil", [ "ngResource", "ngTouch" ]);

engoPupil
.config( function ($routeProvider) {
  $routeProvider
  .when("/", {
    templateUrl: "views/landing.html",
    controller: "MainCtrl"
  })
  .when("/login/new", {
    templateUrl: "views/login.html",
    controller: "MainCtrl"
  })
  .when("/engo", {
    templateUrl: "views/home.html",
    controller: "HomeCtrl"
  })
  .when("/levels/:levelID/:auth", {
    templateUrl: "views/reports.html",
    controller: "ReportsCtrl"
  })
  .when("/store", {
    templateUrl: "views/store.html",
    controller: "StoreCtrl"
  })
   .when("/session/destroy", {
    controller: "LogoutCtrl",
    templateUrl: "views/home.html"
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
