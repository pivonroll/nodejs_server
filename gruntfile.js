var path = require("path");
var webpack = require("webpack");

module.exports = function(grunt) {
    var gruntConfig = {
        webpack: {
            options: {
                module: {
                    loaders: [
                        {
                            loader: 'babel-loader',
                            test: path.join(__dirname, "client"),
                            query: {
                                "presets": ["react"]
                            },
                        }
                    ],
                },
                stats: {
                    colors: true,
                },
                devtool: 'source-map',
            },
            client: {
                entry: './client/main.js',
                output: {
                    path: path.join(__dirname, "/client/compiled"),
                    filename: 'bundle.js',
                },
            },
        }
    };

    grunt.initConfig(gruntConfig);
    grunt.loadNpmTasks('grunt-webpack');
    grunt.registerTask("client", ['webpack:client']);
    grunt.registerTask("build", ['client']);
    grunt.registerTask("default", ['build']);
};
