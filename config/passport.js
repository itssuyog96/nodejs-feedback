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

            var data= req.db;
            var collection = data.get('users');
            collection.find({"name":username},function(e,docs){
                //var d = JSON.stringify(docs);
                if(e){
                    return done(e);
                }
                if(docs == 0){
                    return done(null, false,req.flash('loginMessage', 'No user found.'));
                }
                if(!(docs[0].password == password)){
                    return done(null, false ,req.flash('loginMessage', 'Oops! Wrong password.'));
                }
                return done(null, docs[0]);
            });





        }));

};