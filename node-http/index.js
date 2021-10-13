const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = 'localhost';
const port = 3000;

const errorMarkup = function (filePath, errMsg, statusCode) {
    return '<html>'
            + '<body>'
                + '<h1>'
                + 'Error ' + statusCode + ': '
                + filePath + ' '
                + errMsg
                + '</h1>'
            + '</body>'
        + '</html>';
}

const server = http.createServer((req, res) => {
    console.log('Request for ' + req.url + ' by method ' + req.method);

    if (req.method == 'GET') {
        var fileUrl;

        if (req.url == '/') fileUrl = '/index.html';
        else fileUrl = req.url;

        var filePath = path.resolve('./public' + fileUrl);
        const fileExt = path.extname(filePath);

        if (fileExt ==  '.html') {
            // fs.stat() or fs.access()
            // Check the valid options above instead of the deprecated one bellow fs.exists
            fs.exists(filePath, (exists) => {
                if (!exists) {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html');
                    res.end(errorMarkup(fileUrl, 'not found', res.statusCode));

                    return;
                }

                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                fs.createReadStream(filePath).pipe(res);
            });
        } else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end(errorMarkup(fileUrl, 'not an HTML file', res.statusCode));

            return;
        }
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end(errorMarkup(fileUrl, 'not supported', req.method));

        return;
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});