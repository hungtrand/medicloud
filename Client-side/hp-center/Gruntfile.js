module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        browserify: {
            main: {
                src: ["app.dev.js"],
                dest: "app.js"
            }
        },

        uglify: {
            build: {
                src: ["app.js"],
                dest: ["app.js"]
            }
        },

        watch: {
            files: ["**/*.js", "!app.js"],
            tasks: ["browserify"]
        }  
    });

    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-watch");

    grunt.registerTask('default', ['browserify', 'uglify']);
}
