var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const Patient = require('./model/patientSchema')
var app = express();
const session = require('express-session');
const flash = require('connect-flash')



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Middleware for our bodyParser
app.use(bodyParser.urlencoded({extended:true}))

//connecting to local mongoDb database
mongoose.connect( 'mongodb://localhost:27017/healthApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //useCreateIndex : true
})

app.get('/login', (req, res) => {
  res.render('login');
})
app.get('/404', (req, res) => {
  res.render('404');
})
app.get('/admin', (req, res) => {
  res.render('admin');
})
app.get('/chat', (req, res) => {
  res.render('chat');
})
app.get('/doctors', (req, res) => {
  res.render('doctors');
})
app.get('/doctorslogin', (req, res) => {
  res.render('doctorslogin');
})
app.get('/patient', (req, res) => {
  res.render('patient');
})
app.get('/user', (req, res) => {
  res.render('user');
})

//POST ROUTE starts here
app.post('/user', (req, res) => {
  let newPatient = {
    fname : req.body.fname,
    lname : req.body.lname,
    email : req.body.email,
    mobile : req.body.mobile,
    email : req.body.email,
    city : req.body.city,
    state : req.body.state,
    country : req.body.country,
    multisymptoms : req.body.multisymptoms,
    diseaseSelect : req.body.diseaseSelect
};

//add new data to the database
Patient.create(newPatient)
    .then( patient => {
        req.flash('success_msg', 'Patient Data Created Successfully')
    })
    .catch(err => {
        req.flash('error_msg', 'ERROR: ' + err)
    })
}, )

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//Middle ware for express-session
app.use(session({
  secret: "Langrangee",
  resave: true,
  saveUninitialized: true

}));
//Middle ware for connect-flash
app.use(flash());

//setting messsages variables globally
app.use((req, res, next) => {
  res.locals.success_msg = req.flash(('success_msg'));
  res.locals.error_msg = req.flash(('error_msg'));
  next();
})



module.exports = app;
