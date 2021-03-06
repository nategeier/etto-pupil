"use strict";

angular.module("ettoPupil")
  .factory("Tier", ["$resource", "Endpoint",
    function ($resource, Endpoint) {

      var company;

      return {
        findTier: function (id, callback) {
          var FindTier = $resource(Endpoint("tier") + "/:id", {
            id: id
          });

          FindTier.get(function (results) {
            callback(results);
          });
        },

        listTiersCourses: function (id, callback) {
          var Courses = $resource(Endpoint("course", "listTiersCourses") + "/:id", {
            id: id
          });

          Courses.query(function (results) {
            callback(results);
          });
        },

        getCompany: function (id, callback) {
          var Company = $resource(Endpoint("tier", "getCompany") + "/:id", {
            id: id
          });

          Company.get(function (results) {
            company = results;
            callback(results);
          });
        },

        currentCompany: function () {
          return company;
        },

        listCompanyCreatedCourses: function (id, callback) {
          var Courses = $resource(Endpoint("course", "listCompanyCreatedCourses") + "/:id", {
            id: id
          });

          Courses.query(function (results) {
            callback(results);
          });
        },

        searchTiers: function (text, isAdmin, callback) {
          var Tiers = $resource(Endpoint("tier", "searchTier") + "/:text/:isAdmin", {
            text: text,
            isAdmin: isAdmin
          });

          Tiers.query(function (results) {
            callback(results);
          });
        }

      };
    }
  ]);
