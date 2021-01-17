const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = () => ({
    mode: 'development',
    devtool: "inline-source-map",

    entry: {
        app: './application/initialize'
    },

    output: {
        filename: 'bundle-[name].js?hash=[fullhash]',
        path: `${__dirname}/public`,
        publicPath: '/'
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "assets/templates/index.html"
        }),

        new CopyPlugin({
            patterns: [
                { from: "assets/images/**/*", to: "" },
            ],
        }),
    ],

    devServer: {
        contentBase: path.join(__dirname, 'public'),
        open: true,
        compress: true,
        port: 9000
    }
});