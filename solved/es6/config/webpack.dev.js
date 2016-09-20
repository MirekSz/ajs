var webpack = require('webpack');
var path = require('path');

var APP_DIR = path.join(__dirname, '..', 'app');
var TESTS_DIR = path.join(__dirname, '..', 'tests');

var minified_libs = path.join(__dirname, '..', 'lib');

var deps = [
    'lodash/lodash.min.js'
];


var config = {
    debug: true,
    devtool: 'source-map',
    //entry: ['webpack-hot-middleware/client',
    //    './app/index.es6'],
    entry: {
        app: ['babel-polyfill', './app/index.es6', 'webpack-hot-middleware/client?reload=true'],
        test: ['./tests/autoDiscovery.es6', 'webpack-hot-middleware/client?reload=true']
    },
    module: {
        preLoaders: [],
        loaders: [{
            test: /\.tsx?$/,
            loaders: ['babel', 'ts'],
            include: APP_DIR
        }, {
            test: /\.jsx?$/,
            loaders: ['babel'],
            include: APP_DIR
        }, {
            test: /\.es6?$/,
            loaders: ['babel'],
            include: [APP_DIR, TESTS_DIR]
        }, {
            test: /\.js?$/,
            loaders: ['babel'],
            include: APP_DIR
        }, {
            test: /\.less$/,
            loader: "style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!less-loader",
            include: APP_DIR
        }, {
            test: /\.hbs/,
            loader: "handlebars-loader",
            include: [APP_DIR, TESTS_DIR]
        }],
        noParse: []
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, '..', 'build'),
        publicPath: '/static/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin('common.js')
        //        new webpack.optimize.LimitChunkCountPlugin({maxChunks: 13, minChunkSize: 10})
    ],
    resolve: {
        root: [path.resolve('../app')],
        extensions: ['', '.jsx', '.js', '.tsx', '.ts', '.es6', '.hbs', '.less'],
        alias: {}
    },
    node: {
        fs: "empty" // avoids error messages
    }
};


deps.forEach(function(dep) {
    var depPath = path.resolve(minified_libs, dep);
    config.resolve.alias[dep.split('/')[0]] = depPath;
    config.module.noParse.push(depPath);
});
module.exports = config;
