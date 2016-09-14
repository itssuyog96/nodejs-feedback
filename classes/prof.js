/**
 * Created by adikr on 14-09-2016.
 */

var db=require('../db-config');
var Professor=function (info) {

    var data = {
        col_id: null,
        dept_id: null,
        prof_id: null,
        prof_name: null
    };
    this.set = function (info) {
        for(var p in data){
            if(data[p] !=='undefined'){
                data[p]=info[p];
            }

        }
        console.log(data);
        db.query('INSERT INTO professor SET ?',data, function(err, result) {

            if (err) throw err;
            else{
                console.log('data added');
            }
        });

    };

    this.delete = function (info) {
        db.query('DELETE FROM `professor` WHERE `col_id`=?',[info.col_id],function (err,result) {
            if (err) throw err;
            else {
                console.log(info.col_id);
            }
        });

    };

    this.retrieve =function (info) {
            db.query('SELECT * FROM `professor` WHERE `col_id`=?'[info.col_id],function (err,result) {

            })
    };


    this.getcol_id=function () {
        return data.col_id;

    };


    this.getdept_id=function () {
        return data.dept_id;

    };

    this.getprof_id=function () {
        return data.prof_id;
    };

    this.getprof_name=function () {
        return data.prof_name;

    }


};//end of professor class




module.exports=Professor;