"use strict";

angular.module("ettoPupil")
  .directive("ettoBlockMap", [

    function () {
      return {
        restrict: "EA",
        controller: function ($scope, leafletBoundsHelpers) {

          var editedBlock;
          var blockBounds;
          var blockCenter;
          var blockMarkers = {};

          $scope.startMap = function (block) {
            editedBlock = block;

            if (!block.bounds) {
              blockBounds = [

                [45.84410779560204, -121.39068603515625],
                [44.879228141635245, -124.17022705078124]

              ];
              blockCenter = {
                lat: 45.523452,
                lng: -122.676207,
                zoom: 9
              };
            } else {
              blockBounds = block.bounds;
              blockCenter = block.center;
              if (block.markers) {
                blockMarkers = block.markers;
              } else {
                block.markers = blockMarkers;
              }
            }

            var bounds = leafletBoundsHelpers.createBoundsFromArray(blockBounds);

            angular.extend($scope, {
              center: blockCenter,
              bounds: bounds,
              defaults: {
                scrollWheelZoom: false
              },
              events: {
                map: {
                  enable: ["zoomend", "drag", "click", "mouseup"],
                  logic: "emit"
                }
              },
              markers: blockMarkers
            });
          };

          $scope.addMarker = function () {

            $scope.markers.marker = {
              lat: $scope.center.lat,
              lng: $scope.center.lng,
              focus: true,
              draggable: true
            };
          };

          $scope.$watch("bounds", function () {
            editedBlock.bounds = [

              [$scope.bounds.northEast.lat, $scope.bounds.northEast.lng],
              [$scope.bounds.southWest.lat, $scope.bounds.southWest.lng]

            ];
          });

          var firstTime = 0;

          $scope.$watchCollection("markers.marker", function () {

            editedBlock.markers = $scope.markers;

            if (firstTime >= 1) {
              $scope.saveCourse();
            }
            firstTime++;
          });

          $scope.$watch("center", function () {
            editedBlock.center = $scope.center;
          });
        },

        link: function postLink(scope, element, attrs) {

        }

      };
    }
  ]);
