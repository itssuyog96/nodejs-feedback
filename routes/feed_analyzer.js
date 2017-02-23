/**
 * Created by Omkar Dubas on 10/2/2016.
 */

var express = require('express');
var router = express.Router();
var tiles = require('../dashmeta.json').feeder;
var menu = require('../menu.json').feed_analyzer;
var table = require('../tablemeta.json').other;
var mdata = require('../modalmeta.json');


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
            const collection = db.get('professor');
            collection.find({col_id : req.user.col_id}, function(e, docs){

                if(e){
                    console.log("Error occured while fetching professors information");
                }
                else{
                    const collectionb = db.get('department');
                    collectionb.find({col_id: req.user.col_id}, function(e2, docsb){
                        if(e2) throw e2;
                        res.render('profassign', {menu : menu, user : req.session.passport.user, prof : docs, departments: docsb});
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
        req.session.redirectTo = '/feed_analyzer/prof_assign';
        res.redirect('/login');
    }
});

router.get('/reports', function(req, res){

    if(req.session.login) {
        if(req.session.passport.user.role == 'feed_analyzer'){

            res.render('graphsurvey', {menu : menu, user : req.session.passport.user});

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

module.exports = router;