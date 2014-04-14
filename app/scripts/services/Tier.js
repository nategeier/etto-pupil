"use strict";

angular.module("ettoPupil")
  .factory("Tier", ["$resource",
    function ($resource) {
      return {
        findTier: function (id, callback) {
          var FindTier = $resource("/api/v1/tier/:id", {
            id: id
          });

          FindTier.get(function (results) {
            callback(results);
          });
        },

        listTiersCourses: function (id, callback) {
          var Courses = $resource("/api/v1/course/listTiersCourses/:id", {
            id: id
          });

          Courses.query(function (results) {
            callback(results);
          });
        },

        listCompanyCreatedCourses: function (id, callback) {
          var Courses = $resource("/api/v1/course/listCompanyCreatedCourses/:id", {
            id: id
          });

          Courses.query(function (results) {
            callback(results);
          });
        },

        searchTiers: function (text, callback) {
          var Tiers = $resource("/api/v1/tier/searchTiers/:text", {
            text: text
          });

          Tiers.query(function (results) {
            callback(results);
          });
        }

      };
    }
  ]);
