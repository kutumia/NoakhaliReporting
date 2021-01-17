var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var localStorage = require('local-storage');
var dotenv = require('dotenv');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var upazillaRouter = require('./routes/upazilla');
var pdRouter = require('./routes/pd');
// var adRouter = require('./routes/ad');
var ddRouter = require('./routes/dd');


dotenv.config({ path: './.env' });
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(session({ secret: 'keyboard cat', resave:true, saveUninitialized: true, cookie: { maxAge: Date.now() + (30 * 86400 * 1000 * 10000) } }))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(function (req, res, next) {
  res.locals.type = req.session.type;
  console.log("app.js", req.session.type, res.locals.type)
  res.locals.user_id = req.session.user_id;
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/upazilla', upazillaRouter);
app.use('/pd', pdRouter);
// app.use('/ad', adRouter);
app.use('/dd', ddRouter);




// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });



const db = require("./models");
db.sequelize.sync().then(function () {
  console.log('DB connection sucessful.');
}, function (err) {
  // catch error here
  console.log(err);

});;

db.sequelize.sync({ force: false }).then(() => {
  console.log("Drop and re-sync db.");
}).then(function () {
  console.log('DB connection sucessful.');
}, function (err) {
  // catch error here
  console.log(err);

});;

module.exports = app;
