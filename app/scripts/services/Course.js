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
  .factory("Course", ["$resource", "Endpoint",
    function ($resource, Endpoint) {
      return $resource(Endpoint("course"), {}, {
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
.factory("CourseLoader", ["Course", "$q", "$state",
  function (Course, $q, $state) {

    return function (courseId) {
      var delay = $q.defer();
      Course.get({
        id: courseId
      }, function (course) {
        delay.resolve(course);
      }, function () {
        // Are we in edit mode? If so, send back a new course.

        if ($state.current.controller === "CourseEditCtrl") {

          var newCourse = new Course({
            _id: "540ca9c0f066cb43ef4b9fe2",
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
          delay.reject("Unable to fetch course " + "540ca9c0f066cb43ef4b9fe2");
        }

      });
      return delay.promise;
    };
  }
]);
