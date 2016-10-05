

var db = require("../db-config");
var Survey =  function (info) {

    this.data = {
        survey_id: null,
        sem: null,
        year: null
    };
    this.set = function (info) {

        for( var s in this.data){
            if(this.data[s] != undefined){
                this.data = info[s];
            }
        }

    };
    console.log(this.data);
    db.query('INSERT INTO Survey SET ?',this.data, function(err, result) {

        if (err) throw err;
        else{
            console.log('data added');
        }
    });


    this.update = function (id) {
        db.query('UPDATE Survey SET name=? WHERE id=?', [id], function (err, result) {

            if (err) throw err;
            else{
                console.log('data updated');
            }
        });
    };

    this.delete = function (id) {
        db.query('DELETE FROM `Survey` WHERE `survey_id`=?',[id],function (err,result) {
            if (err) throw err;
            else {
                console.log("Survey ID: "+id+" deleted.");
            }
        });

    };

    this.retrieve =function (info) {
        db.query('SELECT * FROM `Survey` WHERE `survey_id`=?'[info.survey_id],function (err,result) {

        })
    };

    this.getsurvey_id = function () {
        return this.data.survey_id;
    };

    this.getsem = function () {
        return this.data.sem;
    };

    this.getyear = function () {
        return this.data.year;
    }

};

module.exports = Survey;
