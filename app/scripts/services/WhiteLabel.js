"use strict";

/**
 * Invite Service
 * ============================================================================
 *
 * Creates AngularJS service "Color".
 *
 */

angular.module("ettoPupil")
  .factory("WhiteLabel", [

    function () {

      var colors = {};
      var font = "Lato";

      var setColors = function (dbColors, dbFont) {
        colors = dbColors;
        this.giveColors();

        font = dbFont;

        WebFont.load({
          google: {
            families: [dbFont]
          }
        });
        $("<style> body, h1, h2, h3, h4, h5 { font-family: '" + font + "'} </style>").appendTo("head");
      };

      var giveColors = function () {
        $("<style> .etto-color-primary { color: " + colors.primary + "; } </style>").appendTo("head");
        $("<style> .etto-color-secondary { color: " + colors.secondary + "; } </style>").appendTo("head");
        $("<style> .etto-color-accent { color: " + colors.accent + "; } </style>").appendTo("head");
        $("<style> .etto-color-light { color: " + colors.light + "; } </style>").appendTo("head");
        $("<style> .etto-color-dark { color: #000000; } </style>").appendTo("head");

        $("<style> .etto-bgcolor-primary { background-color: " + colors.primary + "; } </style>").appendTo("head");
        $("<style> .etto-bgcolor-secondary { background-color: " + colors.secondary + "; } </style>").appendTo("head");
        $("<style> .etto-bgcolor-accent { background-color: " + colors.accent + "; } </style>").appendTo("head");
        $("<style> .etto-bgcolor-light { background-color: " + colors.light + "; } </style>").appendTo("head");
        $("<style> .etto-bgcolor-white { background-color: #ffffff; } </style>").appendTo("head");

        $("<style> .etto-bgcolor-light-hover:hover { background-color: " + colors.light + "; cursor: pointer; } </style>").appendTo("head");

      };

      var WhiteLabel = {
        setColors: setColors,
        giveColors: giveColors
      };

      return WhiteLabel;

    }

  ]);
