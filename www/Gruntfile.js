/*jslint node: true */
module.exports = function (grunt) {
    'use strict';
    grunt.initConfig(
        {
            uglify: {
                combine: {
                    files: {
                        'dist/main.js': ['js/*.js', '!js/setup.js']
                    },
                    options: {
                        sourceMap: true
                    }
                },
                setup: {
                    files: {
                        'dist/setup.js': ['js/setup.js']
                    }
                }
            },
            watch: {
                scripts: {
                    files: ['js/*.js'],
                    tasks: ['uglify']
                }
            },
            jslint: {
                js: {
                    src: ['js/*.js']
                },
                Gruntfile: {
                    src: ['Gruntfile.js']
                }
            },
            validation: {
                files: {
                    src: ['index.html']
                },
                options: {
                    reportpath: false
                }
            },
            jsdoc : {
                doc : {
                    src: ['js/*.js', '../README.md', 'package.json'],
                    options: {
                        destination: 'doc'
                    }
                }
            }
        }
    );

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-html-validation');
    grunt.loadNpmTasks('grunt-jsdoc');

    grunt.registerTask('default', ['uglify']);
    grunt.registerTask('lint', ['jslint', 'validation']);
    grunt.registerTask('doc', ['jsdoc']);
};
