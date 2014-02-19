"use strict";

angular.module("ettoPupil", ["ngRoute", "ngResource", "ngAnimate", "ngTouch", "ui.bootstrap", "chieffancypants.loadingBar"])
  .config(["$routeProvider", "$locationProvider",
    function ($routeProvider, $locationProvider) {
      $locationProvider.html5Mode(true).hashPrefix("#");
      $routeProvider
        .when("/", {
          templateUrl: "/views/landing.html",
          controller: "MainCtrl"
        })
        .when("/etto", {
          templateUrl: "/views/home.html",
          controller: "HomeCtrl"
        })
        .when("/levels/:parentID", {
          templateUrl: "/views/reports.html",
          controller: "ReportsCtrl"
        })
        .when("/tier/edit/:id", {
          templateUrl: "/views/editTier.html",
          controller: "TierCtrl"
        })
        .when("/store/:tierID", {
          templateUrl: "/views/store.html",
          controller: "StoreCtrl"
        })
        .when("/invited/:id", {
          templateUrl: "/views/register_invite.html",
          controller: "InviteCtrl"
        })
        .when("/settings/:userID", {
          templateUrl: "/views/settings.html",
          controller: "SettingsCtrl"
        })
        .when("/billing/:userID", {
          templateUrl: "/views/billing.html",
          controller: "BillingCtrl"
        })
        .when("/payments/:userID", {
          templateUrl: "/views/payments.html",
          controller: "PaymentsCtrl"
        })
        .when("/session/destroy", {
          controller: "LogoutCtrl",
          templateUrl: "/views/home.html"
        })
        .when("/course/view/:courseId", {
          templateUrl: "/views/CourseView.html",
          controller: "CourseViewCtrl",
          resolve: {
            course: function (CourseLoader) {
              return new CourseLoader();
            }
          }
        })
        .when("/course/edit/:courseId", {
          templateUrl: "/views/CourseEdit.html",
          controller: "CourseEditCtrl",
          resolve: {
            course: function (CourseLoader) {
              return new CourseLoader();
            }
          }
        })
        .otherwise({
          redirectTo: "/etto"
        });
    }
  ]);
