var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('tasks.db');

db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='tasks'",
       function(err, rows) {
  if(err !== null) {
    console.log(err);
  }
  else if(rows === undefined) {
    db.run('CREATE TABLE "tasks" ' +
           '("id" INTEGER PRIMARY KEY AUTOINCREMENT, ' +
           '"title" VARCHAR(255), ' +
           'description VARCHAR(255), ' +
           'estimate INTEGER) ', function(err) {
      if(err !== null) {
        console.log(err);
      }
      else {
        console.log("SQL Table 'tasks' initialized.");
      }
    });
  }
  else {
    console.log("SQL Table 'tasks' already initialized.");
  }
});

//var routes = require('./routes/index');
//var users = require('./routes/users');

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(express.static(path.join(__dirname, 'public')));

var router = express.Router();
var tasks = require('./routes/tasks');
router.use('/tasks',tasks);
app.use('/api',router);


// app.get('*',function(req,res){
//   res.sendfile('./public/index.html');
// })
//app.use('/', routes);
//app.use('/users', users);

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
/*    res.render('error', {
      message: err.message,
      error: err
    });
*/  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
/*  res.render('error', {
    message: err.message,
    error: {}
  });
*/});


module.exports = app;
