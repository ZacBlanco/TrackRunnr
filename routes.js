var express = require('express');
var userController = require('./controllers/userController');
var renderController = require('./controllers/renderController');
var viewsController = require('./controllers/viewsController');
var authController = require('./controllers/authController');
var workoutController = require('./controllers/api/workoutApiController');

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

    // ===========================================================//


}
