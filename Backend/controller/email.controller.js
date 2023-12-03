import nodemailer from 'nodemailer';

function sendEmail(email,password)
{

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ansarifaijan603@gmail.com',
    pass: 'ajexzhhynzvwiizx'
  }
});

var mailOptions = {
  from: 'ansarifaijan603@gmail.com',
  to: email,
  subject: 'varification Email eAuction',
  html: "<h1>Welcome to eAuction</h1><p>you have successfully register on application, your login credentials are attached below</p><h2>Login Details</h2><h3>Username:"+email+"</h3><h3>Password: "+password+"</h3><h2>Click on the link below to verify your account</h2>http://localhost:3000/verifyuser/"+email
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
}

export default sendEmail;