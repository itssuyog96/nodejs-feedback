module.exports.generatePassword = function () {
    var pass = Math.ceil(Math.random()*(99999 - 10000)+ 10000);

    return pass

};



module.exports.generateuid = function(col_id,dep_id,sem,roll_no){
    var uid = col_id + dep_id + sem + roll_no ;
    return uid
};



