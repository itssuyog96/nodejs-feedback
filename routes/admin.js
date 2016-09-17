/**
 * Created by itssu on 15-Sep-16.
 */

var express = require('express');
var router = express.Router();
var tdata = require('../tablemeta.json').admin;
var mdata = require('../modalmeta.json');

/* GET home page. */
router.get('/', function (req, res, next) {

    res.render('admin', {col: tdata.college, dept: tdata.department, profs: tdata.professor, subj: tdata.subject, mdata: mdata.topics});

});

module.exports = router;
