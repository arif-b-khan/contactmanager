const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const root = path.dirname(__dirname);

console.log(`Port Number: ${process.env.PORT}`);
module.exports = {
    entry: `${root}/app/server.ts`,
    target: 'node',
    devtool: 'inline-source-map',
    externals: [
        /^[a-z\-0-9]+$/ // Ignore node_modules folder
    ],
    output: {
        filename: 'compiled.js', // output file
        path: `${root}/dist`,
        libraryTarget: "commonjs"
    },
    resolve: {
        // Add in `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
        modules: [
            `${root}/node_modules`,
            'node_modules'
        ]
    },
    resolveLoader: {
        // root: [`${root}/node_modules`],
    },
    watchOptions:{
        poll: 100,
        ignored: ['**/files/**/*.js', '**/node_modules']
    },
    module: {
        rules: [{
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            test: /\.tsx?$/,
            use: [
                {
                    loader: 'ts-loader',
                },
                "source-map-loader"
            ]
        }]
    },
    plugins: [  new Dotenv({
        // path: './.env.debug', // load this now instead of the ones in '.env'
        // safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file. 
        allowEmptyValues: true, // allow empty variables (e.g. `FOO=`) (treat it as empty string, rather than missing)
        systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
        silent: true, // hide any errors
        defaults: false // load '.env.defaults' as the default values if empty.
      })]
};