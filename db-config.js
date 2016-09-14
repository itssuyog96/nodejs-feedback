/**
 * Created by adikr on 13-09-2016.
 */
var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : '31.220.20.208',
    user     : 'u401895710_ufeed',
    password : 'Success@1996',
    database : 'u401895710_feed'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;