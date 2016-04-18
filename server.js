// Setup
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var config = require('./config')

// Load settings
var app = express();
var port = process.env.PORT || config.port;

// Load controllers
var userController = require('./controllers/userController');
var workoutController = require('./controllers/workoutController');
var authController = require('./controllers/authController');

mongoose.connect(config.db.url);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('static'));
app.set('view engine', 'ejs');
app.set('views', __dirname+'/views');
app.use(session({ secret: 'secretpassword', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Register Server Routes
require('./routes')(app);


// Start listening
var server = app.listen(port);


console.log("Tracking runners on port: " + port);


module.exports = server; // Used for server integration tests
