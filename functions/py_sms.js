/**
 * Created by Arun on 2/2/2017.
 */
//var express = require('express');
//var router = express.Router();

module.exports.sendsms = function (contact, name, nameH, passwordH1) {

    var spawn = require('child_process').spawn;

    var proc = spawn('python',["python-files/SMSMessage.py", contact, name, nameH, passwordH1]);
    console.log("Spawned!!!");

    proc.stdout.on('data', function (chunk){
        var textChunk = chunk.toString();
        console.log(textChunk)
    });

    console.log("Process finished");
};

/*router.get('/', function (req, res) {
    res.end()
});

module.exports = router;
*/