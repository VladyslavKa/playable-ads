const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = () => ({
    mode: 'development',
    devtool: "inline-source-map",

    entry: {
        app: './application/initialize'
    },

    output: {
        filename: 'bundle-[name].js?hash=[hash]',
        path: `${__dirname}/public`,
        publicPath: '/'
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "assets/templates/index.html"
        })
    ],

    devServer: {
        contentBase: path.join(__dirname, 'public')
    }
});