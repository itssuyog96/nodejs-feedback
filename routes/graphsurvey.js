/**
 * Created by Omkar Dubas on 10/2/2016.
 */

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('graphsurvey',{name:req.user.username, pass:req.user.password});

});

module.exports = router;