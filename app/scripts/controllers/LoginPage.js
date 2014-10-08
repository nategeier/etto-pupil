"use strict";

angular.module("ettoPupil")
  .controller("LoginPageCtrl", ["$scope", "$routeParams", "$location", "Session", "Tiers", "WhiteLabel",
    function ($scope, $routeParams, $location, Session, Tiers, WhiteLabel) {

      var companyId = "";
      var redirUrl = "/etto";

      var findCompany = function () {
        Tiers.findTier(companyId, function (company) {
          $scope.company = company;
          WhiteLabel.setColors($scope.company.colors);
          WhiteLabel.setFonts($scope.company.font);
        });
      };

      if ($routeParams.companyId) {
        companyId = $routeParams.companyId;
        findCompany();

      } else if ($routeParams.redirUrl) {
        redirUrl = $routeParams.redirUrl;
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
