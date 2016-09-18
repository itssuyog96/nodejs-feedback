/**
 * Created by Omkar Dubas on 16-09-2016.
 */
var express = require('express');
var router = express.Router();
var tdata = require('../tablemeta.json').other;
var mdata = require('../modalmeta.json').topics;

/* GET home page. */
router.get('/', function(req, res, next) {
    var user = {
        col_id : '1001',
        dept_id: '11'
    };

    res.render('profentry', {user : user, profs : tdata.professor, mdata : mdata});

});

module.exports = router;