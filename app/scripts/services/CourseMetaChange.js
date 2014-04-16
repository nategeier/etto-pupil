"use strict";

angular.module("ettoPupil")
  .factory("CourseMetaChange", ["$http", "$location",
    function ($http) {
      var CourseMetaChange;

      CourseMetaChange = {
        create: function (newCourse, callback) {
          $http.post("https://archimedes.jit.su/course", newCourse)
            .success(function (data, status, headers, config) {
              callback(data);
            })
            .error(function (data, status, headers, config) {
              console.dir(data);
            });
        },

        removeCourse: function (course, callback) {
          $http.post("https://archimedes.jit.su/course/destroy", course)
            .success(function (data, status, headers, config) {
              callback(data);
            })
            .error(function (data, status, headers, config) {
              console.dir(data);
            });
        }
      };
      return CourseMetaChange;
    }

  ]);
