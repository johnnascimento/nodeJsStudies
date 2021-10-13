const express = require(`express`),
  http = require(`http`),
  hostname = `localhost`,
  port = 3000,
  app = express();
  
app.use((req, res, next) => {
  console.log(`req.headers is: ` + req.headers);
});