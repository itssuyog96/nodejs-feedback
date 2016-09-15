/**
 * Created by adikr on 16-09-2016.
 */

var db =require('../db-config');
var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/load_colg', function(req, res, next) {

    db.query('SELECT * FROM `college`',function (err,result) {

        console.log(result);
        if (err) throw err;
        else
        {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write('{data:'+JSON.stringify(result)+'}');
            res.end();
        }
    });
});




router.get('/load_dept', function(req, res, next) {

    db.query('SELECT * FROM `department`',function (err,result) {

        console.log(result);
        if (err) throw err;
        else
        {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write('{data:'+JSON.stringify(result)+'}');
            res.end();
        }
    });
});




router.get('/load_prof', function(req, res, next) {

    db.query('SELECT * FROM `professor`',function (err,result) {

        console.log(result);
        if (err) throw err;
        else
        {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write('{data:'+JSON.stringify(result)+'}');
            res.end();
        }
    });

});


router.get('/load_sub', function(req, res, next) {

    db.query('SELECT * FROM `subject`',function (err,result) {

        console.log(result);
        if (err) throw err;
        else
        {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write('{data:'+JSON.stringify(result)+'}');
            res.end();
        }
    });

});



module.exports = router;