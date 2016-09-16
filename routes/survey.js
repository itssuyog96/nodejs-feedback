/**
 * Created by Omkar Dubas on 15-09-2016.
 */

var express = require('express');
var router = express.Router();
var db = require('../db-config');

/* GET home page. */
router.get('/', function(req, response, next) {

    var sem = 2;
    var dept = 11;
    var col = 1001;

    db.query("SELECT * FROM `subject` WHERE `col_id` = ? AND `dept_id` = ? AND `sem` = ?",[col, dept, sem], function(err, res){

        var subjects = [];
        for(var i = 0; i < res.length; i++){
            subjects[i] = res[i].sub_name;
        }

        response.render('survey', {subject : subjects});

    });


//response.end();
});

module.exports = router;
