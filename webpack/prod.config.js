const webpack = require('webpack');
const path = require('path');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

var ENTRY_FILE = './src/index.js';
var OUTPUT_PATH = '../../api/public';

module.exports = {
    mode: 'production',
    devtool: false,
    entry: { main: ENTRY_FILE },
    output: {
        path: path.resolve(__dirname, OUTPUT_PATH),
        filename: 'bundle.js',
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
                                "corejs": 3, // or 2,
                                "targets": {
                                    "firefox": "64", // or whatever target to choose .    
                                },
                            }],
                            "@babel/preset-react"
                        ],
                        "plugins": [
                            "@babel/plugin-proposal-object-rest-spread",
                            [
                                "import",
                                {
                                    "libraryName": "@react-icons",
                                    "camel2DashComponentName": false,
                                    "transformToDefaultImport": false,
                                    "customName": require('path').resolve(__dirname, './react-icons.js')
                                },
                                "@react-icons"
                            ]
                        ]
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            "React": "react",
        }),

        // add the plugin to your plugins array
        new webpack.DefinePlugin({ 'process.env.NODE_ENV': 'production' }),

        // new CompressPlugin(),
        // new webpack.optimize.LimitChunkCountPlugin({
        //     maxChunks: 1,
        // }),
        new BundleAnalyzerPlugin()

    ]
};
