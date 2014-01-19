"use strict";

angular.module("ettoPupil")
  .directive("ettoTierGraph", ["$parse",

    function($parse) {
      return {
        restrict: "EA",
        link: function postLink(scope, element, attrs) {

          var chartEl = d3.select(element[0]);

          var data = $parse(attrs.data)(scope);

          var x = d3.scale.linear()
            .domain([0, d3.max(data)])
            .range([0, 320]);

          chartEl
            .selectAll("div")
            .data(data)
            .enter().append("div")
            .style("width", function(d) {
              return x(d) + "px";
            })
            .text(function(d) {
              return d;
            });

        }
      };
    }
  ])
  .directive("ettoOverallTierGraph", ["$parse",

    function($parse) {
      return {
        restrict: "EA",
        link: function postLink(scope, element, attrs) {



          var chartEl = d3.select(element[0]);

          var data = $parse(attrs.data)(scope);

          var x = d3.scale.linear()
            .domain([0, d3.max(data)])
            .range([0, 320]);

          chartEl
            .selectAll("div")
            .data(data)
            .enter().append("div")
            .style("width", function(d) {
              return x(d) + "px";
            })

          .text(function(d) {
            return d;
          });

        }
      };
    }
  ]);