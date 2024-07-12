const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { fileURLToPath } = require('url');

module.exports = {
    mode:'production',
    entry:'/scripts/main.js',// our main js file
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname, 'dist'),
    },
    devtool:'source-map',
    plugins:[new CleanWebpackPlugin(),],
    optimization:{
        minimize:true,
        minimizer:[new TerserPlugin(
            {
                terserOptions:{
                    sourceMap:true,
                }
            }
        )],
    },
};