"use strict";

angular.module("ettoPupil")
  .directive("ettoSession", ["Session", "Store",

    function (Session, Store) {
      return {
        restrict: "EA",
        link: function (scope, element, attrs) {
          Session.getSession(function (data) {
            Session.treatSession(data);
            scope.user = data;

            if (scope.user.auth.canPurchase) {
              Store.findCredit(scope.user._tier._company, function (credit) {
                scope.credit = credit;
              });
            }

          });
        }
      };
    }
  ]);
