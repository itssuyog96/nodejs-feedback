/**
 * Created by arun on 16/09/2016.
 */

var db=require('../db-config');
var Subject=function (info) {

    this.data = {
        col_id: null,
        dept_id: null,
        sub_id: null,
        sub_name: null,
        sem: null
    };
    this.set = function (info) {
        for(var p in this.data){
            if(this.data[p] !=='undefined'){
                this.data[p]=info[p];
            }

        }
        console.log(this.data);
        db.query('INSERT INTO subject SET ?',this.data, function(err, result) {

            if (err) throw err;
            else{
                console.log('data added');
            }
        });

    };

    this.update = function (id, name) {
        db.query('UPDATE subject SET name=? WHERE id=?', [id, name], function (err, result) {

            if (err) throw err;
            else{
                console.log('data updated');
            }
        });
    };

    this.delete = function (id) {
        db.query('DELETE FROM `subject` WHERE `sub_id`=?',[id],function (err,result) {
            if (err) throw err;
            else {
                console.log("Subject ID: "+id+" deleted.");
            }
        });

    };

    this.retrieve =function (info) {
        db.query('SELECT * FROM `subject` WHERE `sub_id`=?'[info.sub_id],function (err,result) {

        })
    };


    this.getcol_id=function () {
        return this.data.col_id;

    };


    this.getdept_id=function () {
        return this.data.dept_id;

    };

    this.getsub_id=function () {
        return this.data.sub_id;
    };

    this.getsub_name=function () {
        return this.data.sub_name;

    };

    this.getsem = function () {
        return this.data.sem;
    }


};//end of subject class




module.exports=Subject;