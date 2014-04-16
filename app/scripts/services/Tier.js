"use strict";

angular.module("ettoPupil")
  .factory("Tier", ["$resource",
    function ($resource) {
      return {
        findTier: function (id, callback) {
          var FindTier = $resource("https://archimedes.jit.su/tier/:id", {
            id: id
          });

          FindTier.get(function (results) {
            callback(results);
          });
        },

        listTiersCourses: function (id, callback) {
          var Courses = $resource("https://archimedes.jit.su/course/listTiersCourses/:id", {
            id: id
          });

          Courses.query(function (results) {
            callback(results);
          });
        },

        listCompanyCreatedCourses: function (id, callback) {
          var Courses = $resource("https://archimedes.jit.su/course/listCompanyCreatedCourses/:id", {
            id: id
          });

          Courses.query(function (results) {
            callback(results);
          });
        },

        searchTiers: function (text, callback) {
          var Tiers = $resource("https://archimedes.jit.su/tier/searchTiers/:text", {
            text: text
          });

          Tiers.query(function (results) {
            callback(results);
          });
        }

      };
    }
  ]);
