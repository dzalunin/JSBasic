"Use strict"

const http = require('http')
const fs = require('fs')
const url = require('url');

const settings = {
    "index": "index.html",
    "appName": "site",
    "static": "static"
}



const pathOnServer = function (httpRequest) {

    let path = url.parse(httpRequest.url).pathname

    // console.log(path)
    // Имитация ответа на запрос к rest api 
    if (path.startsWith('/api')) {
        return `.${path}`
    }

    const acceptPriority = httpRequest.headers.accept.split(';')

    path = path === '/' ? (`/${settings.index}`) : (path)
    if (acceptPriority.lenth == 0 || acceptPriority[0].indexOf('text/html') >= 0) {
        return `./${settings.appName}${path}`
    }

    return `./${settings.appName}/${settings.static}${path}`
}


const queryProsessor = function (httpRequest, httpResponse) {
    const path = pathOnServer(httpRequest)

    let contentType = 'text/html'

    const accept = httpRequest.headers.accept.split(';')
    if (accept || accept.lenth != 0) {
        contentType = accept[0].split(',')[0]
    }

    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
        "Access-Control-Max-Age": 2592000, // 30 days
        "Content-Type": contentType
    };

    try {
        httpResponse.writeHead(200, headers);
        httpResponse.end(fs.readFileSync(path))
    } catch (error) {
        console.log(`File not found ${path}`)
        console.log(error)

        httpResponse.writeHead(404, { 'Content-Type': 'text/plain' })
        httpResponse.end('404 - Page not found.')
    }
}


const srv = http.createServer(queryProsessor)
srv.listen(process.env.PORT || 40000)
