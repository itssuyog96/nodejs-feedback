/**
 * Created by adikr on 18-09-2016.
 */


var tdata = require('../tablemeta.json').admin;
var tiles = require('../dashmeta.json').admin;
var mdata = require('../modalmeta.json');

module.exports = function(app, passport) {

    app.get('/new',function (req, res) {
        res.send("hello world");
    });

    app.get('/login',notFirst,function (req,res) {

        res.render('login',{message:req.flash('loginMessage')});

    });

    app.post('/login',
        passport.authenticate('local-login', {
            failureRedirect: '/login'
        }),function (req,res) {
            req.session.login= 1;

            switch(req.user.role)
            {
                case 'admin':       choice ='/admin';
                                    break;

                case 'feed_analyzer':   choice ='/feed_analyzer';
                                    break;

                case 'principal':   choice ='/principal';
                                    break;

                case 'student':     choice ='/student';
                                    break;
                case 'hod':         choice = '/headofdepartment';
                                    break;

                default:break;
            }

            var redirectTo = req.session.redirectTo ? req.session.redirectTo : choice;
            delete req.session.redirectTo;

            res.redirect(redirectTo);
        }
    );

    app.get('/stud',
        passport.authenticate('studL', { session: true, failureRedirect: '/login' }),
        function(req, res) {

                req.session.login = 1;
                res.redirect('/student');
            });


    app.get('/profile',
        passport.authenticate('bearer', { session: true, failureRedirect: '/login' }),
        function(req, res) {

            console.log(req.user);
            req.session.login= 1;

            switch(req.user.role)
            {
                case 'admin':       choice ='/admin';
                    break;

                case 'feed_analyzer':   choice ='/feed_analyzer';
                    break;

                case 'principal':   choice ='/principal';
                    break;

                case 'student':     choice ='/student';
                    break;

                case 'hod':     choice ='/headofdepartment';
                    break;

                default:break;
            }

            var redirectTo = req.session.redirectTo ? req.session.redirectTo : choice;
            delete req.session.redirectTo;

            res.redirect(redirectTo);
        });


    /*app.get('/api/login',
        passport.authenticate('bearer', {

            failureRedirect: '/login'
        }),function (req,res) {
            req.session.login= 1;

            switch(req.user.role)
            {
                case 'admin':       choice ='/admin';
                    break;

                case 'feed_analyzer':   choice ='/feed_analyzer';
                    break;

                case 'principal':   choice ='/principal';
                    break;

                case 'student':     choice ='/student';
                    break;

                default:break;
            }

            var redirectTo = req.session.redirectTo ? req.session.redirectTo : choice;
            delete req.session.redirectTo;

            res.redirect(redirectTo);
        }
    );

    /*app.get('/api/login',
        passport.authenticate('api-login', {
            failureRedirect: '/login'
        }),function (req,res) {
            req.session.login= 1;

            switch(req.user.role)
            {
                case 'admin':       choice ='/admin';
                    break;

                case 'feed_analyzer':   choice ='/feed_analyzer';
                    break;

                case 'principal':   choice ='/principal';
                    break;

                case 'student':     choice ='/student';
                    break;

                default:break;
            }

            var redirectTo = req.session.redirectTo ? req.session.redirectTo : choice;
            delete req.session.redirectTo;

            res.redirect(redirectTo);
        }
    );*/

    app.get('/logout', function(req, res) {
        req.logout();
        delete req.session.login;
        res.redirect('/login');

    });

    function isadmIn(req, res, next) {

        // if user is authenticated in the session, carry on
        if (req.isAuthenticated()) {

            if(req.user.role != 'admin')
            {
                res.render('blank')
            }
            return next();


        }
        // if they aren't redirect them to the home page
        res.redirect('/login');
    }


    function isLoggedIn(req, res, next) {

        // if user is authenticated in the session, carry on
        if (req.isAuthenticated()) {

            return next();


        }
        req.session.redirectTo=req.path;

        // if they aren't redirect them to the home page
        res.redirect('/login');
    }

    function notFirst(req,res,next) {
        if(req.isAuthenticated()){
            res.redirect('/admin');
        }
        return next();
    }


};