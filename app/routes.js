var userController = require('../controllers/userController');

module.exports = function(app, passport, express) {

    // ====================== Normal Routing ========================//
    app.get('/', isLoggedIn, function(req, res) {
        res.render('pages/index.ejs', {
            loggedIn: req.isAuthenticated(),
            user: req.user
        });
    });
    app.get('/login', function(req, res) {
        res.render('pages/login.ejs', { message: req.flash('loginMessage')});
    });
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/',
        failureRedirect: '/',
        failureFlash: true
    }));
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
    app.get('/signup', function(req, res) {
        res.render('pages/signup.ejs', { message: req.flash('signupMessage')});
    });
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/',
        failureFlash: true
    }))

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/');
    }

    // ====================== API Routing ========================//
    var apiRouter = express.Router();
    apiRouter.route('/users')
        .post(userController.postUser)
        .get(userController.getUsers);
    apiRouter.route('/users/:username')
        .delete(userController.deleteUser)
        .get(userController.getUser);


    // Register all Routers
    app.use('/api', apiRouter);

    // ===========================================================//


}
