// Setup
var express = require('express');
var app = express();
var port = process.env.PORT || 4777;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var configDB = require('./config/database.js');
    // Load controllers
var exampleController = require('./controllers/exampleController');
var userController = require('./controllers/userController');
    // Load settings

mongoose.connect(configDB.url);

require('./config/passport')(passport);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());
// app.use(express.static('static'));
// app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', __dirname+'/views');
app.use(session({ secret: 'secretpassword' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Setup routing
require('./app/routes.js')(app, passport, express, userController);
var server = app.listen(port);

console.log("Tracking runners on port: " + port);
module.exports = server; // Used for server integration tests
