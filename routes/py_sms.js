/**
 * Created by Arun on 2/2/2017.
 */
var express = require('express');
var router = express.Router();
var spawn = require('child_process').spawn;

router.get('/', function (req, res) {
    var proc = spawn('python',["python-files/SMSMessage.py"]);
    console.log("Spawned!!!");

    proc.stdout.on('data', function (chunk){
        var textChunk = chunk.toString();
        console.log(textChunk)
    });

    console.log("Process finished");

    res.end()
});

module.exports = router;
