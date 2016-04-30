module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
    browserify: {
        signin: {
            src: ["sign-in/app.dev.js"],
    dest: "sign-in/app.js"
        },
    hpCenter: {
        src: ["hp-center/app.dev.js"],
    dest: "hp-center/app.js"
    },
    patientCenter: {
        src: ["patient-center/app.dev.js"],
        dest: "patient-center/app.js"
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
        },
        signin: {
            src: "sign-in/app.js",
            dest: "sign-in/app.js"
        },
        patientCenter: {
            src: "patient-center/app.js",
            dest: "patient-center/app.js"
        },
        patientSignUp: {
            src: "patientSignUp/app.js",
            dest: "patientSignUp/app.js"
        }
    },

    watch: {
        signin: {
            files: ["sign-in/**/*.js", "!sign-in/app.js"],
            tasks: ["browserify:signin"]
        },
        hpCenter: {
            files: ["hp-center/**/*.js", "!hp-center/app.js"],
            tasks: ["browserify:hpCenter"]
        },
        patientCenter: {
            files: ["patient-center/**/*.js", "!patient-center/app.js"],
            tasks: ["browserify:patientCenter"]
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
