var express = require('express');
var userController = require('./controllers/userController');
var renderController = require('./controllers/renderController');
var authController = require('./controllers/authController');
var workoutController = require('./controllers/workoutEntryController');

module.exports = function(app) {
    // ====================== Normal Routing ========================//
    app.get('/', function(req, res, next) { isLoggedIn(req, res, next, false); },
        renderController.renderLogin);
    app.post('/login', authController.authenticateLogin);
    app.get('/logout', renderController.renderLogout);
    app.get('/signup', renderController.renderSignup);
    app.post('/deleteUser', authController.authenticateDelete);
    app.post('/signup', authController.authenticateSignup);

    function isLoggedIn(req, res, next, shouldRedirect) {
        if (req.isAuthenticated()) {
            return next();
        }
        if (shouldRedirect) {
            res.redirect(url);
        } else {
            return next();
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
