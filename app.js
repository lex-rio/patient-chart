let createError = require('http-errors'),
  express = require('express'),
  path = require('path'),
  cookieParser = require('cookie-parser'),
  logger = require('morgan'),
  db = require('./db'),

  indexRouter = require('./routes/index'),
  patientsRouter = require('./routes/patients'),
  doctorsRouter = require('./routes/doctors'),
  medsRouter = require('./routes/meds'),
  treatmentRouter = require('./routes/treatments'),
  app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  req.db = db;
  next();
});

app.use('/', indexRouter);
app.use('/patients', patientsRouter);
app.use('/doctors', doctorsRouter);
app.use('/meds', medsRouter);
app.use('/treatments', treatmentRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
