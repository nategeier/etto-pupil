"use strict";

angular.module("ettoPupil")
  .factory("CourseMetaChange", ["$http", "$location",
    function ($http, $location) {
      var CourseMetaChange;

      CourseMetaChange = {
        create: function (new_course, callback) {
          $http.post("/api/v1/course/create", new_course)
            .success(function (data, status, headers, config) {
              //user = data.user;
              callback(data);
            })
            .error(function (data, status, headers, config) {
              console.dir(data);
            });
        },

        remove_course: function(course, callback){
          $http.post("/api/v1/course/remove", course)
            .success(function (data, status, headers, config) {
              //user = data.user;
              callback(data);
            })
            .error(function (data, status, headers, config) {
              console.dir(data);
            });
        }
      }
      return CourseMetaChange;
    }

  ]);
