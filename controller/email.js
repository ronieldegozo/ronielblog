const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(sendGridTransport({
  auth:{
      api_key: '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' //API KEY
  }
}));

exports.postEmail =  (req, res) => {
    const output = `
      <p>
        <center>
          <h1>Thank you for Contacting Roniel Blog site</h1>
          <img class="card-img-top" src="https://seeklogo.com/images/R/react-logo-7B3CE81517-seeklogo.com.png" alt="Rouge">
          <img class="card-img-top" src="https://seeklogo.com/images/N/nodejs-logo-FBE122E377-seeklogo.com.png" alt="Rouge">
        </center>
      </p>
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
     transporter.sendMail({
      to: `${req.body.email}`,
      from: 'lauritosamber@gmail.com',
      subject: `Blog Roniel , ${req.body.subject}`,
      html: output,
    });
    res.redirect('/');
};