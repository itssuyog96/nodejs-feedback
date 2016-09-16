/**
 * Created by arun on 16/09/2016.
 */

var db=require('../db-config');
var Department=function (info) {

    this.data = {
        col_id: null,
        dept_id: null,
        dept_name: null
    };
    this.set = function (info) {
        for(var p in this.data){
            if(this.data[p] !=='undefined'){
                this.data[p]=info[p];
            }

        }
        console.log(this.data);
        db.query('INSERT INTO department SET ?',this.data, function(err, result) {

            if (err) throw err;
            else{
                console.log('data added');
            }
        });

    };

    this.update = function (id, name) {
        db.query('UPDATE department SET name=? WHERE id=?', [id, name], function (err, result) {

            if (err) throw err;
            else{
                console.log('data updated');
            }
        });
    };

    this.delete = function (id) {
        db.query('DELETE FROM `department` WHERE `dept_id`=?',[id],function (err,result) {
            if (err) throw err;
            else {
                console.log("Department ID: "+id+" deleted.");
            }
        });

    };

    this.retrieve =function (info) {
        db.query('SELECT * FROM `department` WHERE `dept_id`=?'[info.dept_id],function (err,result) {

        })
    };


    this.getcol_id=function () {
        return this.data.col_id;

    };


    this.getdept_id=function () {
        return this.data.dept_id;

    };

    this.getdept_name = function () {
        return this.data.dept_name;
    }


};//end of professor class




module.exports=Department;