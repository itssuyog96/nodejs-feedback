/**
 * Created by Omkar Dubas on 15-09-2016.
 */

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('survey', {subject : ["SUB1", "SUB2", "SUB3"]});

});

module.exports = router;
