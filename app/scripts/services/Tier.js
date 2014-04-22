"use strict";

angular.module("ettoPupil")
  .factory("Tier", ["$resource", "Endpoint",
    function ($resource, Endpoint) {
      return {
        findTier: function (id, callback) {
          var FindTier = $resource(Endpoint("tier") + "/:id", {
            id: id
          });

          FindTier.get(function (results) {
            callback(results);
          });
        },

        listTiersCourses: function (id, callback) {
          var Courses = $resource(Endpoint("course", "listTiersCourses") + "/:id", {
            id: id
          });

          Courses.query(function (results) {
            callback(results);
          });
        },

        listCompanyCreatedCourses: function (id, callback) {
          var Courses = $resource(Endpoint("course", "listCompanyCreatedCourses") + "/:id", {
            id: id
          });

          Courses.query(function (results) {
            callback(results);
          });
        },

        searchTiers: function (text, callback) {
          var Tiers = $resource(Endpoint("tier", "searchTiers") + "/:text", {
            text: text
          });

          Tiers.query(function (results) {
            callback(results);
          });
        }

      };
    }
  ]);
