"use strict";

angular.module("ettoPupil")

.factory('Sessions', function ($http) {
  var Sessions = {
    user: {},
    saveSession: function () { /* save session data to db */ },
    updateSession: function () {
      /* load data from db */
      Sessions.user = $http.get('/api/v1/auth/get_session').then(function (r) {
        return r.data;
      });
    }
  };
  Sessions.updateSession();
  return Sessions;
});
