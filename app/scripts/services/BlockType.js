"use strict";

angular.module("ettoPupil")
  .factory("BlockType", ["$resource",
    function ($resource) {
      return $resource("/api/v1/blocktype", {}, {
        update: {
          method: "PUT"
        }
      });
    }
  ]);
