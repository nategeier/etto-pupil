"use strict";

angular.module("ettoPupil")
  .factory("Course", ["$resource",
    function ($resource) {
      return $resource("/api/v1/module", {}, {
        update: {
          method: "PUT"
        }
      });
    }
  ])
  .factory("CourseLoader", ["Course", "$route", "$q",
    function (Course, $route, $q) {
      return function () {
        var delay = $q.defer();
        Course.get({
          id: $route.current.params.courseId
        }, function (course) {
          delay.resolve(course);
        }, function () {
          delay.reject("Unable to fetch course " + $route.current.params.courseId);
        });
        return delay.promise;
      };
    }
  ]);
