"use strict";

angular.module("ettoPupil")
  .factory("CourseList", ["$http", "$compile", "$document", "$modal", "$location", "$resource", "Endpoint",
    function ($http, $compile, $document, $modal, $location, $resource, Endpoint) {
      var Courses;

      Courses = {

        storeCourses: function (callback) {
          $http.get(Endpoint("store", "storeCourses"))
            .success(function (data, status, headers, config) {
              callback(data);
            })
            .error(function (data, status, headers, config) {
              console.dir(data);
            });
        },

        listAll: function (callback) {
          $http.get(Endpoint("course"))
            .success(function (data, status, headers, config) {
              //user = data.user;
              callback(data);
            })
            .error(function (data, status, headers, config) {
              console.dir(data);
            });
        },
        listUsersCreatedCourses: function (id, callback) {
          $http.get(Endpoint("user", "listUsersCreatedCourses/") + id)
            .success(function (data, status, headers, config) {
              callback(data);
            })
            .error(function (data, status, headers, config) {
              console.dir(data);
            });
        },
        listTiersCourses: function (tierId, callback) {
          $http.get(Endpoint("course", "listTiersCourses/") + tierId)
            .success(function (data, status, headers, config) {
              callback(data);
            })
            .error(function (data, status, headers, config) {
              console.dir(data);
            });
        },
        listCompanyCourses: function (tierId, done) {
          var Courses = $resource(Endpoint("course", "listCompanyCourses/") + "/:id", {
            id: tierId
          });

          Courses.query(function (results) {
            done(results);
          });
        }
      };
      return Courses;
    }
  ]);
