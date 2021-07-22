const path = require('path');
const root = path.dirname(__dirname)

module.exports = {
    entry: `${root}/app/server.ts`,
    target: 'node',
    externals: [
        /^[a-z\-0-9]+$/ // Ignore node_modules folder
    ],
    output: {
        filename: 'compiled', // output file
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
                }
            ]
        }]
    }
};