module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            dist : {
                src : [
                    'src/skippr.js',
                ],
                dest: 'dist/skippr.js'
            }
        },

        uglify: {
            build: {
                src: 'dist/skippr.js',
                dest: 'dist/skippr.min.js'
            }
        },
        sass: {
            dist: {
                options: {
                    style:'compressed'
                },
                files: {
                    'assets/css/style.css' : 'assets/css/style.scss',
                    'dist/skippr.css' : 'src/skippr.scss'
                }
            }
        },
        cssmin : {
            combine : {
                files : {
                    'assets/production/app.css' : ['assets/css/style.css', 'assets/css/reset.css']
                }
            }
        },
        watch: {
            
            scripts: {
                files: ['src/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false
                }
            },
            css : {
                files : ['assets/css/*.scss'],
                tasks : ['sass', 'cssmin'],
                options : {
                    spawn : false
                }
            }
        }


    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', ['concat', 'uglify', 'sass', 'cssmin', 'watch']);

}