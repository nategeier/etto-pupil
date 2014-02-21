"use strict";

angular.module("ettoPupil")
  .factory("Record", ["$resource",
    function ($resource) {
      return {
        createRecord: function (courseId, userId, companyId, callback) {
          var Record = $resource("/api/v1/record/create/:id", {
            courseId: courseId,
            userId: userId,
            companyId: companyId
          });

          Record.query(function (results) {
            callback(results);
          });
        }
      };
    }
  ]);
