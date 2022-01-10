var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser'); // Install module before start testing
var logger = require('morgan');
var session = require('express-session'); // Install typing npm install express-session@1.15.6 session-file-store@1.2.0 -- save
var FileStore = require('session-file-store')(session);

const mongoose = require('mongoose');

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);

connect.then(
  (db) => {
    console.log('Connect correctly to server', db);
  },
  (err) => {
    console.log('err', err);
  }
);

// Not found handler metho
var notFoundHandler = (req, res, next) => {
  next(createError(404));
};

// Authentication method using cookies
/*var auth = (req, res, next) => {
  var signedCookies = req.signedCookies;
  var signedCookiesUser = req.signedCookies.user;
  var reqHeaders = req.headers;
  
  console.log(reqHeaders);
  console.log(signedCookies);
  console.log(signedCookiesUser);
  
  if (!signedCookiesUser) {
    var authHeader = req.headers.authorization;
    
    if (!authorization) {
      var err = new Error('You are not authenticated!');
    
      res.setHeader('WWW-authenticate', 'Basic');
      err.status = 401;
    
      return next(err);
    }
    var authHeaderToken = authHeader.split(' ')[1];
    var auth = new Buffer.from(authHeaderToken, 'base64').toString().split(':');
    
    var username = auth[0];
    var password = auth[1];
    
    if (username === 'admin' && password === 'password') {
      res.cookie('user', 'admin', { signed: true });
      
      next();
    } else {
      var err = new Error('You are not authenticated!');
    
      res.setHeader('WWW-authenticate', 'Basic');
      err.status = 401;
    
      return next(err);
    }
  } else {
    if (signedCookiesUser === 'admin') {
      next()
    } else {
      var err = new Error('You are not authenticated!');
      
      err.status = 401;
      
      return next(err);
    }
  }
};*/

// Authentication method using session
var auth = (req, res, next) => {
  var reqSession = req.session;
  var reqSessionUser = req.session.user;
  var reqHeaders = req.headers;

  console.log(reqHeaders);
  console.log('reqSession', reqSession);

  if (!reqSessionUser) {
    var authHeader = req.headers.authorization;

    if (!authHeader) {
      var err = new Error('You are not authenticated!');

      res.setHeader('WWW-authenticate', 'Basic');
      err.status = 401;

      return next(err);
    }

    var authHeaderToken = authHeader.split(' ')[1];
    var auth = new Buffer.from(authHeaderToken, 'base64').toString().split(':');

    var username = auth[0];
    var password = auth[1];

    if (username == 'admin' && password == 'password') {
      req.session.user = 'admin';

      next();
    } else {
      var err = new Error('You are not authenticated!');

      res.setHeader('WWW-authenticate', 'Basic');
      err.status = 401;

      next(err);
    }
  } else {
    if (reqSessionUser === 'admin') {
      console.log('reqSessionUser', reqSessionUser);

      next();
    } else {
      var err = new Error('You are not authenticated!');

      err.status = 401;

      next(err);
    }
  }
};

// Importing router files
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dishRouter = require('./routes/dishRouter');
var promoRouter = require('./routes/promoRouter');
var leaderRouter = require('./routes/leaderRouter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
// app.use(cookieParser('1234-5678-9101112-13141516'));
app.use(session({
  name: 'session-id',
  secret: '1234-5678-9101112-13141516',
  saveUnitialized: false,
  resave: false,
  store: new FileStore()
}));
app.use(auth);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);

// catch 404 and forward to error handler
app.use(notFoundHandler);

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;