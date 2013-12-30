"use strict";

angular.module("ettoPupil", ["ngRoute", "ngResource", "ngTouch", "ui.bootstrap"])
  .config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true).hashPrefix('#');
    $routeProvider
      .when("/", {
        templateUrl: "/views/landing.html",
        controller: "MainCtrl"
      })
      .when("/login/new", {
        templateUrl: "/views/login.html",
        controller: "LoginCtrl"
      })
      .when("/etto", {
        templateUrl: "/views/home.html",
        controller: "HomeCtrl"
      })
      .when("/levels/:parentID", {
        templateUrl: "/views/reports.html",
        controller: "ReportsCtrl"
      })
      .when("/store", {
        templateUrl: "/views/store.html",
        controller: "StoreCtrl"
      })
      .when("/purchase_course/:courseID", {
        templateUrl: "/views/storePurchase.html",
        controller: "LoginCtrl"
      })
      .when("/register_invite/:userID", {
        templateUrl: "/views/register_invite.html",
        controller: "LoginCtrl"
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
  }]);
