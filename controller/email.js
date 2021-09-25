const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');
const {validationResult} = require('express-validator');
const Story = require('../model/Story');
const {formatDate, truncate,stripTags,editIcon} = require('../helper/ejs');
//get home page for student
const Items_Per_Page = 2;

const transporter = nodemailer.createTransport(sendGridTransport({
  auth:{
      api_key: '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' //API KEY
  }
}));

exports.postEmail = async (req, res) => {
  const page = req.query.page;

  try {
    const errors = validationResult(req);
    const stories = await Story.find({status: 'public'})
  
    .skip((page - 1) * Items_Per_Page)
    .limit(Items_Per_Page)
    .populate('user')
    .sort({createdAt: 'desc'})
    .lean()

    if(!errors.isEmpty()) { //validation response empty
        console.log(errors.array()[0].msg);

        return res.status(422)
        .render('home/home',{
            pageTitle: 'Blogs',
            user: req.user,
            stories,
            formatDate,
            truncate,
            stripTags,
            editIcon,
            path: '/',
            errorMsg: errors.array()[0].msg,
            stories
        });
    }

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
    
  }catch(err){
    console.log(err);
    res.render('404', {
        pageTitle: 'Page not Found'
    });
  }


};


