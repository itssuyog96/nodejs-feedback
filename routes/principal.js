 /**
 * Created by adikr on 16-10-2016.
 */
var express = require('express');
var router = express.Router();
var tiles = require('../dashmeta.json').principal;
 var menu = require('../menu.json').principal;
 var questions = require('../questions.json');

/* GET home page. */
router.get('/', function(req, res, next) {

    if(req.session.login) {
        if(req.session.passport.user.role == 'principal'){
            res.render('dashboard', {dash : tiles, menu : menu, user : req.session.passport.user});
        }
        else{
            delete req.session.redirectTo;
            res.redirect('/login');
        }

    }
    else {
        req.session.redirectTo = '/principal/';
        res.redirect('/login');
    }

});


 router.get('/subjectreports', function(req, res, next) {

     if(req.session.login) {
         if(req.session.passport.user.role == 'principal'){
             res.render('subjectreports', {dash : tiles, menu : menu, user : req.session.passport.user, questions: questions});
         }
         else{
             delete req.session.redirectTo;
             res.redirect('/login');
         }

     }
     else {
         req.session.redirectTo = '/principal/';
         res.redirect('/login');
     }

 });

 router.get('/professorreports', function(req, res, next) {

     if(req.session.login) {
         if(req.session.passport.user.role == 'principal'){
             res.render('professorreports', {dash : tiles, menu : menu, user : req.session.passport.user, questions: questions});
         }
         else{
             delete req.session.redirectTo;
             res.redirect('/login');
         }

     }
     else {
         req.session.redirectTo = '/principal/';
         res.redirect('/login');
     }

 });

 router.get('/excelreports', function(req, res, next) {

     if(req.session.login) {
         if(req.session.passport.user.role == 'principal'){
             res.render('subject_excel', {dash : tiles, menu : menu, user : req.session.passport.user});
         }
         else{
             delete req.session.redirectTo;
             res.redirect('/login');
         }

     }
     else {
         req.session.redirectTo = '/principal/excelreports';
         res.redirect('/login');
     }

 });

 router.get('/settings', function(req, res, next) {

     if(req.session.login) {
         if(req.session.passport.user.role == 'principal'){
             res.render('settings', {dash : tiles, menu : menu, user : req.session.passport.user});
         }
         else{
             delete req.session.redirectTo;
             res.redirect('/login');
         }

     }
     else {
         req.session.redirectTo = '/principal/';
         res.redirect('/login');
     }

 });

router.get('/manage', function(req, res, next){

    res.render('feed_analyzer');
});

 router.get('/profile', function (req, res) {
     if(req.session.login == 1){
         res.render("profilepage", {dash : tiles, menu : menu, user : req.session.passport.user});
     }
     else {
         res.redirect('/login');
     }
 });

module.exports = router;