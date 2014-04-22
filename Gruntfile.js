// Generated on 2013-10-21 using generator-angular 0.4.0
"use strict";
var LIVERELOAD_PORT = 35730;
var SERVER_PORT = 4210;
var lrSnippet = require("connect-livereload")({
  port: LIVERELOAD_PORT
});
var mountFolder = function (connect, dir) {
  return connect.static(require("path").resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
  require("load-grunt-tasks")(grunt);
  require("time-grunt")(grunt);
  grunt.loadNpmTasks("sassdown");

  // configurable paths
  var yeomanConfig = {
    app: "app",
    dist: "dist"
  };

  try {
    yeomanConfig.app = require("./bower.json").appPath || yeomanConfig.app;
  } catch (e) {}

  grunt.initConfig({
    yeoman: yeomanConfig,
    watch: {
      jade: {
        files: ["<%= yeoman.app %>/*.jade", "<%= yeoman.app %>/views/**/{,*/}*.jade", "<%= yeoman.app %>/view/{,*/}*.jade"],
        tasks: ["newer:jade:dist"],
        spawn: false,
      },
      coffee: {
        files: ["<%= yeoman.app %>/scripts/{,*/}*.coffee"],
        tasks: ["coffee:dist"],
        spawn: false,
      },
      coffeeTest: {
        files: ["test/spec/{,*/}*.coffee"],
        tasks: ["coffee:test"],
        spawn: false,
      },
      //compass: {
      //files: ["<%= yeoman.app %>/styles/{,*/}*.{scss,sass}"],
      //tasks: ["compass:server", "autoprefixer"]
      //},
      sass: {
        files: ["<%= yeoman.app %>/styles/{,*/}*.{scss,sass}"],
        tasks: ["sass:server", "autoprefixer"],
        spawn: false,
      },
      styles: {
        files: ["<%= yeoman.app %>/styles/{,*/}*.css"],
        tasks: ["copy:styles", "autoprefixer"],
        spawn: false,
      },
      livereload: {
        options: {
          livereload: LIVERELOAD_PORT,
          spawn: false,
        },
        files: [
          "<%= yeoman.app %>/index.html",
          ".tmp/views/**/{,*/}*.html",
          ".tmp/styles/{,*/}*.css",
          "{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js",
          "<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}"
        ]
      },
      dox: {
        options: {
          livereload: LIVERELOAD_PORT + 1,
          spawn: false,
        },
        files: [
          "<%= yeoman.app %>/scripts/**/*.js",
        ],
        tasks: ["dox"],
      },
    },
    jade: {
      dist: {
        options: {
          pretty: true
        },
        files: [{
          expand: true,
          cwd: "<%= yeoman.app %>",
          src: ["index.jade", "views/**/*.jade"],
          dest: ".tmp",
          ext: ".html"
        }]
      }
    },
    autoprefixer: {
      options: ["last 1 version"],
      dist: {
        files: [{
          expand: true,
          cwd: ".tmp/styles/",
          src: "{,*/}*.css",
          dest: ".tmp/styles/"
        }]
      }
    },
    connect: {
      options: {
        port: SERVER_PORT,
        // Change this to "0.0.0.0" to access the server from outside.
        hostname: "0.0.0.0"
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, ".tmp"),
              mountFolder(connect, yeomanConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, ".tmp"),
              mountFolder(connect, "test")
            ];
          }
        }
      },
      throttle: {
        options: {
          port: SERVER_PORT + 1,
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, ".tmp"),
              mountFolder(connect, yeomanConfig.app)
            ];
          }
        },
      },
      throttledist: {
        options: {
          port: SERVER_PORT + 1,
          middleware: function (connect) {
            return [
              mountFolder(connect, yeomanConfig.dist)
            ];
          }
        }
      },
      dist: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, yeomanConfig.dist)
            ];
          }
        }
      },
      dox: {
        options: {
          port: 8080,
          middleware: function (connect) {
            return [
              require("connect-livereload")({
                port: LIVERELOAD_PORT + 1
              }),
              mountFolder(connect, "docs"),
            ];
          }
        }
      },
      styleguide: {
        options: {
          port: 8080,
          middleware: function (connect) {
            return [
              mountFolder(connect, "styleguide")
            ];
          }
        }
      }
    },
    open: {
      server: {
        url: "http://localhost:<%= connect.options.port %>"
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            ".tmp",
            "<%= yeoman.dist %>/*",
            "!<%= yeoman.dist %>/.git*"
          ]
        }]
      },
      server: ".tmp",
      styleguide: "styleguide"
    },
    jshint: {
      options: grunt.util._.defaults({
        "unused": false,
        "camelcase": false
      }, grunt.file.readJSON(".jshintrc")),
      all: [
        "Gruntfile.js",
        "<%= yeoman.app %>/scripts/{,*/}*.js"
      ]
    },
    jsbeautifier: {
      modify: {
        src: ["Gruntfile.js", "<%= yeoman.app %>/scripts/**/*.js"],
        options: {
          config: ".jsbeautifyrc"
        }
      },
      verify: {
        src: ["Gruntfile.js", "<%= yeoman.app %>/scripts/**/*.js"],
        options: {
          mode: "VERIFY_ONLY",
          config: ".jsbeautifyrc"
        }
      }
    },
    jscs: {
      main: [
        "<%= yeoman.app %>/scripts/**/*.js"
      ]
    },
    coffee: {
      options: {
        sourceMap: true,
        sourceRoot: ""
      },
      dist: {
        files: [{
          expand: true,
          cwd: "<%= yeoman.app %>/scripts",
          src: "{,*/}*.coffee",
          dest: ".tmp/scripts",
          ext: ".js"
        }]
      },
      test: {
        files: [{
          expand: true,
          cwd: "test/spec",
          src: "{,*/}*.coffee",
          dest: ".tmp/spec",
          ext: ".js"
        }]
      }
    },
    compass: {
      options: {
        sassDir: "<%= yeoman.app %>/styles",
        cssDir: ".tmp/styles",
        sourcemap: true,
        generatedImagesDir: ".tmp/images/generated",
        imagesDir: "<%= yeoman.app %>/images",
        javascriptsDir: "<%= yeoman.app %>/scripts",
        fontsDir: "<%= yeoman.app %>/styles/fonts",
        importPath: "<%= yeoman.app %>/bower_components",
        httpImagesPath: "/images",
        httpGeneratedImagesPath: "/images/generated",
        httpFontsPath: "/styles/fonts",
        relativeAssets: false
      },
      dist: {},
      server: {
        options: {
          debugInfo: true
        }
      }
    },
    sass: {
      options: {
        includePaths: [
          "<%= yeoman.app %>/bower_components",
        ],
      },
      server: {
        files: {
          ".tmp/styles/main.css": "<%= yeoman.app %>/styles/main.scss",
        },
        options: {
          outputStyle: "compressed",
          sourceComments: "map",
          sourceMap: "./app/styles/main.css.map",
        },
      },
      dist: {
        files: {
          ".tmp/styles/main.css": "<%= yeoman.app %>/styles/main.scss",
        },
        options: {
          outputStyle: "compressed",
        },
      },
    },
    // not used since Uglify task does concat,
    // but still available if needed
    /*concat: {
      dist: {}
    },*/
    rev: {
      dist: {
        files: {
          src: [
            "<%= yeoman.dist %>/scripts/{,*/}*.js",
            "<%= yeoman.dist %>/styles/{,*/}*.css",
            //"<%= yeoman.dist %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}",
            "<%= yeoman.dist %>/styles/fonts/*"
          ]
        }
      }
    },
    useminPrepare: {
      html: "<%= yeoman.app %>/index.html",
      options: {
        dest: "<%= yeoman.dist %>"
      }
    },
    usemin: {
      html: ["<%= yeoman.dist %>/{,*/}*.html", "<%= yeoman.dist %>/views/**/*.html"],
      css: ["<%= yeoman.dist %>/styles/{,*/}*.css"],
      options: {
        dirs: ["<%= yeoman.dist %>"]
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: "<%= yeoman.app %>/images",
          src: "**/*.{png,jpg,jpeg}",
          dest: "<%= yeoman.dist %>/images"
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: "<%= yeoman.app %>/images",
          src: "{,*/}*.svg",
          dest: "<%= yeoman.dist %>/images"
        }]
      }
    },
    cssmin: {
      // By default, your `index.html` <!-- Usemin Block --> will take care of
      // minification. This option is pre-configured if you do not wish to use
      // Usemin blocks.
      // dist: {
      //   files: {
      //     "<%= yeoman.dist %>/styles/main.css": [
      //       ".tmp/styles/{,*/}*.css",
      //       "<%= yeoman.app %>/styles/{,*/}*.css"
      //     ]
      //   }
      // }
    },
    htmlmin: {
      dist: {
        options: {
          /*removeCommentsFromCDATA: true,
          // https://github.com/yeoman/grunt-usemin/issues/44
          //collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: "<%= yeoman.app %>",
          src: ["*.html"],
          dest: "<%= yeoman.dist %>"
        }]
      }
    },
    // Put files not handled in other tasks here

    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: "<%= yeoman.app %>",
          dest: "<%= yeoman.dist %>",
          src: [
            "*.{ico,png,txt}",
            ".htaccess",
            "bower_components/**/*",
            "images/{,*/}*.{gif,webp}",
            "styles/fonts/*"
          ]
        }, {
          expand: true,
          cwd: ".tmp/images",
          dest: "<%= yeoman.dist %>/images",
          src: [
            "generated/*"
          ]
        }, {
          expand: true,
          cwd: ".tmp/views",
          dest: "<%= yeoman.dist %>/views",
          src: [
            "{,*/}*.html"
          ]
        }]
      },
      styles: {
        files: [{
          expand: true,
          cwd: "<%= yeoman.app %>/styles",
          dest: ".tmp/styles/",
          src: "{,*/}*.css"
        }]
      },
      sass: {
        files: [{
          expand: true,
          cwd: "<%= yeoman.app %>/styles",
          dest: ".tmp/app/styles/",
          src: "**/*.{sass,scss}"
        }]
      },
      styleguide: {
        expand: true,
        cwd: ".tmp/styles",
        dest: "styleguide/styles/",
        src: "{,*/}*.css"
      }
    },
    concurrent: {
      server: [
        "coffee:dist",
        "sass:server",
        "copy:sass",
        "copy:styles",
        "jade:dist",
      ],
      test: [
        "coffee",
        "sass",
        "copy:styles",
      ],
      dist: [
        "coffee",
        "sass:dist",
        "copy:styles",
        "imagemin",
        "svgmin",
        "htmlmin",
      ],
      serverwatch: {
        options: {
          logConcurrentOutput: true,
        },
        tasks: [
          "watch:jade",
          "watch:coffee",
          "watch:coffeeTest",
          "watch:sass",
          "watch:styles",
          "watch:livereload",
        ],
      },
    },
    karma: {
      unit: {
        configFile: "karma.conf.js",
        singleRun: true
      }
    },
    cdnify: {
      dist: {
        html: ["<%= yeoman.dist %>/*.html"]
      }
    },
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: "<%= yeoman.dist %>/scripts",
          src: "*.js",
          dest: "<%= yeoman.dist %>/scripts"
        }]
      }
    },
    uglify: {
      options: {
        mangle: false
      },
      dist: {
        files: {
          "<%= yeoman.dist %>/scripts/scripts.js": [
            "<%= yeoman.dist %>/scripts/scripts.js"
          ]
        }
      }
    },
    sassdown: {
      options: {
        assets: ["styles/main.css"],
        template: "<%= yeoman.app %>/styles/sassdown-template.hbs"
      },
      files: {
        expand: true,
        cwd: "<%= yeoman.app %>/styles",
        src: ["**/*.{sass,scss}"],
        dest: "styleguide/"
      }
    },
    dox: {
      options: {
        template: "dox/views/template.jade"
      },
      files: {
        src: ["app/scripts/"],
        dest: "docs"
      }
    },
    throttle: {
      default: {
        remote_host: "localhost",
        remote_port: SERVER_PORT + 1,
        local_host: "0.0.0.0",
        local_port: SERVER_PORT,
        downstream: grunt.option("down") * 1024 || 100 * 1024,
        upstream: grunt.option("up") * 1024 || 10 * 1024,
      }
    },
    compress: {
      main: {
        options: {
          mode: "gzip",
        },
        expand: true,
        cwd: "dist/",
        src: ["**/*"],
        dest: "dist/",
      }
    }
  });

  grunt.registerTask("serve", function (target) {
    if (target === "dist") {
      return grunt.task.run(["build", "open", "connect:dist:keepalive"]);
    }

    if (target === "throttledist") {
      return grunt.task.run(["throttle", "connect:throttledist:keepalive"]);
    }

    if (target === "dox") {
      return grunt.task.run(["dox", "connect:dox", "watch:dox"]);
    }

    if (target === "styleguide") {
      return grunt.task.run(["styleguide", "connect:styleguide:keepalive"]);
    }

    var tasks = [
      "clean:server",
      "concurrent:server",
      "autoprefixer",
      "open",
      "concurrent:serverwatch",
    ];

    if (target === "throttle") {
      tasks.unshift("throttle");
      tasks.unshift("connect:throttle");
    } else {
      tasks.unshift("connect:livereload");
    }

    grunt.task.run(tasks);
  });

  grunt.registerTask("test", [
    "clean:server",
    "concurrent:test",
    "autoprefixer",
    "connect:test",
    "karma"
  ]);

  grunt.registerTask("verify", [
    "jsbeautifier:verify",
    "jshint"
  ]);

  grunt.registerTask("beautify", [
    "jsbeautifier:modify",
    "jshint"
  ]);

  grunt.registerTask("styleguide", [
    "clean:styleguide",
    "sass:dist",
    "copy:styleguide",
    "sassdown"
  ]);

  grunt.registerTask("build", [
    "clean:dist",
    "useminPrepare",
    "concurrent:dist",
    "autoprefixer",
    "concat",
    "jade",
    "copy:dist",
    "cdnify",
    "ngmin",
    "cssmin",
    "uglify",
    "rev",
    "usemin",
    "compress",
  ]);

  grunt.registerTask("default", [
    "jshint",
    "jsbeautifier:verify",
    "test",
    "build"
  ]);
};
