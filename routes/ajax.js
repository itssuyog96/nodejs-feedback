/**
 * Created by adikr on 16-09-2016.
 */

var db = require('../db-config');
var express = require('express');
var router = express.Router();
var Professor = require('../classes/prof');


/* GET home page. */
router.get('/load_colg', function (req, res, next) {

    db.query('SELECT * FROM `college`', function (err, result) {

        console.log(result);
        if (err) throw err;
        else {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write('{"data":' + JSON.stringify(result) + '}');
            res.end();
        }
    });
});


router.post('/load_dept', function (req, res, next) {


    db.query('SELECT * FROM `department` WHERE `col_id` = ?', req.body.id, function (err, result) {

        console.log(result);
        if (err) throw err;
        else {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write('{"data":' + JSON.stringify(result) + '}');
            res.end();
        }
    });
});


router.post('/load_prof', function (req, res, next) {

    db.query('SELECT * FROM `professor` WHERE `dept_id` = ?', req.body.id, function (err, result) {

        console.log(result);
        if (err) throw err;
        else {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write('{"data":' + JSON.stringify(result) + '}');
            res.end();
        }
    });

});


router.post('/load_sub', function (req, res, next) {

    db.query('SELECT * FROM `subject` WHERE `dept_id` = ?', req.body.id, function (err, result) {

        console.log(result);
        if (err) throw err;
        else {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write('{"data":' + JSON.stringify(result) + '}');
            res.end();
        }
    });

});

router.post('/del_prof', function (req, res, next) {

    try {

        prof = new Professor();

        prof.delete(req.body.id);

    } catch (e) {
        res.writeHead(500, {'Content-Type': 'text/html'});
        res.write('Error in database!' + e);
        res.end();
    }

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('Professor deleted');
    res.end();

});


module.exports = router;