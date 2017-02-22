/**
 * Created by Arun on 2/3/2017.
 */
var express = require('express');
var fileUpload = require('express-fileupload');
var app = express();
var busboy = require('connect-busboy');
var fs = require('fs');

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
            newfile = req.body.sem_dd + sampleFile.name;
            fs.rename("./" + sampleFile.name, "./uploadDir/" + req.body.sem_dd + ".xlsx" , function (err) {
                if(err){
                    console.log(err);
                    res.status(500).send(err)
                }
            });
            res.end();
        }
    });
});


module.exports = app;

//TODO: upload.ejs -> button placement
//TODO: integrate upload_file.js with upload.js

