var jwt  = require('jwt-simple');
var GoogleURL = require('google-url');
googleUrl = new GoogleURL({key:'AIzaSyCGV2e7uvykKEnYr68QFZQyWxC1vWFy9O4'});
const crp = require('../functions/md5');
const secret = 'Aditya';
var spawn = require('child_process').spawn;
var monk = require('monk');
var db = monk('mongodb://the-wire:Success%401996@ds061076.mlab.com:61076/feed-db');
const nodemailer = require('nodemailer');



module.exports.generatePassword = function () {
    var pass = Math.ceil(Math.random()*(99999 - 10000)+ 10000);

    return pass.toString();

};


module.exports.generateuid = function(col_id,dep_id,sem,roll_no){
    var uid = col_id + dep_id + sem + roll_no ;
    return uid
};

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}


module.exports.generateSend = function (contact,email_id,username,key,id,survey_id, transporter) {


    var data ={
        name: username,
        password: key,
        contact:contact,
        email_id:email_id
    };

    username = toTitleCase(username);

    console.log(JSON.stringify(data));

    var tok = jwt.encode(data,secret);

    var token = crp.crypto(tok);
    var HToken = crp.crypto(token);

    //console.log(contact+' '+username+' '+nameH+' '+key);

    //var url = 'http://172.18.1.50/stud?access_token='+token;
    var url = 'http://172.18.1.50/stud?access_token='+token;

    //var proc = spawn('python',["python-files/SMSMessage.py", contact, username, nameH, key]);

    googleUrl.shorten( url, function(err, shortUrl ) {
        //console.log(shortUrl);
        //console.log(err);
        //console.log(url);
        /*var proc = spawn('python',["python-files/mailer_v3.py", email_id, username,url]);
        console.log("Spawned!!!");

        proc.stdout.on('data', function (chunk){
            var textChunk = chunk.toString();
            console.log(textChunk)
        });*/

        var html = '' +
            '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">' +
            '<html xmlns="http://www.w3.org/1999/xhtml">' +
            '<head>' +
            '  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />' +
            '  <meta name="viewport" content="width=device-width, initial-scale=1" />' +
            '  <title>Bharati Vidyapeeth Feedback System</title>' +
            '  <!-- Designed by https://github.com/THE-WIRE -->' +
            '  <!-- Robot header image designed by Freepik.com -->' +
            '  <style type="text/css">' +
            '  @import url(http://fonts.googleapis.com/css?family=Droid+Sans);' +
            '  /* Take care of image borders and formatting */' +
            '  img {    max-width: 600px;    outline: none;    text-decoration: none;    -ms-interpolation-mode: bicubic;  }' +
            '  a {    text-decoration: none;    border: 0;    outline: none;    color: #bbbbbb;  }' +
            '  a img {    border: none;  }' +
            '  /* General styling */' +
            '  td, h1, h2, h3  {    font-family: Helvetica, Arial, sans-serif;    font-weight: 400;  }' +
            '  td {    text-align: center;  }' +
            '  body {    -webkit-font-smoothing:antialiased;    -webkit-text-size-adjust:none;    width: 100%;    height: 100%;    color: #37302d;    background: #ffffff;    font-size: 16px;  }' +
            '   table {    border-collapse: collapse !important;  }' +
            '  .headline {    color: #ffffff;    font-size: 36px;  }' +
            ' .force-full-width {  width: 100% !important; }' +
            '.force-width-80 {  width: 80% !important; }' +
            ' .pusher {  width: 55px; }' +
            ' .steps {  width: 43px; }' +
            '  </style>' +
            '  <style type="text/css" media="screen">' +
            '      @media screen {' +
            '         /*Thanks Outlook 2013! http://goo.gl/XLxpyl*/' +
            '        td, h1, h2, h3 {' +
            '          font-family: \'Droid Sans\', \'Helvetica Neue\', \'Arial\', \'sans-serif\' !important;' +
            '        }' +
            '      }' +
            '  </style>' +
            '  <style type="text/css" media="only screen and (max-width: 480px)">' +
            '    /* Mobile styles */' +
            '    @media only screen and (max-width: 480px) {'+
            '      table[class="w320"] {' +
            '        width: 320px !important;' +
            '      }' +
            '      td[class="mobile-block"] {' +
            '        width: 100% !important;' +
            '        display: block !important;' +
            '      }      td[class="pusher"] {' +
            '        width: 0 !important;      }' +
            '      img[class="steps"] {' +
            '        width: 28px !important;' +
            '      }    }  ' +
            '</style>' +
            '</head>' +
            '' +
            '<body class="body" style="padding:0; margin:0; display:block; background:#ffffff; -webkit-text-size-adjust:none" bgcolor="#ffffff"><table align="center" cellpadding="0" cellspacing="0" class="force-full-width" height="100%" >' +
            '  <tr>' +
            '    <td align="center" valign="top" bgcolor="#ffffff"  width="100%">' +
            '      <center>' +
            '        <table style="margin: 0 auto;" cellpadding="0" cellspacing="0" width="600" class="w320">' +
            '          <tr>' +
            '            <td align="center" valign="top">' +
            '                <table style="margin: 0 auto;" cellpadding="0" cellspacing="0" class="force-full-width" style="margin:0 auto;">' +
            '                  <tr>' +
            '                    <td style="font-size: 30px; text-align:center; color:#424142;">' +
            '                      <br> ' +
            '                       Bharati Vidyapeeth College of Engineering, Navi Mumbai ' +
            '                     <br> ' +
            '                     <br>' +
            '                    </td>' +
            '                  </tr>' +
            '                </table>' +
            '                <table style="margin: 0 auto;" cellpadding="0" cellspacing="0" class="force-full-width" bgcolor="#4dbfbf">' +
            '                  <tr>' +
            '                    <td> ' +
            '                   <br>' +
            '                      <img src="https://www.filepicker.io/api/file/TjmeNWS5Q2SFmtJlUGLf" width="224" height="240" alt="robot picture">' +
            '                    </td>' +
            '                  </tr>' +
            '                  <tr>' +
            '                    <td class="headline">' +
            '                      Hello '+ username +'! Your opinion matters!' +
            '                    </td>' +
            '                  </tr>' +
            '                  <tr>' +
            '                    <td>' +
            '                      <center>' +
            '                        <table style="margin: 0 auto;" cellpadding="0" cellspacing="0" width="80%">' +
            '                          <tr>' +
            '                            <td style="color:#187272;">' +
            '                            <br>' +
            '                             Feedback is an important source of information for the development / enhancement of an organization. Please take out some time and kindly provide your views / feedback to various aspects of enlisted domains. Please provide true feedback. Your identity is never stored!' +
            '                             <br />' +
            '                             <br /> ' +
            '                           <br> ' +
            '                           <br>' +
            '                            </td> ' +
            '                         </tr>' +
            '                        </table>' +
            '                      </center> ' +
            '                   </td>' +
            '                  </tr>' +
            '                </table>' +
            '                <table style="margin: 0 auto;" cellpadding="0" cellspacing="0" class="force-full-width" bgcolor="#f5774e">' +
            '                  <tr>' +
            '                    <td style="background-color:#f5774e;">' +
            '                    <br />' +
            '                    <br />' +
            '                      <center>' +
                                    '<br/><br /><div><!--[if mso]>' +
                                    '<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="http://" style="height:50px;v-text-anchor:middle;width:200px;" arcsize="8%" stroke="f" fillcolor="#178f8f">' +
                                    '<w:anchorlock/>' +
                                    '<center>' +
                                    '<![endif]--><a href="'+url+'"' +
                                    'style="background-color:#178f8f;border-radius:4px;color:#ffffff;display:inline-block;font-family:Helvetica, Arial, sans-serif;font-size:16px;font-weight:bold;line-height:50px;text-align:center;text-decoration:none;width:200px;-webkit-text-size-adjust:none;">Start Feedback</a>' +
                                    '<!--[if mso]>' +
                                    '</center>' +
                                    '</v:roundrect>' +
                                    '<![endif]--></div><br /><br />' +
            '                        <table style="margin: 0 auto;" cellspacing="0" cellpadding="0" class="force-width-80">' +
            '                          <tr>' +
            '                          </tr>' +
            '                        </table>' +
            '                        <table style="margin: 0 auto;" cellspacing="0" cellpadding="0" class="force-width-80">' +
            '                          <tr>' +
            '                            <td style="text-align:center; color:#933f24;">' +
            '                            <br>' +
            '                              Thank you for your time! We really appreciate it.' +
            '                            <br>' +
            '                            BVCOENM' +
            '                            <br>' +
            '                            <br>' +
            '                            <br>' +
            '                            </td>' +
            '                          </tr>' +
            '                        </table>' +
            '                      </center>' +
            '                    </td>' +
            '                  </tr>' +
            '                </table>' +
            '                <table style="margin: 0 auto;" cellpadding="0" cellspacing="0" class="force-full-width" bgcolor="#414141" style="margin: 0 auto">' +
            '                  <tr>' +
            '                    <td style="background-color:#414141;">' +
            '                    <br>' +
            '                    <!-- br>' +
            '                      <a href="#"><img src="https://www.filepicker.io/api/file/R4VBTe2UQeGdAlM7KDc4" alt="google+"></a>' +
            '                      <a href="https://github.com/the-wire"><img src="https://s3-us-west-2.amazonaws.com/fortlauderdaletech.org/portfolio/icon-github.png" alt="github"></a>' +
            '                      <br -->' +
            '                      <br>' +
            '                    </td>' +
            '                  </tr>' +
            '                  <tr>' +
            '                    <td style="color:#bbbbbb; font-size:12px;">' +
            '                       © THE-WIRE 2017 All Rights Reserved' +
            '                       <br>' +
            '                       <br>' +
            '                    </td>' +
            '                  </tr>' +
            '                </table>' +
            '            </td>' +
            '          </tr>' +
            '        </table>' +
            '    </center>' +
            '    </td>' +
            '  </tr>' +
            '</table>' +
            '</body>' +
            '</html>';


        var mailOptions = {
            from: 'feedbackbvcoenm@bharatividyapeeth.edu',
            to: email_id,
            subject: 'BVCOENM Feedback Link',
            html: html
        };
        transporter.sendMail(mailOptions, function (err, info) {
            if(err) console.log(err);
            else {
                console.log("Message " + info.messageId + " sent: " + info.response);
                var collection = db.get("student");
                //console.log("----------------------------" + survey_id);
                collection.update({"_id": id},{"$set":{"key":HToken,"survey_id":survey_id,"status":"1"}},function (e,docs){
                    var d = JSON.stringify(docs);
                    if (e) throw e;
                    else {
                        console.log('user Token updated');
                    }

                });
            }
        });
    });
};



