/**
 * Created by itssu on 15-Sep-16.
 */

var express = require('express');
var router = express.Router();
var tdata = require('../tablemeta.json').admin;
var tiles = require('../dashmeta.json').admin;
var mdata = require('../modalmeta.json');

/* GET home page. */
router.get('/', function (req, res, next) {

    res.render('dashboard', {dash : tiles});
});

router.get('/manage', function(req, res, next){

    console.log("College data"+tdata.college);
    res.render('admin', {col: tdata.college, dept: tdata.department, profs: tdata.professor, subj: tdata.subject, mdata: mdata.topics});

});


router.get('/ajax/load_colg', function (req, res, next) {

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


router.post('/ajax/load_dept', function (req, res, next) {

    var db = req.db;
    var collection = db.get('department');
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



router.post('/ajax/load_prof', function (req, res, next) {

    var db = req.db;
    var collection = db.get('professor');
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

router.post('/ajax/load_sub', function (req, res, next) {

    var db = req.db;
    var collection = db.get('subject');
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

router.post('/ajax/del_prof', function (req, res, next) {

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

router.post('/ajax/update_prof', function (req, res, next) {

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

router.post('/ajax/add_prof', function (req, res, next) {

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

router.post('/ajax/del_subject', function (req, res, next) {

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

router.post('/ajax/update_sub', function (req, res, next) {

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

router.post('/ajax/add_subject', function (req, res, next) {

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

router.post('/ajax//del_dept', function (req, res, next) {

    try {
        dept = new Department();

        dept.delete(req.body.id);
    }catch (e){
        res.writeHead(500, {'Content-Type': 'text/html'});
        res.write('Error in database!' + e);
        res.end();
    }

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('Department deleted');
    res.end();

});

router.post('/ajax/update_dept', function (req, res, next) {

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

router.post('/ajax/add_dept', function (req, res, next) {

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

router.post('/ajax/del_col', function (req, res, next) {

    try {
        col = new College();

        col.delete(req.body.id);
    }catch (e){
        res.writeHead(500, {'Content-Type': 'text/html'});
        res.write('Error in database!' + e);
        res.end();
    }

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('College deleted');
    res.end();

});

router.post('/ajax/update_col', function (req, res, next) {

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

router.post('/ajax/add_col', function (req, res, next) {

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


module.exports = router;
