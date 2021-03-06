  var async = require('async');
var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var passport=require('passport');
var flash=require('connect-flash');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session=require('express-session');
require('./config/passport')(passport);

var routes = require('./routes/index');
var users = require('./routes/users');
var blank = require('./routes/blank');
var admin = require('./routes/admin');
var ajax = require('./routes/ajax');
var subadd = require('./routes/subadd');
var profentry = require('./routes/profentry');
var graphsurvey = require('./routes/graphsurvey');
var feed_analyzer = require('./routes/feed_analyzer');
var dashboard = require('./routes/dashboard');
var student = require('./routes/student');
var principal = require('./routes/principal');
var hod = require('./routes/hod');
var sheet = require('./routes/workbook');
var upl_file = require('./routes/upload_file');
var generateurl = require('./routes/generateurl');

var mongo = require('mongodb');
var monk = require('monk');
var nodemailer = require("nodemailer");
var db = monk('mongodb://the-wire:Success%401996@ds061076.mlab.com:61076/feed-db');
var MailDev = require('maildev');
var smtpTransport = require('nodemailer-smtp-transport');
//var poolConfig = 'smtps://feedbackbvcoenm%40bharatividyapeeth.edu:Feedback%402017@mail.bharatividyapeeth.edu/?pool=true';
var transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
     port: 587,
     auth: {
     user: 'feedbackbvcoenm@bharatividyapeeth.edu',
     pass: 'Feedback@2017'
     },
     tls:{ignoreUnauthorized: false},
     ignoreTLS: false
     /*port: 1025,
     ignoreTLS: true*/
});

//db connector
app.use(function(req,res,next){
  req.db = db;
  next();
});

app.use(function (req, res, next) {
    /*transporter.verify(function(error, success) {
        if (error) {
            console.log("nodemailer: " + error);
        } else {
            console.log('Server is ready to take our messages');
        }
    });*/
  req.transporter = transporter;
  next();
});

app.use(function(req,res,next) {
  var date= new Date();
  req.year=date.getFullYear();
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//set local vars
app.locals.appname = 'Feedback System';
app.locals.dbconnect = 'mongodb://the-wire:Success%401996@ds061076.mlab.com:61076/feed-db';

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser());
app.use(cookieParser());
app.use(session({secret: 'mynameadi', cookie:{maxAge : 1800000}}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
require('./routes/log')(app,passport);


app.use('/', routes);
app.use('/users', users);
app.use('/blank', blank);
app.use('/admin', admin);
app.use('/ajax',ajax);
app.use('/subadd', subadd);
app.use('/profentry',profentry);
app.use('/graphsurvey',graphsurvey);
app.use('/feed_analyzer',feed_analyzer);
app.use('/dashboard', dashboard);
app.use('/student', student);
app.use('/principal', principal);
app.use('/headofdepartment', hod);
app.use('/addsheet', sheet);
app.use('/upload_file', upl_file);
app.use('/generateurl', generateurl);

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
