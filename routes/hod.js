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
var questions = require('../questions.json');
var path = require('path');

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
            res.render('hodSurveySelection', {dash : tiles, menu : menu, user : req.session.passport.user});
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
    if(req.session.login == 1){
        res.render("profilepage", {dash : tiles, menu : menu, user : req.session.passport.user});
    }
    else {
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

//----------------------------------------------------------------
router.get('/upload/download_template', function(req, res, next){
    //console.log("DIRECTORY NAME:" + path.join(__dirname, "../workbooks"));
    var file = path.join(__dirname, "../workbooks/StudentDetails.xlsx");
    res.download(file);
});

//----------------------------------------------------------------
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

router.get('/professor', function (req, res) {
    if(req.session.login == 1){
        res.render("professorreports", {dash : tiles, menu : menu, user : req.session.passport.user, questions: questions});
    }
    else {
        res.redirect('/login');
    }
});

router.get('/subject', function (req, res) {
    if(req.session.login == 1){
        res.render("subjectreports", {dash : tiles, menu : menu, user : req.session.passport.user, questions: questions});
    }
    else {
        res.redirect('/login');
    }
});

module.exports = router;