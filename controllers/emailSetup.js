var nodemailer = require('nodemailer');

// SENDGRID_USERNAME=apikey
// SENDGRID_PASSWORD=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
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rahotels0212@gmail.com',
    pass: 'R@hotel0212'
  }
});

module.exports.sendEmail = (mailData)=>{
    transporter.sendMail(mailData, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}
