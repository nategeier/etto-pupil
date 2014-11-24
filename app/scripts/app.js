"use strict";

angular.module("ettoPupil", ["ngRoute", "ngSanitize", "ngResource", "ngAnimate", "ngTouch", "ui.bootstrap", "xeditable", "angularFileUpload", "chieffancypants.loadingBar", "leaflet-directive", "ngAutocomplete"])
  .config(["$routeProvider", "$locationProvider", "$httpProvider",
    function ($routeProvider, $locationProvider, $httpProvider) {
      $httpProvider.defaults.withCredentials = true;
      $httpProvider.interceptors.push("httpInterceptor");

      $locationProvider.html5Mode(true).hashPrefix("#");
      $routeProvider
        .when("/", {
          templateUrl: "/views/landing.html",
          controller: "LandingCtrl"
        })
        .when("/terms", {
          templateUrl: "/views/terms.html",
          controller: "TermsCtrl"
        })
        .when("/beta", {
          templateUrl: "/views/beta.html"
        })
        .when("/docs/bamboohr", {
          templateUrl: "/views/bamboohr.html"
        })
        .when("/reset/:code", {
          templateUrl: "/views/resetPassword.html"
        })
        .when("/etto", {
          templateUrl: "/views/home.html",
          controller: "HomeCtrl"
        })
        .when("/login/:companyId", {
          templateUrl: "/views/loginPage.html",
          controller: "LoginPageCtrl"
        })
        .when("/company/:companyId", {
          templateUrl: "/views/company.html",
          controller: "CompanyCtrl"
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
        .when("/course/demo/:courseId", {
          templateUrl: "/views/CourseView.html",
          controller: "CourseDemoCtrl",
          resolve: {
            course: function (CourseLoader) {
              return new CourseLoader();
            }
          }
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
        .when("/assets", {
          templateUrl: "/views/AssetLibrary.html",
          controller: "AssetLibrary",
          resolve: {
            assets: function (AssetLoader) {
              return new AssetLoader();
            }
          }
        })
        .otherwise({
          redirectTo: "/etto"
        });
    }
  ]).run(function ($rootScope, editableOptions) {
    var environment = "production";

    // Production
    if (environment === "production") {
      $rootScope.config = {
        "api": {
          "server": "https://api.coursetto.com",
          "version": ""
        },
        "aws": {
          "bucket": "etto-production"
        },
        "socketUrl": "https://api.coursetto.com"
      };
    }

    // Development
    if (environment === "development") {
      $rootScope.config = {
        "api": {
          "server": "/",
          "version": "api/v1"
        },
        "aws": {
          "bucket": "etto-archimedes-test"
        },
        "socketUrl": "http://localhost:4220"
      };
    }

    editableOptions.theme = "bs3";
  });
