var getIP = require('external-ip')();
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'frd.frenaud@gmail.com',
        pass: 'password'
    },
    tls: { rejectUnauthorized: false }
});

var ippublic = {
    ip: "",
    newIP: "",

    updateIP: function(callback) {
        getIP(function (err, ip) {
            if (err) {
                throw err;
            }
            ippublic.newIP = ip;
        });
        console.log(ippublic.ip);
    },

    init: function() {
        setInterval(function() {
            ippublic.updateIP();
            if(ippublic.ip !== ippublic.newIP) {
                ippublic.ip = ippublic.newIP;
                console.log('Public IP address has been changed. Sending mail...')

                var mailOptions = {
                    from: 'frd.frenaud@gmail.com',
                    to: 'frd.frenaud@gmail.com',
                    subject: 'New @public address',
                    text: 'Hey ! Your public address has been changed, here your new one : ' + ippublic.ip + '. Enjoy !'
                };

                transporter.sendMail(mailOptions, function(error, info){
                    if(error){
                        return console.log(error);
                    }
                    console.log('Mail sent ! ' + info.response);
                });
            }
        }, 30000)
    }
}

ippublic.init();
