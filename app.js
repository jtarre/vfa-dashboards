var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
require('dotenv').load();

var passport = require('passport');
require('./config/passport.js')(app, passport);
var flash    = require('connect-flash');
var session  = require('express-session');
var RedisStore = require( 'connect-redis' )( session );



var routes           = require('./routes/index');
var users            = require('./routes/users');
var lognotes         = require('./routes/lognotes');
var companyInfo      = require('./features/companies/company-info');
var lognotesCompany  = require('./features/companies/lognotes-company');
var updateCompany    = require('./features/companies/company-update');
var cases            = require('./routes/cases');
var tasks            = require('./routes/tasks');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// var redis = new RedisStore({
//     host: '127.0.0.1',
//     port: 6379
//   });
// console.log("\n REDIS ");
// console.log(redis);
app.use( session({ 
  secret: 'cookie_secret',
  store:  new RedisStore({
    host: '127.0.0.1',
    port: 6379
  }),
  proxy:  true,
    resave: true,
    saveUninitialized: true
}));
console.log(session);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// index route =================================
require('./routes/index.js')(app, passport);
require('./routes/loginRoutes.js')(app, passport);
require('./features/fellows/fellows')(app, passport);
require('./features/companies/companies')(app, passport);
require('./routes/copa')(app, passport);

app.use('/users', users);
app.use('/lognotes', lognotes);
app.use('/company-info', companyInfo);
app.use('/lognotes-company', lognotesCompany);
app.use('/company-update', updateCompany);
app.use('/cases', cases);
app.use('/tasks', tasks);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
