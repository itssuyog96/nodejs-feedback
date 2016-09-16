/**
 * Created by arun on 16/09/2016.
 */

var db=require('../db-config');
var College=function (info) {

    this.data = {
        col_id: null,
        col_name: null
    };
    this.set = function (info) {
        for(var p in this.data){
            if(this.data[p] !=='undefined'){
                this.data[p]=info[p];
            }

        }
        console.log(this.data);
        db.query('INSERT INTO college SET ?',this.data, function(err, result) {

            if (err) throw err;
            else{
                console.log('data added');
            }
        });

    };

    this.update = function (id, name) {
        db.query('UPDATE college SET name=? WHERE id=?', [id, name], function (err, result) {

            if (err) throw err;
            else{
                console.log('data updated');
            }
        });
    };

    this.delete = function (id) {
        db.query('DELETE FROM `college` WHERE `col_id`=?',[id],function (err,result) {
            if (err) throw err;
            else {
                console.log("College ID: "+id+" deleted.");
            }
        });

    };

    this.retrieve =function (info) {
        db.query('SELECT * FROM `college` WHERE `col_id`=?'[info.col_id],function (err,result) {

        })
    };


    this.getcol_id=function () {
        return this.data.col_id;

    };


    this.getcol_name = function () {
        return this.data.col_name;
    }


};//end of college class




module.exports=College;