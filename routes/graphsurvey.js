/**
 * Created by Omkar Dubas on 10/2/2016.
 */

var express = require('express');
var router = express.Router();
var tiles =  require('../dashmeta.json').feeder;
var table = require('../tablemeta.json').other;
var menu = require('../menu.json').feed_analyzer;
var reports = require('../reports.json').topics;

/* GET home page. */
router.get('/', function(req, res, next) {

    if(req.session.login) {
        if(req.session.passport.user.role == 'feed_analyzer'){
            res.render('graphsurvey', {dash : tiles, menu : menu, user: req.session.passport.user,  profs : table.professor, rating: reports.rating});
        }
        else{
            delete req.session.redirectTo;
            res.redirect('/graphsurvey');
        }
    }
    else {
        req.session.redirectTo = '/feed_analyzer/';
        res.redirect('/graphsurvey');
    }


});

module.exports = router;