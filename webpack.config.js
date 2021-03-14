
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    // Переопределяем точку входа
    entry: './src/main.js',

    // Переопределяем место сохранения скомпилированого скрипта
    output: {
        path: path.resolve(__dirname, 'site/static/js'), // абсолютный путь
        filename: 'main.js' // имя файла
    },

    resolve: {
        alias: {
            vue: 'vue/dist/vue.js',
        },
    },

    // Загрузчики
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    { loader: 'babel-loader' }
                ]
            },
            {
                test: /\.vue$/,
                use: [
                    { loader: 'vue-loader' }
                ]
            }
        ]
    },

    // Подключенные плагины
    plugins: [
        new VueLoaderPlugin()
    ]


}