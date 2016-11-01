/**
 * Created by adikr on 16-09-2016.
 */

var db = require('../db-config');
var express = require('express');
var router = express.Router();
var Professor = require('../classes/prof');
var Subject = require('../classes/subject');
var Department = require('../classes/dept');
var College = require('../classes/college');
var info = require('../tablemeta.json');


/* GET home page. */
router.get('/load_colg', function (req, res, next) {

    var db = req.db;
    var collection = db.get('college');
    collection.find({},function(e,docs){
        var d = JSON.stringify(docs);
        if (e) throw e;
        else {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write('{"data":' + d + '}');
            res.end();
        }

    });
});


router.get('/load_dept', function (req, res, next) {

    var db = req.db;
    var q = JSON.stringify(req.query);
    console.log(req.query.col_id);
    console.log(q);
    var collection = db.get('department');

    collection.find({"col_id" : req.query.col_id},function(e,docs){
        var d = JSON.stringify(docs);
        if (e) throw e;
        else {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write('{"data":' + d + '}');
            res.end();
        }

    });
});



router.get('/load_prof', function (req, res, next) {

    var db = req.db;
    var collection = db.get('professor');
    collection.find(req.body,function(e,docs){
        var d = JSON.stringify(docs);
        if (e) throw e;
        else {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write('{"data":' + d + '}');
            res.end();
        }

    });
});

router.get('/load_sub', function (req, res, next) {

    var db = req.db;
    var collection = db.get('subject');
    collection.find(req.body,function(e,docs){
        var d = JSON.stringify(docs);
        if (e) throw e;
        else {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write('{"data":' + d + '}');
            res.end();
        }

    });
});

router.post('/del_prof', function (req, res, next) {

    try {

        prof = new Professor();

        prof.delete(req.body);

    } catch (e) {
        res.writeHead(500, {'Content-Type': 'text/html'});
        res.write('Error in database!' + e);
        res.end();
    }

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('Professor deleted');
    res.end();

});

router.post('/update_prof', function (req, res, next) {

    try {
        prof = new Professor();

        prof.update(req.body.id, req.body.name);
    }catch (e){
        res.writeHead(500, {'Content-Type': 'text/html'});
        res.write('Error in database!' + e);
        res.end();
    }

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('Professor updated');
    res.end();
});

router.post('/add_prof', function (req, res, next) {

    try{
        prof = new Professor();

        prof.set(req.body);
    }catch (e){
        res.writeHead(500, {'Content-Type': 'text/html'});
        res.write('Error in database!' + e);
        res.end();
    }

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('Professor added');
    res.end();

});

router.post('/del_subject', function (req, res, next) {

    try {
        sub = new Subject();

        sub.delete(req.body.id);
    }catch (e){
        res.writeHead(500, {'Content-Type': 'text/html'});
        res.write('Error in database!' + e);
        res.end();
    }

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('Subject deleted');
    res.end();

});

router.post('/update_sub', function (req, res, next) {

    try {
        sub = new Subject();

        sub.update(req.body.id, req.body.name);
    }catch (e){
        res.writeHead(500, {'Content-Type': 'text/html'});
        res.write('Error in database!' + e);
        res.end();
    }

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('Subject updated');
    res.end();
});

router.post('/add_subject', function (req, res, next) {

    try{
        sub = new Subject();

        sub.set(req.body);
    }catch (e){
        res.writeHead(500, {'Content-Type': 'text/html'});
        res.write('Error in database!' + e);
        res.end();
    }

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('Subject added');
    res.end();

});

router.post('/del_dept', function (req, res, next) {

    try {
        var dept = new Department();

        console.log("Data delete request : " + JSON.stringify(req.body));
        dept.delete(req.body);
    }catch (e){
        res.writeHead(500, {'Content-Type': 'text/html'});
        res.write('Error in database!' + e);
        res.end();
    }

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('Department deleted');
    res.end();

});

router.post('/update_dept', function (req, res, next) {

    try {
        dept = new Department();

        dept.update(req.body.id, req.body.name);
    }catch (e){
        res.writeHead(500, {'Content-Type': 'text/html'});
        res.write('Error in database!' + e);
        res.end();
    }

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('Department updated');
    res.end();
});

router.post('/login', function(req, res){

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('Authentication module in development...');
    res.end();
});

router.post('/add_dept', function (req, res, next) {

    try{
        dept = new Department();
        console.log("Request Values: "+JSON.stringify(req.body));
        dept.set(req.body);
    }catch (e){
        res.writeHead(500, {'Content-Type': 'text/html'});
        res.write('Error in database!' + e);
        res.end();
    }

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('Subject added');
    res.end();

});

router.post('/del_col', function (req, res, next) {

    try {
        col = new College();

        col.delete(req.body);
    }catch (e){
        res.writeHead(500, {'Content-Type': 'text/html'});
        res.write('Error in database!' + e);
        res.end();
    }

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('College deleted');
    res.end();

});

router.post('/update_col', function (req, res, next) {

    try {
        col = new College();

        col.update(req.body.id, req.body.name);
    }catch (e){
        res.writeHead(500, {'Content-Type': 'text/html'});
        res.write('Error in database!' + e);
        res.end();
    }

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('College updated');
    res.end();
});

router.post('/add_col', function (req, res, next) {

    try{
        col = new College();

        col.set(req.body);
    }catch (e){
        res.writeHead(500, {'Content-Type': 'text/html'});
        res.write('Error in database!' + e);
        res.end();
    }

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('College added!');
    res.end();

});


router.post('/getQuestions', function (req, res, next) {

    var db = req.db;
    var collection = db.get('question');
    collection.find(req.body,function(e,docs){
        var d = JSON.stringify(docs);
        if (e) throw e;
        else {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(d);
            res.end();
        }

    });
});

router.post('/getSubject', function (req, res, next) {

    var db = req.db;
    var collection = db.get('subject');
    collection.find(req.body,function(e,docs){
        var d = JSON.stringify(docs);
        if (e) throw e;
        else {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(d);
            res.end();
        }

    });
});





module.exports = router;