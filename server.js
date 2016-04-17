// Load dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');

// Load controllers
var userController = require('./controllers/userController');
var workoutController = require('./controllers/workoutEntryController');


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

apiRouter.route('/users')
    .post(userController.postUser)
    .get(userController.getUsers);
apiRouter.route('/users/:username')
    .delete(userController.deleteUser)
    .get(userController.getUser);

apiRouter.route('/users/:username/workouts')
	.get(workoutController.getWorkouts)
	.post(workoutController.postWorkout)
	.delete(workoutController.deleteWorkouts);

// Register all Routers
app.use('/api', apiRouter);

var server = app.listen(port);

console.log("Tracking runners on port: " + port);
module.exports = server; // Used for server integration tests
