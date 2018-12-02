const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        ui: path.join(__dirname, '../src/app/ui.ts'),
    },
    output: {
        path: path.join(__dirname, '../dist'),
        filename: '[name].js'
    },
    optimization: {
        splitChunks: {
            name: 'vendor',
            chunks: 'initial'
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    'style-urls-loader',
                    'template-url-loader',
                    'ts-loader',
                ]
            },
            {
                test: /\.html$/,
                use: 'raw-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    'raw-scss-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            '@hero': path.resolve(__dirname, '../hero/src'),
        }
    },
    resolveLoader: {
        modules: [
            'node_modules',
            path.resolve(__dirname, 'loaders')
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            chunks: ['ui'],
            filename: 'index.html',
            template: path.join(__dirname, '../src/index.html')
        }),
    ]
};
