"use strict";

angular.module("ettoPupil", ["ui.router", "ngSanitize", "ngResource", "ngAnimate", "ngTouch", "ui.bootstrap", "xeditable", "angularFileUpload", "chieffancypants.loadingBar", "leaflet-directive", "ngAutocomplete"])
  .config(["$locationProvider", "$stateProvider", "$urlRouterProvider",
    function ($locationProvider, $stateProvider, $urlRouterProvider) {
      //$httpProvider.defaults.withCredentials = true;
      //$httpProvider.interceptors.push("httpInterceptor");

      $locationProvider.html5Mode(true).hashPrefix("#");

      $urlRouterProvider.otherwise("/");

      $stateProvider
        .state("landing", {
          url: "/",
          templateUrl: "/views/landing.html",
          controller: "LandingCtrl"
        })

      .state("terms", {
          url: "/terms",
          templateUrl: "/views/terms.html",
          controller: "TermsCtrl"
        })
        .state("trialEnds", {
          url: "/trialEnds",
          templateUrl: "/views/trialEnds.html",
          controller: "TrialEndsCtrl"
        })
        .state("/beta", {
          url: "",
          templateUrl: "/views/beta.html"
        })
        .state("bamboohrDocs", {
          url: "/docs/bamboohr",
          templateUrl: "/views/bamboohr.html"
        })
        .state("pwReset", {
          url: "/reset/:code",
          templateUrl: "/views/resetPassword.html"
        })
        .state("home", {
          url: "/etto",
          templateUrl: "/views/home.html",
          controller: "HomeCtrl",
          requireLogin: true

        })
        .state("loginPage", {
          url: "/login/:companyId",
          templateUrl: "/views/loginPage.html",
          controller: "LoginPageCtrl"
        })
        .state("companySettings", {
          url: "/company/:companyId",
          templateUrl: "/views/company.html",
          controller: "CompanyCtrl",
          requireLogin: true
        })
        .state("report", {
          url: "/report/:parentID",
          templateUrl: "/views/reports.html",
          controller: "ReportsCtrl",
          requireLogin: true
        })
        .state("editTier", {
          url: "/tier/edit/:id",
          templateUrl: "/views/editTier.html",
          controller: "TierCtrl",
          requireLogin: true
        })
        .state("store", {
          url: "/store/:tierID",
          templateUrl: "/views/store.html",
          controller: "StoreCtrl",
          requireLogin: true
        })
        .state("registerInvite", {
          url: "/invited/:id",
          templateUrl: "/views/register_invite.html",
          controller: "InviteCtrl"
        })
        .state("userSettings", {
          url: "/settings/:userID",
          templateUrl: "/views/settings.html",
          controller: "SettingsCtrl",
          requireLogin: true
        })
        .state("subscriptions", {
          url: "/subscription/:userID",
          templateUrl: "/views/Subscription.html",
          controller: "SubscriptionCtrl",
          requireLogin: true
        })
        .state("payment", {
          url: "/payments/:userID",
          templateUrl: "/views/payments.html",
          controller: "PaymentsCtrl",
          requireLogin: true
        })
        .state("destroySession", {
          url: "/session/destro",
          controller: "LogoutCtrl",
          templateUrl: "/views/home.html"
        })
        .state("demoCourse", {
          url: "/course/demo/:courseId/:blockId",
          templateUrl: "/views/CourseView.html",
          controller: "CourseDemoCtrl",
          resolve: {
            course: function (CourseLoader, $stateParams) {
              return CourseLoader($stateParams.courseId);
            }
          },
          requireLogin: true
        })
        .state("viewCourse", {
          url: "/course/view/:courseId/:blockId",
          templateUrl: "/views/CourseView.html",
          controller: "CourseViewCtrl",
          resolve: {
            course: function (CourseLoader, $stateParams) {
              return CourseLoader($stateParams.courseId);
            }
          },
          requireLogin: true
        })
        .state("editCourse", {
          url: "/course/edit/:courseId/:blockId",
          templateUrl: "/views/CourseEdit.html",
          requireLogin: true,
          resolve: {
            course: function (CourseLoader, $stateParams) {
              return CourseLoader($stateParams.courseId);
            }
          },
          controller: "CourseEditCtrl",
        })
        .state("assets", {
          url: "/assets",
          templateUrl: "/views/AssetLibrary.html",
          controller: "AssetLibrary",
          resolve: {
            assets: function (AssetLoader) {
              return new AssetLoader();
            }
          },
          requireLogin: true
        });
    }
  ]).run(function ($rootScope, editableOptions, $state, Session, WhiteLabel, Tier, Store) {
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

    $rootScope.$on("$stateChangeStart", function (event, toState, toParams) {

      var initStage = function (reladController) {
        Session.getSession(function (user) {

          $rootScope.user = user;

          console.log("user-----", user);

          if ($rootScope.user) {

            Store.findCredit($rootScope.user._tier._company, function (results) {
              $rootScope.credits = results.credits;
            });

            Tier.getCompany($rootScope.user._tier._id, function (company) {

              $rootScope.company = company;

              if (company.colors) {
                WhiteLabel.setColors(company.colors);
                WhiteLabel.setFonts(company.font);
              }

              if (reladController === true) {
                $state.go(toState.name, toParams);
              }

            });
          } else {
            Session.loginModal();
          }

        });
      };
      //--
      if (toState.requireLogin && !Session.currentUser()) {
        event.preventDefault();
        initStage(true);
      } else if (Session.currentUser()) {
        initStage(false);
      }

    });

    editableOptions.theme = "bs3";
  });
