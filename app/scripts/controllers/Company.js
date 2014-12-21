"use strict";

angular.module("ettoPupil")
  .controller("CompanyCtrl", ["$scope", "$routeParams", "Tiers", "WhiteLabel", "Fonts",
    function ($scope, $routeParams, Tiers, WhiteLabel, Fonts) {

      var companyId = $routeParams.companyId;

      $scope.fonts = Fonts;

      $scope.changeWhiteLabel = function () {
        var company = {
          _id: companyId,
          colors: $scope.company.colors,
          font: $scope.company.font
        };

        Tiers.changeWhiteLabel(company, function () {
          WhiteLabel.setColors($scope.company.colors);
          WhiteLabel.setFonts($scope.company.font);
        });
      };
    }
  ]);
