const express = require('express'),
  http = require('http'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  hostname = 'localhost',
  port = 3000,
  app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  console.log('req.headers is: ' + req.headers);
  const stringifiedData = JSON.stringify(req.headers);

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<html><body><h1>This is an express server ' + req.body + '</h1></body></html>');
});

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});