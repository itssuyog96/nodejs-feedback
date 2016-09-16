/**
 * Created by Omkar Dubas on 16-09-2016.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('subadd');

});

module.exports = router;