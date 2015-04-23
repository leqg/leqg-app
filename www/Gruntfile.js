/*jslint node: true */
module.exports = function (grunt) {
    'use strict';
    grunt.initConfig(
        {
            typescript: {
                combine: {
                    files: {
                        'dist/main.js': ['ts/*.ts', '!ts/setup.ts']
                    }
                },
                setup: {
                    files: {
                        'dist/setup.js': ['ts/setup.ts', 'ts/_deps.ts']
                    }
                }
            },
            watch: {
                scripts: {
                    files: ['ts/*.ts'],
                    tasks: ['typescript']
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

    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-html-validation');
    grunt.loadNpmTasks('grunt-jsdoc');

    grunt.registerTask('default', ['typescript']);
    grunt.registerTask('lint', ['validation']);
    grunt.registerTask('doc', ['jsdoc']);
};
