"use strict";

/**
 * Invite Service
 * ============================================================================
 *
 * Creates AngularJS service "BlockQuiz".
 *
 */

angular.module("ettoPupil")
  .factory("Invite", [

    function () {

      var defaultAuth = {
        canPurchase: false,
        canGetCourses: true,
        canCreateCourses: true,
        canInvite: true,
        canEditCompany: false
      };

      var defaultUser = {
        emails: [""],
        auth: defaultAuth
      };

      var Invite = {
        defaultAuth: defaultAuth,
        defaultUser: defaultUser,
      };

      return Invite;
    }
  ]);
