const path = require('path');
const webpack = require('webpack');
const {ModuleFederationPlugin} = webpack.container;

const HtmlWebpackPlugin = require('html-webpack-plugin');
const rootDir = path.join(__dirname, "../../");
const appDir = path.join(__dirname);
const webpackEnv = process.env.NODE_ENV || 'development';

console.log("webpackEnv", webpackEnv)

// This is needed for webpack to import static images in JavaScript files.
const imageLoaderConfiguration = {
    test: /\.(gif|jpe?g|png|svg)$/,
    use: {
        loader: 'react-native-web-image-loader',
        options: {
            name: 'static/[name].[ext]',
            esModule: false,
        }
    }
};


const babelLoaderConfiguration = {
    test: /\.js$/,
    include: [
        path.resolve(appDir, 'src'),
        path.resolve(rootDir, 'node_modules/react-native-vector-icons'),
    ],
    use: {
        loader: 'babel-loader',
        options: {
            cacheDirectory: true,
            presets: ['@babel/preset-env', ["@babel/preset-react", {
                "runtime": "automatic"
            }]],
            plugins: ['react-native-web', 'react-native-reanimated/plugin'],
        },
    },
};

function sharedModules() {
    const oLib = {};

    const dependencies = require('../../package.json').dependencies

    Object.keys(dependencies).forEach(lib => {
        if (lib !== 'react-native') {
            oLib[lib] = {
                "singleton": true,
                "eager": true,
                requiredVersion: dependencies[lib]
                // "import": true
            }
        }
    });

    return oLib;
}

module.exports = {
    mode: webpackEnv,
    entry: [
        // 'babel-polyfill',
        path.join(appDir, './src/index.tsx'),
    ],
    output: {
        path: path.resolve(rootDir, '.bundle-output/web'),
        filename: 'app-[hash].bundle.js',
        clean: true,
        publicPath: '/'
    },
    devtool: 'source-map',
    devServer: {
        historyApiFallback: true,
    },
    module: {
        rules: [{
            test: /\.(tsx|ts|jsx|js|mjs)$/,
            exclude: /node_modules/,
            loader: 'ts-loader',
        },
            {
                test: /\.ttf$/,
                loader: "file-loader", // or directly file-loader
                include: path.resolve(rootDir, "node_modules/react-native-vector-icons"),
            },
            imageLoaderConfiguration, babelLoaderConfiguration
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './index.html'),
        }),
        // new webpack.HotModuleReplacementPlugin(),
        new webpack.EnvironmentPlugin({JEST_WORKER_ID: null}),
        new webpack.DefinePlugin({process: {env: {}}}),
        new ModuleFederationPlugin({
            name: 'host',
            shared: sharedModules(),
        }),
    ],
    resolve: {
        modules: [path.resolve(rootDir, 'node_modules'), 'node_modules'],
        extensions: [
            '.web.tsx',
            '.web.ts',
            '.tsx',
            '.ts',
            '.web.jsx',
            '.web.js',
            '.jsx',
            '.js',
        ], // read files in fillowing order
        alias: Object.assign({
            'react-native$': 'react-native-web',
            'react-native-linear-gradient': 'react-native-web-linear-gradient',
        }),
    },
}