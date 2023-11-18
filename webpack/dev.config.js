// experiments.futureDefaults = true

const webpack = require('webpack');
const path = require('path');
const webpackDevServer = require('webpack-dev-server');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
var ENTRY_FILE = './src/index.js';
var OUTPUT_PATH = '../../api/public';


var NODE_ENV = process.env.NODE_ENV;
console.log("NODE_ENV=", NODE_ENV);
module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        hot: true,
        static: OUTPUT_PATH
    },
    entry: {
        // app: ENTRY_FILE,
        main: ['webpack-hot-middleware/client?hot=true&live-reload=true', ENTRY_FILE],
        // hot: 'webpack/hot/dev-server.js',
        // client: 'webpack-dev-server/client/index.js?hot=true&live-reload=true',
    },
    output: {
        path: path.resolve(__dirname, OUTPUT_PATH),
        //filename: 'bundle.js',
        // hashFunction: 'xxhash64',
    },
    //node: { console: false, fs: 'empty', net: 'empty', tls: 'empty' },
    module: {
        rules: [
            {
                test: /\.(css|scss)$/i,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|gif|svg|woff2|woff)$/i,
                type: 'asset/inline',
                // use: [
                //     {
                //         loader: 'url-loader',
                //         options: {
                //             limit: 8192,
                //         },
                //     },
                // ],
            },
            {
                test: /\.(js|jsx|mjs)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        "presets": [
                            ["@babel/preset-env", {
                                "useBuiltIns": "usage",
                                // "corejs": 3, // or 2,
                                "targets": {
                                    "firefox": "64", // or whatever target to choose .    
                                },
                            }],
                            "@babel/preset-react"
                        ],
                        "plugins": [
                            // "@babel/plugin-proposal-object-rest-spread",
                            [
                                "import",
                                {
                                    "libraryName": "@react-icons",
                                    "camel2DashComponentName": false,
                                    "transformToDefaultImport": false,
                                    "customName": require('path').resolve(__dirname, './react-icons.js')
                                }
                            ],
                            [require.resolve('react-refresh/babel'), { skipEnvCheck: true }],
                        ].filter(Boolean)
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            "React": "react",
        }),
        new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('development') }),
        // new CompressPlugin(),
        // new webpack.optimize.LimitChunkCountPlugin({
        //     maxChunks: 1,
        // }),
        new webpack.HotModuleReplacementPlugin(),
        // new ReactRefreshWebpackPlugin(),
        // new WebpackManifestPlugin(),
        // new BundleAnalyzerPlugin()

    ]
};
