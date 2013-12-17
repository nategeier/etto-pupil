"use strict";

angular.module("engoPupil", ["ngRoute", "ngResource", "ngTouch", "ui.bootstrap"])
  .config(function ($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "views/landing.html",
        controller: "MainCtrl"
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
      })
      .when("/store", {
        templateUrl: "views/store.html",
        controller: "StoreCtrl"
      })
      .when("/purchase_course/:courseID", {
        templateUrl: "views/storePurchase.html",
        controller: "LoginCtrl"
      })
      .when("/register_invite/:userID", {
        templateUrl: "views/register_invite.html",
        controller: "LoginCtrl"
      })
      .when("/session/destroy", {
        controller: "LogoutCtrl",
        templateUrl: "views/home.html"
      })
      .when("/module/view/:moduleId", {
        templateUrl: "views/ModuleView.html",
        controller: "ModuleViewCtrl",
        resolve: {
          module: function (ModuleLoader) {
            return new ModuleLoader();
          }
        }
      })
      .when("/module/edit/:moduleId", {
        templateUrl: "views/ModuleEdit.html",
        controller: "ModuleEditCtrl",
        resolve: {
          module: function (ModuleLoader) {
            return new ModuleLoader();
          }
        }
      })
      .otherwise({
        redirectTo: "/"
      });
  });
