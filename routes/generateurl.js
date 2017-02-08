var db = require('../db-config');
var express = require('express');
var router = express.Router();
const crypto = require('crypto');
const secret = 'Aditya';
var spawn = require('child_process').spawn;
var sms = require('../functions/py_sms');

router.get('/', function (req, res, next){

    try{

        var contact = req.query['contact'];
        var username = req.query['username'];
        var nameH = req.query['nameH'];
        var key = req.query['key'];

        console.log(contact+' '+username+' '+nameH+' '+key);

        var proc = spawn('python',["python-files/SMSMessage.py", contact, username, nameH, key]);
        console.log("Spawned!!!");

        proc.stdout.on('data', function (chunk){
            var textChunk = chunk.toString();
            console.log(textChunk)
        });

        console.log("Process finished");
        // sms.sendsms(req.body.contact, req.body.username, req.body.nameH, req.body.key);
    }
    catch(e){
        //res.write(e);
        console.log(e);
        res.end();
    }

    res.writeHead(200, 'Sent Successfully!');
    res.end();


});

module.exports = router;