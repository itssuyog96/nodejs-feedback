/**
 * Created by adikr on 18-09-2016.
 */

module.exports=function (app,passport) {

    app.get('/',function (req,res) {
        res.send("hello world");
    });

    app.get('/login',function (req,res) {

        res.render('login');

    });
    app.post('/login',
        passport.authenticate('local-login', { successRedirect: '/blank',
            failureRedirect: '/login'
        })
    );

    app.get('/admin',isLoggedIn, function(req, res) {

        res.render('admin');
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
        // if they aren't redirect them to the home page
        res.redirect('/login');
    }


};