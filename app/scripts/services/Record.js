"use strict";

angular.module("ettoPupil")
  .factory("Record", ["$resource", "Endpoint",
    function ($resource, Endpoint) {
      return {
        create: function (courseId, userId, callback) {
          var Record = $resource(Endpoint("record", "create") + "/:userId", {
            courseId: courseId,
            userId: userId
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

        updateBookmark: function (id, bookmark, totalBlocks) {
          var Record = $resource(Endpoint("record", "updateBookmark") + "/:id", {
            id: id,
            bookmark: bookmark,
            totalBlocks: totalBlocks
          });

          Record.get(function (results) {
            //callback(results);
          });
        }
      };
    }
  ]);
