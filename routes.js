var express = require('express');
var userApiController = require('./controllers//api/userApiController');
var renderController = require('./controllers/renderController');
var viewsController = require('./controllers/viewsController');
var authController = require('./controllers/authController');
var workoutApiController = require('./controllers/api/workoutApiController');

module.exports = function(app) {
   
	
	
	// ====================== Normal Routing ========================//
    app.get('/', function(req, res) {
		renderController.renderLogin(req, res);
	});
    app.post('/login', authController.authenticateLogin);
    app.get('/logout', renderController.renderLogout);
    app.get('/signup', renderController.renderSignup);
    app.post('/deleteUser', authController.authenticateDelete);
    app.post('/signup', authController.authenticateSignup);
    app.get('/profile', isLoggedIn, function(req, res) {
        renderController.renderProfile(req, res);
	});
	app.get('/viz', isLoggedIn, function(req, res) {
        renderController.renderViz(req, res);
	});
    app.get('/addWorkout', isLoggedIn, renderController.renderAddWorkout);
//    app.post('/submitWorkout', isLoggedIn, authController.authenticateSubmitWorkout);
	app.post('/submitWorkout', isLoggedIn, viewsController.submitWorkout);

    function isLoggedIn(req, res, next) {
//		console.log("request authenticated: " + req.isAuthenticated());
        if (req.isAuthenticated()) {
            return next();
        } else {
			res.redirect('/')
		}
    }

    // ====================== API Routing ========================//
    var apiRouter = express.Router();
    
	//Users API
	apiRouter.route('/users')
        .post(userApiController.postUser)
        .get(userApiController.getUsers);
    apiRouter.route('/users/:username')
        .delete(userApiController.deleteUser)
        .get(userApiController.getUser);
    
	//Workouts API
	apiRouter.route('/users/:username/workouts')
        .get(workoutApiController.getWorkouts)
        .post(workoutApiController.postWorkout)
        .delete(workoutApiController.deleteWorkouts);
    apiRouter.route('/users/:username/workouts/:id')
        .get(workoutApiController.getWorkout)
        .put(workoutApiController.updateWorkout)
        .delete(workoutApiController.deleteWorkout);




    // Register all Routers
    app.use('/api', apiRouter);
	
    // ===========================================================//


}
