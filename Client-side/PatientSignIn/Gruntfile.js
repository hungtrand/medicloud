
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
//    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! Grunt Uglify <%= grunt.template.today("yyyy-mm-dd") %> */ '
      },
      build: {
        src: 'app.js',
        dest: 'app.js'
      }
    },
    browserify: {
      build: {
        src: 'app.dev.js',
        dest: 'app.js'
      }
    },
    watch: {
      files: ['**/*.js', '!app.js'],
      tasks: ['browserify']
    }
    
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', [
  'browserify',
  'uglify'
  ]);

};
