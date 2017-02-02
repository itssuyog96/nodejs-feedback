/**
 * Created by Arun on 2/1/2017.
 */
//var db = require('../db-config');
var express = require('express');
var router = express.Router();


router.get('/test', function (req, res) {
    console.log("hello");
    res.end();
});

router.get('/',function (req, res){
    if(typeof require !== 'undefined') XLSX = require('xlsx');
    var request = require('request');
    console.log("inside addsheet");
    var name, roll_no, email_id, contact, x;
    var workbook = XLSX.readFile("workbooks/StudentDetails.xlsx");
    var sheet = workbook.Sheets['details'];

    console.log("excel data");

    var db = req.db;
    var collection = db.get('student');

    for(x = 2; x < 80; x++){
    name = sheet['B' + x.toString()].v;
    roll_no = sheet['A' + x.toString()].v;
    email_id = sheet['C' + x.toString()].v;
    contact = sheet['D' + x.toString()].v;
    console.log("name:" + name);
    console.log("roll:" + roll_no);
    console.log("name:" + email_id);
    console.log("contact:" + contact);

    collection.insert({"col_id":"32132","dept_id":"23","roll_no": roll_no,"name": name,"sem":"4","contact":contact,"email_id":email_id},function(e,docs){
        var d = JSON.stringify(docs);
        if (e) throw e;
        else {
            console.log('student updated');
            res.end();
        }

    });
    }


    /*var requestData =
        {
            "name": name,
            "roll_no": roll_no,
            "email_id": email_id,
            "contact": contact,
            "col_id": "1234",
            "dept_id": "01",
            "sem": "5"
        };

    request({
        url: "http://localhost:3000/ajax/addstudentexcel",
        method: "POST",
        json: true,
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(requestData)
    }, function (error, response) {
        if (!error && response.statusCode === 200) {
            console.log(body)
        }
        else {

            console.log("error: " + error);
            console.log("response.statusCode: " + response.statusCode);
            console.log("response.statusText: " + response.statusText)
        }
    });*/


});
module.exports = router;
