from http import cookiejar
from urllib.request import build_opener, HTTPCookieProcessor
import sys


class Messenger:
    def __init__(self, stud_num, msg):
        self.stud_num = stud_num
        self.msg = msg

    def compose(self):
        print("SMS being sent to {num}".format(num=self.stud_num))
        sys.stdout.flush()
        message = self.msg
        number = self.stud_num  # recipient's number

        username = "your mob number"
        passwd = "your password"

        message = "+".join(message.split(' '))

        # logging into the sms site
        url = 'http://site24.way2sms.com/Login1.action?'
        data = 'username=' + username + '&password=' + passwd + '&Submit=Sign+in'

        # For cookies

        cj = cookiejar.CookieJar()
        opener = build_opener(HTTPCookieProcessor(cj))

        # Adding header details
        opener.addheaders = [('User-Agent', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko)'
                                            ' Chrome/37.0.2062.120')]
        try:
            binary_data = data.encode('ascii')
            usock = opener.open(url, binary_data)
        except IOError:
            print("error")
            sys.stdout.flush()
            # return()

        jession_id = str(cj).split('~')[1].split(' ')[0]
        send_sms_url = 'http://site24.way2sms.com/smstoss.action?'
        send_sms_data = 'ssaction=ss&Token=' + jession_id + '&mobile=' + number + '&message=' + message + '&msgLen=136'
        opener.addheaders = [('Referer', 'http://site25.way2sms.com/sendSMS?Token=' + jession_id)]
        try:
            binary_send_sms_data = send_sms_data.encode('ascii')
            sms_sent_page = opener.open(send_sms_url, binary_send_sms_data)
        except IOError:
            print("error")
            sys.stdout.flush()
            # return()

        print("Message sent successfully to {mobile}".format(mobile=self.stud_num))
        sys.stdout.flush()
        # return()

messenger = Messenger("9820055038", "Hello World!!")
messenger.compose()
