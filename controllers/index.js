'use strict';

var auth = require('../lib/auth');
var passport = require('passport');


module.exports = function (router) {
    router.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    router.get('/login', function (req, res) {

        //Include any error messages that come from the login process.
        var model = {};
        model.errors = req.flash('error');
        res.render('login/login', model);
    });

    /**
     * Receive the login credentials and authenticate.
     * Successful authentications will go to /profile or if the user was trying to access a secured resource, the URL
     * that was originally requested.
     *
     * Failed authentications will go back to the login page with a helpful error message to be displayed.
     */
    router.post('/login', function (req, res) {
            passport.authenticate('local', {
                successRedirect: '/',
                failureRedirect: "/login",
                failureFlash: true
            })(req, res)
        }
    );
    router.post('/external_login', passport.authenticate('local'), function (req, res) {
            console.log(res.req.session);
            //console.log('-------');
            //console.log(req);
            res.send(res.session);
        }
    );

    /**
     * Allow the users to log out
     */
    router.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    router.get('/', auth.isAuthenticated(['admin', 'user']), function (req, res) {
        res.render('layouts/master', {});
    });
    router.get('/session', auth.isAuthenticated(['admin', 'user']), function (req, res) {
        if (typeof req.user.username !== 'undefined' && typeof req.session.passport.user !== 'undefined') {

            res.send({auth: true, id: req.user.id, username: req.user.username, role: req.user.role});
        } else {
            res.send({auth: false});
        }
    });


};
