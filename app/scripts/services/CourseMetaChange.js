"use strict";

angular.module("ettoPupil")
  .factory("CourseMetaChange", ["$http", "$location",
    function ($http, $location) {
      var CourseMetaChange;

      CourseMetaChange = {
        create: function (new_course, callback) {
          $http.post("/api/v1/course", new_course)
            .success(function (data, status, headers, config) {
              
              callback(data);
            })
            .error(function (data, status, headers, config) {
              console.dir(data);
            });
        },

        remove_course: function(course, callback){
          $http.post("/api/v1/course/destroy", course)
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
