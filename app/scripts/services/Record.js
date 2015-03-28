"use strict";

angular.module("ettoPupil")
  .factory("Record", ["$resource", "Endpoint",
    function ($resource, Endpoint) {
      return {
        create: function (courseId, userId, totalBlocks, callback) {
          var Record = $resource(Endpoint("record", "create") + "/:userId", {
            courseId: courseId,
            userId: userId,
            totalBlocks: totalBlocks
          });

          Record.get(function (results) {
            callback(results);
          });
        },

        userOverallProgress: function (userId, tierId, done) {
          var Record = $resource(Endpoint("record", "userOverallProgress") + "/:userId", {
            userId: userId,
            tierId: tierId
          });

          Record.get(function (results) {
            done(results);
          });
        },

        updateBookmark: function (record, done) {

          var UsersRecord = $resource(Endpoint("record", "updateBookmark"));
          var updateRecord = new UsersRecord(record);
          updateRecord.$save();
        },
        findCourseRecords: function (courseId, done) {
          var Record = $resource(Endpoint("record", "findCourseRecords") + "/:courseId", {
            courseId: courseId
          });

          Record.get(function (results) {
            done(results);
          });
        }
      };
    }
  ]);
