"use strict";

angular.module("ettoPupil")
  .factory("Tiers", ["$http",
    function ($http) {
      return {

        listChildrenAndCountUsers: function (tier, callback) {

          $http.post("/api/v1/tier/list_children_and_count_users", tier)
            .success(function (data, status, headers, config) {
              callback(data);
            })
            .error(function (data, status, headers, config) {
              console.dir(data);
            });
        },

        updateLeaderboard: function (tier, callback) {

          $http.post("/api/v1/tier/updateLeaderboard", tier)
            .success(function (data, status, headers, config) {
              callback(data);
            })
            .error(function (data, status, headers, config) {
              console.dir(data);
            });
        },

        addTier: function (newTier, callback) {
          $http.post("/api/v1/tier/add", newTier).success(function (data) {
            callback(data);
          });
        },
        createCompany: function (newTier, callback) {
          $http.post("/api/v1/tier/createCompany", newTier).success(function (data) {
            callback(data);
          });
        },
        removeTier: function (tier, callback) {
          $http.post("/api/v1/tier/remove", tier).success(function (data) {
            callback(data);
          });
        },
        findTier: function (tierID, callback) {
          $http.get("/api/v1/tier/" + tierID).success(function (data) {
            callback(data);
          });
        },

        distributeCourseToTiers: function (obj, callback) {
          $http.post("/api/v1/tier/distributeCourseToTiers", obj).success(function (data) {
            callback(data);
          });
        },
        tierReport: function (id, callback) {
          $http.get("/api/v1/record/tierReport/" + id).success(function (data) {
            callback(data);
          });
        },

        addCourseToTier: function (tierId, courseId, addAllLowerTiers, callback) {

          var query = tierId + "?" + "courseId=" + courseId + "&" + "addAllLowerTiers=" + addAllLowerTiers;

          $http.get("/api/v1/tier/addCourseToTier/" + query).success(function (data) {
            callback(data);
          });
        },

        removeCourseFromTiers: function (tierId, courseId, callback) {

          var query = tierId + "?" + "courseId=" + courseId;

          $http.get("/api/v1/tier/removeCourseFromTiers/" + query).success(function (data) {
            callback(data);
          });
        },

        updateTier: function (tier, callback) {
          $http.post("/api/v1/tier/update", tier).success(function (data) {
            callback(data);
          });
        },
        inviteUser: function (newLevel, callback) {
          $http.post("/api/v1/sessions/invite_user", newLevel).success(function (data) {
            callback(data);
          });
        }
      };
    }
  ]);
