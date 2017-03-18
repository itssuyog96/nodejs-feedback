/**
 * Created by itssuyog on 2/1/17.
 */
/**
 * Created by adikr on 16-10-2016.
 */
var express = require('express');
var router = express.Router();
var tiles = require('../dashmeta.json').hod;
var menu = require('../menu.json').hod;

/* GET home page. */
router.get('/', function(req, res, next) {

    if(req.session.login) {
        if(req.session.passport.user.role == 'hod'){
            res.render('dashboard', {dash : tiles, menu : menu, user : req.session.passport.user});
        }
        else{
            delete req.session.redirectTo;
            res.redirect('/login');
        }

    }
    else {
        req.session.redirectTo = '/headofdepartment/';
        res.redirect('/login');
    }
});

router.get('/hodsurvey', function(req, res, next) {

    if(req.session.login) {
        if(req.session.passport.user.role == 'hod'){
            res.render('hodsurveySelection', {dash : tiles, menu : menu, user : req.session.passport.user});
        }
        else{
            delete req.session.redirectTo;
            res.redirect('/login');
        }

    }
    else {
        req.session.redirectTo = '/headofdepartment/hodsurvey';
        res.redirect('/login');
    }
});
 //--------------------------------------------------------------------
router.get('/profile', function (req, res) {
    if(req.session.login) {
        if(req.session.passport.user.role == 'hod'){
            res.render('profilepage', {dash : tiles, menu : menu, user : req.session.passport.user, name: "XYZ", role: "HOD", email: "xyz@gmail.com", contact: "1234567890"});

        }
        else{
            delete req.session.redirectTo;
            res.redirect('/login');
        }

    }
    else {
        req.session.redirectTo = '/headofdepartment/';
        res.redirect('/login');
    }
});
//----------------------------------------------------------------------
router.get('/upload', function(req, res, next) {

    if(req.session.login) {
        if(req.session.passport.user.role == 'hod'){
            res.render('upload', {dash : tiles, menu : menu, user : req.session.passport.user});

        }
        else{
            delete req.session.redirectTo;
            res.redirect('/login');
        }

    }
    else {
        req.session.redirectTo = '/headofdepartment/';
        res.redirect('/login');
    }

});

router.get('/settings', function(req, res, next) {

    if(req.session.login) {
        if(req.session.passport.user.role == 'hod'){
            res.render('settings', {dash : tiles, menu : menu, user : req.session.passport.user});
        }
        else{
            delete req.session.redirectTo;
            res.redirect('/login');
        }

    }
    else {
        req.session.redirectTo = '/headofdepartment/';
        res.redirect('/login');
    }

});

router.get('/manage', function(req, res, next){

    res.render('feed_analyzer');
});

module.exports = router;