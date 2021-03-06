var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser'); // Install module before start testing
var logger = require('morgan');
var session = require('express-session'); // Install typing npm install express-session@1.15.6 session-file-store@1.2.0 -- save
var FileStore = require('session-file-store')(session);
var passport = require('passport');
var authenticate = require('./authenticate');
var config = require('./config');

const mongoose = require('mongoose');

const Dishes = require('./models/dishes');

const url = config.mongoUrl;
const connect = mongoose.connect(url);

connect.then(
  (db) => {
    console.log('Connect correctly to server', db);
  },
  (err) => {
    console.log('err', err);
  }
);

// --------- //
// Functions //
// --------- //
var expressUrlEncodeSettings = express.urlencoded({
  extended: false
});

var sessionSettings = session({
  name: 'session-id',
  secret: '1234-5678-9101112-13141516',
  saveUninitialized: false,
  resave: false,
  store: new FileStore()
});

// Authentication method using session
var auth = (req, res, next) => {
  var reqSessionUser = req.user;

  if (!reqSessionUser) {
    var err = new Error('You are not authenticated!');
    err.status = 403;
    next(err);
  } else {
      next();
  }
};

var errorHandler = (err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
}

// Not found handler method
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

// ---------------------- //
// Importing router files //
// ---------------------- //
var indexRouter = require('./routes/indexRouter');
var usersRouter = require('./routes/usersRouter');
var dishRouter = require('./routes/dishRouter');
var promoRouter = require('./routes/promoRouter');
var leaderRouter = require('./routes/leaderRouter');
var favoritesRouter = require('./routes/favoritesRouter');
var uploadRouter = require('./routes/uploadRouter');

var app = express();

app.all('*', (req, res, next) => {
  if (req.secure) {
    return next();
  } else {
    res.redirect(307, 'https://' + req.hostname + ':' + app.get('secPort') + req.url);
  }
});

// ----------------- //
// view engine setup //
// ----------------- //
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// ----------- //
// Middlewares //
// ----------- //
app.use(logger('dev'));
app.use(express.json());
app.use(expressUrlEncodeSettings);
// app.use(cookieParser('1234-5678-9101112-13141516'));
app.use(sessionSettings);
app.use(passport.initialize());
app.use(passport.session());
app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use(auth);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);
app.use('/favorites', favoritesRouter);
app.use('/imageUpload', uploadRouter);
app.use(notFoundHandler); // catch 404 and forward to error handler
app.use(errorHandler); // error handler

module.exports = app;