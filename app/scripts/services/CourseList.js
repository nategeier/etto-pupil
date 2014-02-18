"use strict";

angular.module("ettoPupil")
  .factory("CourseList", ["$http", "$compile", "$document", "$modal", "$location",
    function ($http, $compile, $document, $modal, $location) {
      var Courses;

      Courses = {

        listAll: function (callback) {
          $http.get("/api/v1/course")
            .success(function (data, status, headers, config) {
              //user = data.user;
              callback(data);
            })
            .error(function (data, status, headers, config) {
              console.dir(data);
            });
        },
        listUsersCreatedCourses: function (id, callback) {
          $http.get("/api/v1/user/listUsersCreatedCourses/" + id)
            .success(function (data, status, headers, config) {
              callback(data);
            })
            .error(function (data, status, headers, config) {
              console.dir(data);
            });
        },
        listTiersCourses: function (tierId, callback) {
          $http.get("/api/v1/course/listTiersCourses/" + tierId)
            .success(function (data, status, headers, config) {
              callback(data);
            })
            .error(function (data, status, headers, config) {
              console.dir(data);
            });
        }
      };
      return Courses;
    }
  ]);
