const express = require('express'),
  http = require('http'),
  morgan = require('morgan'),
  hostname = 'localhost',
  port = 3000,
  app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(express.json());

app.all('/dishes', (req, res, next) => {
  console.log('/dishes was hit');

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
});

app.get('/dishes', (req, res, next) => {
  console.log('hit dishes get verb')
  res.end('Will send all the dishes to you');
});

app.post('/dishes', (req, res, next) => {
  res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
});

app.put('/dishes', (req, res, next) => {
  res.end('PUT operation not supported on /dishes');
});

app.delete('/dishes', (req, res, next) => {
  res.end('Deleting all dishes');
});

app.get('/dishes/:dishId', (req, res, next) => {
  res.end('Will send etails of the dish: ' + req.params.dishId + ' to you!');
});

app.post('/dishes/:dishId', (req, res, next) => {
  res.statusCode = 403; // Code for operation not supported
  res.end('POST operation not supported on /dishes/' + req.params.dishId);
});

app.put('/dishes/:dishId', (req, res, next) => {
  res.write('Updating the dish: ' + req.params.dishId + '\n');
  res.end('Will update the dish: ' + req.body.name + ' with details: ' + req.body.description);
});

app.delete('/dishes/:dishId', (req, res, next) => {
  res.end('Will delete the dish: ' + req.params.dishId);
});

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});