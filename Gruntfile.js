'use strict';

module.exports = function(grunt) {
   grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      clean: {
         options: {
            // force: false
         },
         files: ['js/_output/*','*.min.html','css/*.min.css'],
         folders: ['dist']
      },


      typescript : {
         options: {
            module: 'commonjs'
         },
         all: {
            src: ['js/*.ts'],
            dest: 'js/_output'
         }
      },
      less: {
         development: {
            options: {
               cleancss: false,
               compress: false,
               modifyVars: {
                  'base-color':'#FF9900'
               }
            },
            files : [{
               expand: true,
               cwd: 'css/',
               dest: 'css/',
               src: ['*.less'],
               ext: '.css',
               extDot: 'last'
            }]
            // files: {
            //    'css/main.css':'css/main.less'
            // }
         }
      },


      jshint: {
         options: {
            // force: true, // force all errors to pass :(
            '-W069': false, // failure due to the way ts works w/enums
            '-W004': false, //Failure due to ts inheritance
            // Ingore specific file(s) and all files with .min.js
            ignores: ['js/_output/ignore.js','**/*.min.js'],
            reporterOutput: 'jshint.txt'
         },
         files: ['js/_output/*.js']
      },
      htmlhint: {
         templates: {
            options: {
               'attr-lower-case': true,
               'attr-value-not-empty': true,
               'tag-pair': true,
               'tag-self-close': true,
               'tagname-lowercase': true,
               'id-class-value': true,
               'id-class-unique': true,
               'src-not-empty': true,
               'img-alt-required': true,
            },
            src: ['*.html']
         }
      },
      csslint : {
         strict: {
            options: {
            },
            src: ['css/*.css']
         },
         laxed: {
            options: {
               // 'zero-units': false // inline rules
               csslintrc: 'lintrules.json' // External rules config
            },
            src: ['css/*.css']
         }
      },

      uglify: {
         development: {
            // Smash all files into a single file
            // files: {
            //    'js/_output/output.min.js': ['js/_output/*.js'],
            // }

            // Dynamically uglify all files, rename to .min.js leave other files intact
            files: [{
               expand: true,
               cwd: 'js/_output',
               src: ['**/*.js','!*.min.js'],
               dest: 'js/_output',
               ext: '.min.js'
            }]
         },
         options: {
            mangle: true, // Don't obfuscate vars and methods
            compress: {
               drop_console: true // Remove all calls to console
            },
            beautify: false, // Make compressed/minified files readable
         },
      },
      htmlmin: {
         dev: {
            options: {
               removeEmptyAttributes: true,
               removeEmptyElements: true,
               removeRedundantAttributes: true,
               removeComments: true,
               removeOptionalTags: true,
               collapseWhitespace: true
            },
            // files: {
            //    'index.min.html': ['index.html']
            // }
            files: [{
               expand: true,
               cwd: '',
               dest: '',
               src: ['*.html'],
               ext: '.min.html',
               extDot: 'last'
            }]
         }
      },
      cssmin: {
         minify: {
            expand: true,
            cwd: 'css/',
            src: ['*.css','!*.min.css'], // != don't include *.min.css files
            dest: 'css/',
            ext: '.min.css',
            extDot: 'last'
         },
         // Squash everything into a single minified css file
         // concat: {
         //    options: {
         //    },
         //    files: {
         //       'global.min.css': ['css/*.css']
         //    }
         // }
         // Minify a Single file
         // min: {
         //    options: {
         //       'report':'gzip' // Show the gzip size after minification
         //    },
         //    files: {
         //       'css/main.min.css': ['css/main.css']
         //    }
         // }
      }
   });

   // Clean
   grunt.loadNpmTasks('grunt-contrib-clean');

   // Compile
   grunt.loadNpmTasks('grunt-typescript');
   grunt.loadNpmTasks('grunt-contrib-less');

   // Lint
   grunt.loadNpmTasks('grunt-contrib-jshint');
   grunt.loadNpmTasks('grunt-htmlhint');
   grunt.loadNpmTasks('grunt-contrib-csslint');

   // Shrink
   grunt.loadNpmTasks('grunt-contrib-uglify');
   grunt.loadNpmTasks('grunt-contrib-htmlmin');
   grunt.loadNpmTasks('grunt-contrib-cssmin');

   grunt.registerTask('lint', ['jshint','htmlhint','csslint']);
   grunt.registerTask('shrink', ['uglify','htmlmin','cssmin']);
   grunt.registerTask('compile', ['typescript','less']);
   grunt.registerTask('build', ['clean','compile','lint','shrink']);
   grunt.registerTask('default', ['clean','compile','lint']);
};
