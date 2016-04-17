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
        res.render('pages/login.ejs');
    });
    app.post('/login', function(req, res, next) {
        passport.authenticate('local-login', function(err, user, info) {
            if (err) { return next(err); }
            if (!user) { return res.redirect('/login'); }
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                return res.redirect('/');
            });
        }
        , {
            successRedirect: '/',
            failureRedirect: '/',
            failureFlash: true
        })(req, res, next);
    });
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
    app.get('/signup', function(req, res) {
        res.render('pages/signup.ejs');
    });
    app.post('/signup', function(req, res, next) {
        passport.authenticate('local-signup', function(err, user, info) {
            if (err) { return next(err); }
            if (!user) { return res.redirect('/login'); }
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                return res.redirect('/');
            });
        }
        , {
            successRedirect: '/',
            failureRedirect: '/',
            failureFlash: true
        })(req, res, next);
    });

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
