/**
 * Created by Arun on 3/18/2017.
 */
var express = require('express');
var app = express();
var tiles = require('../dashmeta.json').hod;
var menu = require('../menu.json').hod;

app.get('/', function (req, res) {
    if(req.session.login == 1){
        res.render("profilepage", {dash : tiles, menu : menu, user : req.session.passport.user});
    }
    else {
        res.redirect('/login');
    }
});

module.exports = app;