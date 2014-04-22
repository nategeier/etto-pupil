"use strict";

angular.module("ettoPupil")
  .factory("CourseMetaChange", ["$http", "Endpoint",
    function ($http, Endpoint) {
      var CourseMetaChange;

      CourseMetaChange = {
        create: function (newCourse, callback) {
          $http.post(Endpoint("course"), newCourse)
            .success(function (data, status, headers, config) {
              callback(data);
            })
            .error(function (data, status, headers, config) {
              console.dir(data);
            });
        },

        removeCourse: function (course, callback) {
          $http.post(Endpoint("course", "destroy"), course)
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
