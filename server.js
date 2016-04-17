// Setup
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passportConfig = require('./config/passport');
var passportSetup = require('./routes');
var config = require('./config')

// Load controllers
var userController = require('./controllers/userController');

// Load settings
var app = express();
var port = process.env.PORT || config.port;

// Load controllers
var userController = require('./controllers/userController');
var workoutController = require('./controllers/workoutEntryController');


passportConfig(passport);
mongoose.connect(config.db.url);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.static('static'));
// app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', __dirname+'/views');
app.use(session({ secret: 'secretpassword',
				resave: true,
    				saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


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
apiRouter.route('/users/:username/workouts/:id')
	.get(workoutController.getWorkout)
	.put(workoutController.updateWorkout)
	.delete(workoutController.deleteWorkout);

// Register all Routers
app.use('/api', apiRouter);

// Setup routing
passportSetup(app, passport);

// Start listening 
var server = app.listen(port);

console.log("Tracking runners on port: " + port);
module.exports = server; // Used for server integration tests
