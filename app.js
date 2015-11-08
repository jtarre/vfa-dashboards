var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
require('dotenv').load();

var passport         = require('passport');
require('./config/passport')( app, passport );
var session          = require('express-session');
var RedisStore       = require('connect-redis')( session );
var redisClient      = require('redis').createClient(process.env.REDIS_URL);

var routes           = require('./routes/index');
var users            = require('./routes/users');
var lognotes         = require('./routes/lognotes');
var copa             = require('./routes/copa');
//var companies        = require('./features/companies/companies');
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

app.use( session({ 
  secret: 'cookie_secret',
  store:  new RedisStore({client: redisClient}),
  proxy:  true,
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

require('./features/companies/companies')(app, passport);
require('./features/fellows/fellows')(app, passport);
require('./routes/copa')(app, passport);

app.use('/', routes);
app.use('/users', users);
app.use('/lognotes', lognotes);
app.use('/company-info', companyInfo);
app.use('/lognotes-company', lognotesCompany);
app.use('/company-update', updateCompany);
app.use('/cases', cases);
app.use('/tasks', tasks);

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }),
  function(req, res){
    // The request will be redirected to Google for authentication, so this
    // function will not be called.
  });

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/companies');
  });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/companies');
});

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
