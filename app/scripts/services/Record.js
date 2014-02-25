"use strict";

angular.module("ettoPupil")
  .factory("Record", ["$resource",
    function ($resource) {
      return {
        create: function (courseId, userId, callback) {
          var Record = $resource("/api/v1/record/create/:userId", {
            courseId: courseId,
            userId: userId
          });

          Record.get(function (results) {
            callback(results);
          });
        }
      };
    }
  ]);
