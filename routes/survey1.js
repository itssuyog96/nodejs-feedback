var express = require('express');
var router = express.Router();
var menu = require('../menu.json').feed_analyzer;

/* GET home page. */
router.get('/', function(req, res, next) {

    var user = req.session.passport.user;

    res.render('survey1', {user: user, menu: menu});

});

module.exports = router;
