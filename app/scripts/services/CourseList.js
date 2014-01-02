"use strict";

angular.module("ettoPupil")
  .factory("CourseList", ["$http", "$compile", "$document", "$modal", "$location",
    function ($http, $compile, $document, $modal, $location) {
      var Courses;

      Courses = {
    

        list_all: function (callback) {
          $http.get("/api/v1/courses/list")
            .success(function (data, status, headers, config) {
              //user = data.user;
              callback(data);
            })
            .error(function (data, status, headers, config) {
              console.dir(data);
            });
        }
      }
      return Courses;

      
    }


  ]);
