var workoutController = require('./workoutController');

exports.renderLogin = function(req, res) {
    res.render('pages/index.ejs', {
        loggedIn: req.isAuthenticated(),
        user: req.user,
        message: req.flash('loginMessage'),
        dmessage: req.flash('deleteMessage'),
        lmessage: req.flash('logoutMessage')
    });
}

exports.renderLogout = function(req, res) {
    req.logout();
    req.flash('logoutMessage', 'User successfully logged out!');
    res.redirect('/');
};

exports.renderSignup = function(req, res) {
    res.render('pages/signup.ejs', {
        message: req.flash('signupMessage')
    });
};

exports.renderProfile = function(req, res) {
    workoutController.getWorkouts(req.user.username, function(err, w) {
		var data = {workouts: w,
				   	user: req.user
				   }
		res.render('pages/profile.ejs', data);
    });
};

exports.renderViz= function(req, res) {
    workoutController.getWorkouts(req.user.username, function(err, w) {
		var data = {workouts: w,
				   	user: req.user 
				   }
		res.render('pages/viz.ejs', data);
    });
};

exports.renderAddWorkout = function(req, res) {
    res.render('pages/addWorkout.ejs', {
        user: req.user
    });
}
