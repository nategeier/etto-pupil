"use strict";

var engoPupil = angular.module( "engoPupil", [ "ngRoute", "ngResource", "ngTouch", "ui.bootstrap" ]);


engoPupil
.config( function ($routeProvider) {
  $routeProvider
  .when("/", {
    templateUrl: "views/landing.html",
    controller: "NewbrandCtrl"
  })
  .when("/login/new", {
    templateUrl: "views/login.html",
    controller: "LoginCtrl"
  })
  .when("/engo", {
    templateUrl: "views/home.html",
    controller: "HomeCtrl"
  })
  .when("/levels/:levelID/:auth", {
    templateUrl: "views/reports.html",
    controller: "ReportsCtrl"
  })//-----------------------------Store
  .when("/store", {
    templateUrl: "views/store.html",
    controller: "StoreCtrl"
  })
  .when("/purchase_course/:courseID", {
    templateUrl: "views/storePurchase.html",
    controller: "StorepurchaseCtrl"
  })//-----------------------------Sessions
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
  /*.otherwise({
    redirectTo: "/"
  })*/;
});

