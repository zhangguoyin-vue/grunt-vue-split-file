/*
 * grunt-vue-split-file
 * https://github.com/zhang/grunt-vue-split-file
 *
 * Copyright (c) 2020 zhangguoyin
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    vue_split_file: {
      options: {
        excepts:["test/ZhangTest.vue"]
      },
      yasuo: {
        files: [
          {
            expand: true,//表示使用相对路径
            cwd: "test/",//相对路径的根目录
            src: "**/*.vue",//相对路径下需要压缩的文件，*表示所有该后缀类型的文件，写具体的就是某个具体的文件将会被压缩
            dest: "tmp"//压缩后的文件需要放置的目录，如果不存在的话，会自动创建
          }
        ]
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'vue_split_file', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['test']);

};
