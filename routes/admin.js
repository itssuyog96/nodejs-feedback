/**
 * Created by itssu on 15-Sep-16.
 */

var express = require('express');
var router = express.Router();
var tdata = require('../tablemeta.json').admin;
var tiles = require('../dashmeta.json').admin;
var mdata = require('../modalmeta.json');
var menu = require('../menu.json').admin;

/* GET home page. */
router.get('/', function (req, res, next) {

    if(req.session.login) {
        if(req.session.passport.user.role == 'admin'){
            res.render('dashboard', {dash : tiles, menu : menu, user : req.session.passport.user});
        }
        else{
            delete req.session.redirectTo;
            res.redirect('/login');
        }

    }
    else {
        req.session.redirectTo = '/admin/';
        res.redirect('/login');
    }
});

router.get('/manage', function(req, res, next){

    if(req.session.login) {
        if(req.session.passport.user.role == 'admin'){
            res.render('admin', {menu : menu, user : req.session.passport.user, col: tdata.college, dept: tdata.department, profs: tdata.professor, subj: tdata.subject, mdata: mdata.topics});
        }
        else{
            delete req.session.redirectTo;
            res.redirect('/login');
        }

    }
    else {
        req.session.redirectTo = '/admin/manage';
        res.redirect('/login');
    }

});

router.get('/manage_login', function(req, res, next){
    if(req.session.login) {
        if(req.session.passport.user.role == 'admin'){
            res.render('manage_login', {menu : menu, user : req.session.passport.user});
        }
        else{
            delete req.session.redirectTo;
            res.redirect('/login');
        }

    }
    else {
        req.session.redirectTo = '/admin/manage_login';
        res.redirect('/login');
    }
});


module.exports = router;
