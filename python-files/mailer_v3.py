import mimetypes
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.image import MIMEImage
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders


class MailerApp:
    def __init__(self, to_addr, from_addr, sender_pass, sub, stud_name, stud_roll):
        self.stud_name = stud_name
        self.stud_roll = stud_roll
        self.to_addr = to_addr
        self.from_addr = from_addr
        self.subject = sub
        self.attachments = []
        self.sender_pass = sender_pass
        self.htmlbody = ''

    # def values(self, to_addr, sub, stud_name, stud_roll):

    def send(self):
        print("Sending mail to {name}".format(name=self.stud_name))
        msg = MIMEMultipart('alternative')
        msg['To'] = self.to_addr
        msg['From'] = self.from_addr
        msg['Subject'] = self.subject

        if self.attachments:
            self.attach_file(msg)

        msg.attach(MIMEText(self.htmlbody, 'html'))
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(self.from_addr, self.sender_pass)
        server.sendmail(self.from_addr, self.to_addr, msg.as_string())
        print("Email sent successfully to {name}!".format(name=self.stud_name))
        server.quit()

    # For user
    def htmladd(self, html):
        self.htmlbody = self.htmlbody + '<p></p>' + html

    # For user
    # use addattach(['imagename.jpg']) for images
    def addattach(self, file):
        self.attachments = self.attachments + file

    def attach_file(self, msg):
        for f in self.attachments:
            ctype, encoding = mimetypes.guess_type(f)

            if ctype is None or encoding is not None:
                ctype = 'Application/octet-stream'

            maintype, subtype = ctype.split('/', 1)

            if maintype == "text":
                fp = open(f)
                attachment = MIMEText(fp.read(), _subtype=subtype)
                fp.close()
            elif maintype == "image":
                fp = open(f, 'rb')
                attachment = MIMEImage(fp.read(), _subtype=subtype)
                fp.close()
            else:
                fp = open(f, "rb")
                attachment = MIMEBase(maintype, subtype)
                attachment.set_payload(fp.read())
                fp.close()
                encoders.encode_base64(attachment)

            attachment.add_header("Content-Disposition", "attachment", filename=f)
            attachment.add_header("Content-Id", "<{}>".format(f))
            msg.attach(attachment)

to_addr = sys.argv[1]
to_name = sys.argv[2]
username = sys.argv[3]
password = sys.argv[4]

message = "Click on the following link to login --> http://localhost:3000/api/login?username=" + username + "&password=" + password
mailer = MailerApp("to_addr", "appuarunnair@gmail.com", "password", message, to_name")

mailer.htmladd(message)
mailer.send()


