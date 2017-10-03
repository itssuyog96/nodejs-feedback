/**
 * Created by Arun on 2/3/2017.
 */
var express = require('express');
var fileUpload = require('express-fileupload');
var app = express();
var busboy = require('connect-busboy');
var fs = require('fs');
var crp = require('../functions/md5');
var generate = require('../functions/generate');

/*busboy.extend(app, {

});*/
app.use(busboy());
// default options
app.use(fileUpload());

app.post('/', function(req, res) {
    var sampleFile;

    if (!req.files) {
        console.log(req.body);
        //res.send('No files were uploaded.');
        console.log('No files were uploaded');
        return;
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.SampleFile;
    console.log(req.body.sem_dd);

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(sampleFile.name, function(err) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            //res.send('File uploaded!');
            console.log('File uploaded!');
            console.log(req.body.sem_dd);
            newfile = req.body.sem_dd + sampleFile.name;
            fs.rename("./" + sampleFile.name, "./StudentExcelFiles/" + req.body.sem_dd + ".xlsx" , function (err) {
                if(err){
                    console.log(err);
                    //res.status(500).send(err);
                }
                else {
                    if(typeof require !== 'undefined') XLSX = require('xlsx');
                    var request = require('request');
                    console.log("inside addsheet");

                    var name, roll_no, email_id, contact, x, role, nameH="N", password, passwordH1="M", passwordH2="T", uid;

                    var workbook = XLSX.readFile("StudentExcelFiles/"+req.body.sem_dd+".xlsx");
                    var sheet = workbook.Sheets['details'];

                    if(sheet == null){
                        //exception handling over here
                        console.log("Check sheet name. It should be 'details'");
                        res.status(400).send("Upload failed. Sheet name is not 'details'. Reupload after making changes");
                    }
                    else{
                        console.log("excel data");
                        
                        var db = req.db;
                        var collection = db.get('student');
    
                        for(x = 2; x < 100; x++){
    
                            if(sheet['A' + x.toString()] == undefined)
                            {
                                console.log("Empty");
                                break;
                            }
                            else {
                                name = sheet['B' + x.toString()].v;
    
                                password = generate.generatePassword();
                                password = crp.crypto(password);
    
                                //role = "student";
                                roll_no = sheet['A' + x.toString()].v;
                                email_id = sheet['C' + x.toString()].v;
                                contact = sheet['D' + x.toString()].v;
                                //uid = sheet['E' + x.toString()].v;
    
                                /*console.log("name:" + name);
                                console.log("roll:" + roll_no);
                                console.log("name:" + email_id);
                                console.log("contact:" + contact);
                                console.log("uid: " + uid);
                                console.log("userid: " + userid);*/
                            }
    
                            collection.insert({"col_id":req.user.col_id,"dep_id":req.user.dep_id,"roll_no": roll_no,"name": name,"sem":req.body.sem_dd,"contact":contact,"email_id":email_id, "password":password, "status":"0","role":"student","survey_id":""},function(e,docs){
                                var d = JSON.stringify(docs);
                                if (e) throw e;
                                else {
                                    console.log('student updated');
                                    //res.end();
                                }
    
                            });
                            /*var proc = spawn('python',["python-files/SMSMessage.py", contact, name, password, uid, "0bfb331611cbcf420b38f73e1936f836", "057829fa5a65fc1ace408f490be486ac"]);
                                console.log("Spawned!!!");
    
                                proc.stdout.on('data', function (chunk){
                                var textChunk = chunk.toString();
                                console.log(textChunk)
                                });
    
                                console.log("Process finished");*/
    
                        }
                    }
                    //pysms.sendsms(contact, name, password, uid, "0bfb331611cbcf420b38f73e1936f836", "057829fa5a65fc1ace408f490be486ac");
                }
            });
            setTimeout(function () {
                res.end();
            }, 15000)
        }
    });
});


app.post('/manual', function(req, res) {

    var name, roll_no, email_id, contact, x, role, nameH="N", password, passwordH1="M", passwordH2="T", uid;

    var db = req.db;
    var collection = db.get('student');

    name = req.body.name;

    password = generate.generatePassword();
    password = crp.crypto(password);

    roll_no = req.body.roll_no;
    email_id = req.body.email_id;
    contact = req.body.contact;


    collection.insert({"col_id":req.user.col_id,"dep_id":req.user.dep_id,"roll_no": roll_no,"name": name,"sem":req.body.sem_dd,"contact":contact,"email_id":email_id, "password":password, "status":"0","role":"student","survey_id":""},function(e,docs){
        var d = JSON.stringify(docs);
        if (e) throw e;
        else {
            console.log('student updated');
            res.end();
        }

    });

});

module.exports = app;