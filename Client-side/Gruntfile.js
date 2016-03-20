module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        browserify: {
            hpCenter: {
                src: ["hp-center/app.dev.js"],
                dest: "hp-center/app.js"
            }
        },

        uglify: {
            build: {
                src: ["app.js"],
                dest: ["app.js"]
            }
        },

        watch: {
            hpCenter: {
		files: ["hp-center/**/*.js", "!hp-center/app.js"],
		tasks: ["browserify:hpCenter"]
	    }
        }  
    });

    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-watch");

    grunt.registerTask('default', ['browserify', 'uglify']);
}
