// Write your server logic here

const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) => {
      if (err) throw err;
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(content);
    });
  } else if (req.url === '/style.css') {
    fs.readFile(path.join(__dirname, 'public', 'style.css'), (err, content) => {
      if (err) throw err;
      res.writeHead(200, { 'Content-Type': 'text/css' });
      res.end(content);
    });
  } else if (req.url === '/script.js') {
    fs.readFile(path.join(__dirname, 'public', 'script.js'), (err, content) => {
      if (err) throw err;
      res.writeHead(200, { 'Content-Type': 'application/javascript' });
      res.end(content);
    });
  } else if (req.url === '/questions') {
    fs.readFile(path.join(__dirname, 'questions.json'), (err, content) => {
      if (err) throw err;
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(content);
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));