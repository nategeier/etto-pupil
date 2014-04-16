"use strict";

angular.module("ettoPupil")
  .factory("BlockType", ["$resource",
    function ($resource) {
      return $resource("https://archimedes.jit.su/blocktype", {}, {
        update: {
          method: "PUT"
        }
      });
    }
  ]);
