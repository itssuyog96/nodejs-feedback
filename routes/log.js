/**
 * Created by adikr on 18-09-2016.
 */


var tdata = require('../tablemeta.json').admin;
var mdata = require('../modalmeta.json');

module.exports=function (app,passport) {

    app.get('/',function (req,res) {
        res.send("hello world");
    });

    app.get('/login',notFirst,function (req,res) {

        res.render('login',{message:req.flash('loginMessage')});

    });
    app.post('/login',
        passport.authenticate('local-login', {
            failureRedirect: '/login'
        }),function (req,res) {
            var redirectTo = req.session.redirectTo ? req.session.redirectTo : '/survey';
            delete req.session.redirectTo;
            res.redirect(redirectTo);
        }
    );

    app.get('/admin',isLoggedIn, function(req, res) {

        res.render('admin', {col: tdata.college, dept: tdata.department, profs: tdata.professor, subj: tdata.subject, mdata: mdata.topics});
    });

    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile', {
            user : req.user
        });
    });

    app.get('/about',isadmIn,function(req, res) {
        console.log(req.user.username);

        res.render('about');
    });

    app.get('/logout', function(req, res) {
        req.logout();
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