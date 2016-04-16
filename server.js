// Load dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');

// Load controllers
var exampleController = require('./controllers/exampleController');
var userController = require('./controllers/userController');

var app = express();
var port = process.env.PORT || 4777;
mongoose.connect('mongodb://localhost/trackrunnr');

// Middleware Declarations //
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('static'));
app.use(passport.initialize());


// Router Declarations
// API Router
var apiRouter = express.Router();
apiRouter.route('/example').get(exampleController.getTestJSON);
apiRouter.route('/users')
    .post(userController.postUsers)
    .get(userController.getUsers);

// Register all Routers
app.use('/api', apiRouter);

var server = app.listen(port);

console.log("Tracking runners on port: " + port);
module.exports = server; // Used for server integration tests
