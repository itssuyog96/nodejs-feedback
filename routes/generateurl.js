//var db = require('../db-config');
var express = require('express');
var router = express.Router();
const crp = require('../functions/md5');
const secret = 'Aditya';
var spawn = require('child_process').spawn;
var sms = require('../functions/py_sms');
var mail = require('../functions/py_mail');
var jwt  = require('jwt-simple');
var GoogleURL = require('google-url');
googleUrl = new GoogleURL({key:'AIzaSyCGV2e7uvykKEnYr68QFZQyWxC1vWFy9O4'});
const nodemailer = require('nodemailer');


router.get('/', function (req, res, next){

    try{

        var contact = req.query['contact'];
        var email_id = req.query['email_id'];
        var username = req.query['nickname'];
        //var nameH = req.query['nameH'];
        var key = req.query['key'];
        var id = req.query['id'];

        var data ={
            name: username,
            password: key,
            contact:contact,
            email_id:email_id
        };

        var tok = jwt.encode(data,secret);
        console.log(token);

        var token = crp.crypto(tok);
        var HToken = crp.crypto(token);

        //console.log(contact+' '+username+' '+nameH+' '+key);

        var db = req.db;
        var collection = db.get("users");
        collection.update({"_id": id},{"$set":{"key":HToken}},function (e,docs){
            var d = JSON.stringify(docs);
            if (e) throw e;
            else {
                console.log('user Token updated');
            }

        });

        var url = 'https://bvcoe-feedback.herokuapp.com/profile?access_token='+token;

        //var proc = spawn('python',["python-files/SMSMessage.py", contact, username, nameH, key]);

        /*var proc = spawn('python',["python-files/mailer_v3.py", email_id, username,url]);
        console.log("Spawned!!!");

        proc.stdout.on('data', function (chunk){
            var textChunk = chunk.toString();
            console.log(textChunk)
        });

        console.log("Process finished");*/

        var transporter = req.transporter;

        var mailOptions = {
            from: 'feedbackbvcoenm@bharatividyapeeth.edu',
            to: email_id,
            subject: 'BVCOENM Feedback Login Link',
            html: "Hi " + username + ", Click on the following link to login into feedback system. Link -> " + url
        };
        transporter.sendMail(mailOptions, function (err, info) {
            if(err) console.log(err);
            else {
                console.log("Message " + info.messageId + " sent: " + info.response);
                //console.log("----------------------------" + survey_id);
                res.end();
            }
        });

        /*googleUrl.shorten( url, function(err, shortUrl ) {
            console.log(shortUrl);

        });*/





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