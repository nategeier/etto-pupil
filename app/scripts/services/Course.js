"use strict";

/**
 * @module Course
 * Course.js
 * ============================================================================
 *
 * Creates AngularJS services "Course" and "CourseLoader".
 *
 */

angular.module("ettoPupil")
/**
 * Course
 *
 * @param {course} newCourse Optional new course information.
 */
  .factory("Course", ["$resource",
    function ($resource) {
      return $resource("/api/v1/module", {}, {
        update: {
          method: "PUT"
        }
      });
    }
  ])
/**
 * CourseLoader
 *
 * @param {Object} findParams Optional keys to pass to find
 */
  .factory("CourseLoader", ["Course", "$route", "$q",
    function (Course, $route, $q) {
      return function () {
        var delay = $q.defer();
        Course.get({
          id: $route.current.params.courseId
        }, function (course) {
          delay.resolve(course);
        }, function () {
          // Are we in edit mode? If so, send back a new course.
          if ($route.current.controller === "CourseEditCtrl") {
            var newCourse = new Course({
              id: $route.current.params.courseId,
              blocks: [{
                type: "title",
                data: {
                  title: "This is a new course!",
                  subtitle: "Fill it with delicious educational goodness..."
                }
              }]
            });
            // TODO: This will end up creating a course for potentially any random ID...
            // Which is bad. Very bad. Instead do something on the "course-save" event.
            newCourse.$save();
            delay.resolve(newCourse);
          } else {
            delay.reject("Unable to fetch course " + $route.current.params.courseId);
          }
        });
        return delay.promise;
      };
    }
  ]);
