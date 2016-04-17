var userController = require('../controllers/userController');

module.exports = function(app, passport, express) {

    // ====================== Normal Routing ========================//
    app.get('/', function(req, res, next) {
            isLoggedIn(req, res, next, false);
        }, function(req, res) {
        res.render('pages/index.ejs', {
                loggedIn: req.isAuthenticated(),
                user: req.user,
                message: req.flash('loginMessage')
            });
    });
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/',
        failureRedirect: '/',
        failureFlash: true
    }))
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
    app.get('/signup', function(req, res) {
        res.render('pages/signup.ejs', {
            message: req.flash('signupMessage')
        });
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/signup',
        failureFlash: true
    }))


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

    // Register all Routers
    app.use('/api', apiRouter);

    // ===========================================================//


}
