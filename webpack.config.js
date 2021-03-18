
const path = require('path')

module.exports = {
    // Переопределяем точку входа
    entry: './src/main.js',

    // Переопределяем место сохранения скомпилированого скрипта
    output: {
        path: path.resolve(__dirname, 'site/static/js'), // абсолютный путь
        filename: 'main.js' // имя файла
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

        ]
    }

}