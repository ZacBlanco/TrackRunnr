
exports.renderLogin = function(req, res) {
    console.log('in renderlogin');
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
