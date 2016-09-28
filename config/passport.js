/**
 * Created by adikr on 18-09-2016.
 */

var db=require('../db-config');
var LocalStrategy   = require('passport-local').Strategy;


module.exports = function(passport) {


    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user);
        console.log(user);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        //db.query("select * from `login` where username = ?",[id.id],function(err,rows){
        done(null, id);
        //console.log(id);
        //});
    });

    //login//
    passport.use('local-login', new LocalStrategy({

            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true
        },
        function(req, username, password, done) {
            //console.log(email);
            //console.log(password);
            db.query("SELECT * FROM `login` WHERE `username` = ?",[username],function(err,result){
                if (err)
                    return done(err);
                if (!result.length) {
                    return done(null, false,req.flash('loginMessage', 'No user found.'));
                }


                if (!( result[0].password == password))
                    return done(null, false ,req.flash('loginMessage', 'Oops! Wrong password.'));

                // all is well, return successful user
                return done(null, result[0]);


            });



        }));

};