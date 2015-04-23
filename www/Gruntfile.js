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
            typedoc : {
                doc : {
                    src: ['ts/*.ts'],
                    options: {
                        out: 'doc'
                    }
                }
            }
        }
    );

    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-html-validation');
    grunt.loadNpmTasks('grunt-typedoc');

    grunt.registerTask('default', ['typescript']);
    grunt.registerTask('lint', ['validation']);
    grunt.registerTask('doc', ['typedoc']);
};
