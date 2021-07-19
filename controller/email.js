const nodemailer = require('nodemailer');

exports.postEmail =  (req, res) => {
    const output = `
      <p><center><h1>Thank you for Contacting Roniel Blog site</h1></center></p>

      <h3>Your Contact Information</h3>
      <ul>  
        <li>Subject: ${req.body.subject}</li>
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
        <li>Phone: ${req.body.phone}</li>
      </ul>
      
      <h3>Message</h3>
      <p>${req.body.message}</p>
    `;
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
          user: 'lauritosamber@gmail.com', // generated ethereal user
          pass: 'Samber061617'  // generated ethereal password
      },
      tls:{
        rejectUnauthorized:false
      }
    });
  
    // setup email data with unicode symbols
    let mailOptions = {

        from: '"Blog Roniel" <lauritosamber@gmail.com>', // sender address
        to: `${req.body.email}`,
        

        // list of receivers
        subject: `Blog Roniel , ${req.body.subject}`,
        // subject: 'New Era University inquiry', // Subject line
        text: 'Hello world?', // plain text body
        html: output, // html body
    };
  
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);   
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        
        res.redirect('/');
    });
}

