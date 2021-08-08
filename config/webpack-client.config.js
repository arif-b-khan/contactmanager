const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // extract css to files
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const autoprefixer = require("autoprefixer");
const CopyPlugin = require("copy-webpack-plugin");
const { outputPath, mode } = require("./webpack-settings");

module.exports = {
    entry: {
        app: './client/src/index.tsx',
        vendor: ['react', 'react-dom']
    },
    output: {
        path: path.resolve(__dirname, outputPath, 'client'),
        filename: '[name].bundle.js',
        publicPath: '/'
    },
    mode: mode,
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /(node_modules|bower_components|prod)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript']
                    }
                }
            },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            {
                test: /\.(css|scss|sass)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                    {
                        loader: 'postcss-loader', // postcss loader needed for tailwindcss
                        options: {
                            postcssOptions: {
                                ident: 'postcss',
                                plugins: [autoprefixer]
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/i,
                use: ['file-loader']
            }
        ]
    },
    devServer: {
        contentBase: path.resolve(outputPath, 'client'),
        port: 3000,
        compress: true,
        hot: true, // enable HMR on the server
        historyApiFallback: true, // fixes error 404-ish errors when using react router :see this SO question: https://stackoverflow.com/questions/43209666/react-router-v4-cannot-get-url 
    },
    plugins: [new Dotenv({
        // path: './.env.debug', // load this now instead of the ones in '.env'
        // safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file. 
        allowEmptyValues: true, // allow empty variables (e.g. `FOO=`) (treat it as empty string, rather than missing)
        systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
        silent: true, // hide any errors
        defaults: false // load '.env.defaults' as the default values if empty.
    }),
    new MiniCssExtractPlugin({ filename: '[name].[contenthash].css', chunkFilename: '[id].[contenthash].css' }),
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '..', 'client', 'public', 'index.html'),
        filename: 'index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CopyPlugin({
        patterns: [{
            from: 'client/public',
            to: 'public'
        }]
    })
    ]
};