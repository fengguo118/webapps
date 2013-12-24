module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            html: {
                files: ['app/views/**'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: ['app/js/**', 'config/**'],
                options: {
                    livereload: true
                }

            },
            css: {
                files: ['app/css/**'],
                tasks: ['compass'],
                options: {
                    livereload: true
                }
            }
        },
        jshint: {
            all: ['gruntfile.js']
        },
        compass: { // Task
            dist: { // Target
                options: { // Target options
                    cssDir: 'app/css',
                    environment: 'production'
                }
            },
            dev: { // Another target
                options: {
                    cssDir: 'app/css'
                }
            }
        },
        nodemon: {
            dev: {
                options: {
                    file: 'scripts/web-server.js',
                    args: [],
                    ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
                    watchedExtensions: ['js'],
                    watchedFolders: ['scripts'],
                    debug: true,
                    delayTime: 1,
                    env: {
                        PORT: 3000,
												NODE_ENV: 'developement'
                    },
                    cwd: __dirname										
                }
            },
            exec: {
                options: {
                    exec: 'less'
                }
            }
        },
        concurrent: {
            target: {
                tasks: ['nodemon', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        }
    });

    // Load NPM tasks 
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');

    // Default task(s).
    grunt.registerTask('default', ['jshint', 'compass', 'concurrent:target']);
};