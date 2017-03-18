var jwt  = require('jwt-simple');
var GoogleURL = require('google-url');
googleUrl = new GoogleURL({key:'AIzaSyCGV2e7uvykKEnYr68QFZQyWxC1vWFy9O4'});
const crp = require('../functions/md5');
const secret = 'Aditya';
var spawn = require('child_process').spawn;
var monk = require('monk');
var db = monk('mongodb://the-wire:Success%401996@ds061076.mlab.com:61076/feed-db');
const nodemailer = require('nodemailer');



module.exports.generatePassword = function () {
    var pass = Math.ceil(Math.random()*(99999 - 10000)+ 10000);

    return pass.toString();

};



module.exports.generateuid = function(col_id,dep_id,sem,roll_no){
    var uid = col_id + dep_id + sem + roll_no ;
    return uid
};


module.exports.generateSend = function (contact,email_id,username,key,id,survey_id, transporter) {


    var data ={
        name: username,
        password: key,
        contact:contact,
        email_id:email_id
    };

    console.log(JSON.stringify(data));

    var tok = jwt.encode(data,secret);

    var token = crp.crypto(tok);
    var HToken = crp.crypto(token);

    //console.log(contact+' '+username+' '+nameH+' '+key);

    var collection = db.get("student");
    //console.log("----------------------------" + survey_id);
    collection.update({"_id": id},{"$set":{"key":HToken,"survey_id":survey_id,"status":"1"}},function (e,docs){
        var d = JSON.stringify(docs);
        if (e) throw e;
        else {
            console.log('user Token updated');
        }

    });

    //var url = 'http://172.18.1.50/stud?access_token='+token;
    var url = 'http://localhost:3000/stud?access_token='+token;

    //var proc = spawn('python',["python-files/SMSMessage.py", contact, username, nameH, key]);

    googleUrl.shorten( url, function(err, shortUrl ) {
        //console.log(shortUrl);
        //console.log(err);
        //console.log(url);
        /*var proc = spawn('python',["python-files/mailer_v3.py", email_id, username,url]);
        console.log("Spawned!!!");

        proc.stdout.on('data', function (chunk){
            var textChunk = chunk.toString();
            console.log(textChunk)
        });*/

        //console.log("Process finished");
        var mailOptions = {
            from: 'thewirecoy@gmail.com',
            to: email_id,
            subject: 'BVCOENM Feedback Link',
            html: "Hi " + username + ", Click on the following link to login into feedback system. Link -> " + url
        };
        transporter.sendMail(mailOptions, function (err, info) {
            if(err) console.log(err);
            else console.log("Message " + info.messageId + " sent: " + info.response);
        });
    });
};



