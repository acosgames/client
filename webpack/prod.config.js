const webpack = require('webpack');
const path = require('path');

const CompressionPlugin = require("compression-webpack-plugin");

const productionCredentials = require('shared/credential/localProduction.json');

const MySQL = require('shared/services/mysql.js');
const mysql = new MySQL(productionCredentials);

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

var ENTRY_FILE = './src/index.js';
var OUTPUT_PATH = './webpack/builds';

const UploadFile = require('shared/services/uploadfile');
const upload = new UploadFile();

const fs = require('fs');


function updateClientVersion() {
    try {
        let jsonStr = fs.readFileSync('../shared/model/versions.json');
        let json = JSON.parse(jsonStr);
        json.client.version += 1;
        let outputStr = JSON.stringify(json);
        fs.writeFileSync('../shared/model/versions.json', outputStr);

        return json.client.version;
    }
    catch (e) {
        console.error(e);
    }
}

const clientVersion = updateClientVersion();
const uploadPath = path.resolve(__dirname, OUTPUT_PATH);
const uploadFilename = 'bundle.' + clientVersion + '.js';



async function uploadToStorage() {

    try {
        let baseFilepath = uploadPath + '/' + uploadFilename;
        let filepath = baseFilepath + '.gz';
        let fileStream = fs.createReadStream(filepath);

        let result = await upload.uploadByStreamGzip('acospub', 'static/' + uploadFilename, fileStream);
        console.log('Uploaded to acospub: ', result);

        let db = await mysql.db();

        let results = await db.update('platform_versions', { version: clientVersion }, 'type=1');
        console.log("Updated platform_versions: ", results);




        try {
            fs.unlinkSync(baseFilepath);
            fs.unlinkSync(baseFilepath + '.gz');
            fs.unlinkSync(baseFilepath + '.LICENSE.txt');
            fs.unlinkSync(baseFilepath + '.LICENSE.txt.gz');
        }
        catch (e) {
            console.error(e);
        }

        mysql.disconnect();
    }
    catch (e) {
        console.error(e);
    }

}


module.exports = {
    mode: 'production',
    devtool: false,
    entry: { main: ENTRY_FILE },
    output: {
        path: uploadPath,
        filename: uploadFilename,
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
        new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),

        {
            apply: (compiler) => {
                compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {

                    uploadToStorage();

                });
            }
        },

        new CompressionPlugin(),
        // new webpack.optimize.LimitChunkCountPlugin({
        //     maxChunks: 1,
        // }),
        // new BundleAnalyzerPlugin()

    ]
};
