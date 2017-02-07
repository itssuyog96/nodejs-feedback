/**
 * Created by adikr on 03-02-2017.
 */



const crypto = require('crypto');
const secret = 'Aditya';

module.exports.crypto = function (s) {

        return crypto.createHmac('sha256',secret).update(s).digest('hex');

}