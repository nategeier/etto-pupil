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
        listUsersCreatedCourses: function (user, callback) {
          $http.post("/api/v1/user/list_users_created_courses", user)
            .success(function (data, status, headers, config) {
              callback(data);
            })
            .error(function (data, status, headers, config) {
              console.dir(data);
            });
        },
        listTiersCourses: function (courses, callback) {
          $http.post("/api/v1/course/listTiersCourses", courses)
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
