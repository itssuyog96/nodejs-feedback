/**
 * Created by Omkar Dubas on 10/2/2016.
 */

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    var datax = req.session.passport.user;
    console.log("User data", JSON.stringify(datax));
    var db = req.db;
    var collection = db.get('subjects');
    collection.find({sem : datax.sem},{},function(e,docs) {

        console.log("Docs data",JSON.stringify(docs));
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