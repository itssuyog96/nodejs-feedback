/**
 * Created by Omkar Dubas on 10/2/2016.
 */

var express = require('express');
var router = express.Router();
var tiles = require('../dashmeta.json').feeder;
var menu = require('../menu.json').feed_analyzer;
var table = require('../tablemeta.json').other;
var mdata = require('../modalmeta.json');
var particulars = require('../particulars.json');


/* GET home page. */
router.get('/', function(req, res, next) {

    if(req.session.login) {
        if(req.session.passport.user.role == 'feed_analyzer'){
            res.render('dashboard', {dash : tiles, menu : menu, user: req.session.passport.user});
        }
        else{
            delete req.session.redirectTo;
            res.redirect('/login');
        }
    }
    else {
        req.session.redirectTo = '/feed_analyzer/';
        res.redirect('/login');
    }
});

router.get('/professor', function(req, res, next){


    if(req.session.login) {
        if(req.session.passport.user.role == 'feed_analyzer'){

            res.render('profentry', {menu : menu, user : req.session.passport.user, profs : table.professor, mdata : mdata.topics});
        }
        else{
            delete req.session.redirectTo;
            res.redirect('/login');
        }

    }
    else {
        req.session.redirectTo = '/feed_analyzer/professor';
        res.redirect('/login');
    }
});

router.get('/prof_assign', function(req, res){

    if(req.session.login) {
        if(req.session.passport.user.role == 'feed_analyzer'){

            var db = req.db;

            const collectionb = db.get('department');
            collectionb.find({col_id: req.user.col_id}, function(e2, docsb){
                if(e2) throw e2;
                res.render('profassign', {menu : menu, user : req.session.passport.user, departments: docsb});
            });

        }
        else{
            delete req.session.redirectTo;
            res.redirect('/login');
        }

    }
    else {
        req.session.redirectTo = '/feed_analyzer/prof_assign';
        res.redirect('/login');
    }
});

router.get('/lab_assign', function(req, res){

    if(req.session.login) {
        if(req.session.passport.user.role == 'feed_analyzer'){

            var db = req.db;
            const collection = db.get('labs');
            collection.find({col_id : req.user.col_id}, function(e, docs){

                if(e){
                    console.log("Error occured while fetching labs information");
                }
                else{
                    const collectionb = db.get('department');
                    collectionb.find({col_id: req.user.col_id}, function(e2, docsb){
                        if(e2) throw e2;
                        res.render('lab_assign', {menu : menu, user : req.session.passport.user, lab : docs, departments: docsb});
                    });

                }

            });

        }
        else{
            delete req.session.redirectTo;
            res.redirect('/login');
        }

    }
    else {
        req.session.redirectTo = '/feed_analyzer/lab_assign';
        res.redirect('/login');
    }
});


router.get('/reports', function(req, res){

    if(req.session.login) {
        if(req.session.passport.user.role == 'feed_analyzer'){

            res.render('reports', {menu : menu, user : req.session.passport.user});

        }
        else{
            delete req.session.redirectTo;
            res.redirect('/login');
        }

    }
    else {
        req.session.redirectTo = '/feed_analyzer/reports';
        res.redirect('/login');
    }
});



router.get('/survey', function(req, res){

    if(req.session.login) {
        if(req.session.passport.user.role == 'feed_analyzer'){

            res.render('survey', {menu : menu, user : req.session.passport.user});

        }
        else{
            delete req.session.redirectTo;
            res.redirect('/login');
        }

    }
    else {
        req.session.redirectTo = '/feed_analyzer/survey';
        res.redirect('/login');
    }
});


router.get('/survey_list', function(req, res){

    if(req.session.login) {
        if(req.session.passport.user.role == 'feed_analyzer'){

            res.render('survey-list', {menu : menu, user : req.session.passport.user});

        }
        else{
            delete req.session.redirectTo;
            res.redirect('/login');
        }

    }
    else {
        req.session.redirectTo = '/feed_analyzer/survey_list';
        res.redirect('/login');
    }
});

router.get('/manage', function(req, res, next){


    if(req.session.login) {
        if(req.session.passport.user.role == 'feed_analyzer'){
            res.render('feed_analyzer', {menu : menu, user: req.session.passport.user});
        }
        else{
            delete req.session.redirectTo;
            res.redirect('/login');
        }

    }
    else {
        req.session.redirectTo = '/feed_analyzer/manage';
        res.redirect('/login');
    }
});

router.get('/questions', function(req, res, next){


    if(req.session.login) {
        if(req.session.passport.user.role == 'feed_analyzer'){
            res.render('questions', {menu : menu, user: req.session.passport.user, particulars:particulars});
        }
        else{
            delete req.session.redirectTo;
            res.redirect('/login');
        }

    }
    else {
        req.session.redirectTo = '/feed_analyzer/questions';
        res.redirect('/login');
    }
});

router.get('/settings', function(req, res, next){


    if(req.session.login) {
        if(req.session.passport.user.role == 'feed_analyzer'){
            res.render('settings', {menu : menu, user: req.session.passport.user});
        }
        else{
            delete req.session.redirectTo;
            res.redirect('/login');
        }

    }
    else {
        req.session.redirectTo = '/feed_analyzer/settings';
        res.redirect('/login');
    }
});

router.get('/profile', function (req, res) {
    if(req.session.login == 1){
        if(req.session.passport.user.role == 'feed_analyzer'){
            res.render("profilepage", {dash : tiles, menu : menu, user : req.session.passport.user});
        }
        else{
            delete req.session.redirectTo;
            res.redirect('/login');
        }
    }
    else {
        req.session.redirectTo = '/feed_analyzer/profile';
        res.redirect('/login');
    }
});

router.get('/lab_assign', function (req, res) {
    if(req.session.login == 1){
        res.render("lab_assign", {dash : tiles, menu : menu, user : req.session.passport.user});
    }
    else {
        res.redirect('/login');
    }
});

module.exports = router;