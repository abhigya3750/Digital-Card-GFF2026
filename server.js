const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 9988;
const PUBLIC_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.vcf': 'text/vcard; charset=utf-8'
};

const server = http.createServer((req, res) => {
  let reqUrl = req.url.split('?')[0];
  if (reqUrl === '/') reqUrl = '/index.html';

  const file = path.join(PUBLIC_DIR, reqUrl);

  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('404 Not Found');
    }
    const ext = path.extname(file).toLowerCase();
    const mime = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': mime });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`GFF Digital Card Server running at http://localhost:${PORT}`);
});
