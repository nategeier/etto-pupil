"use strict";

angular.module("ettoPupil", ["ngRoute", "ngResource", "ngAnimate", "ngTouch", "ui.bootstrap", "xeditable", "angularFileUpload", "chieffancypants.loadingBar"])
  .config(["$routeProvider", "$locationProvider", "$httpProvider",
    function ($routeProvider, $locationProvider, $httpProvider) {
      $httpProvider.interceptors.push("httpInterceptor");

      $locationProvider.html5Mode(true).hashPrefix("#");
      $routeProvider
        .when("/", {
          templateUrl: "/views/landing.html",
          controller: "MainCtrl"
        })
        .when("/beta", {
          templateUrl: "/views/beta.html"
        })
        .when("/etto", {
          templateUrl: "/views/home.html",
          controller: "HomeCtrl"
        })
        .when("/report/:parentID", {
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
        .when("/subscription/:userID", {
          templateUrl: "/views/Subscription.html",
          controller: "SubscriptionCtrl"
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
  ]).run(function (editableOptions) {
    editableOptions.theme = "bs3"; // bootstrap3 theme. Can be also 'bs2', 'default'
  });
