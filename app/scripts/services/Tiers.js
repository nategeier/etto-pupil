"use strict";

angular.module("ettoPupil")
  .factory("Tiers", ["$http", "Endpoint",
    function ($http, Endpoint) {
      return {

        listChildrenAndCountUsers: function (tier, callback) {

          $http.post(Endpoint("tier", "list_children_and_count_users"), tier)
            .success(function (data, status, headers, config) {
              callback(data);
            })
            .error(function (data, status, headers, config) {
              console.dir(data);
            });
        },

        updateLeaderboard: function (tier, callback) {

          $http.post(Endpoint("tier", "updateLeaderboard"), tier)
            .success(function (data, status, headers, config) {
              callback(data);
            })
            .error(function (data, status, headers, config) {
              console.dir(data);
            });
        },
        changeWhiteLabel: function (tier, callback) {

          $http.post(Endpoint("tier", "changeWhiteLabel"), tier)
            .success(function (data, status, headers, config) {
              callback(data);
            })
            .error(function (data, status, headers, config) {
              console.dir(data);
            });
        },

        addTier: function (newTier, callback) {
          $http.post(Endpoint("tier", "add"), newTier).success(function (data) {
            callback(data);
          });
        },
        createCompany: function (newTier, callback) {
          $http.post(Endpoint("tier", "createCompany"), newTier).success(function (data) {
            callback(data);
          });
        },
        removeTier: function (tier, callback) {
          $http.post(Endpoint("tier", "remove"), tier).success(function (data) {
            callback(data);
          });
        },
        findTier: function (tierID, callback) {
          $http.get(Endpoint("tier/") + tierID).success(function (data) {
            callback(data);
          });
        },

        distributeCourseToTiers: function (obj, callback) {
          $http.post(Endpoint("tier", "distributeCourseToTiers"), obj).success(function (data) {
            callback(data);
          });
        },
        tierReport: function (id, callback) {
          $http.get(Endpoint("record", "tierReport/") + id).success(function (data) {
            callback(data);
          });
        },

        addCourseToTier: function (tierId, courseId, addAllLowerTiers, callback) {

          var query = tierId + "?" + "courseId=" + courseId + "&" + "addAllLowerTiers=" + addAllLowerTiers;

          $http.get(Endpoint("tier", "addCourseToTier/") + query).success(function (data) {
            callback(data);
          });
        },

        removeCourseFromTiers: function (tierId, courseId, callback) {

          var query = tierId + "?" + "courseId=" + courseId;

          $http.get(Endpoint("tier", "removeCourseFromTiers/") + query).success(function (data) {
            callback(data);
          });
        },

        updateTier: function (tier, callback) {
          $http.post(Endpoint("tier", "update"), tier).success(function (data) {
            callback(data);
          });
        },
        inviteUser: function (newLevel, callback) {
          $http.post(Endpoint("sessions", "invite_user"), newLevel).success(function (data) {
            callback(data);
          });
        }
      };
    }
  ]);
