const express = require(`express`),
  http = require(`http`),
  morgan = require(`morgan`),
  hostname = `localhost`,
  port = 3000,
  app = express();

app.use(morgan(`dev`));

app.use(express.static(__dirname + `/public`));

app.use((req, res, next) => {
  console.log(`req.headers is: ` + req.headers);
});