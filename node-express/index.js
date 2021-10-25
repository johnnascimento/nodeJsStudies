const express = require('express'),
  http = require('http'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  dishRouter = require('./routes/dishRouter'),
  promoRouter = require('./routes/promoRouter'),
  leaderRouter = require('./routes/leaderRouter'),
  hostname = 'localhost',
  port = 3000,
  app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leadership', leaderRouter);
app.use(express.static(__dirname + '/public'));

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});