'use strict';

module.exports = function(grunt) {
   grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      clean: {
         options: {
            force: true
         },
         output: ['js/_output']
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
               src: '**/*.js',
               dest: 'js/_output',
               ext: '.min.js'
            }]
         },
         options: {

         },
      }
   });

   grunt.loadNpmTasks('grunt-contrib-clean');
   grunt.loadNpmTasks('grunt-typescript');
   grunt.loadNpmTasks('grunt-contrib-jshint');
   grunt.loadNpmTasks('grunt-contrib-uglify');
   grunt.registerTask('default', ['typescript','jshint']);
   grunt.registerTask('build', ['clean','typescript','jshint','uglify']);
};
