/**
 * Created by adikr on 16-10-2016.
 */
var express = require('express');
var router = express.Router();
var tiles = require('../dashmeta.json').feeder;

/* GET home page. */
router.get('/', function(req, res, next) {

    res.render('dashboard', {dash : tiles});

});

router.get('/manage', function(req, res, next){

    res.render('feed_analyzer');
});

module.exports = router;