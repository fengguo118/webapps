module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            html: {
                files: ['public/views/**'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: ['public/js/**'],
                options: {
                    livereload: true
                }

            },
            css: {
                files: ['public/sass/**'],
                tasks: ['compass'],
                options: {
                    livereload: true
                }
            },
						src: {
							files: ['app/**/*.js', 'config/**/*.js', 'test/**/*'],
							tasks: ['mochaTest:devTest'],
							options : {
								spawn: false
							}
						}
        },
        jshint: {
            all: ['gruntfile.js']
        },
//        compass: { // Task
//            dist: { // Target
//                options: { // Target options
//                    sassDir: 'public/sass',
//                    cssDir: 'public/css',
//                    environment: 'production'
//                }
//            },
//            dev: { // Another target
//                options: {
//                    sassDir: 'public/sass',
//                    cssDir: 'public/css'
//                }
//            }
//        },
        nodemon: {
            dev: {
                options: {
                    file: 'app.js',
                    args: [],
                    ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
                    watchedExtensions: ['js'],
                    watchedFolders: ['app', 'config'],
                    debug: true,
                    delayTime: 1,
                    env: {
                        PORT: 8888,
//												NODE_ENV: 'developement'
												NODE_ENV: 'development'
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
				mochaTest : {
					options: {
						reporter: 'spec',
						require: 'should'
					},
					unit:{
						src: ['test/*.js', 'test/**/*.json']
					},
					acceptance: {
						src: ['test/acceptance/*.js']
					},
					devTest: {
						src: ['test/acceptance/test-staff.bypass.js']
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
//    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
		grunt.loadNpmTasks('grunt-mocha-test');

    // Default task(s).
//    grunt.registerTask('default', ['jshint', 'mochaTest']);
    grunt.registerTask('default', ['nodemon']);
    grunt.registerTask('dev', ['jshint', 'watch']);
    // grunt.registerTask('default', ['jshint', 'compass', 'concurrent:target']);
};