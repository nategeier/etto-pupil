"use strict";

angular.module("ettoPupil")
  .factory("Tiers", ["$http",
    function ($http) {
      return {

        listChildrenAndCountUsers: function (tier, callback) {

          $http.post("https://archimedes.jit.su/tier/list_children_and_count_users", tier)
            .success(function (data, status, headers, config) {
              callback(data);
            })
            .error(function (data, status, headers, config) {
              console.dir(data);
            });
        },

        updateLeaderboard: function (tier, callback) {

          $http.post("https://archimedes.jit.su/tier/updateLeaderboard", tier)
            .success(function (data, status, headers, config) {
              callback(data);
            })
            .error(function (data, status, headers, config) {
              console.dir(data);
            });
        },

        addTier: function (newTier, callback) {
          $http.post("https://archimedes.jit.su/tier/add", newTier).success(function (data) {
            callback(data);
          });
        },
        createCompany: function (newTier, callback) {
          $http.post("https://archimedes.jit.su/tier/createCompany", newTier).success(function (data) {
            callback(data);
          });
        },
        removeTier: function (tier, callback) {
          $http.post("https://archimedes.jit.su/tier/remove", tier).success(function (data) {
            callback(data);
          });
        },
        findTier: function (tierID, callback) {
          $http.get("https://archimedes.jit.su/tier/" + tierID).success(function (data) {
            callback(data);
          });
        },

        distributeCourseToTiers: function (obj, callback) {
          $http.post("https://archimedes.jit.su/tier/distributeCourseToTiers", obj).success(function (data) {
            callback(data);
          });
        },
        tierReport: function (id, callback) {
          $http.get("https://archimedes.jit.su/record/tierReport/" + id).success(function (data) {
            callback(data);
          });
        },

        addCourseToTier: function (tierId, courseId, addAllLowerTiers, callback) {

          var query = tierId + "?" + "courseId=" + courseId + "&" + "addAllLowerTiers=" + addAllLowerTiers;

          $http.get("https://archimedes.jit.su/tier/addCourseToTier/" + query).success(function (data) {
            callback(data);
          });
        },

        removeCourseFromTiers: function (tierId, courseId, callback) {

          var query = tierId + "?" + "courseId=" + courseId;

          $http.get("https://archimedes.jit.su/tier/removeCourseFromTiers/" + query).success(function (data) {
            callback(data);
          });
        },

        updateTier: function (tier, callback) {
          $http.post("https://archimedes.jit.su/tier/update", tier).success(function (data) {
            callback(data);
          });
        },
        inviteUser: function (newLevel, callback) {
          $http.post("https://archimedes.jit.su/sessions/invite_user", newLevel).success(function (data) {
            callback(data);
          });
        }
      };
    }
  ]);
