// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function (config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: "",

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ["jasmine"],

    // list of files / patterns to load in the browser
    files: [

      "app/bower_components/jquery/jquery.min.js",
      "app/bower_components/angular/angular.js",
      "app/bower_components/angular-animate/angular-animate.js",
      "app/bower_components/angular-resource/angular-resource.js",
      "app/bower_components/angular-sanitize/angular-sanitize.js",
      "app/bower_components/angular-bootstrap/ui-bootstrap.js",
      "app/bower_components/angular-bootstrap/ui-bootstrap-tpls.js",
      "app/bower_components/angular-touch/angular-touch.js",
      "app/bower_components/angular-leaflet-directive/dist/angular-leaflet-directive.js",
      "app/bower_components/ngAutocomplete/src/ngAutocomplete.js",
      "app/bower_components/async/lib/async.js",
      "app/bower_components/angular-ui-router/release/angular-ui-router.js",
      "app/bower_components/AutoLinker.js/src/AutoLinker.js",
      "app/bower_components/angular-mocks/angular-mocks.js",
      "app/bower_components/socket.io-client/socket.io.js",
      "app/bower_components/angular-embed-codepen/dist/embed-codepen.min.js",
      "app/bower_components/angular-loading-bar/src/loading-bar.js",
      "app/bower_components/ng-file-upload/angular-file-upload.min.js",
      "app/bower_components/angular-xeditable/dist/js/xeditable.min.js",
      "app/bower_components/angular-bootstrap-toggle-switch/angular-toggle-switch.js",
      "app/vendor/soundcloud-sdk.js",

      "app/bower_components/greensock/src/minified/TweenMax.min.js",

      "app/scripts/*.js",
      "app/scripts/**/*.js",
      "app/scripts/**/**/*.js",
      "app/scripts/**/**/**/*.js",
      // CoffeScript tests take precedence over JS
      "test/**/*.coffee",
      "test/**/*.js",
      "test/**/**/*.js",
      "test/**/**/**/*.js",
      "test/**/**/**/**/*.js",

      "app/views/**/*.jade"
    ],

    // list of files / patterns to exclude
    exclude: [],

    preprocessors: {
      "test/**/*.coffee": "coffee",
      "app/views/**/*.jade": ["ng-html2js"],
      "app/scripts/**/*.js": ["coverage"]
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: "app/",
      prependPrefix: "/"
    },

    // web server port
    port: 8080,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ["PhantomJS" /*, "Chrome", "Firefox"*/ ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    reporters: ["progress", "coverage"]
  });
};
