/**
 * Created by Omkar Dubas on 10/2/2016.
 */

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    var db = req.db;
    var collection = db.get('users');
    collection.find({},{},function(e,docs) {


        var datax = docs[0];

        var datay = {
            "data": [{
                "prof_id": "21",
                "prof_name": "Balkhande"
            }, {
                "prof_id": "22",
                "prof_name": "Mane"
            }, {
                "prof_id": "23",
                "prof_name": "Barse"
            }]
        };

        res.render('professor_assign', {professors: datay, user: datax});

    });

});

module.exports = router;