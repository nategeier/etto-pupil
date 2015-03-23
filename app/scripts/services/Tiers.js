"use strict";

angular.module("ettoPupil")
  .factory("Tiers", ["$http", "Endpoint", "$state", "$rootScope", "$resource",
    function ($http, Endpoint, $state, $rootScope, $resource) {

      var company = null;

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
              callback();
            })
            .error(function (data, status, headers, config) {
              console.dir(data);
            });
        },

        countUsersInTierTree: function (tier, callback) {

          $http.post(Endpoint("tier", "countUsersInTierTree"), tier)
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

          $http.post(Endpoint("tier", "update"), tier)
            .success(function (data, status, headers, config) {
              callback(data);
            });

        },
        inviteUser: function (newLevel, callback) {
          $http.post(Endpoint("sessions", "invite_user"), newLevel).success(function (data) {
            callback(data);
          });

        },
        checkCompanySubscription: function (user, company) {
          var trialEnds = new Date(company.trialEnds);
          var trailEnded = trialEnds < Date.now();
          var basePath = $state.current.name;

          //-- Check if user is not already on the subscrption page
          if (basePath !== "subscriptions") {
            //----- Compnay tral period is over
            if (trailEnded === true) {
              //--- Company does not have a subscription
              if (!company._subscription || (company._subscription.empRange.high < company.totUsers)) {
                $state.go("subscriptions", {
                  userId: user._id
                });
              }
            }
          } else {

            //----- user is on the subscription page, give the proper error info
            if (trailEnded === true) {
              //--- Company does not have a subscription
              if (!company._subscription) {
                $rootScope.err = "Looks like your trial expired, your company needs a subscription to continue.";
              } else if (company._subscription.empRange.high < company.totUsers) {
                $rootScope.err = "Looks you need a larger subscription. You currently have " + $rootScope.company.totUsers + " total employees.";
              } else {

              }
            }
          }
        },
        syncBambooHR: function (keys, callback) {
          $http.post(Endpoint("tier", "syncBambooHR"), keys)
            .success(function (data, status, headers, config) {
              callback(null, data);
            })
            .error(function (data, status, headers, config) {
              console.dir(data, null);
              callback(data, null);
            });
        }
      };
    }
  ]);
