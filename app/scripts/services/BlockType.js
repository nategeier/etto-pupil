"use strict";

angular.module("ettoPupil")
  .factory("BlockType", ["$resource", "Endpoint",
    function ($resource, Endpoint) {
      return $resource(Endpoint("blocktype"), {}, {
        update: {
          method: "PUT"
        }
      });
    }
  ]);
