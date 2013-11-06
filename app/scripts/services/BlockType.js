"use strict";

angular.module("enrollgoComposerApp")
.factory("BlockType", [ "$resource", function ( $resource ) {
  return $resource( "/api/v1/blocktype", {}, { update: { method: "PUT" }} );
}]);

