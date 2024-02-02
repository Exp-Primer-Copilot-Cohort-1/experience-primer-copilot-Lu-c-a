// Create web server
const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const port = 3000;

const server = http.createServer((req, res) => {
    const pathname = url.parse(req.url).pathname;
    const ext = path.parse(pathname).ext;
    let contentType = 'text/html';
    let filePath = `.${pathname}`;

    if (ext === '.css') {
        contentType = 'text/css';
    }

    if (ext === '.js') {
        contentType = 'text/javascript';
    }

    if (ext === '.jpg') {
        contentType = 'image/jpg';
    }

    if (ext === '.png') {
        contentType = 'image/png';
    }

    if (ext === '.gif') {
        contentType = 'image/gif';
    }

    if (ext === '.ico') {
        contentType = 'image/x-icon';
    }

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                fs.readFile('./404.html', (error, content) => {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf-8');
                });
            } else {
                res.writeHead(500);
                res.end(`Sorry, check with the site admin for error: ${error.code}`);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});