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
        }
      };
    }
  ]);
