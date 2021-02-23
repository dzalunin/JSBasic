"Use strict"

const http = require('http')
const fs = require('fs')
const url = require('url');

const settings = {
    "index": "index.html",
    "appName": "site",
    "static": "assets"
}



const pathOnServer = function (httpRequest) {
    // console.log(httpRequest.url)
    // console.log(url.parse(httpRequest.url).pathname)
    const acceptPriority = httpRequest.headers.accept.split(';')

    let path = url.parse(httpRequest.url).pathname
    path = path === '/' ? (`/${settings.index}`) : (path)
    if (acceptPriority.lenth == 0 || acceptPriority[0].indexOf('text/html') >= 0) {
        return `./${settings.appName}${path}`
    }

    return `./${settings.appName}/${settings.static}${path}`
}


const queryProsessor = function (httpRequest, httpResponse) {
    const path = pathOnServer(httpRequest)
    try {
        httpResponse.end(fs.readFileSync(path))
    } catch (error) {
        console.log(`File not found ${path}`)

        httpResponse.writeHead(404, { 'Content-Type': 'text/plain' })
        httpResponse.end('404 - Page not found.')
    }
}


const srv = http.createServer(queryProsessor)
srv.listen(process.env.PORT || 40000)
