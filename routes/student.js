/**
 * Created by itssu on 08-Oct-16.
 */
var express = require('express');
var router = express.Router();
var tiles = require('../dashmeta.json').feeder;

/* GET home page. */
router.get('/', function(req, res, next) {

    res.render('blank');

});



module.exports = router;