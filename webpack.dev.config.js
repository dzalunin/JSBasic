const { merge } = require('webpack-merge')
const prod = require('./webpack.config')

module.exports = merge(prod, {
    devServer: {
        contentBase: [
            './',
            './site',
            './site/static'
        ],
        host: 'localhost',
        port: 40000,
        hot: true,
    },
})