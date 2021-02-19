"Use strict";

const http = require('http')
const fs = require('fs')

const settings = {
    "appName": "site",
    "static": "assets"
}

const pathOnServer = function (httpRequest) {

    const acceptPriority = httpRequest.headers.accept.split(';');
    if (acceptPriority.lenth == 0 || acceptPriority[0].indexOf('html') >= 0) {
        const url = httpRequest.url === '/' ? ('/index.html') : (httpRequest.url)

        return `./${settings.appName}${url}`
    }

    return `./${settings.appName}/${settings.static}${httpRequest.url}`

}


const queryProsessor = function (httpRequest, httpResponse) {

    const path = pathOnServer(httpRequest)
    try {
        httpResponse.end(fs.readFileSync(path))
    } catch (error) {
        console.log(`File not found ${path}`)

        httpResponse.writeHead(404, { 'Content-Type': 'text/plain' });
        httpResponse.end('404 - Page not found.');
    }
}


const srv = http.createServer(queryProsessor);
srv.listen(process.env.PORT || 40000);
