"use strict";

angular.module("ettoPupil")
  .controller("LoginPageCtrl", ["$rootScope", "$scope", "$stateParams", "$location", "Session", "Tiers", "WhiteLabel",
    function ($rootScope, $scope, $stateParams, $location, Session, Tiers, WhiteLabel) {

      var companyId = "";
      var redirUrl = "/etto";

      var findCompany = function () {
        Tiers.findTier(companyId, function (company) {
          $rootScope.company = company;
          WhiteLabel.setColors($rootScope.company.colors);
          WhiteLabel.setFonts($rootScope.company.font);
        });
      };

      if ($stateParams.companyId) {
        companyId = $stateParams.companyId;
        findCompany();

      } else if ($stateParams.redirUrl) {
        redirUrl = $stateParams.redirUrl;
      }

      $scope.login = function () {
        var user = $scope.user;

        Session.authenticate(user, function (data) {
          if (data.message) {
            $scope.err = data;
          } else {
            $location.path(redirUrl);
          }
        });
      };
    }
  ]);
