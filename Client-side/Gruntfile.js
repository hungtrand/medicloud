module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        browserify: {
	        hpSignIn: {
		        src: ["hp-sign-in/app.dev.js"],
		        dest: "hp-sign-in/app.js"
	        },
            hpCenter: {
                src: ["hp-center/app.dev.js"],
                dest: "hp-center/app.js"
            },
            patientSignUp: {
                src: ["patientSignUp/app.dev.js"],
                dest: "patientSignUp/app.js"
            }
        },

        uglify: {
            hpCenter: {
                src: "hp-center/app.js",
                dest: "hp-center/app.js"
            }
        },

        watch: {
	        hpSignIn: {
		        files: ["hp-sign-in/**/*.js", "!hp-sign-in/app.js"],
		        tasks: ["browserify:hpSignIn"]
	        },
             hpCenter: {
		        files: ["hp-center/**/*.js", "!hp-center/app.js"],
		        tasks: ["browserify:hpCenter"]
	        },
            patientSignUp: {
                files: ["patientSignUp/**/*.js", "!patientSignUp/app.js"],
                tasks: ["browserify:patientSignUp"]
            }
        }
    });

    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-watch");

    grunt.registerTask('default', ['browserify', 'uglify']);
}
